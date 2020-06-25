const SpawnerType = {
  MONSTER: 'MONSTER',
  CHEST: 'CHEST',
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getTiledProperty(obj, property_name) {
    for (var property_index = 0; property_index < obj.properties.length; property_index += 1) {
        var property = obj.properties[property_index];
        if (property.name == property_name) {
            return property.value;
        }
    }
}


function getTiledPropertyTwo(obj, property_name) {
 	console.log(obj);
	console.log(property_name);
	if(obj.properties[property_name]) {
		console.log("found something really good" + obj.properties[property_name]);
		return obj.properties[property_name];
	} else {
		console.log ("Property does not exist. Check again");
	}
}

function getTiledPropertyThree(obj, property_name) {
	try{
    		for (var property_index = 0; property_index < obj.properties.length; property_index += 1) {
				var property = obj.properties[property_index];
				if (property.name == property_name) {
           		 return property.value;
        		}
    		}
	}
	catch(err){
		console.log("Encountered Error" + err);
	}
}