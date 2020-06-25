const fetch = require('node-fetch');
let url = 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=221380'


class Achievement{
	
	constructor(name, percent){
		this.name = name;
		this.percent = percent;
	}
	printValues(){
		
		if(this.percent == 0){
			
			console.log('No one has completed the '+ this.name + 'achievement.');
			
		} else {
		console.log(this.name + ' achievement has been completed by ' + this.percent + ' of people playing.');
		}
	};
}




async function fetchData(url){
	let response = await fetch(url);
	let jsonResponse = await response.json();
	//console.log(JSON.stringify(jsonResponse));
	printData(jsonResponse);

}

function printData(jsonData){
	var achievementsArray = [];
 let jsonObject = jsonData['achievementpercentages']
 let allAchievements = jsonObject['achievements'];
 
	for(let achievement of allAchievements){
		let name = achievement['name'];
		let achievementPercent = achievement['percent'];
		let newAchievement = new Achievement(name, achievementPercent);
		newAchievement.printValues();
		achievementsArray.push(newAchievement);
	}
	
	console.log(achievementsArray.length);
 
}



fetchData(url).catch(function(){console.log('Could not fetch data\n')});
