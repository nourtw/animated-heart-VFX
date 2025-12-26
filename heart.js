const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize",resize);
function heart(t){
  return{
    x: 16 *Math.pow(Math.sin(t),3), y: 13 *Math.cos(t)- 5 *Math.cos(2*t)- 2 *Math.cos(3*t)- Math.cos(4*t)
  };
}
class Part{
  constructor(){
    this.t = Math.random() *Math.PI *2;
    this.speed = 0.002 +Math.random()*0.004;
    const p = heart(this.t);
    this.x = p.x*20;
    this.y = -p.y*20;
    this.vx = 0;
    this.vy = 0;
  }
  update(){
    const p = heart(this.t);
    const tx = p.x*20;
    const ty = -p.y*20;
    this.vx += (tx - this.x) *0.002;
    this.vy += (ty - this.y) *0.002;
    this.vx += Math.sin(this.t*12)*0.15;
    this.vy += Math.cos(this.t*10)*0.15;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *=0.98;
    this.vy *=0.98;
    this.t += this.speed;
  }
  draw(px,py){
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 + px,canvas.height/2 + py);
    ctx.lineTo(canvas.width/2 + this.x,canvas.height/2 + this.y);
    ctx.strokeStyle = "rgba(255,40,60,0.08)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
}
const particles = [];
for(let i=0;i<9000;i++){
  particles.push(new Part());
}
function animate(){
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = "lighter";
  particles.forEach(p=>{
    const px = p.x;
    const py = p.y;
    p.update();
    p.draw(px,py);
  });
  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(animate);
}
animate();