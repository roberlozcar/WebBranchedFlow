import { renderer } from "./renderer";
import { parameter, vec2 } from "./types";

var render:renderer;
window.onload=()=>{
  render=new renderer();
  const buttonnormal=<HTMLButtonElement>document.getElementById("buttonnormal");
  const buttondisk=<HTMLButtonElement>document.getElementById("buttondisk");
  buttonnormal.addEventListener("click",() =>{
    RunScript(false);
  })
  buttondisk.addEventListener("click",() =>{
    RunScript(true);
  })
}



function RunScript(mode:boolean):void{
  let par:parameter= new parameter();
  par.particles=parseFloat((<HTMLInputElement>document.getElementById("input1")).value);
  par.step=parseFloat((<HTMLInputElement>document.getElementById("input2")).value);
  par.alpha=parseFloat((<HTMLInputElement>document.getElementById("input3")).value);
  par.mode=mode;
  if(!mode)par.translation=new vec2(-1.,0.);
  
  render.draw(calculation(par),par);
}


function calculation(par:parameter):number[][]{
    let position: number[][]=new Array(par.particles);
    let velocity:vec2;
    let w:number[]=new Array(10);
    let phi:number[]=new Array(10);
    let pos:vec2;
    for(let i=0;i<10;++i){
      w[i]=Math.random()*2.;
      phi[i]=Math.random()*2.*Math.PI;
    }
    for(let i=0; i<par.particles;++i){
      [pos,velocity]=par.randompointandvelocity();
      position[i]=new Array(2*par.step);
      for(let j=0;j<par.step;++j){
        for(let k=0;k<w.length;++k){
          velocity.x+=par.strength*(-w[k]*Math.sin(w[k]*pos.x*phi[k])+Math.cos(w[k]*pos.y+phi[k]));
          velocity.y+=par.strength*(-w[k]*Math.sin(w[k]*pos.y*phi[k])+Math.cos(w[k]*pos.x+phi[k]));
        }
        pos=pos.sum(velocity);
        [position[i][2*j],position[i][2*j+1]]=pos.toarray();
      }
    }

    return position;
}
