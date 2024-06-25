let slideIndex = 0;
let slideTimer; // Variable to hold the timer
showSlides();

function showSlides(index) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (index !== undefined) {
        slideIndex = parseInt(index, 10) + 1;
    } else {
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Clear the existing timer before setting up a new one
    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const index = dot.getAttribute('data-index');
      showSlides(index);
    });
});