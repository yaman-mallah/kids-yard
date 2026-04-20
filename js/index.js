// Read more functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        const readMoreText = btn.previousElementSibling; // assuming p is right before button
        if (readMoreText && readMoreText.classList.contains('read-more-text')) {
            btn.addEventListener('click', function() {
                readMoreText.classList.toggle('expanded');
                if (readMoreText.classList.contains('expanded')) {
                    btn.textContent = 'اقرأ أقل';
                } else {
                    btn.textContent = 'اقرأ المزيد';
                }
            });
        }
    });
});

if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
        spaceBetween: 30,

    });
}