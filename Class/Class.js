class Spritesheet{
    // fire whenever create a new objects
        constructor({position, imgSrc, imgScale=1, maxFrames =1, spriteOffset = {x:0, y:0}}){
            this.position = position;
            this.width = 50
            this.height = 150
            this.image = new Image()
            this.image.src= imgSrc
            this.imgScale= imgScale
            this.maxFrames = maxFrames
            this.currFrame = 0
            this.framesCount = 0
            this.framesStops = 30
            this.spriteOffset = spriteOffset
        }
    
        drawSprite(){
            canvasContext.save();

            // Flip the sprite horizontally if the direction is 'left'
            if (this.direction === 'left') {
                canvasContext.translate(this.position.x + this.spriteOffset.x + (this.image.width / this.maxFrames) * this.imgScale, this.position.y - this.spriteOffset.y);
                canvasContext.scale(-1, 1); // Flip horizontally
                canvasContext.drawImage(
                    this.image,
                    (this.maxFrames - this.currFrame - 1) * this.image.width / this.maxFrames,
                    0,
                    this.image.width / this.maxFrames,
                    this.image.height,
                    0,
                    0,
                    (this.image.width / this.maxFrames) * this.imgScale,
                    this.image.height * this.imgScale
                );
            } else {
                canvasContext.drawImage(
                    this.image,
                    this.currFrame * this.image.width / this.maxFrames,
                    0,
                    this.image.width / this.maxFrames,
                    this.image.height,
                    this.position.x - this.spriteOffset.x,
                    this.position.y - this.spriteOffset.y,
                    (this.image.width / this.maxFrames) * this.imgScale,
                    this.image.height * this.imgScale
                );
            }
        
            canvasContext.restore();
        }
        framesAnimation(){


            this.framesCount++
            if(this.framesCount % this.framesStops === 0){


                if(this.currFrame < this.maxFrames -1){
                    this.currFrame++
        
                }else{
    
                    this.currFrame = 0
                }
            }
        }
    
        updateAnim(){

            this.drawSprite();
            this.framesAnimation();

            
        }
        
    
    }
    

    
    class players extends Spritesheet{
        // fire whenever create a new objects
            constructor({
                position, 
                velocity, 
                color ='red', 
                boxOffset ={x:0, y:0},
                imgSrc, 
                imgScale=1, 
                maxFrames =1,
                spriteOffset = {x:0, y:0},
                charSprites
            
            
            }
                
                ){
                super({
                    position,
                    imgSrc, 
                    imgScale, 
                    maxFrames,
                    spriteOffset 
                });
                this.direction = 'right';
                this.velocity = velocity;
                this.width = 50
                this.height = 150
                this.lKeyPressed
                this.ACollisionBox = {
                postion: {
                    x: this.position.x,
                    y: this.position.y
                },
                boxOffset: boxOffset, 
                width:100,
                height:50
        
                }
                this.color = color;
                this.attack;
                this.health = 100;
                this.currFrame = 0;
                this.framesCount = 0;
                this.framesStops = 30;
                this.image = new Image();
                this.image.src= imgSrc;
                this.imgScale= imgScale;
                this.charSprites = charSprites;
                
                for( const sprite in this.charSprites){
                    charSprites[sprite].image = new Image()
                    charSprites[sprite].image.src = charSprites[sprite].imgSrc

                }
               

            }
        
            updateAnim(){
        
                this.drawSprite()
                this.framesAnimation()
                this.ACollisionBox.postion.x = this.position.x + this.ACollisionBox.boxOffset.x
                this.ACollisionBox.postion.y = this.position.y 
                // add frame pixel when looping over
                this.position.x = this.position.x + this.velocity.x
                this.position.y = this.position.y + this.velocity.y
        
                /* the bottom of the rectangel + velocity > canvas bottom -> set velocity to 0
                * where the player should hit the ground according to the velocity
                */

                if(this.position.y + this.height + this.velocity.y >= canvasSize.height - 62.5){
                    this.velocity.y = 0
        
        
                }else{
                    this.velocity.y += worldGravity;
        
                }
            }
            attacking(){
        
                this.spriteSwitch('attack1')
                this.attack = true
                this.framesAnimation();
                setTimeout(()=>{
                this.attack = false
                }, 100)
                }

                spriteSwitch(sprite){
                    if (this.image === this.charSprites.attack1.image && this.currFrame < this.charSprites.attack1.maxFrames - 1) return;
                
                    switch (sprite){
                        case 'idle':
                            if (this.image !== this.charSprites.idle.image){
                                playerCharacter.image = playerCharacter.charSprites.idle.image;  // This line seems problematic
                                this.maxFrames = this.charSprites.idle.maxFrames;
                                this.currFrame = 0;
                            }
                            break;
                    
                    case 'run':
                        if(this.image !== this.charSprites.run.image){

                            this.image = this.charSprites.run.image
                            this.maxFrames = this.charSprites.run.maxFrames
                            this.currFrame = 0

                        }
                        break;
                    
                    case 'jump':
                        if(this.image !== this.charSprites.jump.image){
                            this.image = this.charSprites.jump.image
                            this.maxFrames = this.charSprites.jump.maxFrames
                            this.currFrame = 0

                        }
            
                        break;

                        case 'fall':
                            if(this.image !== this.charSprites.fall.image){
                                this.image = this.charSprites.fall.image
                                this.maxFrames = this.charSprites.fall.maxFrames
                                this.currFrame = 0
    
                            }
                
                            break;


                        case 'attack1':
                                if(this.image !== this.charSprites.attack1.image){
                                    this.image = this.charSprites.attack1.image
                                    this.maxFrames = this.charSprites.attack1.maxFrames
                                    this.currFrame = 0
        
                                }
                    
                                break;
                }


            }

        }