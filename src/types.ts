export class vec2{
    public x:number=0;
    public y:number=0;

    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }

    public mul(k:number):vec2{
        
        return new vec2(this.x*k,this.y*k);
    }

    public sum(v:vec2):vec2{
        return new vec2(this.x+v.x,v.y+this.y);
    }

    public toarray():number[]{
        return[this.x,this.y];
    }
  };

export type vec3={
    x:number;
    y:number;
    z:number;
}
  
  export class parameter{
  
    constructor(par?:number,step?:number,angle?:number,zoom?:vec2,trans?:vec2,mod?:boolean,transparency?:number,strength?:number){
        this.particles=par?? 250;
        this.step=step?? 125;
        this.maxangle=angle?? Math.PI/4.;
        this.zoom=zoom?? new vec2(0.02,0.02);
        this.alpha=transparency?? 0.5;
        this.translation=trans?? new vec2(0.,0.);
        this.mode=mod?? false;
        this.strength=strength?? 0.0025;
    };
  
    public particles: number=250;
    public step:number=125;
    public maxangle:number=Math.PI/3.;
    public zoom:vec2=new vec2(0.02,0.02);
    public translation:vec2=new vec2(0.,0.);
    public alpha:number=0.5;
    public mode:boolean=false;
    public strength:number=0.0025;
  
    public getmatrix():number[]{
        return [this.zoom.x,0.,0.,this.translation.x,
        0.,this.zoom.y,0.,this.translation.y,
        0.,0.,1.,0.,
        0.,0.,0.,1.];
    }

    public randompointandvelocity():vec2[]{
        let position:vec2;
        let velocity:vec2;
        if(this.mode){
            let rand=Math.random()*2.*Math.PI;
            velocity=new vec2(Math.cos(rand),Math.sin(rand));
            position=velocity.mul(0.1);
        }else{
            let rand=(Math.random()*2-1)*this.maxangle;
            velocity=new vec2(Math.cos(rand),Math.sin(rand));
            rand=(Math.random()*2-1)*this.maxangle;
            position=new vec2(0.,(Math.random()-1)*.5);
        }

        return [position,velocity];
    }

  }