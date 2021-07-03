
class Hints{

    constructor(face, x, y){

        this.x = x;
        this.y = y;
        this.face = face;
        this.OBJECT_TAG = 'Hint';

        this.display();
        
    }

    display(){
        ctx.fillStyle = '#877d56';
        ctx.roundRect(this.x * grid_size + padding, this.y * grid_size + padding, grid_size - padding * 2, grid_size - padding * 2, dot_radius*2);
        ctx.fill();

        
        ctx.fillStyle = 'black';
        let face_index = this.face - 1;

        

        for(let d of dot_requirements[face_index]){ 
            ctx.beginPath();
            ctx.arc(get_dot_locations(this.x, this.y)[d][0], get_dot_locations(this.x, this.y)[d][1], dot_radius, 0, 2 * Math.PI); 
            ctx.fill(); 
        }
    }

}