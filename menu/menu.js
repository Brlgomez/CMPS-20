var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

 
 //---------------------------------------------------------------
 var bag = [];
 
 var sword = {first: 'sword', second: true, 
 			run: function(){
 				bag.push({name: 'sword', health: 0, integrity: 0, attack: 5});
 			}
 	};
 //---------------------------------------------------------------
 var menu = {
 	on: false,
 	state: {info:true,prompt:false,buy:false,sell:false,sleep:false},
 	name: 'town name',
 	info: 'info about the town',
 	prompt: 'Do you want to...',
 	shop: 'SHOP',
 	options: [
 		{first: 'buy', second: true, run: function(){
 			menu.state.prompt = false;
	        menu.state.buy = true;
 		}},
 		{first: 'sell', second: false,run: function(){
 			menu.state.prompt = false;
	        menu.state.sell = true;
 		}},
 		{first: 'sleep', second: false, run: function(){
 			menu.state.prompt = false;
	        menu.state.sleep = true;
 		}},
 	],
 	buy:[
 		sword,
 		{first: 'sun cloak', second: false},
 		{first: 'running shoes', second: false}
 	],
 	leave: {no:true, yes: false}
 };
 
 //-----------------------------------------------------------------
 function draw(){
 	canvas.width = canvas.width;
 	console.log(menu.on);
 	
 	console.log('menu.state.info');
 	console.log(menu.state.info);
 	
 	console.log('menu.state.prompt');
 	console.log(menu.state.prompt);
 
 	if(menu.on) drawMenu();
 }
 
 function drawMenu(town){
 	//context.fillRect(food.x, food.y, food.size, food.size);  
 	//context.font = "48px serif";
    //context.fillStyle = 'white';
    
    //prints name of menu in top left corner
 	context.fillText(menu.name, 100, 200);
 	
 	
 	context.fillText('bag', 400, 150);
 	if(bag[0] != null)context.fillText(bag[0].name, 400, 200);
 	if(bag[1] != null)context.fillText(bag[1].name, 400, 250);
 	//this is the default info screen
 	//---------------------------------------
 	if(menu.state.info){
 		context.fillText(menu.info,100,250);
 		context.fillText("next (PRESS SPACE)",350,400);
 		
 	// this is the prompt that asks you what you want to do in the city
 	//-------------------------------------
 	}else if(menu.state.prompt){
 		context.fillText(menu.prompt,100,250);
 		console.log("we made it");
 		
 		//this prints out the choices 50 spaces apart 
 		//if more than five it will wrap to the right 
 		
 		printList(menu.options);
 	//--------------------------------------	
 	//this creats the list of objects you can by in the shop	
 	}else if(menu.state.buy){
 		context.fillText(menu.shop,100,250);
 		console.log("we made it here");
 		
 		//this prints out the item choices 50 spaces apart 
 		//if more than five it will wrap to the right 
 		printList(menu.buy);	
 	}
 	//---------------------------------------
 }
 
 
 function gameLoop(){
 	draw();
 }
 
 setInterval(gameLoop,60);
 
 
 addEventListener("keydown", function(key){
 //-------------------------------------------------------
 //lets you move up options
    if(key.keyCode == "38"){
        console.log('up'); //d = "up";   
       
       if(menu.state.prompt) {
          scanUp(menu.options);
       } else if(menu.state.buy){
       	  scanUp(menu.buy);
       }
 
//---------------------------------------------------------
//lets you move up options        
    } else if(key.keyCode == "40"){
        console.log('down');  //d = "down";
        
        if(menu.state.prompt) {
          scanDown(menu.options);
       } else if(menu.state.buy){
       	  scanDown(menu.buy);
       }
    }
//---------------------------------------------------------
});


//space bar
addEventListener("keydown", function(key){ 
    if(key.keyCode == 32){
        if(menu.on == false){
        	menu.on = true;
        }else if(menu.state.info){
        	menu.state.info = false;
        	menu.state.prompt = true;
        //these are the possible choices for the prompt screen 
        //MUST BE SPECIFICALLY DEFINED
        //ONLY WORKS WITH BUY, SELL, SLEEP
        }else if(menu.state.prompt){
        	
        	for(var i = 0; i <= menu.options.length; ++i){
	        	if(menu.options[i].second) {
	        		menu.options[i].run();
	        	}
        	}
        } else if(menu.state.buy){
        	
        	for(var i = 0; i <= menu.buy.length; ++i){
        		console.log(menu.buy[i].second);
	        	if(menu.buy[i].second) {
	        		menu.buy[i].run();
	        	}
        	}
        }
        document.body.style.background = "violet";
    }
});

//Helper Functions
//////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------
//prints lists of options
function printList(list) {
	var locx = 0;
 	var locy = 50;
	
	for(var i = 0; i < list.length; ++i){
		//prints yellow if on option
		if(list[i].second) {
			context.fillStyle = 'yellow';
			context.fillText(list[i].first,100 + locx,250 + locy);
		//prints black if not on option
		} else if(list[i].second == false) {
			context.fillStyle = 'black';
			context.fillText(list[i].first,100 + locx,250 + locy);
		}
		// loops after 5
		if(i%5 == 0 && i != 0) {
			locx += 50;
			locy = 50;
		}
		locy += 50;
	}	
}
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
//scans down the printed list
function scanDown(list){
	for(var i = 0; i <= list.length; ++i){
    	if(list[i].second) {
    		if(list[i + 1].second != null){
    			list[i].second = false;
    			list[i + 1].second = true;
    			break;
    		}
    	}
	}
}
//-------------------------------------------------------------------------
//scans up the printed list
function scanUp(list){
	for(var i = 0; i <= list.length; ++i){
		if(list[i].second) {
			if(list[i - 1].second != null){
				list[i].second = false;
				list[i - 1].second = true;
				break;
			}
		}
	}
}
//--------------------------------------------------------------------------