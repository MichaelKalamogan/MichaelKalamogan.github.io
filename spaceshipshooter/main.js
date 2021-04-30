window.onload = () => {



    //creating the gaem variables
    var playerLife = 3;
    let enemyMovementSpeed = 1;

    var playerScore = 0;
    let gameWindow = document.getElementById('game-window')
   
    //setting initial position of shooter
    let shooterPlayer = document.getElementById('shooter')
    let shooterPlayerHeight = shooterPlayer.clientHeight;
    

    shooterPlayer.style.top = gameWindow.clientHeight - 50 + 'px'
    let shooterTopPos = parseInt(shooterPlayer.style.top)
  
    shooterPlayer.style.left = (gameWindow.clientWidth)/2 + 'px'
    let shooterLeftPos =  parseInt(shooterPlayer.style.left)

    //Creating arrays to hold the Bullets and Enemies tht will be created
    var bullets = [];
    var enemies = [];

/*---------------------------------------------------------------------------------------------*/
    //Choosing the difficulty
    
    let startButton = document.getElementById('start-game');
    let easyButton = document.getElementById('easy');
    let mediumButton = document.getElementById('medium');
    let hardButton = document.getElementById('hard');
    let score = document.getElementById('score-and-life');

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        easyButton.style.display = 'flex'
        mediumButton.style.display = 'flex'
        hardButton.style.display = 'flex';

    })


    //Starting Game based on difficulty

    easyButton.addEventListener('click', () => {

        easyButton.style.display = 'none';
        mediumButton.style.display = 'none';
        hardButton.style.display = 'none';
        score.style.display = 'flex';

        //starting game
        startGame();
        
    })

    mediumButton.addEventListener('click', () =>{
        easyButton.style.display = 'none'
        mediumButton.style.display = 'none'
        hardButton.style.display = 'none'
        score.style.display = 'flex'

        //changing the enemy's speed
        enemyMovementSpeed = 2;

        //start the game
        startGame();
    })

    hardButton.addEventListener('click', () =>{
        easyButton.style.display = 'none';
        mediumButton.style.display = 'none';
        hardButton.style.display = 'none';
        score.style.display = 'flex';

        //changing the enemy's speed
        enemyMovementSpeed = 3;

        //starting the game
        startGame();
    })


    // Functions to run when game has started

    function startGame() {

        //making everything move once player chooses the level
        let enemyCreation = setInterval(createEnemy, 1500);
        let clearEnemies = setInterval (killEnemy, 200)
                
//        console.log(enemyMove)

        let livesLeft = setInterval ( () => {
            let shooterMove = requestAnimationFrame(move);
            let enemyMove = requestAnimationFrame(moveEnemies)
            let bulletMove = requestAnimationFrame(movebullets);

            if (playerLife <= 0) {
                endGame();
                cancelAnimationFrame(shooterMove);
                cancelAnimationFrame(bulletMove);
                cancelAnimationFrame(enemyMove);

                
               clearInterval(enemyCreation)
                clearInterval(clearEnemies)
                clearInterval(livesLeft)
            }
        },17);
    }



/*---------------------------------------------------------------------------------------------*/
    //Moving the Shooter
    
    let keysPressed = [];

    // listening to the keys being pressed or released
    document.addEventListener("keydown",e => {
        keysPressed[e.key] = true;

    });

    document.addEventListener("keyup", e => {
        keysPressed[e.key] = false;
        if (e.key === " ") {
            shoot()
        } 
    })

    function move () {

        if(keysPressed['ArrowLeft'] && shooterLeftPos >= 0) {
            shooterLeftPos -= 5;    
            shooterPlayer.style.left = shooterLeftPos + 'px';
            
        } else if (keysPressed['ArrowRight'] && (shooterLeftPos + 60 <= gameWindow.clientWidth)) {
            shooterLeftPos += 5;
            shooterPlayer.style.left = shooterLeftPos + 'px';
 
        } 
    }

    


/*---------------------------------------------------------------------------------------------*/
    //Creating the bullets and moving them

    
    
    function shoot() {

            let bullet = document.createElement('div');
            bullet.setAttribute('id', 'bullet');
            
            bullet.style.top = shooterTopPos + 'px';
            bullet.style.left = shooterLeftPos + 20 + 'px';
            let bulletImage = document.createElement('img');
            bulletImage.src = 'bullet.png';
        
            bullet.appendChild(bulletImage);            

            let bulletSound = document.getElementById('bullet-sound')
            bulletSound.play();
           
      
            
            bullets.push(bullet);
            document.getElementById('game-window').append(bullet);
    }

    let movebullets = () => {
        for (let i = 0 ; i < bullets.length; i++ ) {
            if (parseInt(bullets[i].style.top) <= 10) {
                bullets[i].remove();
                bullets.splice(i,1);

            } else {
               bullets[i].style.top = parseInt(bullets[i].style.top) - 2 + 'px';
            }
        }
    }

    

/*---------------------------------------------------------------------------------------------*/

    //Creating the Enemies and moving them

    function createEnemy() {
        let newEnemy =  document.createElement('img');
        newEnemy.setAttribute('src', 'enemy.png');
        newEnemy.setAttribute('class', 'enemy');
       

        //Creating the enemy to appear randomly and ensuring it stays within the window
        newEnemy.style.top = Math.floor(Math.random() * (gameWindow.clientHeight/ 2)) + 'px';
        newEnemy.style.left = setEnemyLeft() + 'px';

        function setEnemyLeft () {

            let position = Math.floor(Math.random() * (gameWindow.clientWidth));
            if (position >= gameWindow.clientWidth) {
                return gameWindow.clientWidth - 60;
            } else {
                return position;
            }
        }
        
        let newEnemyTopPosition = newEnemy.style.top;
        let newEnemyLeftPosition = newEnemy.style.left;


        //Checking if there is already an enemy at the same position 
        // let enemyCheck = true;

        // // if (enemies.length > 1) {
            
        // //     for (let i = 0; i < enemies.length; i++) {

        // //         if (parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) < 50 && parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) >= 0) {
        // //             enemyCheck = false;
                    
        // //         } else if ( parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) > -50 && parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) <= 0) {
        // //             enemyCheck = false;
                    
        // //         } else if ( parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) < 60 && parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) >= 0) {
        // //             enemyCheck = false;
                    
        // //         } else if ( parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) > -60 && parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) <= 0) {
        // //             enemyCheck = false;
                    
        // //         } else {
        // //             enemyCheck = true;
        // //         }
        // //     }   
        // // }

        // if (enemyCheck === true) {
            enemies.push(newEnemy);
            document.getElementById('game-window').append(newEnemy)

        // } else {
        //     newEnemy.remove()
        // }

    }

    //Moving the Enemies and reducing playerLife when enemy escapes
    let moveEnemies = () => {
        //console.log('moving enemies');
        for (let i = 0 ; i < enemies.length; i++ ) {

            if (parseInt(enemies[i].style.top) >= gameWindow.offsetHeight - enemies[i].clientHeight/2) {
                enemies[i].remove();
                enemies.splice(i,1)
                playerLife -= 1;
            
            } else if ( (parseInt(shooterTopPos) - parseInt(enemies[i].style.top)) <= 40 ) {
               
                if ( (parseInt(enemies[i].style.left) - parseInt(shooterLeftPos)) <= 60  && 
                    (parseInt(enemies[i].style.left) - parseInt(shooterLeftPos))  >= -60 ) {
                    enemies[i].remove();
                    enemies.splice(i,1);
                    playerLife -= 1;
                    shooterPlayer.style.top = gameWindow.clientHeight - 50 + 'px'
                    shooterPlayer.style.left = (gameWindow.clientWidth)/2 + 'px'

                } else {
                    enemies[i].style.top = parseInt(enemies[i].style.top) + enemyMovementSpeed + 'px';
                }
            } else {
                enemies[i].style.top = parseInt(enemies[i].style.top) + enemyMovementSpeed + 'px';
            }

        }    
    }
/*---------------------------------------------------------------------------------------------*/

    //function to remove the bullet and enemy

    function killEnemy () {
        for(let i = 0; i < enemies.length; i++) {
            for(let j = 0; j < bullets.length; j++) {

                if((parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left)) <= 60 &&
                    parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left) >= -20) {

                    if(parseInt(enemies[i].style.top) - parseInt(bullets[j].style.top) >= -50 ){
                        
                        let enemyKilledSound = document.getElementById('enemy-killed');
                        enemyKilledSound.play();

                        enemies[i].remove();
                        bullets[j].remove();
                        enemies.splice(i,1);
                        bullets.splice(j,1);
                        playerScore += 1;
                        
                        document.getElementById('score').innerHTML = playerScore;
                    }
                }
            }
        }
    }



/*---------------------------------------------------------------------------------------------*/
    //Game end Criteria

    function endGame() {

            let notification = document.createElement('p');
            notification.innerText = 'Game Over';
            document.getElementById('ending-msg').prepend(notification);
            document.getElementById('ending-msg').style.display = 'flex';
            document.getElementById('ending-msg').style.flexDirection = 'column';
    }
    
    // To reset Game
    let reset = document.getElementById('reset-btn');

    reset.addEventListener('click', () => {

        let endingMsg = document.querySelector('#ending-msg');
        endingMsg.querySelector('p').remove();
        endingMsg.style.display = 'none';

        // Amending to look like at the start
        let bulletsLeft = document.querySelectorAll('.bullet');
        bulletsLeft.forEach( e => e.remove());

        let enemiesLeft = document.querySelectorAll('.enemy');
        enemiesLeft.forEach( e => e.remove());

        startButton.style.display = 'flex';
        score.style.display = 'none';
        playerLife = 3;
        enemyMovementSpeed = 1;
        bullets = [];
        enemies = [];
        shooterPlayer.style.top = gameWindow.clientHeight - 50 + 'px';
        shooterPlayer.style.left = (gameWindow.clientWidth)/2 + 'px';


    })

}




// Things to work on
// Image for the Enemies when shot
// Game end Criteria -- music when died
// music and health for when enemy hits player
// making sure enemy doesnt create at same positions. maybe use class with X and y to create enemy or array.