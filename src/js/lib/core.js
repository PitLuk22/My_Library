const $ = function (selector) {
    return new $.prototype.init(selector);
};

$.prototype.init = function (selector) {
    if (!selector) {
        return this;
    }

    if (selector.tagName) {
        this[0] = selector;
        this.length = 1;
        return this;
    }

    Object.assign(this, document.querySelectorAll(selector));
    this.length = document.querySelectorAll(selector).length;

    return this;
};

$.prototype.init.prototype = $.prototype;

// Write in the object WINDOW
window.$ = $;

export default $;






// Simple version :)

// (() => {
//     const $ = (selector) => {
//         const elements = document.querySelectorAll(selector);

//         const obj = {};

//         obj.hide = () => {
//             elements.forEach(elem => {
//                 elem.style.display = 'none';
//             });
//             return obj;
//         };
//         obj.show = () => {
//             elements.forEach(elem => {
//                 elem.style.display = '';
//             });
//             return obj;
//         };
//         return obj;
//     };

//     // Write in the object WINDOW
//     window.$ = $;

// })();