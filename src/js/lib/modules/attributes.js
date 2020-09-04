import $ from '../core';

// Work with attributes //

// $('div').setAtt('data-text', 'true');
$.prototype.setAtt = function (name, value) {
    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(name, value);
    }
    return this;
};

// $('div').removeAtt('data-text');
$.prototype.removeAtt = function (name) {
    for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute(name);
    }
    return this;
};

// $('div').toggleAtt('data-text');
$.prototype.toggleAtt = function (name) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].getAttribute(name)) {
            this[i].removeAttribute(name);
        } else {
            this[i].setAttribute(name, '');
        }
    }
    return this;
};