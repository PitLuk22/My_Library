import $ from '../core';

$.prototype.accordion = function (headActive = 'accordion-head__active', contentActive = 'accordion-content__active', padding = 40) {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).on('click', () => {
            $(this[i]).toggleClass(headActive);
            $(this[i].nextElementSibling).toggleClass(contentActive);

            if (this[i].classList.contains(headActive)) {
                this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + padding + 'px';
            } else {
                this[i].nextElementSibling.style.maxHeight = '0px';
            }
        });
    }
};

$('[data-accordion] .accordion-head').accordion();