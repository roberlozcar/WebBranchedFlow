import { renderer } from "./renderer";

var render:renderer;
window.onload=()=>{
  render=new renderer();
  let button=<HTMLButtonElement>document.getElementById("button1");
  button.addEventListener("click",() =>{
    RunScript();
  })
}

function RunScript():void{
  let par1:number=parseFloat((<HTMLInputElement>document.getElementById("input1")).value);
  let par2:number=parseFloat((<HTMLInputElement>document.getElementById("input2")).value);
  let par3:number=parseFloat((<HTMLInputElement>document.getElementById("input3")).value);
  render.draw(calculation(par1,par2),par3);
}

  function calculation(par1:number,par2:number):number[][]{
    let position: number[][]=new Array(2*par1);
    let velocity:number[]=new Array(2);
    let w:number[]=new Array(10);
    let phi:number[]=new Array(10);
    for(let i=0;i<10;++i){
      w[i]=Math.random()*2.;
      phi[i]=Math.random()*2.*Math.PI;
    }
    for(let i=0; i<par1;++i){
      position[i]=new Array(par2);
      position[i][0]=(Math.random()-.5)*0.2;
      position[i][1]=0.;
      let randangle=(Math.random()-.5)*Math.PI*.25;
      velocity=[Math.cos(randangle),Math.sin(randangle)];
      for(let j=1;j<par2;++j){
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
