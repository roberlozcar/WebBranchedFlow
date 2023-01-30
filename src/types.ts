export class vec2{
    x:number=0;
    y:number=0;

    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }

    public mul(k:number):void{
        this.x*=k;
        this.y*=k;
    }
  };

export type vec3={
    x:number;
    y:number;
    z:number;
}
  
  export class parameter{
  
    constructor(par:number,step:number,angle:number,zoom:vec2,trans:vec2,mod:boolean,transparency:number){
        this.particles=par;
        this.step=step;
        this.maxangle=angle;
        this.zoom=zoom;
        this.alpha=transparency;
        this.translation=trans;
        this.mode=mod;
    };
  
    particles: number=250;
    step:number=250;
    maxangle:number=Math.PI/3.;
    zoom:vec2=new vec2(0.02,0.02);
    translation:vec2=new vec2(0.,0.);
    alpha:number=0.5;
    mode:boolean=false;
  
    public getmatrix():number[]{
        return [this.zoom.x,0.,0.,this.translation.x,
        0.,this.zoom.y,0.,0.,this.translation.y,
        0.,0.,1.,0.,
        0.,0.,0.,1.];
    }

    public randompointandvelocity():vec2[]{
        let position:vec2;
        let velocity:vec2;
        if(this.mode){
            let rand=(Math.random()*2-1)*this.maxangle;
            velocity=new vec2(Math.cos(rand),Math.sin(rand));
            position=velocity;
            position.mul(0.1);
        }else{
            let rand=(Math.random()*2-1)*this.maxangle;
            velocity=new vec2(Math.cos(rand),Math.sin(rand));
            rand=(Math.random()*2-1)*this.maxangle;
            position=new vec2(0.,(Math.random()-1)*.5);
        }

        return [position,velocity];
    }

  }