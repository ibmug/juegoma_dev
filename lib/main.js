var config = {
	type: Phaser.AUTO, //canvas, webgl or auto
	width: 900,
	height: 700,
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
	pixelArt: true,
	roundPixels: true,
};


var game = new Phaser.Game(config);

