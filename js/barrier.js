class Barrier{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.OBJECT_TAG = 'Barrier';

        this.display();   
    }

    display(){
        ctx.fillStyle = 'black';
        ctx.roundRect(this.x * grid_size + padding, this.y * grid_size + padding, grid_size - padding * 2, grid_size - padding * 2, dot_radius*2);
        ctx.fill();   
    }

}