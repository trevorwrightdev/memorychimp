// * Load Scripts
function loadScript(url)
{    
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

loadScript('scripts/functions.js');

// * Main Code

const gameMenu = $('.game-menu');

gameMenu.hide();

const button = $('.main-menu button');
const usableSquareButtons = [];

// * Main Menu
button.click(function (e) { 
    e.preventDefault();
    
    button.off('click');

    $('.main-menu').animate({opacity: 0}, 500, function() {

        $('.main-menu').hide();

        gameMenu.fadeIn();

        fillMenu(4);
        enableButtons();

    });

});

// * Game Setup
function fillMenu(level) {

    const usableSquareNumbers = [];

    for (let i = 0; i < level; i++) {

        while (usableSquareNumbers.length !== level) {

            // * Here is a place where we would need to change values if we change the size of the grid.

            let randomNumber = Math.floor(Math.random() * (30 - 1) + 1);

            if (usableSquareNumbers.includes(randomNumber) === false) {
                usableSquareNumbers.push(randomNumber);
            }

        }

    }

    for (let i = 1; i <= 30; i++) {
        const square = $(`<button class="item item-${i}"></button>`);

        if (usableSquareNumbers.includes(i) === false) {
            square.css('opacity', 0);
        } 
        else {
            usableSquareButtons.push(square);
        }


        $('.game-menu').append(square);
    }

    // * shuffle array of usable squares

    shuffle(usableSquareButtons);

    for (let i = 1; i <= level; i++) {
        usableSquareButtons[i - 1].text(i.toString());
    }
    
}

function enableButtons() {
    for (let button of usableSquareButtons) {

        button.click(function(e) {

            

        });


    }
}