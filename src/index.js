const body = document.querySelector('body');
const script = document.querySelector('script');

const ul = document.createElement('ul');
ul.id = "all-films"; 
body.insertBefore(ul, script); 

//header
const header = document.createElement('header');
body.insertBefore(header, ul); 

header.classList.add('running-header');

//header content
const searchBox = document.createElement('input');
header.appendChild(searchBox); 
searchBox.placeholder = 'search';

const searchSelection = document.createElement('select');
header.appendChild(searchSelection); 
searchSelection.add(new Option("Title",1)); 
searchSelection.add(new Option("Director", 2)); 
searchSelection.add(new Option("Producer",3)); 

const searchButton = document.createElement('button');
header.appendChild(searchButton);
searchButton.classList.add('search-button');
searchButton.classList.add('header-btn'); 
searchButton.innerText = 'Submit'; 

// create a film _ with user input
const newFilmButton = document.createElement('button');
header.appendChild(newFilmButton);
newFilmButton.innerText = "Create A New Film"; 
newFilmButton.classList.add('header-btn');
//the creation is done via this new page:
newFilmButton.addEventListener('click', ()=> location.replace('./create.html'));
//end of header


document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/films")
    .then(resp => resp.json())
    .then(films => films.forEach(film => createAFilmEntry(film)));
})

//'create' _ display all content
const createAFilmEntry = function(film){
    const li = document.createElement('li');
    ul.appendChild(li); 

    li.id = film.id;
    li.film = film; 

    const div = document.createElement('div');
    div.classList.add('film');
    div.innerText = film.title; 
    li.appendChild(div);

    const p = document.createElement('p');
    p.innerText = `Director: ${film.director} \n Producer: ${film.producer} \n Released on: ${film.release_date}\n Description: ${film.description}`;
    div.appendChild(p);

    //update button;
    const updateBtn = document.createElement("button");
    li.appendChild(updateBtn); 
    updateBtn.innerText = 'Update This Film'; 
    updateBtn.classList.add('update-button'); 

    updateBtn.addEventListener('click', updateTheFilm); 

    //delete button;
    const deleteBtn = document.createElement("button");
    li.appendChild(deleteBtn); 
    deleteBtn.innerText = 'Delete This Film';
    deleteBtn.classList.add('update-button');

    deleteBtn.addEventListener ('click', destroyFilm);
};

function destroyFilm(e){
    const thisFilm = deleteBtn.parentElement;
    fetch(`http://localhost:3000/films/${thisFilm.id}`, {method: 'DELETE'})
    .then(()=>{
        alert('Selected Film Has Been Deleted');
        thisFilm.remove();
     });
}


function updateTheFilm(e){
    e.preventDefault();
    const parentLi = e.target.parentElement;
    const actualDiv = parentLi.querySelector('.film');
    actualDiv.innerText = '';

    // console.log(parentLi.film); 
    let br = document.createElement('br');

    const newTitle = document.createElement('input');
    newTitle.value = parentLi.film.title;
    newTitle.id = "title";
    actualDiv.append(newTitle,br); 

    const newDirector = document.createElement('input');
    const directorLabel = document.createElement('label');
    newDirector.value = parentLi.film.director;
    newDirector.id = "director";
    directorLabel.innerText = "Director:"; 
    br = document.createElement('br');
    actualDiv.append(directorLabel,newDirector,br); 

    const newProducer = document.createElement('input');
    const producerLabel = document.createElement('label');
    newProducer.value = parentLi.film.producer;
    newProducer.id = "producer";
    producerLabel.innerText = "Producer:"; 
    br = document.createElement('br');
    actualDiv.append(producerLabel,newProducer,br); 

    const newDescription = document.createElement('textarea');
    const descriptionLabel = document.createElement('label');
    newDescription.value = parentLi.film.description;
    newDescription.id = "description";
    descriptionLabel.innerText = "Description:"; 
    br = document.createElement('br');
    actualDiv.append(descriptionLabel,newDescription,br); 

    const saveBtn = document.createElement('button');
    saveBtn.id = 'save';
    saveBtn.innerText = 'Save';
    actualDiv.append(saveBtn); 

    saveBtn.addEventListener('click', saveAndUpdate);
}

function saveAndUpdate(e){
    const div = e.target.parentElement;
    const thisFilm = e.target.parentElement.parentElement;
    const formData = {
        title: div.querySelector('#title').value,
        producer: div.querySelector('#producer').value,
        director: div.querySelector('#director').value,
        description: div.querySelector('#description').value
    };


    const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        }
    fetch(`http://localhost:3000/films/${thisFilm.id}`, configObj)
    .then (()=>{
        // console.log
        alert("your film has been updated");
        location.replace('index.html')
    });
}