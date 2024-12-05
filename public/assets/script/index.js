document.addEventListener('DOMContentLoaded', async () => {
    await loadPopularCarousel(await loadPopularContent())
    await loadNewCarousel(await loadNewContent())
})

async function loadPopularContent(){

    let popularContent

    await fetch ('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', {
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

    console.log(popularContent)

    return popularContent
}

async function loadNewContent(){
    let newContent

    await fetch ('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
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
            a.href = 'www.youtube.com'
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
            a.href = 'www.youtube.com'
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