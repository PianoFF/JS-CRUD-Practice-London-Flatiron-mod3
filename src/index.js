document.addEventListener("DOMContentLoaded", function(){
    
    const body = document.querySelector('body');
    const script = document.querySelector('script');

    const ul = document.createElement('ul');
    ul.id = "all-films"; 
    body.insertBefore(ul, script); 
    
    //header
    const header = document.createElement('header');
    body.insertBefore(header, ul); 
    
    header.classList = 'running-header';

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
    searchButton.classList = 'search-button header-btn'; 
    searchButton.innerText = 'Submit'; 

    // create a film _ with user input
    const newFilmButton = document.createElement('button');
    header.appendChild(newFilmButton);
    newFilmButton.innerText = "Create A New Film"; 
    newFilmButton.classList = 'header-btn';

    
    //end of header

    //'create' _ display all content
    const createAFilmEntry = function(film){
        const li = document.createElement('li');
        ul.appendChild(li); 

        //delete button; 
        
        li.id = film.id;
        li.innerText = film.title;
        
        const p = document.createElement('p');
        p.innerText = `Director: ${film.director} \n Producer: ${film.producer} \n Released on: ${film.release_date}\n Description: ${film.description}`;
        li.appendChild(p);

        //update button;
        const updateBtn = document.createElement("button");
        li.appendChild(updateBtn); 
        updateBtn.innerText = 'Update This Film'; 
        updateBtn.classList = 'update-button'; 
    }

    fetch("http://localhost:3000/films")
    .then(resp => resp.json())
    .then(films => films.forEach(film => createAFilmEntry(film)));


})