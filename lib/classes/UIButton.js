class UIButton extends Phaser.GameObjects.Container{
	constructor(scene,x,y,key,hoverKey,text,targetCallback){

		super (scene,x,y);
		//Buttons takes two keys, non hover image, and hover image
		//the text that will be added on the button
		//when a player clicks on the button, it will call targetCallback.
		this.scene = scene;  //scene this container will be added to
		this. x = x; //x pos of the container
		this.y = y; //y pos of the container
		this.key = key; // the background image of our button
		this.hoverKey = hoverKey; // image displayed when player hovers over button
		this.text = text; //text displayed on the button
		this.targetCallback = targetCallback; //function that will be called when clicking.
		
		
		this.createButton(); // create the button
		this.scene.add.existing(this); // add this container to our phaser scene
			
		
		
	}
	
	createButton() {
		
			
			
			this.button =this.scene.add.image(0 ,0,this.key);
			
			//make button interactive
			this.button.setInteractive();
			
			this.button.setScale(1.4);
			
			//Create the text
			this.buttonText = this.scene.add.text(0,0,this.text, {fontSize: '26px', fill: '#fff'});
			
			//center the text inside the button
			Phaser.Display.Align.In.Center(this.buttonText, this.button);
			
			//Add the two game objects to the our container;
			this.add(this.button);
			this.add(this.buttonText);
			
			//Listeners for the hover/nonhover on the button
			this.button.on('pointerdown',()=>{
				//CLicks
				this.targetCallback();
			});
			
			this.button.on('pointerover',()=>{
				//hovering
				this.button.setTexture(this.hoverKey);
			});
			
			this.button.on('pointerout',()=>{
				//nonhover
				this.button.setTexture(this.key);
			});
		
	}
	
}

