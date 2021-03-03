// Create global variables 
const spiceDiv = document.querySelector('div#spice-blend-detail')
const imgTag = spiceDiv.querySelector('img.detail-image')
const h2Tag = spiceDiv.querySelector('h2.title')

const ulCollection = document.querySelector('ul.ingredients-list')

const updateForm = document.querySelector('form#update-form')

const ingredientForm = document.querySelector('form#ingredient-form')

const spiceImg = document.querySelector('div#spice-images')


// Helper functions
function renderSpice(spiceObj) {
    imgTag.src = spiceObj.image 
    h2Tag.textContent = spiceObj.title    

    spiceObj.ingredients.forEach (ingredient => {
        const li = document.createElement('li')
        li.id = ingredient.id 
        li.textContent = ingredient.name 
        ulCollection.appendChild(li)
    })

    updateForm.dataset.id = spiceObj.id
    ingredientForm.dataset.id = spiceObj.id
}

function updateTitle(e) {
    e.preventDefault()
    const title = e.target.title.value 
    const id = e.target.closest('form').dataset.id 
    fetch(`http://localhost:3000/spiceblends/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title})
    })
    .then(resp => resp.json())
    .then(data => renderSpice(data))
}

function addIngredient(e) {
    e.preventDefault()
    const name = e.target.name.value 
    const spiceblendId = parseInt(e.target.closest('form').dataset.id)


    fetch('http://localhost:3000/ingredients/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, spiceblendId: spiceblendId})
    }).then(resp => resp.json())
    .then(() => {
        // const li = document.createElement('li')
        // li.id = ulCollection.lastElementChild.id + 1
        // li.textContent = name
        // ulCollection.appendChild(li)   
    }) 
}

function renderImage(spiceArr) {
    spiceArr.forEach(spice => {
        const img = document.createElement('img')
        img.src = spice.image 
        img.addEventListener('click', () => renderSpice(spice))
        spiceImg.appendChild(img)
    })    
}



fetch('http://localhost:3000/spiceblends/1')
.then (resp => resp.json())
.then (spice => renderSpice(spice))


updateForm.addEventListener('submit', updateTitle)

ingredientForm.addEventListener('submit', addIngredient)

fetch('http://localhost:3000/spiceblends')
.then (resp => resp.json())
.then (spiceArr => renderImage(spiceArr))


