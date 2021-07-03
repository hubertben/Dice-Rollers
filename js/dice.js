
let dot_requirements = [[3], [1, 5], [0, 3, 6], [0, 1, 5, 6], [0, 1, 3, 5, 6], [0, 1, 2, 4, 5, 6]]

function get_dot_locations(x, y){

    let half = (grid_size/2 - padding);
    let quarter = (grid_size/4 - padding);
    let three_quarter = (grid_size/1.35 - padding);

    let dot_locations = [
        [(x * grid_size + padding) + quarter,       (y * grid_size + padding) + quarter], 
        [(x * grid_size + padding) + three_quarter, (y * grid_size + padding) + quarter], 
        [(x * grid_size + padding) + quarter,       (y * grid_size + padding) + half],
        [(x * grid_size + padding) + half,          (y * grid_size + padding) + half],
        [(x * grid_size + padding) + three_quarter, (y * grid_size + padding) + half],
        [(x * grid_size + padding) + quarter,       (y * grid_size + padding) + three_quarter],
        [(x * grid_size + padding) + three_quarter, (y * grid_size + padding) + three_quarter]
    ]
    return dot_locations;
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
}


class Dice{

    constructor(orientation, x, y){
        this.orientation = orientation; // [4, 6, 5, 1, 2, 3] // front, top, right, bottom, left, back
        this.x = x;
        this.y = y;
        this.face = this.orientation[0];

        this.movement_delay = [this.x, this.y];

        this.OBJECT_TAG = 'Dice';

        this.display();
        
    }

    display(){
        ctx.fillStyle = '#ffffff';
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

    rotate(push_direction){
        let preserve_orientation = this.orientation;

        switch(push_direction){ // 4 -> 1
            case 'up':
                this.face = this.orientation[3];
                this.rotate_new_orientation(preserve_orientation, [3, 0, 2, 5, 4, 1]);
                    break;
            case 'right': // 4 -> 2
                this.face = this.orientation[4];
                this.rotate_new_orientation(preserve_orientation, [4, 1, 0, 3, 5, 2]);
                break;
            case 'down': // 4 -> 6
                this.face = this.orientation[1];
                this.rotate_new_orientation(preserve_orientation, [1, 5, 2, 0, 4, 3]);
                break;
            case 'left': //4 -> 5
                this.face = this.orientation[2];
                this.rotate_new_orientation(preserve_orientation, [2, 1, 5, 3, 0, 4]);
                break;
        }
    }

    rotate_new_orientation(preserve_orientation, new_o){
        this.orientation = [
            preserve_orientation[new_o[0]],
            preserve_orientation[new_o[1]], 
            preserve_orientation[new_o[2]], 
            preserve_orientation[new_o[3]], 
            preserve_orientation[new_o[4]], 
            preserve_orientation[new_o[5]]
        ]
    }
}