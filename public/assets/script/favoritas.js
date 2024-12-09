document.addEventListener('DOMContentLoaded', async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    await loadInfo(id)
})

async function loadInfo(id){
    if (id) {
        try {
            const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA3ZGI0ODdlODMxNTY4N2Y4YjllMzAzNDgwOTQyYSIsIm5iZiI6MTczMzI1NTA5Ny4xMjcsInN1YiI6IjY3NGY1ZmI5YjY2NjgzMGI2ZTQzY2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kv6fqa__I9IVurxJeEEQwvW14L7lfno2a-_rUT7Ya6g',
                    'accept': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`Erro ao buscar tendências: ${response.statusText}`)
            }

            const data = await response.json()
            const item = data.results.find(content => content.id == id)

            if (item) {
                const infoDiv = document.querySelector('#info')
                infoDiv.innerHTML = ''

                const conteudoDiv = document.createElement('div')
                conteudoDiv.classList.add('conteudo', 'd-flex', 'gap-5')

                const img = document.createElement('img')
                img.src = `https://image.tmdb.org/t/p/w300${item.poster_path}`
                img.alt = item.title || item.name

                const detalhesDiv = document.createElement('div')
                detalhesDiv.classList.add('detalhes', 'd-flex', 'flex-column')

                const title = document.createElement('h3')
                title.classList.add('subtitle')
                title.textContent = item.title || item.name

                const description = document.createElement('p')
                description.classList.add('subtitle')
                description.textContent = `Sinopse: ${item.overview}`

                const rating = document.createElement('p')
                rating.classList.add('subtitle')
                rating.textContent = `Nota: ${item.vote_average}`

                const language = document.createElement('p')
                language.classList.add('subtitle')
                language.textContent = `Idioma: ${item.original_language}`

                const popularity = document.createElement('p')
                popularity.classList.add('subtitle')
                popularity.textContent = `Popularidade: ${item.popularity}`

                const mediaType = document.createElement('p')
                mediaType.classList.add('subtitle')
                mediaType.textContent = `Tipo de Mídia: ${item.media_type === 'movie' ? 'Filme' : 'Série'}`

                detalhesDiv.appendChild(title)
                detalhesDiv.appendChild(description)
                detalhesDiv.appendChild(rating)
                detalhesDiv.appendChild(language)
                detalhesDiv.appendChild(popularity)
                detalhesDiv.appendChild(mediaType)

                conteudoDiv.appendChild(img)
                conteudoDiv.appendChild(detalhesDiv)

                infoDiv.appendChild(conteudoDiv)

                await loadElenco(item)
            } else {
                console.error('Item não encontrado nas tendências.')
            }
        } catch (error) {
            console.error('Erro:', error.message)
        }
    } else {
        console.error('ID não fornecido na URL.')
    }
}

async function loadElenco(midia) {
    const elencoCarouselInner = document.querySelector('#elencoCarouselInner')
    elencoCarouselInner.innerHTML = ''

    try {
        const castResponse = await fetch(`https://api.themoviedb.org/3/${midia.media_type}/${midia.id}/credits?language=en-US`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA3ZGI0ODdlODMxNTY4N2Y4YjllMzAzNDgwOTQyYSIsIm5iZiI6MTczMzI1NTA5Ny4xMjcsInN1YiI6IjY3NGY1ZmI5YjY2NjgzMGI2ZTQzY2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kv6fqa__I9IVurxJeEEQwvW14L7lfno2a-_rUT7Ya6g',
                'accept': 'application/json'
            }
        })

        if (!castResponse.ok) {
            throw new Error(`Erro ao buscar elenco: ${castResponse.statusText}`)
        }

        const castData = await castResponse.json()

        const chunkSize = 5
        const castChunks = []

        for (let i = 0; i < castData.cast.length; i += chunkSize) {
            const chunk = castData.cast.slice(i, i + chunkSize)
            castChunks.push(chunk)
        }

        castChunks.forEach((chunk, index) => {
            const carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item')
            if (index === 0) carouselItem.classList.add('active')

            const innerDiv = document.createElement('div')
            innerDiv.classList.add('d-flex', 'justify-content-center', 'gap-3')

            chunk.forEach(actor => {
                const card = document.createElement('div')
                card.classList.add('elenco-card')

                const img = document.createElement('img')
                img.src = actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'default-image.jpg'
                img.alt = actor.name

                const actorName = document.createElement('div')
                actorName.classList.add('actor-name')
                actorName.textContent = actor.name

                const actorRole = document.createElement('div')
                actorRole.classList.add('actor-role')
                actorRole.textContent = actor.character

                card.appendChild(img)
                card.appendChild(actorName)
                card.appendChild(actorRole)

                innerDiv.appendChild(card)
            })

            carouselItem.appendChild(innerDiv)
            elencoCarouselInner.appendChild(carouselItem)
        })

    } catch (error) {
        console.error('Erro:', error.message)
    }
}
