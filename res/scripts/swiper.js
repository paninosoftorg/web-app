
var splide = new Splide('.splide', {
    autoplay: false,
    perPage: 1,
    arrows: false,
    pagination: false,
    drag: false,
    keyboard: false,
    paginationKeyboard: false,
});
splide.mount();

function splideReset(){
    for(let i = 0; i < splide.lenght; i++){
        splide.remove(i);
    }
}

function splideShowNext(id){
    splide.add(document.getElementById(id));
    splide.go('>');
}

function splideBack(id){
    splide.go('<');
}