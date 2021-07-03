


class Pusher{

    constructor(x, y){

        this.x = x;
        this.y = y;


        this.movement_delay = [this.x, this.y];

        this.OBJECT_TAG = 'Pusher';

        this.display();
        
    }

    display(){
        ctx.fillStyle = '#999';
        ctx.roundRect(this.x * grid_size + padding, this.y * grid_size + padding, grid_size - padding * 2, grid_size - padding * 2, dot_radius*2);
        ctx.fill();

        ctx.fillStyle = '#333';
        ctx.roundRect(this.x * grid_size + padding + 5, this.y * grid_size + padding + 5, (grid_size - padding * 2)-10, (grid_size - padding * 2)-10, dot_radius*2);
        ctx.fill();
    }

    

    
}