window.onload = () => {



    //creating the game variables
    var playerLife = 3;
    let enemyMovementSpeed = 2;

    var playerScore = 0;
    let playerPointToAdd = 1;
    let gameWindow = document.getElementById('game-window')
    let hiScoreArray = [];
   
    //setting initial position of shooter
    let shooterPlayer = document.getElementById('shooter')

    shooterPlayer.style.top = gameWindow.clientHeight - 50 + 'px'
    let shooterTopPos = parseInt(shooterPlayer.style.top)
  
    shooterPlayer.style.left = (gameWindow.clientWidth)/2 -30 + 'px'
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
    let scoreAndLife = document.getElementById('score-and-life');

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
        scoreAndLife.style.display = 'flex';

        //starting game
        startGame();
        
    })

    mediumButton.addEventListener('click', () =>{
        easyButton.style.display = 'none'
        mediumButton.style.display = 'none'
        hardButton.style.display = 'none'
        scoreAndLife.style.display = 'flex'

        //changing the enemy's speed
        enemyMovementSpeed = 3;
        playerPointToAdd = 2;

        //start the game
        startGame();
    })

    hardButton.addEventListener('click', () =>{
        easyButton.style.display = 'none';
        mediumButton.style.display = 'none';
        hardButton.style.display = 'none';
        scoreAndLife.style.display = 'flex';

        //changing the enemy's speed
        enemyMovementSpeed = 4;
        playerPointToAdd = 3;

        //starting the game
        startGame();
    })


    // Functions to run when game has started

    function startGame() {

        //making everything move once player chooses the level
        let enemyCreation = setInterval(createEnemy, 1500);
        let clearEnemies = setInterval(killEnemy, 200)
        shooterPlayer.style.top = gameWindow.clientHeight - 50 + 'px';
        shooterPlayer.style.left = (gameWindow.clientWidth)/2 -30 + 'px';

        let livesLeft = setInterval ( () => {
            let shooterMove = requestAnimationFrame(move);
            let enemyMove = requestAnimationFrame(moveEnemies)
            let bulletMove = requestAnimationFrame(movebullets);

            if (playerLife <= 0) {
                endGame();
                document.getElementById('game-over').play();
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
            bullet.setAttribute('class', 'bullet');
            
            bullet.style.top = shooterTopPos + 'px';
            bullet.style.left = shooterLeftPos + 20 + 'px';
            let bulletImage = document.createElement('img');
            bulletImage.src = 'images/bullet.png';
        
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
               bullets[i].style.top = parseInt(bullets[i].style.top) - 5 + 'px';
            }
        }
    }

    

/*---------------------------------------------------------------------------------------------*/

    //Creating the Enemies and moving them

    function createEnemy() {
        let newEnemy =  document.createElement('img');
        newEnemy.setAttribute('src', 'images/enemy.png');
        newEnemy.setAttribute('class', 'enemy');
       

        //Creating the enemy to appear randomly and ensuring it stays within the window
        newEnemy.style.top = 10 + 'px';
        newEnemy.style.left = Math.random() * (0.6*gameWindow.clientWidth) + 200 + 'px';

        let newEnemyTopPosition = newEnemy.style.top;
        let newEnemyLeftPosition = newEnemy.style.left;


        //Checking if there is already an enemy at the same position 
        let enemyCheck = true;

        if (enemies.length > 1) {
            
            for (let i = 0; i < enemies.length; i++) {
                    
                if ( parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) < 60 && parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) >= 0) {
                    enemyCheck = false;
                    
                } else if ( parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) > -60 && parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) <= 0) {
                    enemyCheck = false;
                    
                } else {
                    enemyCheck = true;
                }
            }   
        }

        if (enemyCheck === true) {
            enemies.push(newEnemy);
            document.getElementById('game-window').append(newEnemy)

        } else {
            newEnemy.remove()
        }


        //levelling Up
        let levelUp = document.getElementById ('level-up')

        if (playerScore > 0 && playerScore % 18 === 0) {


            playerPointToAdd += 1;
            levelUp.style.display = 'block';
            fadeout();
            document.getElementById('power-up').play();

            function fadeout() {
                 
                var fadeOut = setInterval(function () {
                      
                    if (!levelUp.style.opacity) {
                        levelUp.style.opacity = 1;
                    }
                      
                      
                    if (levelUp.style.opacity > 0) {
                        levelUp.style.opacity -= 0.1;
                    } 
                      
                    else {
                        clearInterval(fadeOut);
                    }
                      
                }, 500);
            }

            setTimeout( function () {
                enemyMovementSpeed +=1
                levelUp.style.display = 'none';
                levelUp.style.opacity = 1;
                
            }, 3000);
        }

    }



    //Moving the Enemies and reducing playerLife when enemy escapes
    let moveEnemies = () => {
        //console.log('moving enemies');
        for (let i = 0 ; i < enemies.length; i++ ) {

            if (parseInt(enemies[i].style.top) >= gameWindow.offsetHeight - enemies[i].clientHeight/2) {
                enemies[i].remove();
                enemies.splice(i,1)
                playerLife -= 1;

                document.querySelector('.life').remove();
            
            } else if ( (parseInt(shooterTopPos) - parseInt(enemies[i].style.top)) <= 40 ) {
               
                if ( (parseInt(enemies[i].style.left) - parseInt(shooterLeftPos)) <= 60  && 
                    (parseInt(enemies[i].style.left) - parseInt(shooterLeftPos))  >= -60 ) {
                    enemies[i].remove();
                    enemies.splice(i,1);
                    playerLife -= 1;
                    document.querySelector('.life').remove();

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

                if((parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left)) <= 20 &&
                    parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left) >= -60) {

                    if(parseInt(enemies[i].style.top) - parseInt(bullets[j].style.top) >= -50 ){
                        
                        let enemyKilledSound = document.getElementById('enemy-killed');
                        enemyKilledSound.play();

                        enemies[i].remove();
                        bullets[j].remove();
                        enemies.splice(i,1);
                        bullets.splice(j,1);

                        //so that the value changes according to difficulty
                        playerScore += playerPointToAdd;
                        
                        document.getElementById('score').innerHTML = playerScore;
                    }
                }
            }
        }
    }



/*---------------------------------------------------------------------------------------------*/
    //Game end Criteria

        function endGame() {

            document.getElementById('ending-msg').style.display = 'flex';
            document.getElementById('ending-msg').style.flexDirection = 'column';
            
            
            if(localStorage.length < 10) {
                document.getElementById('score-storage').style.display = 'flex';

                let submitButton = document.getElementById('submit-btn');
                
                submitButton.onclick = function () {

                    let playerName = document.getElementById('player-name').value;
                    localStorage.setItem(playerName, playerScore)
            
                    for(let i = 0; i < localStorage.length; i++) {
                        let legend = localStorage.key(i)
                        let legendScore = parseInt(localStorage.getItem(localStorage.key(i)))
            
                        hiScoreArray.push({Name: legend, Score: legendScore });
                    }
            
                    // show the hi score table once name has been submitted
                    showHiScoreArray();
            
                    //show hall of fame
                    document.getElementById('hall-of-fame').style.display = 'flex'; 
                    document.getElementById('score-storage').style.display = 'none';
                }

            } else {

                for(let i = 0; i < localStorage.length; i++) {
                    let legend = localStorage.key(i)
                    let legendScore = parseInt(localStorage.getItem(localStorage.key(i)))
        
                    hiScoreArray.push({Name: legend, Score: legendScore });
                }

                hiScoreArray.sort( (a,b) => {
                    return b.Score - a.Score
                })

                if(playerScore > hiScoreArray[9].Score) {

                    // Getting the new Hi- Scorer's name
                    document.getElementById('score-storage').style.display = 'flex';

                    let submitButton = document.getElementById('submit-btn');
                
                    submitButton.onclick = function () {

                        let playerName = document.getElementById('player-name').value;
                        localStorage.setItem(playerName, playerScore);

                        hiScoreArray = [];

                        for(let i = 0; i < localStorage.length; i++) {
                            let legend = localStorage.key(i)
                            let legendScore = parseInt(localStorage.getItem(localStorage.key(i)))
                
                            hiScoreArray.push({Name: legend, Score: legendScore });
                        }
                
                        // show the hi score table once name has been submitted
                        showHiScoreArray();
                
                        //show hall of fame
                        document.getElementById('hall-of-fame').style.display = 'flex';
                        document.getElementById('score-storage').style.display = 'none';
                    } 

                } else {

                    hiScoreArray = [];

                    for(let i = 0; i < localStorage.length; i++) {
                        let legend = localStorage.key(i)
                        let legendScore = parseInt(localStorage.getItem(localStorage.key(i)))
            
                        hiScoreArray.push({Name: legend, Score: legendScore });
                    }
            
                    // show the hi score table once name has been submitted
                    showHiScoreArray();
            
                    //show hall of fame
                    document.getElementById('hall-of-fame').style.display = 'flex';
                }
            }        
        }


    //sort the Hi-Score array according to score and displaying the array
    function showHiScoreArray() {

        hiScoreArray.sort( (a,b) => {
            return parseInt(b.Score) - parseInt(a.Score)
        })

        for (let j = 0; j < 10; j++) {
            if (hiScoreArray[j] !== null) {
                let newList = document.createElement('li')
                newList.innerText = `${hiScoreArray[j].Name} : ${hiScoreArray[j].Score}`;
    
                document.getElementById('score-table').append(newList);
            }

        }
    }


    // To reset Game
    let reset = document.getElementById('reset-btn');

    reset.addEventListener('click', () => {

        let endingMsg = document.querySelector('#ending-msg');
        endingMsg.style.display = 'none';
        document.getElementById('score-storage').style.display = 'none';
        document.getElementById('hall-of-fame').style.display ='none';

        //removing the residual bullets
        let allBullets = document.querySelectorAll('.bullet');
        for (let i = 0; i < allBullets.length; i++) {
            allBullets[i].remove();
        }
        
        //removing the residual enemies
        let allEnemies = document.querySelectorAll('.enemy');
        for (let i = 0; i < allEnemies.length; i++) {
            allEnemies[i].remove();
        }

        // Amending to look like at the start
        startButton.style.display = 'flex';
        scoreAndLife.style.display = 'none';
        playerLife = 3;
        enemyMovementSpeed = 1;
        playerPointToAdd = 1;
        hiScoreArray = [];
        
        //reset score
        playerScore = 0;

        //reset the Hall of fame screen
        document.getElementById('score').innerHTML = 0;
        document.getElementById('score-table').innerHTML = "";
        document.getElementById('submit-btn').removeAttribute('onclick');

        //reset enemy and bullets' arrays
        bullets = [];
        enemies = [];
        
        //reset player position
        shooterPlayer.style.top = gameWindow.clientHeight - 50 + 'px';
        shooterPlayer.style.left = (gameWindow.clientWidth)/2 + 'px';

        //adding back the hearts image for life status
        for (let i = 0; i < 3; i++) {
            let life = document.createElement('img');
            life.src = "images/life.png";
            life.setAttribute('class', 'life');
            document.getElementById('lives').append(life);
        }
    })
}




// Things to work on
// Image for the Enemies when shot
// Game end Criteria -- music when died
// music for when enemy hits player
// figure out how to prevent main game screen from moving
