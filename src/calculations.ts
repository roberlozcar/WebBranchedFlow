import { parameter,vec2 } from "./types";

export function calculation(par:parameter):number[][]{
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
      [pos,velocity]=par.initrandom();
      position[i]=new Array(2*par.step);
      [position[i][0],position[i][1]]=pos.toarray();
      for(let j=1;j<par.step;++j){
        for(let k=0;k<w.length;++k){
          velocity.x+=.0025*(-w[k]*Math.sin(w[k]*pos.x*phi[k])+Math.cos(w[k]*pos.y+phi[k]));
          velocity.y+=.0025*(-w[k]*Math.sin(w[k]*pos.y*phi[k])+Math.cos(w[k]*pos.x+phi[k]));
        }
        pos=pos.sum(velocity);
        [position[i][2*j],position[i][2*j+1]]=pos.toarray();
      }
    }

    return position;
}