
class Compass {


    constructor() {

    }

    display() {
        this.draw_background();
        this.draw_grid_lines();
        this.draw_dice();
    }

    draw_background() {
        ctx.beginPath();
        ctx.fillStyle = "#3c5252";
        ctx.rect(0, 0, width, height);
        ctx.fill();

        c.style.borderColor = '#476969'
    }


    draw_grid_lines() {
        ctx.beginPath();
        ctx.strokeStyle = "#476969";
        ctx.lineWidth = 2;
        for (let i = grid_size; i < c.width; i += grid_size) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, c.height);

            ctx.moveTo(0, i);
            ctx.lineTo(c.width, i);
        }
        ctx.stroke();
    }

    draw_dice() {
        for (let g of grid) {
            if (g.OBJECT_TAG == 'Dice') {


                this.draw_ghost_dice(g)

            }
        }

    }

    draw_ghost_dice(grid_object) {

        ctx.fillStyle = '#4f8080';

        let x = grid_object.x;
        let y = grid_object.y;

        ctx.roundRect(x * grid_size + padding, y * grid_size + padding, grid_size - padding * 2, grid_size - padding * 2, dot_radius * 2);
        ctx.fill();

        let size = 20;

        ctx.fillStyle = 'white';
        ctx.font = size+"px Ubuntu Mono";

        let x_center = (x * grid_size + padding) + (grid_size/2) - (size/2);
        let y_bot = (y * grid_size + padding) + (grid_size) - size;
        let y_top = (y * grid_size + padding) + size;

        let y_center = (y * grid_size + padding) + (grid_size/2);
        let x_left = (x * grid_size + padding) + size/2;
        let x_right = (x * grid_size + padding) + (grid_size - (size * 1.5));

        ctx.fillText(grid_object.orientation[1], x_center, y_bot); 

        ctx.fillText(grid_object.orientation[4], x_right, y_center); 

        ctx.fillText(grid_object.orientation[3], x_center, y_top); 

        ctx.fillText(grid_object.orientation[2], x_left, y_center); 

        ctx.fillText(grid_object.orientation[0], x_center, y_center); 

    }

}