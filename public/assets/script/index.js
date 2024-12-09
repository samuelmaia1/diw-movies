document.addEventListener('DOMContentLoaded', async () => {
    await loadPopularCarousel(await loadPopularContent())
    await loadNewCarousel(await loadNewContent())
    await loadAuthor()
    await loadFavorites()
})

async function loadFavorites(){
    console.log('entrou')
    const section = document.querySelector("#favoritas")

    const response = await fetch('http://localhost:3000/series')

    const series = await response.json()

    if (series.length === 0)
        section.innerHTML = `<h2 class="fs-2 subtitle mb-3 mt-5">Séries favoritas</h2> <h3 class="fs-4 subtitle">Ainda não há series favoritas</h3>`
    else {
        series.forEach((serie) => {
            section.innerHTML +=
            `
                <div class="d-flex gap-5">
                    <img src="https://image.tmdb.org/t/p/w300${serie.backdrop_path}"/>
                    <div class="d-flex flex-column">
                        <a href="./favoritas.html?id=${serie.id}">
                            <h4 class="subtitle">${serie.title}</h4>
                        </a>
                        <p class="subtitle">Resumo: ${serie.overview}</p>
                        <p class="subtitle">Nota: <span className="span-nota">${serie.vote_average}</span></p>
                        <a href="./favoritas.html?id=${serie.id}" class="btn btn-danger">Visitar</a>
                    </div>
                </div>
            `
        })
    }

}

async function loadAuthor(){
    const section = document.querySelector('#author')

    const response = await fetch('http://localhost:3000/usuario')
    
    const author = await response.json()

    section.innerHTML = 
    `
        <h2 class="fs-2 subtitle mb-3 mt-5">Autor do projeto</h2>

          <div className="container-author px-3">
              <h3 class="fs-4 subtitle">${author.nome}</h3>
              <p class" fs-4">${author.curso} - ${author.turma}</p>
              <p class" fs-4">Bio: ${author.bio}</p>
              <p class" fs-4">Redes sociais: </p>
              <div class="d-flex gap-3">
                <a href="${author.facebook}" target="_blank"><img src="../assets/img/facebook (1).png" alt=""></a>
                <a href="${author.instagram}" target="_blank"><img src="./assets/img/instagram (8).png" alt=""></a>
                <a href="${author.twitter}" target="_blank"><img src="./assets/img/twitter.png" alt=""></a>
              </div>
              
          </div>

    `
}

async function loadPopularContent(){

    let popularContent

    await fetch ('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA3ZGI0ODdlODMxNTY4N2Y4YjllMzAzNDgwOTQyYSIsIm5iZiI6MTczMzI1NTA5Ny4xMjcsInN1YiI6IjY3NGY1ZmI5YjY2NjgzMGI2ZTQzY2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kv6fqa__I9IVurxJeEEQwvW14L7lfno2a-_rUT7Ya6g',
            'accept': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) throw new Error('Erro ao carregar as séries mais populares.')
        return response.json()
    })
    .then((data) => {
        popularContent = [...data.results.slice(0, 20)]
    })

    localStorage.setItem('seriesPopulares', JSON.stringify(popularContent))
    

    return popularContent
}

async function loadNewContent(){
    let newContent

    await fetch ('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA3ZGI0ODdlODMxNTY4N2Y4YjllMzAzNDgwOTQyYSIsIm5iZiI6MTczMzI1NTA5Ny4xMjcsInN1YiI6IjY3NGY1ZmI5YjY2NjgzMGI2ZTQzY2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kv6fqa__I9IVurxJeEEQwvW14L7lfno2a-_rUT7Ya6g',
            'accept': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) throw new Error('Erro ao carregar as séries mais populares.')
        return response.json()
    })
    .then((data) => {
        newContent = [...data.results.slice(0, 20)]
    })

    console.log(newContent)

    localStorage.setItem('seriesNovas', JSON.stringify(newContent))

    return newContent
}

async function loadNewCarousel(newContent){
    const carouselInner = document.querySelector('#new-content')

    const chunkSize = 5
    for (let i = 0; i < newContent.length; i += chunkSize) {
        const chunk = newContent.slice(i, i + chunkSize)

        const carouselItem = document.createElement('div')
        carouselItem.classList.add('carousel-item')
        if (i === 0) carouselItem.classList.add('active')

        const innerDiv = document.createElement('div')
        innerDiv.classList.add('d-flex', 'justify-content-center', 'gap-5')

        chunk.forEach(content => {
            const a = document.createElement('a')
            a.href = `./favoritas.html?id=${content.id}`
            a.classList.add('link-carousel')

            const img = document.createElement('img')
            img.src = `https://image.tmdb.org/t/p/w300${content.poster_path}`
            img.classList.add('d-block', 'w-40')

            a.appendChild(img)

            innerDiv.appendChild(a)
        })

        carouselItem.appendChild(innerDiv)
        carouselInner.appendChild(carouselItem)
    }
}

async function loadPopularCarousel(popularContent){
    const carouselInner = document.querySelector('#popular-content')

    const chunkSize = 5
    for (let i = 0; i < popularContent.length; i += chunkSize) {
        const chunk = popularContent.slice(i, i + chunkSize)

        const carouselItem = document.createElement('div')
        carouselItem.classList.add('carousel-item')
        if (i === 0) carouselItem.classList.add('active')

        const innerDiv = document.createElement('div')
        innerDiv.classList.add('d-flex', 'justify-content-center', 'gap-5')

        chunk.forEach(content => {
            const a = document.createElement('a')
            a.href = `./favoritas.html?id=${content.id}`
            a.classList.add('link-carousel')

            const img = document.createElement('img')
            img.src = `https://image.tmdb.org/t/p/w300${content.poster_path}`
            img.classList.add('d-block', 'w-40')

            a.appendChild(img)

            innerDiv.appendChild(a)
        })

        carouselItem.appendChild(innerDiv)
        carouselInner.appendChild(carouselItem)
    }
}