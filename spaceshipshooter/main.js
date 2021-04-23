window.onload = () => {

    //setting the shooter attributes  
    let shooter = document.getElementById('shooter');
    shooterTopPos = 740;
    shooterLeftPos = 370;

    // moving the shapceship
    document.onkeydown = function(e) {

        if(e.keyCode === 37) {
            if(shooterLeftPos <= 0) {
                return
            } else {
                shooterLeftPos -= 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
            }

        } else if(e.keyCode === 39) {
            if(shooterLeftPos >= 740) {
                return
            } else {
                shooterLeftPos += 5;
                console.log(shooterLeftPos)
                shooter.style.left = shooterLeftPos + 'px';
            }

        } else if (e.keyCode === 32) {
            shoot()
            console.log('shoot')
        }
    
    };

    //create the bullets
    function shoot() {
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet');
        bullet.style.top = shooterTopPos + 'px';
        bullet.style.left = shooterLeftPos + 36 + 'px';
        document.getElementById('game-window').append(bullet);
    }
}