window.onload = () => {

    //creating the gaem variables
    let playerLife = 3;
    let enemyMovementSpeed = 1;
    let createEnemySpeed = 200;
    var playerScore = 0;

    //Creating arrays to hold the Bullets and Enemies tht will be created
    var bullets = [];
    var enemies = [];


/*---------------------------------------------------------------------------------------------*/
    //Creating the shooter and moving it

    //Setting the Shooter attributes  
    let shooter = document.getElementById('shooter');
    shooterTopPos = 740;
    shooterLeftPos = 370;
    
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

        if(keysPressed['ArrowLeft'] && shooterLeftPos > 0) {
            shooterLeftPos -= 5;
            console.log(shooterLeftPos)
            shooter.style.left = shooterLeftPos + 'px';
            
        } else if (keysPressed['ArrowRight'] && shooterLeftPos < 740) {
            shooterLeftPos += 5;
            console.log(shooterLeftPos)
            shooter.style.left = shooterLeftPos + 'px';
 
        }         
        if (keysPressed['g']) {
            createEnemy();
        }

        requestAnimationFrame(move)
    }

    requestAnimationFrame(move)


/*---------------------------------------------------------------------------------------------*/
    //Creating the bullets and moving them
    let bulletInterval = null
    let reLoad = true

    function shoot() {
          if (reLoad) {
            reLoad = false;
            let bullet = document.createElement('div');
            bullet.setAttribute('class', 'bullet');      
            bullet.style.top = shooterTopPos + 'px';
            bullet.style.left = shooterLeftPos + 30 + 'px';
            bullets.push(bullet);
            document.getElementById('game-window').append(bullet);
        }

        setTimeout( () => {
            reLoad = true
        }, 1000)
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

        requestAnimationFrame(movebullets)
    }

    requestAnimationFrame(movebullets)

/*---------------------------------------------------------------------------------------------*/

    //Creating the Enemies and moving them

    function createEnemy() {
        let newEnemy =  document.createElement('img');
        newEnemy.setAttribute('src', 'enemy.png');
        newEnemy.setAttribute('class', 'enemy');
       

        //Creating the enemy to appear randomly
        newEnemy.style.top = Math.floor(Math.random() * (800 - 400) + 50) + 'px';
        newEnemy.style.left = setEnemyLeft() + 'px';

        function setEnemyLeft () {

            let position = Math.floor(Math.random() * (800));
            if (position > 750) {
                return 750;
            } else {
                return position;
            }
        }
        
        let newEnemyTopPosition = newEnemy.style.top;
        let newEnemyLeftPosition = newEnemy.style.left;


        //Checking if there is already an enemy at the same position 
        let enemyCheck = true;

        if (enemies.length > 1) {
            
            for (let i = 0; i < enemies.length; i++) {

                if (parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) < 50 && parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) >= 0) {
                    enemyCheck = false;
                    
                } else if ( parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) > -50 && parseInt(enemies[i].style.top) - parseInt(newEnemyTopPosition) <= 0) {
                    enemyCheck = false;
                    
                } else if ( parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) < 60 && parseInt(enemies[i].style.left) - parseInt(newEnemyLeftPosition) >= 0) {
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
    }

    //setInterval(createEnemy,1000)

    //Moving the Enemies
    let moveEnemies = () => {
        for (let i = 0 ; i < enemies.length; i++ ) {
            if (parseInt(enemies[i].style.top) >= 760) {
                enemies[i].remove();
                playerLife -= 1

            } else {
               enemies[i].style.top = parseInt(enemies[i].style.top) + enemyMovementSpeed + 'px';
            }
        }
    
    requestAnimationFrame(moveEnemies);
    }

    //requestAnimationFrame(moveEnemies);

/*---------------------------------------------------------------------------------------------*/

    //function to remove the bullet and enemy

    function killEnemy () {
        for(let i = 0; i < enemies.length; i++) {
            for(let j = 0; j < bullets.length; j++) {

                if((parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left)) <= 8 &&
                    parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left) >= -60) {

                    if(parseInt(enemies[i].style.top) - parseInt(bullets[j].style.top) >= -50 ){
                        enemies[i].remove();
                        bullets[j].remove();
                        enemies.splice(i,1);
                        bullets.splice(j,1);
                        playerScore += 1;  
                    }
                }
            }
        }
    }

    setInterval(killEnemy,20)

/*---------------------------------------------------------------------------------------------*/
    //Game end Criteria

    
}


// Things to work on
// Image for the Enemies when shot
//Game end Criteria
//Game win Criteria
