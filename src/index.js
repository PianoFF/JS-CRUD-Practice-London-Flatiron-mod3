document.addEventListener("DOMContentLoaded", function(){
    
    const body = document.querySelector('body');
    const script = document.querySelector('script');

    const ul = document.createElement('ul');
    ul.id = "all-films"; 
    body.insertBefore(ul, script); 

    const br = document.createElement('br'); 
    //'create' _ display all content
    const createAFilmEntry = function(film){
        const li = document.createElement('li');
        ul.appendChild(li); 

        //update button;
        //delete button; 

        li.id = film.id;
        li.innerText = film.title;
        
        const p = document.createElement('p');
        p.innerText = `Director: ${film.director} \n Producer: ${film.producer} \n Released on: ${film.release_date}\n Description: ${film.description}.`;
        li.appendChild(p);
    }

    fetch("http://localhost:3000/films")
    .then(resp => resp.json())
    .then(films => films.forEach(film => createAFilmEntry(film)));


})