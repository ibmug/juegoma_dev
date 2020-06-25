class HUDScene extends Phaser.Scene {
	constructor(){
		super('HUD');
		
	}
	
	
	init(){
		//grab a reference to the game scene
		this.gameScene = this.scene.get('Game');
	}

	create(){
		
		this.setupUIElements();
		this.setupEvents();
		
	}
	
	setupUIElements(){
		//create score text gameObject
		this.scoreText = this.add.text(35,8,'Coins: 0', {fontSize: '16px', fill: '#fff'})
		
		//create a coin Icon
		this.coinIcon = this.add.image(15,15,'items', 3);
	}
	
	setupEvents(){
		
		//listen for the update score from the game scene
		this.gameScene.events.on('updateScore', (coins) =>{
			this.scoreText.setText(`Coins: ${coins}`);
		});
	}
	
	
}