// * Load Scripts
function loadScript(url)
{    
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

// ! It is likely that the reason I wasn't able to access variables 
// ! was becuase the scripts were loaded after this one. This means that 
// ! in events I would be able to use variables from these scripts no problem, because they are already loaded. Simply load those before this one.
// ! Changing appendChild to something else should do the trick.

loadScript('scripts/functions.js');
loadScript('scripts/config.js');

// * Main Code

// * Hide the required elements

const gameMenu = $('.game-menu');

gameMenu.hide();

const timer = $('#timer').hide();

const button = $('.main-menu button');
let usableSquareButtons = [];

let currentLevelAmount;

// * Main Menu
button.click(function (e) { 
    e.preventDefault();
    
    button.off('click');

    $('.main-menu').animate({opacity: 0}, mainMenuFadeTime, function() {

        $('.main-menu').hide();

        gameMenu.fadeIn();
        timer.fadeIn();

        fillMenu(startAmount);
        currentLevelAmount = startAmount;

        // * Start Timer

        let secondsRemaining = timeLimit;

        timer.text(secondsRemaining.toString());

        let timerFunc = setInterval(function() {

            secondsRemaining--;

            if (secondsRemaining !== 0) {
                timer.text(secondsRemaining.toString());
            } else {
                timer.animate({opacity: 0}, buttonFadeTime);
                clearInterval(timerFunc);
                gameplay();
            }

        }, 1000 /* one second */);

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
            const squareObject = {
                squareElement: square,
                number: undefined,
            };
            usableSquareButtons.push(squareObject);
        }


        $('.game-menu').append(square);
    }

    // * shuffle array of usable squares

    shuffle(usableSquareButtons);


    for (let i = 1; i <= level; i++) {
        usableSquareButtons[i - 1].number = i;
        usableSquareButtons[i - 1].squareElement.text(i.toString());
    }
    
}

function gameplay() {

    let correctSquare = 1;

    for (let square of usableSquareButtons) {
        // * Remove text
        square.squareElement.text('');

        // * Enable clicking
        square.squareElement.click(function(e) {
            e.preventDefault();

            if (square.number === correctSquare) {

                // * IF CORRECT:
                square.squareElement.off('click');
                square.squareElement.animate({opacity: 0}, buttonFadeTime);
                correctSquare++;

                if (correctSquare === usableSquareButtons.length + 1) {
                    
                    currentLevelAmount++;
                    gameMenu.animate({opacity: 0}, mainMenuFadeTime, function() {

                        // * This is where we do the resetting. Should work...
                        gameMenu.empty();

                        // * everything should be emptied... does this mean we can just fill it again?
                        usableSquareButtons = [];

                        // * making the timer visible again
                        timer.animate({opacity: 1}, buttonFadeTime);

                        fillMenu(currentLevelAmount);
                        gameMenu.animate({opacity: 1}, mainMenuFadeTime);

                        // ! This is autistic but I'll let it happen for now
                        let secondsRemaining = timeLimit;

                        timer.text(secondsRemaining.toString());

                        let timerFunc = setInterval(function() {

                            secondsRemaining--;

                            if (secondsRemaining !== 0) {
                                timer.text(secondsRemaining.toString());
                            } else {
                                timer.animate({opacity: 0}, buttonFadeTime);
                                clearInterval(timerFunc);
                                gameplay();
                            }

                        }, 1000 /* one second */);

                        // ! Autism ends here
                    });
                }
            } else {

                // ! IF INCORRECT:
                /* * We should probably just disable all inputs and fadeout everything into a new menu. 
                this is probably the best way to do it. We would also need to clear out a lot of data. 
                Namely deleting all grid elements and reseting all global variables. */

                location.reload();
            }
        });
    }
}