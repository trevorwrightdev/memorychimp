const gameMenu = $('.grid-container');

gameMenu.remove();

const button = $('button');

button.click(function (e) { 
    e.preventDefault();
    
    $('.main-menu').fadeOut();

    button.off('click');

});

