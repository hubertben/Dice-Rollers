
class Player{

    constructor(x, y){
        this.x = x;
        this.y = y;

        this.allow_movement = true;

        this.affected = [];
        this.movement_delay = [this.x, this.y];

        this.OBJECT_TAG = 'Player';

        this.display();
    }

    move(direction){
        this.affected = [];

        let rotate_direction = '';

        let return_effect = false;

        if(direction == 38 || direction == 87){
            rotate_direction = 'up'
            this.stack_move(this, rotate_direction, [0, -1]);
            if(this.allow_movement)
                this.y -= 1
                return_effect = true;
                
        }
        if(direction == 39 || direction == 68){
            rotate_direction = 'right'
            this.stack_move(this, rotate_direction, [1, 0]);
            if(this.allow_movement)    
                this.x += 1;
                return_effect = true;
        }
        if(direction == 40 || direction == 83){
            rotate_direction = 'down'
            this.stack_move(this, rotate_direction, [0, 1]);
            if(this.allow_movement)
                this.y += 1;
                return_effect = true;
        }
        if(direction == 37 || direction == 65){
            rotate_direction = 'left'
            this.stack_move(this, rotate_direction, [-1, 0]);
            if(this.allow_movement)
                this.x -= 1;
                return_effect = true;
        }


        if(this.allow_movement){
            
            for(let a of this.affected){
                
                if(a.OBJECT_TAG == 'Dice' && a == this.affected[this.affected.length-1]){
                    a.rotate(rotate_direction);
                }

                console.log(a)

                if(a.OBJECT_TAG != 'Receptacle' && a.OBJECT_TAG != 'Gate' ){
                    a.x += a.movement_delay[0];
                    a.y += a.movement_delay[1];
                }
            }
            
        }

        this.allow_movement = true;
        this.display();
        return return_effect;
    }

    
    
    stack_move(object, direction, movement){ // movement is [x, y]
        for(let g of grid){
            if(g != object && g.OBJECT_TAG != 'Player' && g.x == object.x + movement[0] && g.y == object.y + movement[1]){
                
                this.affected.push(g);
                
                
                if(g.OBJECT_TAG == 'Barrier'){  
                    this.allow_movement = false;
                }

                if(this.affected[this.affected.length - 1].OBJECT_TAG == 'Receptacle'){
                    
                    if(this.affected.length > 1 && this.affected[this.affected.length - 2].OBJECT_TAG == 'Dice'
                    && this.affected[this.affected.length - 1].face == this.affected[this.affected.length - 2].face){  
                        

                        let _x = this.affected[this.affected.length - 1].x;
                        let _y = this.affected[this.affected.length - 1].y;
                        let _face = this.affected[this.affected.length - 1].face;

                        grid.push(new Gate(_face, _x, _y));

                        for(let g = 0; g < grid.length; g++){
                            
                            if(grid[g] == this.affected[this.affected.length - 2]){
                                grid.splice(g, 1);
                            }
                            if(grid[g] == this.affected[this.affected.length - 1]){
                                grid.splice(g, 1);
                            }
                        }

                    }else if(g.OBJECT_TAG == 'Receptacle'){
                        this.allow_movement = false;
                    }

                    

                }

                if(g.OBJECT_TAG == 'Pusher'){
                    
                    g.movement_delay[0] = movement[0];
                    g.movement_delay[1] = movement[1];
                    this.stack_move(g, direction, movement);
                }

                if(g.OBJECT_TAG == 'Dice'){
                    
                    g.movement_delay[0] = movement[0];
                    g.movement_delay[1] = movement[1];
                    this.stack_move(g, direction, movement);
                }
            }
        }
    }

    display(){
        ctx.beginPath();
        ctx.fillStyle = '#006663';
        ctx.arc(this.x * grid_size + (grid_size/2), this.y * grid_size + (grid_size/2), grid_size/3, 0, 2 * Math.PI);// * grid_size - (grid_size/2)
        ctx.fill(); 
    }

}