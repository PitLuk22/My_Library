import $ from '../core';

// Event listeners //

// $('div').on('click', sayHello);
$.prototype.on = function (eventName, callback) {
    if (!eventName || !callback) {
        return this;
    } else {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener(eventName, callback);
        }
    }
    return this;
};

// $('div').off('click', sayHello);
$.prototype.off = function (eventName, callback) {
    if (!eventName || !callback) {
        return this;
    } else {
        for (let i = 0; i < this.length; i++) {
            this[i].removeEventListener(eventName, callback);
        }
    }
    return this;
};

// $('div').click(sayHello);
$.prototype.click = function (callback) {
    for (let i = 0; i < this.length; i++) {
        this[i].addEventListener('click', callback);
    }
    return this;
};