import $ from '../core';

// Work with elements //

// Usual InnerHTML :)
$.prototype.html = function (content) {
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }
    return this;
};

// Find element by index for future work with him
$.prototype.eq = function (i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;

    for (let i = 0; i < objLength; i++) {
        // we need to save the object 'this', because in the future we will need to use this method with other methods ours 'this' object  
        delete this[i]; // delete only elements but not a methods 
    }

    this[0] = swap;
    this.length = 1;

    return this;
};

// Get index the sought element
$.prototype.index = function () {
    const parent = this[0].parentElement;
    const children = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    };

    return children.findIndex(findMyIndex);
};

// Find all children of parent element by selector
$.prototype.find = function (selector) {
    let numberOfItems = 0;
    let counter = 0;

    // это копия объекта, то есть здесь хранятся элементы или 1 элемент, который мы заключили в скобки $('selector')
    let copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++) {
        let arr = copyObj[i].querySelectorAll(selector);
        if (arr.length == 0) {
            continue;
        }

        for (let j = 0; j < arr.length; j++) {
            this[counter] = arr[j];
            counter++;
        }
        numberOfItems += arr.length;
    }

    this.length = numberOfItems;

    // Находим длинну обекта через его ключи, затем удаляем все элеметы у объекта, которые находятся ниже значения NumberOfItems;
    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};

// Find closest parent element 
$.prototype.closest = function (selector) {
    let counter = 0;

    for (let i = 0; i < this.length; i++) {
        if (this[i].closest(selector) === null) {
            return this;
        } else {
            this[i] = this[i].closest(selector);
        }
        counter++;
    }

    const objLength = Object.keys(this).length;
    for (; counter < objLength; counter++) {
        delete this[counter];
    }

    return this;

};

// Find sibling elements
$.prototype.sibling = function () {
    let numberOfItems;
    let counter = 0;

    const copy = Object.assign({}, this);

    for (let i = 0; i < copy.length; i++) {
        let arr = copy[i].parentElement.children;

        for (let j = 0; j < arr.length; j++) {
            if (copy[i] === arr[j]) {
                continue;
            }

            this[counter] = arr[j];
            counter++;
        }
        numberOfItems = arr.length - 1;
    }

    this.length = numberOfItems;

    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};

// remove element
$.prototype.remove = function () {
    for (let i = 0; i < this.length; i++) {
        this[i].remove();
    }
    return this;
};