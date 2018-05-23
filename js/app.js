/*jshint esversion: 6 */

// Whole-script strict mode syntax
"use strict";

// class character, which we will use to create subclasses Enemy and Player
class Character {

    constructor() {

        this.height = 171 / 2 ;
        this.width = 101 / 2;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {

    }

}

// for now, decide that level of the game is "beginner", but can later implement possibility to decide level, or to increase the level progressively when player keeps winning
let gameLevel = 'beginner';

// Enemies our player must avoid
class Enemy extends Character {
    constructor( randomHeight = 2 , randomSpeed = 30,  width, height) {
        super(width, height);
        this.sprite = 'images/enemy-bug.png';

        // sets the initial location of the enemy
        // should be out from screen on the left side, but randomly row 1,2 or 3
        this.caseRow = randomHeight;
        this.y = ( this.caseRow * this.height ) - ( this.height / 3 );

        // initial col = -1, so not visible, but just before entering the screen
        this.caseCol = -1;
        this.x = ( (this.caseCol * 2 - 1 ) * this.width ) + ( this.width);

        if ( gameLevel === 'beginner') {
            this.speedLevel = 30 ;
        } else if ( gameLevel === 'intermediate') {
            this.speedLevel = 50 ;
        } else if ( gameLevel === 'expert') {
            this.speedLevel = 70 ;
        }

        // sets the speed of the enemy
        // can add some randomness in their speed
        // randomSpeed should be between 1 and 10 max
        this.speed = randomSpeed * this.speedLevel;

    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        // Updates the Enemy location
        this.x += this.speed * dt ;
    }

    // Handles collision with the Player
     checkCollision() {
            if ( Math.abs(player.x - this.x) < 101  && player.caseRow === this.caseRow  ) {

                // stops the player from moving
                player.playerActive = false;

                // display message 'you died'
                document.getElementById('fail-message-box').setAttribute('style','display : block');

                // sets the initial location of the player, bottom center
                player.caseRow = 5;
                player.y = ( player.caseRow * player.height ) - ( player.height / 2 );
                player.caseCol = 2;
                player.x = ( (player.caseCol * 2 - 1 ) * player.width ) + ( player.width);

                player.delayedReset();
            }
        }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character {

    constructor(width, height, charHero = 'boy') {
        super(width, height);

        // this provides the adequate image. If none has been selected beforehand using the charHero variable
        this.sprite = `images/char-${charHero}.png`;

        // variable displaying if player should be able to play or not (true when game is on, false when died or has not started yet)
        this.playerActive = true;

        // sets the initial location of the player, bottom center
        this.caseRow = 5;
        this.y = ( this.caseRow * this.height ) - ( this.height / 2 );
        this.caseCol = 2;
        this.x = ( (this.caseCol * 2 - 1 ) * this.width ) + ( this.width);

    }

    handleInput(move) {

        if (this.playerActive) {
            if (move === 'left' && this.caseCol !== 0) {
                this.caseCol--;
            } else if (move === 'right' && this.caseCol !== 4) {
                this.caseCol++;
            } else if (move === 'up' && this.caseRow !== 0) {
                this.caseRow--;
            } else if (move === 'down' && this.caseRow !== 5) {
                this.caseRow++;
            }

            this.y = ( this.caseRow * this.height ) - ( this.height / 2 );
            this.x = ( (this.caseCol * 2 - 1 ) * this.width ) + ( this.width);
        }
    }

    // function reseting the game to its initial state, and displaying a message
    intermediateReset() {

        // allow the player to move again
        player.playerActive = true;

        // hide any eventual message displayed above the game
        document.getElementById('fail-message-box').setAttribute('style','display : none');

    }

    delayedReset() {
      timeoutID = window.setTimeout(player.intermediateReset, 2000);
    }

    checkVictory() {
            if ( this.caseRow === 0  ) {

                // display message 'you died'
                document.getElementById('victory-message-box').setAttribute('style','display : block');

                // stops player from moving
                this.playerActive = false;
            }
    }
}

// function creating nombres entiers
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


const allEnemies = [];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
 function createEnemy () {

     let randomSpeed = getRandomInt(10) + 1;

     let randomeHeight = getRandomInt(3) + 1 ;

     let enemy = new Enemy(randomeHeight , randomSpeed);
     return enemy;
 }

function addEnemies() {
    const enemyToAdd = createEnemy();
    allEnemies.push(enemyToAdd);
}

// intervals of enemy creation
let timeoutID;

// function creating enemies automatically
function enemyAutomaticCreation () {


        function getRandomTimeArbitrary(min, max) {
          return Math.random() * (max - min) + min;
        }

        let randomTimeSetout;

        if ( gameLevel === 'beginner') {
                randomTimeSetout = getRandomTimeArbitrary(1000, 2000) ;
            } else if ( gameLevel === 'intermediate') {
                randomTimeSetout = getRandomTimeArbitrary(700, 2000)  ;
            } else if ( gameLevel === 'expert') {
                randomTimeSetout = getRandomTimeArbitrary(300, 1500)  ;
            }

        timeoutID = window.setInterval(addEnemies, randomTimeSetout);
}
// call the function right away
enemyAutomaticCreation ();

// function deleting any enemy out of the screen, to empty the allEnemy array from its useless elements
function automaticDeletionOfEnemiesOutFromtScreen() {

    let i = allEnemies.length;
    while (i--) {
        if (allEnemies[i].x > 505) {
            console.log('clean bug');
            allEnemies.splice(i,1);
        }
    }

}

// calls the automatic cleaning of the allEnemies array every  seconds
window.setInterval(automaticDeletionOfEnemiesOutFromtScreen,100);

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

    player.checkVictory();
});
