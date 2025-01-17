//Our GameManager is going to be responsible of parsing data from the JSON
// This gets the spawnpoints for Player, Monster, Items
//We used a unique spawner id when creating the map in tiled.
//each ID refers to a different area of spawn.
class GameManager{
	constructor(scene, mapData){
		
		this.scene = scene;
		this.mapData = mapData;
		
		this.spawners = {};
		this.chests={};
		
		
		this.playerLocations = [];
		this.chestLocations = {};
		this.monsterLocations = {};
		
	}
	
	setup(){
		
		this.parseMapData();;
		this.setupEventListener();
		this.setupSpawners();
		this.spawnPlayer();

	}
	
	

	parseMapData() {
    this.mapData.forEach((layer) => {
      	if (layer.name === 'player_locations') {
        	layer.objects.forEach((obj) => {
          	this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
       	 	});
      	} else if (layer.name === 'chest_locations') {
        	layer.objects.forEach((obj) => {
		 if(obj.properties){
            var spawner = getTiledProperty(obj, 'spawner');
          	if (this.chestLocations[spawner]) {
				
            	this.chestLocations[spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
				
          } else {
				
            	this.chestLocations[spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
				
          }
		 }
        });
      	} else if (layer.name === 'monster_locations') {
        	layer.objects.forEach((obj) => {
		  if(obj.properties){
            var spawner = getTiledProperty(obj, 'spawner');
          if (this.monsterLocations[spawner]) {
          	  this.monsterLocations[spawner].push([obj.x, obj.y]);
          } else {
          	  this.monsterLocations[spawner] = [[obj.x, obj.y]];
          }
		 }
        });
      }
    });
}
  
	
	setupEventListener(){
		
		this.scene.events.on('pickUpChest', (chestId) =>{
			//update the spawner that this chest can be removed
			
				if(this.chests[chestId]){
					//Grab that chest spawner Id then in our spawnersObject, find that spawnerId and pass that chest id to delete it.
					this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
					this.scene.events.emit('chestRemoved', chestId);
				}
		});
		
	}
	
	setupSpawners(){
			//create chest spawners
			 const config = {
      			spawnInterval: 3000,
      			limit: 1,
      			spawnerType: SpawnerType.CHEST,
      			id: '',
    		};
    	let spawner;

    		// create chest spawners
//		Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
		//console.log(this.chestLocations[0]);
   		 Object.keys(this.chestLocations).forEach((key) => {
      		config.id = `chest-${key}`;
			//console.log(key);
			//console.log(config.id + "please dont be undefined");
		    spawner = new Spawner(config, this.chestLocations[key], this.addChest.bind(this), this.deleteChest.bind(this));
      		this.spawners[spawner.id] = spawner;
			console.log("created spawner" + spawner);
			
    });

		
	}
	
	spawnPlayer(){
		
		const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
		
		//console.log("This is the location" + location[0]+ " " + location[1]);
		this.scene.events.emit('spawnPlayer', location);
		
	}
	
	
	addChest(chestId, chest){
		
		this.chests[chestId] = chest;
		this.scene.events.emit('spawnedChest', chest);
		
	}
	
	deleteChest(chestId){
		
		delete this.chests[chestId];
		
	}
	
	
			

	

}

