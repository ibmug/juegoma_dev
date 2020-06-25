class Chest extends Phaser.Physics.Arcade.Image{
	constructor(scene,x,y,key,frame,coins, id){
		super(scene,x,y,key,frame);
		this.scene = scene; // the scene this game object will be added to
		this.coins = coins;
		this.id = id;
		if(this.coins == 0) this.coins = 1; //make sure there's at least one coin'
		//console.log('thischesthas' + this.coins + 'coins!');
		
		//enable physics
		this.scene.physics.world.enable(this);
		//add the player to our existing scene
		this.scene.add.existing(this);
		
		this.setScale(1.5);
	}
	
	makeActive(){
		this.setActive(true);
		this.setVisible(true);
		this.body.checkCollision.none = false; // this means that we're checking for collisions'
		this.getNewCoinAmount();
	}
	makeInactive(){
		
		this.setActive(false);
		this.setVisible(false);
		this.body.checkCollision.none = true; //this will make that we don't check for that collision box.'
	}
	
	getNewCoinAmount(){
		this.coins = Math.floor(Math.random() * 10);
	}
}