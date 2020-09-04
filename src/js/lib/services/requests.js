import $ from '../core';

// GET $().get('url...');
$.prototype.get = async function (url, dataTypeAnswer = 'json') {
    let res = await fetch(url);

    if (!res.ok) {
        throw Error('Sorry but something went wrong!');
    }

    switch (dataTypeAnswer) {
        case 'text':
            return await res.text();
        case 'json':
            return await res.json();
        case 'blob':
            return await res.blob();
    }
};

// POST $().post('url...');
$.prototype.post = async function (url, data, dataTypeAnswer = 'json') {
    let res = await fetch(url, {
        method: 'POST',
        body: data
    });

    if (!res.ok) {
        throw Error('Sorry but something went wrong!');
    }

    switch (dataTypeAnswer) {
        case 'text':
            return await res.text();
        case 'json':
            return await res.json();
        case 'blob':
            return await res.blob();
    }
};