import $ from '../core';

$.prototype.animationOverTime = function (duration, callback, final) {
    let startTime;

    function _animationOverTime(time) {
        if (!startTime) {
            startTime = time;
        }

        let progress = time - startTime; // animation run time
        let complection = Math.min(progress / duration, 1); // change opacity

        callback(complection);

        if (progress < duration) {
            requestAnimationFrame(_animationOverTime);
        } else {
            if (typeof final === 'function') {
                final();
            }
        }
    }

    return _animationOverTime;
};

// fadeIn (passing duration in ms)
$.prototype.fadeIn = function (duration, display, fin) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = display || 'block';

        const _fadeIn = (complection) => {
            this[i].style.opacity = complection;
        };

        const animate = this.animationOverTime(duration, _fadeIn, fin);
        requestAnimationFrame(animate);
    }

    return this;
};

// fadeOut (passing duration in ms)
$.prototype.fadeOut = function (duration, fin) {
    for (let i = 0; i < this.length; i++) {

        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection;
            if (complection == 1) {
                this[i].style.display = 'none';
            }
        };

        const animate = this.animationOverTime(duration, _fadeOut, fin);
        requestAnimationFrame(animate);
    }

    return this;
};

//fadeToggle (passing duration in ms)
$.prototype.fadeToggle = function (duration, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            this[i].style.display = display || 'block';

            const _fadeIn = (complection) => {
                this[i].style.opacity = complection;
            };

            const animate = this.animationOverTime(duration, _fadeIn, fin);
            requestAnimationFrame(animate);
        } else {

            const _fadeOut = (complection) => {
                this[i].style.opacity = 1 - complection;
                if (complection == 1) {
                    this[i].style.display = 'none';
                }
            };

            const animate = this.animationOverTime(duration, _fadeOut, fin);
            requestAnimationFrame(animate);
        }

    }
    return this;
};