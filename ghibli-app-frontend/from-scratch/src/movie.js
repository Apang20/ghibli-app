const moviesURL = 'http://localhost:3000/movies/'

function qSelect(id){
    return document.querySelector(id)
}

function create(el){
    return document.createElement(el)
}

function fetchMovies(){
    fetch(moviesURL)
    .then((res) => res.json())
    .then ((movieData) => {
        createForm()

        const cardContainer = qSelect('#card-container')
        cardContainer.innerHTML = ""
        
        movieData.forEach(function(movie) {
            renderMovie(movie)
        })
    })
        qSelect("#characters").addEventListener('click', () => {
            fetchCharacters()
    })

}

function createForm() {
    const form = qSelect("#form")
          form.className = ".container"

    const fgroup = qSelect(".form-group")

    let title = document.createElement('input')
        title.type = "text"
        title.className = "form-control"
        title.placeholder = "Add Movie Title"

    let image = document.createElement('input')
        image.type = "text"
        image.className = "form-control"
        image.placeholder = "Add Movie Poster"

    let year = document.createElement('input')
        year.type = "text"
        year.className = "form-control"
        year.placeholder = "Add Release Year"

    let director = document.createElement('input')
        director.type = "text"
        director.className = "form-control"
        director.placeholder = "Add Movie Director"
    
    let description = document.createElement('input')
        description.type = "text"
        description.className = "form-control"
        description.placeholder = "Add Movie Summary"

    let button = document.createElement('button')
        button.type = "submit"
        button.classList.add('btn', 'btn-default')
        button.innerText = "Submit Film"

        fgroup.append(title, image, year, director, description, button)
}

function renderMovie(movie){
    const cardContainer = qSelect('#card-container') 

    const col = create('div')
          col.className = "col"

    const card = create('div')
          card.classList.add("card", "shadow-sm")

    const image = create('img')
          image.src = movie["poster_image"]
          image.className = "img-thumbnail"
          image.alt = movie.title

    const cardBody = create('div')
          cardBody.className = "card-body"

    const p = create('p')
          p.className = "card-text"
          p.innerText = movie.title

    const div = create('div')
          div.classList.add("d-flex", "justify-content-between", "align-items-center")

    const buttonGroup = create('div')
          buttonGroup.className = "btn-group"

    const viewBtn = create('button')
          viewBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
          viewBtn.innerText = "View"
          
    const deleteBtn = create('button')
          deleteBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
          deleteBtn.innerText = "Delete"

          deleteBtn.addEventListener('click', () => {
            deleteMovie(movie, col)
          })

    buttonGroup.append(viewBtn, deleteBtn)

    div.appendChild(buttonGroup)
    
    cardBody.append(p, div)

    card.append(image, cardBody)

    col.appendChild(card)
        
    cardContainer.appendChild(col)
}

function fetchMovie(movie){
    fetch(moviesURL + movie.id)
    .then((res) => res.json())
    .then((movieData) => {
        showMovie(movieData)
    })
}

function showMovie(movie){

    let movieBox = document.querySelector("#movieBox")
        movieBox.innerHTML = ""

    let movieCard = create('div')

    let movieImage = create('img')
        movieImage.className = "card-image-top"
        movieImage.src = movie.poster_image

    let movieTitle = create('h2')
        movieTitle.innerText = movie.title

    let movieYear = create('h3')
        movieYear.innerText = movie.year 

    let movieDir = create('h3')
        movieDir = movie.director

    let movieDesc = create('p')
        movieDesc.innerText = movie.description 

    movieCard.append(movieImage, movieTitle, movieYear, movieDir, movieDesc)
    movieBox.appendChild(movieCard)

    
}

function deleteMovie(movie, col){
    fetch(moviesURL + movie.id, {method: "DELETE"})
    .then((res) => res.json())
    .then (col.remove()) 
    console.log(movie)
}

