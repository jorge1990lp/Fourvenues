function inicializar() {
    createConsole();

    setTimeout(() => {
        applyBackground();
    }, 1000);

    setTimeout(() => {
        createBox();
    }, 2000);

    setTimeout(() => {
        showMessage();
    }, 3000);

    setTimeout(() => {
        translateMessage('Hello');
    }, 4000);

    setTimeout(() => {
        requestAPI();
    }, 5000);
}

function createConsole() {
    $('.principal').append('<div class="console"><ul class="console-list"></ul></div>');
    $('.console').addClass('absolute top-2 left-2 bg-black text-white p-2 text-xs');
    $('.console-list').append('<li>Montar consola</li>');
}

function applyBackground() {
    $('body').addClass('bg-slate-100');
    $('.console-list').append('<li>Aplicar fondo gris al body</li>');
}

function createBox() {
    $('.principal').append('<div class="box-container"><div class="box"></div></div>');
    $('.box-container').addClass('w-full h-full p-8')
    $('.box').addClass('w-full h-full bg-white rounded-md shadow-md');
    $('.console-list').append('<li>Añadir recuadro blanco en el centro de la pantalla</li>');
}

function showMessage() {
    $('.box').addClass('flex justify-center items-center');
    $('.box').append('<div class="message text-8xl">Hola</div>');
    $('.console-list').append('<li>Mostrar en grande y en el centro del recuadro la palabra "Hola"</li>');
}

function translateMessage(value) {
    $('.message').html(value);
    $('.console-list').append(`<li>Cambiar la palabra de antes por "${value}"</li>`);
}

function requestAPI() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            $('.message').hide();

            const img = data.results[0].picture.large;
            const name = data.results[0].name.first + ' ' + data.results[0].name.last;
            const email = data.results[0].email;

            $('.box').append('<div class="user flex flex-col items-center gap-y-2"></div>');
            $('.user').append(`<img src="${img}" class="rounded-full">`);
            $('.user').append(`<div class="name text-6xl">${name}</div>`);
            $('.user').append(`<a href="mailto:${email}" class="email text-xs">${email}</a>`);
            $('.user').append('<button id="nextBtn" class="bg-teal-200 rounded-md px-3 py-1">Continuar</button>');
            $('.console-list').append('<li>Mostrar información de un usuario.</li>');
        }
    });
}

$(document).on('click', '#nextBtn', function() {
    $('.user').remove();
    $('.message').html('Adiós');
    $('.message').show();
    $('.console-list').append('<li>Cambiar la palabra de antes por "Adiós"</li>');
    setTimeout(() => {
        translateMessage('Bye');
    }, 1000);

    setTimeout(() => {
        $('.message').remove();
        $('.box').append('<button id="reloadBtn" class="bg-teal-200 rounded-md px-3 py-1">Reiniciar</button>');
        $('.console-list').append('<li>Mostrar botón reiniciar</li>');
    }, 2000);
});

$(document).on('click', '#reloadBtn', function() {
    $('body').removeClass('bg-slate-100');
    $('.console').remove();
    $('.box-container').remove();
    inicializar();
});