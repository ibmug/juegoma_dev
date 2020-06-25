class GameScene extends Phaser.Scene {
	constructor(){
		super('Game');
	}
	
	
	init(){
		this.scene.launch('HUD');
	}
	
	
	create(){
		
		this.createMap();
		this.createAudio();
		this.createGroups();
		this.createInput();	
		this.createGameManager();
		this.createSecondFloor();
		
		
	}
	
	update(){
		
		if(this.player)
		 this.player.update(this.cursors);
	
	
	}
	
	
	createAudio(){
		//Chest Audio	
		this.goldPickupAudio = this.sound.add('goldSound',{loop:false, volume:1});
	
		
	}
	createPlayer(location){	
		//Player
		//the*1.5 is the scale we're using aalong with the setScale of everything'
		
	this.player = new Player(this, location[0] * 1.5,location[1] * 1.5 ,'playerSprite',0);
	
	
		
	}
	createInput(){
		//creates input for player
		//Player Input
	this.cursors = this.input.keyboard.createCursorKeys();
	
	}
	createGroups(){
		
		this.chests = this.physics.add.group();
	
	}
	
	spawnChest(chestObject){
		
		
		
		let chest = this.chests.getFirstDead(); //This checks our 'chests' group and iterate through the group and find the first inactive gameObject, if there's none it will return null'
		
		
		if(!chest){
			chest = new Chest(this, chestObject.x * 1.5 ,chestObject.y * 1.5,'items',0, chestObject.gold, chestObject.id);
			this.chests.add(chest);
		} else {
			chest.coins = chestObject.gold;
			chest.id = chestObject.id;
			chest.setPosition(chestObject.x * 1.5 ,chestObject.y * 1.5);
			//Make active is a function createdwithin the chest function, it's not built-in'
			chest.makeActive();
			
		} 
		
		//console.log(chest.id);
	}
	
	
	createCollisions(){
		//Check for collisions between player and tiled blockedLayer object
		this.physics.add.collider(this.player, this.map.blockedLayer);
		
		//check for ovelaps between player and chest game objects
		this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);	
	}
	
	createMap(){
		
		//this.map = new Map(this, 'map', 'background', 'background', 'blocked');
		//this.map = new Map(this,'map','background','firstFloor','firstFloorDetails','blocked')
		this.map = new Map(this,'map','background','firstFloor','blocked')
		
	}
	
	createSecondFloor(){
		
		//this.map = new Map(this, 'map', 'background', 'background', 'blocked');
		this.firstFloorDetails = new Map(this,'map','background','firstFloorDetails','blocked')
		
	}
	
	createGameManager(){
		
		this.events.on('spawnPlayer', (location) =>{
			
			this.createPlayer(location);
			this.createCollisions();
			
		});
		
		this.events.on('spawnedChest', (chest) =>{
			
			this.spawnChest(chest);
			this.createCollisions();
			
		});
		
		this.events.on('chestRemoved', (chestId)=> {
			this.chests .getChildren().forEach((chest) => {
				if(chest.id === chestId){
					chest.makeInactive();
				}
			});
		});
		
		
		//the .map.objects is each of the objects created with tiled.
		this.gameManager = new GameManager(this, this.map.map.objects);
		this.gameManager.setup();
	}
	
	
	collectChest(player,chest){
		
		//play gold pickup sound
		this.goldPickupAudio.play();
		player.velocity+=chest.coins; 
		player.coins += chest.coins;
		//console.log(chest.coins);
		//update score in the ui
		this.events.emit('updateScore', player.coins);
		//We could destroy this game object using chest.destroy();
		//But we're going to make it inactive just to save memory and avoid loading times'
		//makeInactive is a function created in the Chest Class
		//chest.makeInactive();
		//Delay a call to spawn a new chest.
		//this.time.delayedCall(1000,this.spawnChest, [], this);
		this.events.emit('pickUpChest', chest.id);
		
		
	}
	

}