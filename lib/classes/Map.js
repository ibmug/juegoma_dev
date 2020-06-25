class Map{
	//constructor(scene, key, tileSetName, bgLayerName, blockedLayerName)
	constructor(scene,key,tileSetName,firstFloorLayer,firstFloorDetailsLayer,blockedLayerName)
	{
		this.scene = scene; // the scnee this map belongs too
		this.key = key;//tiled JSON file keyName
		this.tileSetName = tileSetName; // tile tileset image keyName
		//this.bgLayerName = bgLayerName; // the name of the layer created in tile for the background
		
		//Layers
		this.firstFloorLayer = firstFloorLayer;
		this.firstFloorDetailsLayer = firstFloorDetailsLayer;
		this.blockedLayerName = blockedLayerName; // the name of the layer created in tiled for the blocked areas.
		
		
		this.createMap();
	}
	
	createMap(){
		
		//When we export our level from tiled as a JSON file
		//tiled will create individual dictionaries for each layer so we need to get tha info.
		//create the tilemap itself // the key will be the asset that we loaded
		this.map = this.scene.make.tilemap({key: this.key});
		//console.log(this.key);
		//add the tileset image to our map
		//1.Name of the layer, 2.key of our tileset image, 3.width, 4.height, 5.margin, 6.spacing
		//this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);
		this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);
		//create our background layer
		//1.name of the layer in our tile file, 2.tiles that we loaded, 3.x start pos, 4.y start pos
		//this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);	
		//.backgroundLayer.setScale(1.5);
		this.firstFloorLayer = this.map.createStaticLayer(this.firstFloorLayer, this.tiles, 0, 0);
		this.firstFloorLayer.setScale(1.5);
		//console.log(this.firstFloor);
		this.firstFloorDetailsLayer = this.map.createStaticLayer(this.firstFloorDetailsLayer,this.tiles,0,0);
		this.firstFloorDetailsLayer.setScale(1.5);
		
		//create our blocked layer
		this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName,this.tiles, 0, 0);
		this.blockedLayer.setScale(1.5);
		//Sets eligibility for collision depending on the  indexes that we dont want to check, -1 is a default to check all of them.
		//we still need to check collisions between stuff
		this.blockedLayer.setCollisionByExclusion([-1]);
		
		//update the world bounds
		//1.5 is due to our current scaling.
		this.scene.physics.world.bounds.width = this.map.widthInPixels * 1.5;
		this.scene.physics.world.bounds.height= this.map.heightInPixels * 1.5;
		
		//set bounds for the camera
		//this is to avoid showing the black areas of where the background is done.
		//1.x origin,2.y origin ,3.height && 4.width of our bounding box
		this.scene.cameras.main.setBounds(0,0,this.map.widthInPixels * 1.5, this.map.heightInPixels * 1.5);
		
	}
}