var canvas;
var context;
var score = 0;
var high = 0;
var life = 3;
var level = 0; //if game started
var x = 325; 
var intervalId;
var enemies = [];
var my_laser = [];
var ene_laser = [];
var left = 1;
var down = 0;
var lost = 0;
var maxLine = 8;
var maxRow = 3;
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

function generate_enemy(){
	context.fillStyle = "white";
	for(var j = 0; j <= maxRow; j++){
		for(var i = 0; i <= maxLine; i++){
			var ene = new enemy(i, j, 80 + i * 60, 100 + j * 40);
			enemies.push(ene);
		}
	}
}

function enemy(id,row,x,y){
	this.id = id;
	this.row = row;
	this.x = x;
	this.y = y;
}

function laser(x,y){
	this.x = x;
	this.y = y;
}
function find_left(){
	var le = enemies[0].id;
	var index = 0;
	for(var i = 1; i < enemies.length; i++){
		if(enemies[i].id < le){
			le = enemies[i].id;
			index = i;
		}			
	}
	return index;
}

function find_right(){
	var ri = enemies[0].id;
	var index = 0;
	for(var i = 1; i < enemies.length; i++){
		if(enemies[i].id > ri){
			ri = enemies[i].id;
			index = i;
		}			
	}
	return index;
}

function ev_canvas(e){
	if(e.keyCode == 32){ //Space
		if(level == 0){
			clear_canvas();
			score = 0;
			life = 3;
			level = 1;
			lost = 0;
			down = 0;
			left = 1;
			new_level();
			intervalId = setInterval("game()", 500);
		} else {
			var la = new laser(x + 12, 530);
			my_laser.push(la);		
			
		}
	}
	if(e.keyCode == 13){ //Enter
		score_screen();
	}
	if(e.keyCode == 65){ //A
		if(level != 0 && x > 0){
			clear_canvas();
			x = x - 5; 
			game_screen(x);
		}
	}
	if(e.keyCode == 68){ //D
		if(level != 0 && x < 650){
			clear_canvas();
			x = x + 5; 
			game_screen(x);
		}
	}
}

function clear_canvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function new_level(){
	enemies = [];
	my_laser = [];
	ene_laser = [];
	generate_enemy();
	x = 325
	game_screen(x);
}

function score_screen(){
	clear_canvas();
	level = 0;
	if(score > high){
		high = score;
	}
	clearInterval(intervalId);
	context.font = "40px Georgia";
	context.fillStyle = "white";
	context.fillText("Game Over", 170, 170);
	context.fillText("Final Score: " + score, 170, 330);
	context.fillText("High Score: " + high, 170, 390);
	context.fillText("Press Space to Start", 170, 450);
}

function game_screen(x){
	context.font = "20px Georgia";
	context.fillStyle = "white";
	context.fillText("Level: " + level, 0, 17);
	context.fillText("Score: " + score, 170, 17);
	context.fillText("High Score: " + high, 370, 17);
	context.fillText("Life: " + life, 0, 596);
	context.fillRect(0, 530, 700, 5);
	context.fillRect(x, 550, 50, 30);
	for(var i = 0; i < enemies.length; i++){
		var ene = enemies[i];
		context.fillRect(ene.x, ene.y, 50, 30);
	}
	for(var i = 0; i < my_laser.length; i++){
		var la = my_laser[i];
		context.fillStyle = "blue";
		context.fillRect(la.x, la.y, 10, 10);
	}
}

function game(){
	clear_canvas();
	for(var i = 0; i < my_laser.length; i++){
		my_laser[i].y -= 10;	
	}
	if(enemies[find_right()].x == 650){
		left = -1;
		down = 1
	}
	if(enemies[find_left()].x == 0){
		left = 1;
		down = 1;
	}
	for(var i = 0; i < enemies.length; i++){
		enemies[i].x += 10 * left;
		enemies[i].y += 10 * down;
		if(enemies[i].y + 30 == 530){
			lost = 1;
			break;
		}
	}
	if(lost == 1){
		score_screen();
	} else{
		down = 0;
		game_screen(x);
	}
}