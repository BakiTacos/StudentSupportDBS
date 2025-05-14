document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap carousel
    var carousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
        interval: 5000,  // Change slide every 5 seconds
        wrap: true,      // Continuous loop
        keyboard: true,  // Keyboard control
        pause: 'hover',  // Pause on mouse hover
        touch: true      // Touch support for mobile
    });

    // Optional: Add swipe support for mobile
    var touchStartX = 0;
    var touchEndX = 0;
    
    var carouselElement = document.querySelector('.carousel');

    carouselElement.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    }, false);

    carouselElement.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left - next slide
            carousel.next();
        }
        if (touchEndX > touchStartX) {
            // Swipe right - previous slide
            carousel.prev();
        }
    }
});