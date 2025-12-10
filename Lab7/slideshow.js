let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    // 1. Remove the 'active' class from all slides
    for (let i = 0; i < slides.length; i++) {
        // This removes opacity: 1 and sets the slide to opacity: 0 (if it was active)
        slides[i].classList.remove("active"); 
    }

    // 2. Increment and wrap the slide index (1, 2, 3, 1, 2, 3...)
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 3. Add the 'active' class to the current slide
    // This sets opacity: 1, triggering the smooth 1-second fade-in.
    slides[slideIndex - 1].classList.add("active"); 

    // 4. Call this function again after 3 seconds (3000 milliseconds)
    setTimeout(showSlides, 3000);
}

// Initialize the slideshow when the page loads
showSlides();