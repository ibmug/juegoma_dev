class Spawner{
	constructor(config,spawnLocations,addObject,deleteObject){
		
		///Load the config
		this.id  = config.id; //id that we can keep track of our spawners
		this.spawnInterval = config.spawnInterval;//how often do we want to spawn?
		this.limit = config.limit; //max number of objects we can create
		this.objectType = config.spawnerType; //figure out what type of object we're creating
		this.spawnLocations = spawnLocations;
		
		//When adding and deleting, we need to communicate between gameManager and Spawner to delete both.
		this.addObject = addObject;
		this.deleteObject = deleteObject;
		
		this.objectsCreated = []; //keep track of things we've already created'
		
		this.start();
	}
	
	start(){
		
		//this function runs every so often,
		//in this case the interval is spawnInterval
		this.interval = setInterval(() => {
			if(this.objectsCreated.length < this.limit){
				//console.log("spawning");
				this.spawnObject();
			}
			
		}, this.spawnInterval);
	}
	
	spawnObject(){
		
		if(this.objectType == SpawnerType.CHEST){
			this.spawnChest();
		}
		
	}
	
	spawnChest(){
		
		//console.log("spawning chest")
		const location = this.pickRandomLocation();
		//console.log("spawning chest with location" + location[0] +"--"+location[1]);
		
		//console.log("Spawning with spawner Id:" + this.id);
		const chest = new ChestModel(location [0], location[1], randomNumber(5,20), this.id);
		//console.log("created chest with " + chest.gold);
		this.objectsCreated.push(chest);
		this.addObject(chest.id, chest);
		
	}
	
	pickRandomLocation(){
		
		const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
		const invalidLocation = this.objectsCreated.some((obj)=>{
			if(obj.x === location[0] && obj.y === location[1]){
				//what some does is that it will execute this callback on the entire array until there's a true value, if there's none then just false.
				return true;
			}
			//console.log("failed picking another loc");
			
			return false;
		});
		
		//checks if we've got a valid location, if not recurse until we do.'
			if(invalidLocation) return this.pickRandomLocation();
		return location;
		
	}
	
	removeObject(id){
		
		//We want to delete this particular chest from the pool
		
		//Filter will return a new array that only contains the objects inside our currentarray
		// that returns a true value that we specify in our callback.
		//Only want to return objects were the id does not equal the id passed.
		//New array is the same array WITHOUT the object that contains the id.
		this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id)
		this.deleteObject(id);
	}
	
}