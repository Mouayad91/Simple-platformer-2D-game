//to fit the game screen ratio on multiple screen sizes
const canvasSize = document.querySelector('canvas');

//getContext() method returns an object with tools (methods) for drawing.
const canvasContext = canvasSize.getContext('2d')

canvasSize.width = 1024;
canvasSize.height= 576;

canvasContext.fillRect(0,0, canvasSize.width, canvasSize.height)

const worldGravity = 0.6

const bg = new Spritesheet({
    position: { x: 0, y: 0 },  
    imgSrc: './assets/background.png'
});

const light = new Spritesheet({
    position: { x: 950, y: 370 },  
    imgSrc: './assets/light.png',

    imgScale: 1.2,
    maxFrames:4
});



const playerCharacter = new players({
    direction: 'right',

    position: {
    x:100,
    y:100
},

velocity:{
x:0,
y:0

},
spriteOffset:{
x:0,
y:0
    
},
imgSrc: './assets/King/Idle.png',
maxFrames: 8,
imgScale: 1.5,
spriteOffset:{
    x: 0,
    y:8
},

charSprites:{

    idle:{
        imgSrc: './assets/King/Idle.png',
        maxFrames: 8

    },
    run:{
        imgSrc: './assets/King/Run.png',
        maxFrames: 8,
        image: new Image()


    },
    jump:{
        imgSrc: './assets/King/Jump.png',
        maxFrames: 2,
        image: new Image()


    },
    fall:{
        imgSrc: './assets/King/Fall.png',
        maxFrames: 2,
        image: new Image()


    },

    attack1:{
        imgSrc: './assets/King/Attack1.png',
        maxFrames: 4,
        image: new Image()


    }


}




})

const enemyCharacter = new players({

    direction: 'left',
    position: {
        x:420,
        y:100
    },
    
    velocity:{
    x:0,
    y:0
    
    },
       
    color: 'Blue',
    boxOffset:{

        x:-50,
        y:0
    },

    imgSrc: './assets/Evil/Idle.png',
    maxFrames: 8,
    imgScale: 1.5,
    spriteOffset:{
    x: 0,
    y:100
},

charSprites:{

    idle:{
        imgSrc: './assets/Evil/Idle.png',
        maxFrames: 8

    },
    run:{
        imgSrc: './assets/Evil/Run.png',
        maxFrames: 8,
        image: new Image()


    },
    jump:{
        imgSrc: './assets/Evil/Jump.png',
        maxFrames: 2,
        image: new Image()


    },
    fall:{
        imgSrc: './assets/Evil/Fall.png',
        maxFrames: 2,
        image: new Image()


    },

    attack1:{
        imgSrc: './assets/Evil/Attack1.png',
        maxFrames: 8,
        image: new Image()


    }


}

})

//enemyCharacter.drawSprite()

//playerCharacter.drawSprite(playerCharacter)
console.log(playerCharacter)

// keys objects
const taste = {
    a:{
        onPress: false
    },
    d:{

        onPress: false
    },
    w:{

        onPress: false
    },
    ArrowLeft:{

        onPress: false
    },
    ArrowRight:{

        onPress:false
    },
    f:{

        onPress: false
    }
}

let time = 60
let timeId
function decTimer(){
    

    if(time > 0) {
        timeId = setTimeout(decTimer, 1000)
        time--
        document.querySelector('#time').innerHTML = time
    }
    if (time === 0){

        clearTimeout(timeId)
        document.querySelector('#tie').style.display = 'flex'

        if(playerCharacter.health === enemyCharacter.health){

            document.querySelector('#tie').innerHTML = 'TIE'
    
        }else if (playerCharacter.health > enemyCharacter.health){
            document.querySelector('#tie').innerHTML = 'Player in the left Wins'

        } else if ( playerCharacter.health < enemyCharacter.health){

            document.querySelector('#tie').innerHTML = 'Player in the right wins'
        }
    }
    

}
decTimer()

// Animatio Loop for the Characters
function anime(){
//method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.
    
    
    window.requestAnimationFrame(anime);
    //console.log("RUN")
    canvasContext.fillStyle='Black'
    canvasContext.fillRect(0,0,canvasSize.width, canvasSize.height);

    
    bg.updateAnim()
    light.updateAnim()
    playerCharacter.updateAnim();
    enemyCharacter.updateAnim();
    //playerCharacter.attacking();
    //enemyCharacter.attacking();

    // Movements
    playerCharacter.velocity.x = 0
    enemyCharacter.velocity.x  = 0
    
    if (taste.a.onPress && playerCharacter.lKeyPressed === 'a'){
        playerCharacter.velocity.x= -1
        

        playerCharacter.spriteSwitch('run')
    }else if (taste.d.onPress && playerCharacter.lKeyPressed === 'd'){
        playerCharacter.velocity.x = 1
        playerCharacter.spriteSwitch('run')


    }else{

        playerCharacter.spriteSwitch('idle')

    }


    if(playerCharacter.velocity.y < 0){

    playerCharacter.spriteSwitch('jump')

    }else if( playerCharacter.velocity.y > 0){
        playerCharacter.spriteSwitch('fall')

    }
    // Enemy Movement
    //enemyCharacter.velocity.x= 0

    if (taste.ArrowLeft.onPress && enemyCharacter.lKeyPressed === 'ArrowLeft'){
        enemyCharacter.velocity.x= -1
        enemyCharacter.spriteSwitch('run')

    }else if (taste.ArrowRight.onPress && enemyCharacter.lKeyPressed === 'ArrowRight'){
        enemyCharacter.velocity.x = 1
        enemyCharacter.spriteSwitch('run')


    }else{

        enemyCharacter.spriteSwitch('idle')
    }
    if(enemyCharacter.velocity.y < 0){

        //enemyCharacter.spriteSwitch('jump')
    
        }else if( enemyCharacter.velocity.y > 0){
          //  enemyCharacter.spriteSwitch('fall')
    
        }


    // Collsion detection between the 2 Players

    if(
        playerCharacter.ACollisionBox.postion.x + playerCharacter.ACollisionBox.width 
        >= enemyCharacter.position.x
        && playerCharacter.ACollisionBox.postion.x 
        <= enemyCharacter.position.x
        + enemyCharacter.width 
        && 
        playerCharacter.ACollisionBox.postion.y + playerCharacter.ACollisionBox.height 
        >= enemyCharacter.position.y && 
        playerCharacter.ACollisionBox.postion.y <= enemyCharacter.position.y + enemyCharacter.height
        && playerCharacter.attack
    ){
        playerCharacter.attack = false

        enemyCharacter.health = enemyCharacter.health - 10
        document.querySelector('#enmHealth').style.width = enemyCharacter.health + ('%')
        console.log("Detected")
    }


    if(
        enemyCharacter.ACollisionBox.postion.x + enemyCharacter.ACollisionBox.width 
        >= playerCharacter.position.x
        && enemyCharacter.ACollisionBox.postion.x 
        <= playerCharacter.position.x
        + playerCharacter.width 
        && 
        enemyCharacter.ACollisionBox.postion.y + enemyCharacter.ACollisionBox.height 
        >= playerCharacter.position.y && 
        enemyCharacter.ACollisionBox.postion.y <= playerCharacter.position.y + playerCharacter.height
        && enemyCharacter.attack
    ){

        enemyCharacter.attack = false

        playerCharacter.health = playerCharacter.health - 10
        document.querySelector('#playerHealth').style.width = playerCharacter.health + ('%')
        
        console.log("Detected enemy attack")
    }

    if (enemyCharacter.health <= 0 || playerCharacter.health <= 0){

        document.querySelector('#tie').style.display = 'flex'

        if(playerCharacter.health === enemyCharacter.health){

            document.querySelector('#tie').innerHTML = 'TIE'
    
        }else if (playerCharacter.health > enemyCharacter.health){
            document.querySelector('#tie').innerHTML = 'Player in the left Wins'
            clearTimeout(timeId);
        } else if ( playerCharacter.health < enemyCharacter.health){
            clearTimeout(timeId);

            document.querySelector('#tie').innerHTML = 'Player in the right wins'
        }
    }

    
}
anime()

window.addEventListener('keydown', (event)=>{
console.log(event.k)
    switch(event.key){
        
        // first player Keys to play
        case 'd':
            taste.d.onPress = true
            playerCharacter.lKeyPressed = 'd'
            playerCharacter.direction = 'right';
            break

        case 'a':
            taste.a.onPress = true;
            playerCharacter.lKeyPressed = 'a'
            playerCharacter.direction = 'left';

            break

        case 'w':
            playerCharacter.velocity.y = -18
            break
        case 'f':
            playerCharacter.attacking()
            break

            
    // second player Keys to play
    case 'ArrowRight':
        taste.ArrowRight.onPress = true
        enemyCharacter.lKeyPressed = 'ArrowRight'
        enemyCharacter.direction = 'right';
        break

    case 'ArrowLeft':
       taste.ArrowLeft.onPress = true
       enemyCharacter.lKeyPressed = 'ArrowLeft'
       enemyCharacter.direction = 'left';
        break

    case 'ArrowUp':
        enemyCharacter.velocity.y = -18
        break
        case 'Enter':
            enemyCharacter.attacking()
            break
    }


console.log(event.key)


})

window.addEventListener('keyup', (event)=>{

    switch(event.key){
        case 'd':
            taste.d.onPress = false
            break
        case 'a':
            taste.a.onPress = false
            break
        
        case 'w':
            lKeyPressed = 'w'
            taste.w.onPress = false;
            break

    }
    switch(event.key){
        case 'ArrowRight':
            taste.ArrowRight.onPress = false
            break
        case 'ArrowLeft':
            taste.ArrowLeft.onPress = false
            break
    

    }

console.log(event.key)


})