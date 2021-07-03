
let title = document.getElementById("level_title");
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let menu__ = document.getElementById("menu");
let level__ = document.getElementById("level");
let level_storage = document.getElementById("level_storage");


let width = c.width;
let height = c.height;
let ammount_of_boxes = 10;
let grid = [];
let p, e, d, d2;
let rendering_lock = true;
let dice_count;
let movement_stack = [];
let level_number = 0;
let toggle_compass = false;
let compass;
let grid_size = width/ammount_of_boxes;;
let padding = grid_size/15;
let dot_radius = grid_size/10;
let replay_stack = [];
let pop_first = true;

let toggle_hints = false;
let hints = [];



document.addEventListener('keydown', function(event){
    if(event.keyCode == 32){
        toggle_compass = !toggle_compass;
    }

    if(event.keyCode == 82){
        replay_stack = [];
        setup(level_number);
    }

    if(event.keyCode == 84){
        toggle_hints = !toggle_hints;
    }

    if(event.keyCode == 69 && replay_stack.length > 0){
        // if(pop_first){
        //     replay_stack.pop();
        //     pop_first = false;
        // }
        let x = replay_stack.pop();
        grid = x;
        console.log(grid);
        render();
    }else{

        for(let p of grid){
            if(p.OBJECT_TAG == "Player" && !toggle_compass){  
                pop_first = true;
                let t = p.move(event.keyCode);
    
                if(t){

                    let u = [];
                    for(let g of grid){
                        u.push(_.cloneDeep(g))
                    }

                    replay_stack.push( u );
                    if(replay_stack.length > 100){
                        replay_stack.shift();
                    } 
                }
            }
        }
    }

    console.log(replay_stack);
    render();
} );



function declare_buttons(level_count){

    for(let i = 1; i < level_count + 1; i ++){
        let a = document.createElement("a");
        
        let button = document.createElement("BUTTON");
        button.className = 'level_button';
        button.id = 'button_'+i;
        button.innerHTML = "Level " + i;
        
        a.setAttribute('onclick', "setup("+i+")");

        a.appendChild(button)

        console.log(a)
        level_storage.appendChild(a);
    }
}

function setup(level){

    rendering_lock = true;
    level_number = level;

    fetch("/levels/level_" + level_number + ".json").then(response => {
        return response.json();
    }).then(data => load_level(data));
   
    compass = new Compass();
    
    render();
    level__.style.display = "block";  
    menu__.style.display = "none";
    
}

function back_to_menu(){
    level__.style.display = "none";
    menu__.style.display = "block";
}

function load_level(data){

    title.innerHTML = data.level_name;

    ammount_of_boxes = data.level_size;
    grid_size = width/ammount_of_boxes;

    grid = [];

    grid.push(new Player(data.player.x, data.player.y))

    dice_count = 0;
    for(let d of data.dice){
        grid.push(new Dice(d.order, d.x, d.y))
        dice_count += 1;
    }

    for(let r of data.receptacle){
        grid.push(new Receptacle(r.face, r.x, r.y))
    }

    for(let b of data.barrier){
        grid.push(new Barrier(b.x, b.y))
    }

    for(let p of data.pusher){
        grid.push(new Pusher(p.x, p.y))
    }

    for(let h of data.hints){
        hints.push(new Hints(h.face, h.x, h.y))
    }
    
    
    set_border();
    let u = [];
    for(let g of grid){
        u.push(_.cloneDeep(g))
    }
    replay_stack.push(u);
    render();

}

function set_border(){
    for(let i = 0; i < ammount_of_boxes+1; i++){
        grid.push(new Barrier(i, -1));
        grid.push(new Barrier(-1, i));
        grid.push(new Barrier(i, ammount_of_boxes));
        grid.push(new Barrier(ammount_of_boxes, i));
    }
}

function render() {

    ctx.clearRect(0, 0, width, height);

    let gate_count = 0;
    for(let g of grid){
        if(g.OBJECT_TAG == 'Gate'){
            gate_count += 1;
        }
    }

    if(dice_count == gate_count){
        console.log('Level Complete');
        let button = document.getElementById("button_"+ level_number);
        button.style.background = '#1e873d';

        dice_count = 0;
        gate_count = 0;
        setTimeout(back_to_menu, 1000);
    }   

    if(toggle_compass){
        compass.display();
    }else{
        loop();
    }
}


function loop(){
    this.draw_grid_lines();
    console.log('GRID:', grid)

    if(toggle_hints){
        for(let h of hints){
            h.display();
        }
    }

    for(let g of grid){
        g.display();
    }
    c.style.borderColor = '#312d36'
}

function draw_grid_lines(){
    ctx.beginPath();
    ctx.strokeStyle = "#332f38";
    ctx.lineWidth = 2;
    for(let i = grid_size; i < c.width; i+=grid_size){
        ctx.moveTo(i, 0);
        ctx.lineTo(i, c.height);

        ctx.moveTo(0, i);
        ctx.lineTo(c.width, i);
    }
    ctx.stroke();    
}