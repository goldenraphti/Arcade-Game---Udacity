// class character, which we will use to create subclasses Enemy and Player
class Character {
    
    constructor() {
        
        this.height = 171 / 2 ;
        this.width = 101 / 2;
    }
    
} 

// Enemies our player must avoid
class Enemy extends Character {
    constructor( randomHeight = 2 , randomSpeed = 5, width, height) {
        super(width, height);
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        
        // sets the initial location of the enemy
        // should be out from screen on the left side, but randomly row 1,2 or 3
        
        this.caseRow = 3;
        this.y = ( this.caseRow * this.height ) - ( this.height / 3 );
        
        // initial col = -1, so not visible, but just before entering the screen
        this.caseCol = 0;
        this.x = ( (this.caseCol * 2 - 1 ) * this.width ) + ( this.width);
        
        // sets the speed of the enemy
        // can add some randomness in their speed
        this.speed = randomSpeed ;
        
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        
        
        // Updates the Enemy location
        
        
        // Handles collision with the Player 
        
    }
    
    
    
    
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
};


Enemy.prototype.update = function(dt) {
    
};




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

    update() {
        // Updates the Enemy location
        
        // Handles collision with the Player 
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(move) {
        console.log(`${move} is pressed`)
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
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let enemy1 = new Enemy();

const allEnemies = [enemy1];

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
