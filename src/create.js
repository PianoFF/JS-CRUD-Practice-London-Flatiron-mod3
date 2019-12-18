document.addEventListener("DOMContentLoaded", function(){
    //redirect back to index.html
    const backBtn = document.querySelector('#back-btn');

    backBtn.addEventListener('click', ()=> location.replace('index.html'));
})