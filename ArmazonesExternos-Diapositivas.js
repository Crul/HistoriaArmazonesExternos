let currentSlide = 0;
let slides = [];
let keyDown = false;
function init() {
    if (window.location.hash)
        currentSlide = Number(window.location.hash.substr(1)) 

    slides = [...document.querySelectorAll("body > div")];
    slides[currentSlide].style.display = "block";
    
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    const imgs = [...document.querySelectorAll("img")];
    for (let i in imgs) {
        let aHref = document.createElement("a");
        aHref.href = "fullscreen.html?img=" + encodeURIComponent(imgs[i].src)
        imgs[i].replaceWith(aHref);
        aHref.appendChild(imgs[i]);
        //imgs[i].onclick = handleImgClick;
        
    }
}

function handleImgClick(x, y, z) {
    window.open("fullscreen.html?img=" + encodeURIComponent(x.srcElement.src));
}

function handleKeyDown(ev) {
    if (keyDown) return;
    keyDown = true;
    if (ev.key == "ArrowRight") {
        slides[currentSlide].className = "outforward";
        // slides[currentSlide].style.display = "none";
        currentSlide++;
        if (currentSlide >= slides.length)
            currentSlide = 0;
        slides[currentSlide].style.display = "block";
        slides[currentSlide].className = "inforward";
    } else if (ev.key == "ArrowLeft") {
        //slides[currentSlide].style.display = "none";
        slides[currentSlide].className = "outbackward";
        currentSlide--;
        if (currentSlide < 0)
            currentSlide = slides.length - 1;
        slides[currentSlide].style.display = "block";
        slides[currentSlide].className = "inbackward";
    }
    window.location.hash = currentSlide;
    // e.preventDefault();
}

function handleKeyUp() {
    keyDown = false;
}

window.onload = init;