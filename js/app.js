// class character, which we will use to create subclasses Enemy and Player
class Character {
    
    constructor() {
        
        this.height = 171 / 2 ;
        this.width = 101 / 2;
    }
    
}

// for now, decide that level of the game is "beginner", but can later implement possibility to decide level, or to increase the level progressively when player keeps winning
gameLevel = 'beginner';



// Enemies our player must avoid
class Enemy extends Character {
    constructor( randomHeight = 2 , randomSpeed = 30, width, height) {
        super(width, height);
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
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
        
        
        // Handles collision with the Player
        function checkCollision(enemyXPosition , enemyCaseRow) {
            if ( Math.abs(player.x - enemyXPosition) < 101  && player.caseRow === enemyCaseRow  ) {
                
                // stops movements of the game
                Enemy.prototype.update = function () {
                    this.x = this.x;
                }
                
                // stops creating new Enemies
                window.clearInterval(timeoutID);
                
                // stops the player from moving
                playerActive = false;
                
                // display message 'you died'
                document.getElementById('message-box').setAttribute('style','display : block');
                
                // resets the game to its initial state
                let timeoutReset;

                function delayedReset() {
                  timeoutID = window.setTimeout(reset, 2000);
                }
                delayedReset();
            }
        }
        checkCollision(this.x , this.caseRow);

        
    }
    
    
    
    
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
};

// variable displaying if player should be able to play or not (true when game is on, false when died or has not started yet)
let playerActive = true;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Character {
    
    constructor( charHero = 'boy', width, height) {
        super(width, height)
        
        // this provides the adequate image. If none has been selected beforehand using the charHero variable
        if (charHero === 'boy') {
            this.sprite = 'images/char-boy.png';
        } else if  (charHero === 'princess') {
            this.sprite = 'images/char-princess-girl.png';
        } else if (charHero === 'pink-girl') {
            this.sprite = 'images/char-pink-girl.png';
        } else if  (charHero === 'cat-girl') {
            this.sprite = 'images/char-cat-girl.png';
        } else if  (charHero === 'horn-girl') {
            this.sprite = 'images/char-horn-girl.png';
        }
        
        // sets the initial location of the player, bottom center
        this.caseRow = 5;
        this.y = ( this.caseRow * this.height ) - ( this.height / 2 );
        this.caseCol = 2;
        this.x = ( (this.caseCol * 2 - 1 ) * this.width ) + ( this.width);
        
    }
    
    update(dt) {
        
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(move) {
        
        if (playerActive) {
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
};

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
     
     let enemy =  Symbol('enemy');
     enemy = new Enemy(randomeHeight , randomSpeed);
     return enemy
 }

function addEnemies() {
    enemyToAdd = createEnemy()
    allEnemies.push(enemyToAdd);
}

// intervals of enemy creation
let timeoutID;

// function creating enemies automatically
function enemyAutomaticCreation () {

    function enemyCreation() {
        
    
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
    
   enemyCreation();
}
// call the function right away
enemyAutomaticCreation ()

// function deleting any enemy out of the screen, to empty the allEnemy array from its useless elements
function automaticDeletionOfEnemiesOutFromtScreen() {

    let i = allEnemies.length
    while (i--) {
        if (allEnemies[i].x > 505) {
            console.log('clean bug');
            allEnemies.splice(i,1);
        }
    }
    
}
// calls the automatic cleaning of the allEnemies array every  seconds
window.setInterval(automaticDeletionOfEnemiesOutFromtScreen,100);


// function reseting the game to its initial state, and displaying a message
function reset() {
    // reset game to initial state
    allEnemies.length = 0;
    
    // sets the initial location of the player, bottom center
    player.caseRow = 5;
    player.y = ( player.caseRow * player.height ) - ( player.height / 2 );
    player.caseCol = 2;
    player.x = ( (player.caseCol * 2 - 1 ) * player.width ) + ( player.width);
    playerActive = true;
    
    //restart the automatic creation of enemies
    enemyAutomaticCreation()
    
    
    // hide any eventual message displayed above the game
    document.getElementById('message-box').setAttribute('style','display : none');
    
}

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
});
