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

(function () {
    var testimonialsSwiper = null;

    function testimonialsSwiperEl() {
        return document.querySelector('.testimonials-section .swiper');
    }

    function isRtlDocument() {
        var d = document.documentElement.getAttribute('dir');
        if (d) return d.toLowerCase() === 'rtl';
        if (document.body && document.body.getAttribute('dir')) {
            return document.body.getAttribute('dir').toLowerCase() === 'rtl';
        }
        return false;
    }

    function destroyTestimonialsSwiper() {
        if (testimonialsSwiper && !testimonialsSwiper.destroyed) {
            testimonialsSwiper.destroy(true, true);
        }
        testimonialsSwiper = null;
    }

    function initKidsyardTestimonialsSwiper() {
        if (typeof Swiper === 'undefined') return;
        var el = testimonialsSwiperEl();
        if (!el) return;

        destroyTestimonialsSwiper();

        var pag = el.querySelector('.swiper-pagination');
        testimonialsSwiper = new Swiper(el, {
            direction: 'horizontal',
            loop: true,
            rtl: isRtlDocument(),
            observer: true,
            observeParents: true,
            pagination: pag ? { el: pag } : undefined,
            spaceBetween: 30,
        });
    }

    window.initKidsyardTestimonialsSwiper = initKidsyardTestimonialsSwiper;

    window.addEventListener('load', function () {
        initKidsyardTestimonialsSwiper();
    });
})();
window.addEventListener("load", function () {

    // everything is loaded
    //console.log('loaded.....')

    document.getElementById("loader").style.display = "none";

    document.getElementById("content").style.display = "block";

});