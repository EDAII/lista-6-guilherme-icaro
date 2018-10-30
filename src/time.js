let time = (function () {
    class Time {
        constructor() {
            this.lastUpdate = 0;
            this.graphics = main.graphics;
        }

        setTime() {
            let that = this;
            this.lastUpdate = Date.now();
            setInterval(() => this.loop(), 2.08335);// 8.3334);//16.6667);
        }

        loop() {
            let now = Date.now();
            let dt = now - this.lastUpdate;
            this.lastUpdate = now;
            this.updateGame(dt);
        }

        updateGame(dt) {
                // clear all canvas
                let ctx = this.graphics.canvas.element.getContext('2d');
                ctx.clearRect(0, 0, this.graphics.canvas.width, this.graphics.canvas.height);
                this.graphics.canvas.setBackgroundColor(this.graphics.canvas.color);

                // move all objects
                for (let j in this.graphics.objects) {
                    this.graphics.objects[j].update();
                }

                // show fps
                ctx.fillStyle = 'black';
                ctx.fillText('fps:' + parseFloat(1/(dt/1000)).toFixed(2) + 'ms', 5, 10);
        }

    }

    new Time().setTime();

}());
