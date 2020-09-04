import $ from '../core';

$.prototype.carousel = function (autoplay = false, time = 4000) {
    for (let i = 0; i < this.length; i++) {
        const width = +window.getComputedStyle(this[i].querySelector('.carousel-inner')).width.replace(/\D/gi, ''); // 800
        const slides = this[i].querySelectorAll('.carousel-item'); // all slides
        const slidesField = this[i].querySelector('.carousel-slides');
        let offset = 0;
        let slideIndex = 1;

        // make slides width like a his inner
        slidesField.style.width = width * slides.length + 'px';
        slides.forEach(item => {
            item.style.width = width + 'px';
        });

        // AUTOPLAY
        if (autoplay) {
            let interId;

            const initInterval = () => {
                interId = setInterval(() => {
                    this[i].querySelector('[data-slide="next"]').click();
                }, time);
            };
            initInterval();

            [slidesField, this[i].querySelector('[data-slide="next"]'), this[i].querySelector('[data-slide="prev"]')].forEach(elem => {
                elem.addEventListener('mouseenter', () => {
                    clearInterval(interId);
                });
            });

            [slidesField, this[i].querySelector('[data-slide="next"]'), this[i].querySelector('[data-slide="prev"]')].forEach(elem => {
                elem.addEventListener('mouseleave', () => {
                    initInterval();
                });
            });

        }

        // next arrow
        $(this[i].querySelector('[data-slide="next"]')).on('click', (e) => {
            e.preventDefault();
            if (offset === width * (slides.length - 1)) {
                offset = 0;
                slideIndex = 1;
            } else {
                offset += width;
                slideIndex++;
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            showCurrentDot();
        });

        // prev arrow
        $(this[i].querySelector('[data-slide="prev"]')).on('click', (e) => {
            e.preventDefault();
            if (offset === 0) {
                offset = width * (slides.length - 1);
                slideIndex = slides.length - 1;
            } else {
                offset -= width;
                slideIndex--;
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            showCurrentDot();
        });

        // Dots / Indicators
        let dots = [];

        // add dots to the slider
        for (let j = 0; j < slides.length; j++) {
            const dot = document.createElement('li');
            $(dot).setAtt('data-slide-to', j + 1);

            if (j == 0) {
                $(dot).addClass('active');
            }

            dots.push(dot);
            this[i].querySelector('.carousel-indicators').append(dot);
        }

        // change active dot
        const showCurrentDot = () => {
            dots.forEach(elem => $(elem).removeClass('active'));
            $(dots[slideIndex - 1]).addClass('active');
        };

        // change slides with click on dots
        dots.forEach(dot => {
            $(dot).click((e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = width * (slideTo - 1);
                slidesField.style.transform = `translateX(-${offset}px)`;

                showCurrentDot();
            });
        });
    }
};
// $('.carousel').carousel(true, 1000);