// Automatic Slideshow
let images = ['masjid_kristal.jpg', 'muzium_trg.jpg', 'pulau_redang.jpg'];
let i = 0;

setInterval(function () {
    document.getElementById('slide').src = images[i];
    i = (i + 1) % images.length;
}, 3000);

// Smooth Scrolling for Navigation
document.querySelectorAll('.sidenav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Collapsible Section
document.addEventListener("DOMContentLoaded", function () {
    const collapsibleButton = document.querySelector(".collapsible");
    const content = document.querySelector(".content");

    collapsibleButton.addEventListener("click", function () {
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});
