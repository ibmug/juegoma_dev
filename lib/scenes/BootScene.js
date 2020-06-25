class BootScene extends Phaser.Scene {
	constructor(){
		super('Boot');
	}
	
	preload(){
		
		this.loadImages();
		this.loadSpritesheets();
		this.loadAudio();
		this.loadTileMap();
		
		
	}
	
	loadImages(){
		
			//Load images
		this.load.image('button1', 'assets/images/ui/blue_button01.png');
		this.load.image('button2', 'assets/images/ui/blue_button02.png');
		
		//
		this.load.image('background','assets/map/background-extruded.png');
		//this.load.image('background', 'assets/map/background.png');
		
	}
	loadSpritesheets(){
		//Load Sprites
		this.load.spritesheet('items', 'assets/images/items.png',{frameWidth:32, frameHeight:32});
		this.load.spritesheet('characters', 'assets/images/characters.png',{frameWidth:32, frameHeight:32});
		this.load.spritesheet('playerSprite', 'assets/images/playerNakedSheet.png',{frameWidth:32, frameHeight:32});
		
		
	}
	loadAudio(){
			//Load Audios
		this.load.audio('goldSound',['assets/audio/Pickup.wav']);
	}
	
	loadTileMap(){
		//map made with Tiled in JSON format
		//1.key we want to call this asset, 2.path
		this.load.tilemapTiledJSON('map','assets/map/testMap.json');
	}
	
	create(){
		//console.log('starting game');
		this.scene.start('Title');
	}
	
}