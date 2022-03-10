/**
 *
 *
 *
Riprendiamo l'esercizio carosello e rifacciamolo, questa volta usando gli oggetti, prendendo come riferimento il codice scritto oggi insieme a lezione, che troverete direttamente nella mia repository di github a questo link: [link github]

Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto dei tre array separati, con una sola regola: non è possibile modificare l'HTML ma solamente JS e CSS.
Ricordiamo sempre l'importanza dell'integrità del dato.

Bonus 1:
Sperimentiamo attraverso l'uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:
al click di un bottone o già dall'inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.

Bonus 2:
E se volessi un bottone per invertire la "direzione" del carosello?

 *
 */

const stadium = [

    {
        image: "img/sofi-stadium.jpeg",
        description: "SoFi Stadium — Inglewood, California"
    },

    {
        image: "img/allegiant-stadium.jpeg",
        description: "Allegiant Stadium — Las Vegas, Nevada"
    },

    {
        image: "img/metlife-stadium.jpeg",
        description: "MetLife Stadium — East Rutherford, New Jersey"
    },

    {
        image: "img/mercedesbenz-stadium.jpeg",
        description: "Mercedes-Benz Stadium — Atlanta, Georgia"
    },

    {
        image: "img/at&t-stadium.jpeg",
        description: "AT&T Stadium — Arlington, Texas"
    },
];

const mainCarousel = document.querySelector(".my-carousel-images");

mainCarousel.innerHTML = `<img src="${stadium[0].image}" alt="image of ${stadium[0].description}">`;

mainCarousel.classList.add("position-relative", "shadow");

const descriptionMainCarousel = document.createElement ("span");

descriptionMainCarousel.classList.add("description", "position-absolute");

descriptionMainCarousel.innerHTML = `${stadium[0].description}`;

mainCarousel.appendChild(descriptionMainCarousel);

const thumbnailsCarousel = document.querySelector(".my-thumbnails");

thumbnailsCarousel.classList.add("d-flex", "shadow");

const optionScroll = document.getElementById("my-after-carousel");

optionScroll.classList.add("d-flex", "justify-content-center", "p-0","position-absolute");

optionScroll.innerHTML = `<div class="form-check form-switch col-2">
<input class="form-check-input ps-5 position-relative" type="checkbox" role="switch" id="flexSwitchCheckDefault">
<label class="form-check-label" for="flexSwitchCheckDefault">Invert Scroll</label>
</div>`;

const titlePage = document.getElementById("my-before-carousel");
titlePage.innerHTML = `<h1>The Most Expensive NFL Stadiums</h1>`

const mainContainer = document.querySelector(".p-5");
mainContainer.classList.remove("p-5");
mainContainer.classList.add("pt-4");

let counterMain = 0;

let counterThumbnails = 0;

for ( let i = 0; i < stadium.length; i++){

    const singleThumbnail = document.createElement("div");

    singleThumbnail.classList.add("single-thumbnail");

    singleThumbnail.innerHTML = `<img src="${stadium[i].image}" alt="image of ${stadium[i].description}">`;

    thumbnailsCarousel.appendChild(singleThumbnail);
}

const thumbnails = document.querySelectorAll(".single-thumbnail");
thumbnails[0].classList.add("active");

document.querySelector(".my-next").addEventListener("click", function(){

    clearInterval(advanceInterval);
    advanceSlider();
})

function advanceSlider(){

    counterMain++;

    counterThumbnails++;

    if(counterMain >= stadium.length){
        counterMain = 0;
        counterThumbnails = stadium.length;
    }

    mainCarousel.innerHTML = `<img src="${stadium[counterMain].image}" alt="image of ${stadium[counterMain].description}">`;

    descriptionMainCarousel.innerHTML = `${stadium[counterMain].description}`;
    mainCarousel.appendChild(descriptionMainCarousel);

    thumbnails[(counterThumbnails - 1)].classList.remove("active");
    thumbnails[counterMain].classList.add("active");

    if(counterThumbnails == stadium.length){
        counterThumbnails = 0;
    }


}

document.querySelector(".my-previous").addEventListener("click", function(){
    clearInterval(advanceInterval);
    decreaseSlider();
})

function decreaseSlider(){

    counterMain--;

    

    if(counterMain < 0){
        counterMain = (stadium.length - 1);
        counterThumbnails = 0;
    }

    mainCarousel.innerHTML = `<img src="${stadium[counterMain].image}" alt="image of ${stadium[counterMain].description}">`;

    descriptionMainCarousel.innerHTML = `${stadium[counterMain].description}`;
    mainCarousel.appendChild(descriptionMainCarousel);

    thumbnails[(counterThumbnails)].classList.remove("active");
    thumbnails[counterMain].classList.add("active");

    

    if(counterThumbnails <= 0){
        counterThumbnails = ((stadium.length));
    }

    counterThumbnails--;

}

const advanceInterval = setInterval(advanceSlider, 2000);



const inputInverse = document.querySelector(".form-check-input");


inputInverse.addEventListener('change', function() {


    if(!this.checked){
        location.reload();
    }else{
        clearInterval(advanceInterval);
        setInterval(decreaseSlider,2000);
    }


});