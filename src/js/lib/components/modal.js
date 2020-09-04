import $ from '../core';

$.prototype.modal = function (created) {
    const scroll = calcScroll();

    for (let i = 0; i < this.length; i++) {
        const target = this[i].getAttribute('data-target'); // modal window
        $(this[i]).click((event) => {
            event.preventDefault();
            $(`#${target}`).fadeIn(400);
            setTimeout(() => document.querySelector(`#${target}`).style.marginRight = `${scroll}px`, 10);
            document.body.style.overflow = 'hidden'; // cancel scroll
        });

        const closeElems = document.querySelectorAll(`#${target} [data-close]`);
        closeElems.forEach(elem => {
            $(elem).click(() => {
                $(`#${target}`).fadeOut(100);
                elem.closest('.modal').style.marginRight = `0`;
                document.body.style.overflow = '';
                if (created) {
                    $(`#${target}`).remove();
                }
            });
        });

        $(`#${target}`).click((e) => {
            if (e.target.classList.contains('modal')) {
                $(`#${target}`).fadeOut(100);
                document.querySelector('.modal').closest('.modal').style.marginRight = `0`;
                document.body.style.overflow = '';
                if (created) {
                    $(`#${target}`).remove();
                }
            }
        });

    }


    // Calculating browser scroll width
    function calcScroll() {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);
        const scroll = div.offsetWidth - div.clientWidth;
        div.remove();

        return scroll;
    }
};

$('[data-toggle="modal"]').modal(); // button


// Automatic modal creation 
$.prototype.createModal = function ({
    text,
    btns
} = {}) {
    for (let i = 0; i < this.length; i++) {
        const modal = document.createElement('div');
        modal.setAttribute('id', this[i].getAttribute('data-target'));
        modal.classList.add('modal');

        // text: { title: 'some', body: 'enother text'}
        // btns: {count: num, settings: [ [text, classNames =[], close, callback] ]}

        let buttons = [];
        for (let j = 0; j < btns.count; j++) {

            let [text, classNames, close, callback] = btns.settings[j]; // destructuring

            const btn = document.createElement('button');
            btn.textContent = text;
            btn.classList.add('btn', ...classNames);
            if (close) {
                btn.setAttribute('data-close', 'true');
            }
            if (callback && typeof (callback) === 'function') {
                btn.addEventListener('click', callback);
            }
            buttons.push(btn);
        }

        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <button class="close" data-close>&times;</button>
                    <div class="modal-header">
                        ${text.title}
                    </div>
                    <div class="modal-body">
                        ${text.body}
                    </div>
                    <div class="modal-footer">
                        
                    </div>
                </div>
            </div>
        `;

        modal.querySelector('.modal-footer').append(...buttons);
        document.body.appendChild(modal);
        $(this[i]).modal(true);
        $(`#${this[i].getAttribute('data-target')}`).fadeIn(400); // find modal and show it
    }
};

// Initialization modal window

// $("#trigger").click(() => $('#trigger').createModal({
//     text: {
//         title: 'Modal title #8848',
//         body: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi accusamus
//         rem natus voluptatum nam iusto modi ratione!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi accusamus,
//         rem natus voluptatum nam iusto modi ratione!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi accusamus,
//         rem natus voluptatum nam iusto modi ratione!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi accusamus,
//         rem natus voluptatum nam iusto modi ratione!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi accusamus,
//         rem natus voluptatum nam iusto modi ratione!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi accusamus,
//         rem natus voluptatum nam iusto modi ratione!`
//     },
//     btns: {
//         count: 3,
//         settings: [
//             ['Close', ['btn-danger', 'mr-10'], true],
//             ['Save changes', ['btn-success', 'mr-10'], false, () => alert('Your settings have been saved')],
//             ['Additional information', ['btn-warning'], false, () => alert('We have lied! Sorry! :)')]
//         ]
//     }
// }));