class Player extends Phaser.Physics.Arcade.Image{
	constructor(scene,x,y,key,frame){
		super(scene,x,y,key,frame);
		this.scene = scene; //scene in which this gameObject will be created to.
		this.velocity = 100; //speed of the player
		this.coins = 0; //amount of coins.
		
		//enable physics
		this.scene.physics.world.enable(this);
		//set immovable if another object collides with our player
		this.setImmovable(false);
		//scale our player
		this.setScale(1.5);
		//collide with world bounds
		this.setCollideWorldBounds(true);
		//add the player to our existing scene
		this.scene.add.existing(this);
		
		//have the camera follow the player
		this.scene.cameras.main.startFollow(this);
	}
	
	update(cursors){
		this.body.setVelocity(0,0);
	
		if(cursors.left.isDown){
			//console.log('left');
			this.body.setVelocityX(-this.velocity);
		} else if(cursors.right.isDown){
			//console.log('right');
			this.body.setVelocityX(this.velocity);
		}
	
	 	if(cursors.up.isDown){
			//console.log('up');
			this.body.setVelocityY(-this.velocity);
		}else if(cursors.down.isDown){
			//console.log('down');
			this.body.setVelocityY(this.velocity);
		}
	}
}