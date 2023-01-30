import { renderer } from "./renderer";
import { parameter } from "./types";

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



function RunScript(disk:boolean):void{
  let par:parameter;
  par.particles=parseFloat((<HTMLInputElement>document.getElementById("input1")).value);
  par.step=parseFloat((<HTMLInputElement>document.getElementById("input2")).value);
  par.alpha=parseFloat((<HTMLInputElement>document.getElementById("input3")).value);
  
  render.draw(calculation(par),par);
}


function calculation(par:parameter):number[][]{
    let position: number[][]=new Array(2*par.particles);
    let velocity:number[]=new Array(2);
    let w:number[]=new Array(10);
    let phi:number[]=new Array(10);
    for(let i=0;i<10;++i){
      w[i]=Math.random()*2.;
      phi[i]=Math.random()*2.*Math.PI;
    }
    for(let i=0; i<par.particles;++i){
      position[i]=new Array(par.step);
      if(par.mode){
        let randangle=Math.random()*2*Math.PI;
        velocity=[Math.cos(randangle),Math.sin(randangle)];
        position[i][0]=velocity[0]*.2;
        position[i][1]=velocity[1]*.2;
      }else{
        position[i][0]=(Math.random()-.5)*0.2;
        position[i][1]=0.;
        let randangle=(Math.random()-.5)*Math.PI*.25;
        velocity=[Math.cos(randangle),Math.sin(randangle)];
      }
      for(let j=1;j<par.step;++j){
        for(let k=0;k<10;++k){
          velocity[0]+=0.0025*(-w[k]*Math.sin(w[k]*position[i][2*(j-1)]*phi[k])+Math.cos(w[k]*position[i][2*(j-1)+1]+phi[k]));
          velocity[1]+=0.0025*(-w[k]*Math.sin(w[k]*position[i][2*(j-1)+1]*phi[k])+Math.cos(w[k]*position[i][2*(j-1)]+phi[k]));
        }
        position[i][2*j]=position[i][2*(j-1)]+velocity[0];
        position[i][2*j+1]=position[i][2*(j-1)+1]+velocity[1];
      }
    }

    return position;
}
