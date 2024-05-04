    // const cnv = document.getElementById (`c2`)
    //    cnv.width = cnv.parentNode.scrollWidth
    //    cnv.height = cnv.width * 9 / 16
    // const ctx = cnv.getContext (`2d`)



    //Created by Ren Yuan
  

    const renderer = new c2.Renderer(document.getElementById('c2'));
    resize();

    renderer.background('#cccccc');
    let random = new c2.Random();
    //
    let image = new Image();
    image.src = "Art.jpeg"; // Replace with your image path

    let pattern;
    image.onload = function() {
    pattern = renderer.context.createPattern(image,"no-repeat");
    };
    

    class Agent extends c2.Cell{
        constructor() {
            let x = random.next(renderer.width);
            let y = random.next(renderer.height);
            let r = random.next(renderer.width / 40, renderer.width / 15);
            super(x, y, r);

            this.vx = random.next(-2, 2);
            this.vy = random.next(-2, 2);
            
            this.color = c2.Color.hsl(random.next(0, 30), random.next(30, 60), random.next(20, 100));
            

        }

        update(){
            this.p.x += this.vx;
            this.p.y += this.vy;

            if (this.p.x < 0) {
                this.p.x = 0;
                this.vx *= -1;
            } else if (this.p.x > renderer.width) {
                this.p.x = renderer.width;
                this.vx *= -1;
            }
            if (this.p.y < 0) {
                this.p.y = 0;
                this.vy *= -1;
            } else if (this.p.y > renderer.height) {
                this.p.y = renderer.height;
                this.vy *= -1;
            }
        }

        display() {
            if (this.state != 2) {
                // renderer.stroke(c2.Color.rgb(0, .2));
                // renderer.lineWidth(1);
                if (pattern) {
                    renderer.fill(pattern);
                  } else {
                    renderer.fill(this.color);
                  }
                  renderer.polygon(this.polygon(4));
                renderer.stroke('#333333');
                renderer.lineWidth(1);
                renderer.point(this.p.x, this.p.y);
                
    // Generate a random color for the overlay
    // let overlayColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    let overlayColor = c2.Color.hsl(random.next(0, 30), random.next(30, 60), random.next(20, 100), 0.5);
    // Draw a semi-transparent rectangle over the pattern to serve as the overlay
    renderer.fill(overlayColor);
    renderer.polygon(this.polygon(4));

        }
    }
        
    }


    let agents = new Array(15);
    for (let i = 0; i < agents.length; i++) {
        agents[i] = new Agent();
    }


    renderer.draw(() => {
        let voronoi = new c2.LimitedVoronoi();
        voronoi.compute(agents);

        for (let i = 0; i < agents.length; i++) {
            agents[i].display();
            agents[i].update();
        }
    });


    window.addEventListener('resize', resize);
    function resize() {
        let parent = renderer.canvas.parentElement;
        renderer.size(parent.clientWidth, parent.clientWidth / 16 * 9);
    }