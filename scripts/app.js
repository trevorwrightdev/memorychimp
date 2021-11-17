const gameMenu = $('.game-menu');

gameMenu.hide();

const button = $('.main-menu button');

button.click(function (e) { 
    e.preventDefault();
    
    button.off('click');

    $('.main-menu').animate({opacity: 0}, 500, function() {

        $('.main-menu').hide();

        gameMenu.fadeIn();

        fillMenu(4);


    });

});

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

    const usableSquareButtons = [];

    for (let i = 1; i <= 30; i++) {
        const square = $(`<button class="item item-${i}"></button>`);
        
        // I should decrease the opacity of the squares rather than hide them. Also make them impossible to click on.

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










function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }