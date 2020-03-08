 var game = new Phaser.Game(640,360,Phaser.AUTO);

 var GameState = {
     preload : function(){
        this.load.image('background','background.png')
        this.load.image('chicken','chicken.png')
        this.load.image('horse','horse.png')
        this.load.image('pig','pig.png')       
        this.load.image('sheep','sheep.png')   



     },
     create: function(){
        this.background = this.game.add.sprite(0,0,'background');

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        
       
        

        this.chicken = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'chicken')
         this.chicken.anchor.setTo(0.5);
         this.chicken.scale.setTo(1.5,1.5)

         this.pig = this.game.add.sprite(500,300,'pig')
         this.pig.anchor.setTo(0.5)
         this.pig.scale.setTo(-0.5,0.5)

         this.horse = this.game.add.sprite(50,50,'horse')
         this.horse.anchor.setTo(0.5)
         this.horse.scale.setTo(0.5)

         this.sheep = this.game.add.sprite(50,300,'sheep')
         this.sheep.anchor.setTo(0.5)
         this.sheep.scale.setTo(0.5)
         this.sheep.angle = 0;
     },
     update: function(){
        this.sheep.angle += 10

     }
 };

 game.state.add('GameState',GameState);
 game.state.start('GameState');