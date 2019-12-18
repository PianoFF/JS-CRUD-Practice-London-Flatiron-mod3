document.addEventListener("DOMContentLoaded", function(){
    //redirect back to index.html
    const backBtn = document.querySelector('#back-btn');

    backBtn.addEventListener('click', ()=> location.replace('index.html'));

    const submitNewFilmBtn = document.querySelector('#submit-new-film');
    submitNewFilmBtn.addEventListener("click", createNewFilm);

    function createNewFilm(e){
        e.preventDefault();
        const frmCntnt = document.querySelector('#new-film');

        const formData = {
            title: frmCntnt.querySelector('#title').value,
            producer: frmCntnt.querySelector('#producer').value,
            director: frmCntnt.querySelector('#director').value,
            description: frmCntnt.querySelector('#description').value
        };


        configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            }
        fetch('http://localhost:3000/films', configObj)
        .then (resp => resp.json())
        .then (()=> backBtn.click());
    }
})
