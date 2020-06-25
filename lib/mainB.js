var config = {
	type: Phaser.AUTO, //canvas, webgl or auto
	width: 800,
	height: 600,
	scene: [
		BootScene,
		TitleScene,
		GameScene,
		HUDScene,
	],
	//Phaser supports physics and a couple of other plugins
	physics:{
		default:'arcade',
		arcade:{
			debug:true,
			gravity:{
				y:0,
			},//eoGravity
		},//eodefault
	},//eophysics
};


var game = new Phaser.Game(config);

