window.onload = () => {

    //creating the gaem variables
    let playerLife = 3;
    let enemyMovementSpeed = 5;
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

    // Moving the Shooter
    let keysPressed = {};

    document.addEventListener("keydown",e => {

        keysPressed[e.key] = true;    

        if (keysPressed['ArrowRight'] && keysPressed[' ']) {
            if(shooterLeftPos >= 740) {
                return
            } else {
                shooterLeftPos += 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
                shoot();
            }
        } else if (keysPressed['ArrowLeft'] && keysPressed[' ']) {
            if(shooterLeftPos <= 0) {
                return
            } else {
                shooterLeftPos -= 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
                shoot();
            }
        } else if(keysPressed['ArrowLeft']) {
            if(shooterLeftPos <= 0) {
                return
            } else {
                shooterLeftPos -= 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
            }
        } else if (keysPressed['ArrowRight']) {
            if(shooterLeftPos >= 740) {
                return
            } else {
                shooterLeftPos += 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
            }
        } else if (keysPressed[' ']) {
            shoot()
            console.log('shoot')
        } else if (keysPressed['g']) {
            createEnemy();
        }
    });

    document.addEventListener("keyup", e => {

       delete keysPressed[e.key];
       if(keysPressed['ArrowLeft']) {
           if(shooterLeftPos <= 0) {return
            } else {
                shooterLeftPos -= 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
            }

        } else if (keysPressed['ArrowRight']) {
            if(shooterLeftPos >= 740) {
                return
            } else {
            shooterLeftPos += 5;
            console.log(shooterLeftPos)
            shooter.style.left = shooterLeftPos + 'px';
            }
        } 
    })


/*---------------------------------------------------------------------------------------------*/
    //Creating the bullets and moving them
    let bulletInterval = null

    function shoot() {
        clearInterval(bulletInterval)
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet');      
        bullet.style.top = shooterTopPos + 'px';
        bullet.style.left = shooterLeftPos + 36 + 'px';
        bullets.push(bullet);
        document.getElementById('game-window').append(bullet);
        bulletInterval = setInterval(movebullets,200);
    }

    let movebullets = () => {
        for (let i = 0 ; i < bullets.length; i++ ) {
            if (parseInt(bullets[i].style.top) <= 10) {
                bullets[i].remove();
                bullets.splice(i,1);
                console.log(bullets)
            } else {
               bullets[i].style.top = parseInt(bullets[i].style.top) - 5 + 'px';
               console.log('bullet left: ' + bullets[i].style.left)
               console.log('bullet top: ' + bullets[i].style.top)
            }
        }
    }

/*---------------------------------------------------------------------------------------------*/

    //Creating the Enemies and moving them
    let enemyInterval = null;

    function createEnemy() {
        clearInterval(enemyInterval);
        let newEnemy =  document.createElement('div');
        newEnemy.setAttribute('class', 'enemy');
        enemies.push(newEnemy);

        //Creating the enemy to appear randomly
        newEnemy.style.top = Math.floor(Math.random() * (800 - 200) + 50) + 'px';
        newEnemy.style.left = Math.floor(Math.random() * (800)) + 'px';
        let newEnemyTopPosition = newEnemy.style.top;
        let newEnemyLeftPosition = newEnemy.style.left;


        //Checking if there is already an enemey at the same position
        if(enemies.some(element => 
            {return element.style.top === newEnemyTopPosition}) 
            && enemies.some(element => {element.style.left === newEnemyLeftPosition}))
            
        {   
            enemies.pop(newEnemy);
            
        } else {
            document.getElementById('game-window').append(newEnemy)
        }

        enemyInterval = setInterval(moveEnemies, createEnemySpeed)
    }

    //Moving the Enemies
    let moveEnemies = () => {
        for (let i = 0 ; i < enemies.length; i++ ) {
            if (parseInt(enemies[i].style.top) >= 760) {
                enemies[i].remove();
                playerLife -= 1

            } else {
               enemies[i].style.top = parseInt(enemies[i].style.top) + enemyMovementSpeed + 'px';
               console.log('enemy Top: ' + enemies[i].style.top)
               console.log('enemy Left: ' + enemies[i].style.left)
            }
        }

        killEnemy();
    }

/*---------------------------------------------------------------------------------------------*/

    //function to remove the bullet and enemy

    function killEnemy () {
        for(let i = 0; i < enemies.length; i++) {
            for(let j = 0; j < bullets.length; j++) {

                if((parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left)) <= 8 &&
                    parseInt(enemies[i].style.left) - parseInt(bullets[j].style.left) >= -30) {

                    if(parseInt(enemies[i].style.top) - parseInt(bullets[j].style.top) >= -30 ){
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


}

// Things to work on
// shooter movement after shooting
// enemies appearing on top of each other due to size.
// Image for the Enemies
// removing Enemies when shot
//Game end Criteria
//Game win Criteria
