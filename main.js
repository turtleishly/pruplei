 
 var game = new Phaser.Game(640,360,Phaser.AUTO);

 var GameState = {
     preload : function(){
        //loading sprites into code
        this.load.image('background','background.png')
        this.load.image('arrow','arrow.png')

        //this.load.image('chicken','chicken.png')
        //this.load.image('horse','horse.png')
        //this.load.image('pig','pig.png')       
        //this.load.image('sheep','sheep.png') 
        
        this.load.spritesheet('chicken','chicken_spritesheet.png',131 ,200 ,3);
        this.load.spritesheet('horse','horse_spritesheet.png',212 ,200 ,3);
        this.load.spritesheet('pig','pig_spritesheet.png',297 ,200 ,3);
        this.load.spritesheet('sheep','sheep_spritesheet.png',244 , 200,3);


     },
     create: function(){
        //background
        this.background = this.game.add.sprite(0,0,'background');

        // screen scaling
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        var animalData = [
         {key : 'chicken',text: 'CHICKEN'},
         {key: 'horse',text:'HORSE'},
         {key: 'pig',text: 'PIG '},
         {key: 'sheep',text: 'SHEEP '},
        ];

        this.animals = this.game.add.group();

        var self = this;
        var animal;
        animalData.forEach(function(element){
           animal = self.animals.create(-1000,self.game.world.centerY,element.key,0)

           animalData.customParams = {text:element.text}
           animal.anchor.setTo(0.5);

           animal.animations.add('animate',[0,1,2,1,0],3 , false);

           animal.inputEnabled = true;
           animal.input.pixelPerfectClick = true;
           animal.events.onInputDown.add(self.animateAnimal,self)
        });

        this.currentAnimal = this.animals.previous();
        this.currentAnimal.position.set(this.game.world.centerX,this.game.world.centerY)
         
         //this.(animal).events.onInputDown.add(this.animateAnimal,this)

         //left arrow
         this.leftarrow = this.game.add.sprite(50,this.game.world.centerY,'arrow')
         this.leftarrow.anchor.setTo(0.5)
         this.leftarrow.scale.setTo(-1,1)
         this.leftarrow.customParams = {direction: -1};

         //left arrow user input
         this.leftarrow.inputEnabled = true;
         this.leftarrow.input.pixelPerfectClick = true;
         this. leftarrow.events.onInputDown.add(this.switchAnimal,this)

         //right arrow
         this.rightarrow = this.game.add.sprite(580,this.game.world.centerY,'arrow')
         this.rightarrow.anchor.setTo(0.5)
         this.rightarrow.scale.setTo(1,1)
         this.rightarrow.customParams = {direction: 1};

         //right arrow user input
         this.rightarrow.inputEnabled = true;
         this.rightarrow.input.pixelPerfectClick = true;
         this. rightarrow.events.onInputDown.add(this.switchAnimal,this)
        
     },
     // updates game a few times per second
     update: function(){
        
        },

        // same thing
     animateAnimal: function(sprite,event) {
      sprite.play('animate')
   },

        //a method we use in the code
      switchAnimal: function(sprite,event) {
      var newAnimal,endX;

         if (this.isMoving) {
            return false;
         }

         this.isMoving = true;

      if(sprite.customParams.direction > 0) {
         newAnimal = this.animals.next();
         newAnimal.x = -newAnimal.width/2
         endX = 640 + this.currentAnimal.width/2;
      }
      else{
         newAnimal = this.animals.previous();
         endX = -this.currentAnimal.width/2;
         newAnimal.x = newAnimal.width/2 + 640;

      }
         var newAnimalMovement = this.game.add.tween(newAnimal);
         newAnimalMovement.to({x: this.game.world.centerX},1000);
         newAnimalMovement.onComplete.add(function(){
            this.isMoving = false;
         },this);
         newAnimalMovement.start();


         var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
         currentAnimalMovement.to({x:endX},1000);
         currentAnimalMovement.start();


      this.currentAnimal.x = endX

      this.currentAnimal = newAnimal;

     },


     
 };

 game.state.add('GameState',GameState);
 game.state.start('GameState');