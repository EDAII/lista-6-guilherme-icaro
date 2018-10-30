let graphics = (function(){

    let objects = [];
    let canvas = new Object();
    let collidableObjects = [];

    class BaseObject {
        constructor(width, height, x, y){
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
        }
        update(){
            let ctx = graphics.canvas.element.getContext('2d');
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Square extends BaseObject {
        constructor(width, height, x, y, color){
            super(width, height, x, y);
            this.speedX = 0;
            this.speedY = 0;
            this.color = color;
        }

        update(){
            let ctx = graphics.canvas.element.getContext('2d');
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Canvas {
        constructor(width, height, color){
            this.element = document.createElement('canvas');
            this.id ='main-canvas';
            this.height = height;
            this.width = width;
            this.color = color;
            // this.objects = [];

            this.element.id = this.id;
            this.element.height = this.height;
            this.element.width = this.width;
            this.element.color = this.color;

            graphics.canvas = this;
        }

        addObject(baseObject){
            graphics.objects.push(baseObject);
        }

        deleteObject(baseObject){
            const index = graphics.objects.indexOf(baseObject);
            if (index !== -1) {
                graphics.objects.splice(index, 1);
            }
        }

        setBackgroundColor(color){
            this.color = color;
            this.element.color = this.color;
            let ctx = this.element.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    return{
        Canvas,
        Square,
        objects,
        canvas,
        BaseObject,
        collidableObjects
    }
}());
