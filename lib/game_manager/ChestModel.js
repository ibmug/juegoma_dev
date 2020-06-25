class ChestModel{
	constructor(x,y,gold,spawnerId){
		
		this.chestId = `${spawnerId}-${uuid.v4()}`;
		this.spawnerId = spawnerId;
		this.x = x;
		this.y = y;
		this.goldContained =  gold;
		
	}
}