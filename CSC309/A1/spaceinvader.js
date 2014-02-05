var canvas;
var context;
var score = 0;
var high = 0;
var life = 3;
var level = 0; //if game started
var x = 325; 
window.onload = function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	canvas.onkeydown = ev_canvas;
	start_screen();
};

function start_screen(){
	context.font = "40px Georgia";
	context.fillStyle = "white";
	context.fillText("Use a/d to move, space to shoot", 50, 270);
	context.fillText("Press Space to Start", 170, 330);
	context.fillText("Press Enter to Quit", 170, 390);
}

function ev_canvas(e){
	if(e.keyCode == 32){ //Space
		if(level == 0){
			clear_canvas();
			score = 0;
			life = 3;
			level = 1;
			new_level();
		}
	
	}
	if(e.keyCode == 13){ //Enter
		clear_canvas();
		level = 0;
		if(score > high){
			high = score;
		}
		score_screen();
	}
	if(e.keyCode == 65){ //A
		clear_canvas();
		game_screen();
		x = x - 5; 
		context.fillStyle = "white";
		context.fillRect(x, 500, 50, 30);
	}
	if(e.keyCode == 68){ //D
		clear_canvas();
		game_screen();
		x = x + 5; 
		context.fillStyle = "white";
		context.fillRect(x, 500, 50, 30);
	}
}

function clear_canvas(){
	canvas.width = canvas.width;
}

function new_level(){
	game_screen();
	context.fillStyle = "white";
	context.fillRect(325, 500, 50, 30);
}

function score_screen(){
	context.font = "40px Georgia";
	context.fillStyle = "white";
	context.fillText("Game Over", 170, 170);
	context.fillText("Final Score: " + score, 170, 330);
	context.fillText("High Score: " + high, 170, 390);
	context.fillText("Press Space to Start", 170, 450);
}

function game_screen(){
	context.font = "20px Georgia";
	context.fillStyle = "white";
	context.fillText("Level: " + level, 0, 17);
	context.fillText("Score: " + score, 170, 17);
	context.fillText("High Score: " + high, 370, 17);
	context.fillText("Life: " + life, 0, 596);
}