function kidsyardReadMoreLabel(expanded) {
    if (typeof i18next !== 'undefined' && i18next.isInitialized) {
        return expanded ? i18next.t('common.readLess') : i18next.t('common.readMore');
    }
    return expanded ? 'اقرأ أقل' : 'اقرأ المزيد';
}

// Read more functionality
document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        const readMoreText = btn.previousElementSibling; // assuming p is right before button
        if (readMoreText && readMoreText.classList.contains('read-more-text')) {
            btn.textContent = kidsyardReadMoreLabel(readMoreText.classList.contains('expanded'));
            btn.addEventListener('click', function () {
                readMoreText.classList.toggle('expanded');
                btn.textContent = kidsyardReadMoreLabel(readMoreText.classList.contains('expanded'));
            });
        }
    });
});

window.addEventListener('kidsyard:i18n-language-changed', function () {
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        const readMoreText = btn.previousElementSibling;
        if (readMoreText && readMoreText.classList.contains('read-more-text')) {
            btn.textContent = kidsyardReadMoreLabel(readMoreText.classList.contains('expanded'));
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
window.addEventListener("load", function () {

    // everything is loaded
    //console.log('loaded.....')

    document.getElementById("loader").style.display = "none";

    document.getElementById("content").style.display = "block";

});