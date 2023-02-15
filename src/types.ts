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
  
export enum MODE{
    Focal=1,
    Radial=0,
    Directional=2,
};

  export class parameter{
  
    constructor(par?:number,step?:number,angle?:number,zoom?:vec2,initpos?:vec2,mod?:number,transparency?:number,strength?:number){
        this.particles=par?? 250;
        this.step=step?? 125;
        this.maxangle=angle?? Math.PI/4.;
        this.zoom=zoom?? new vec2(0.02,0.02);
        this.alpha=transparency?? 0.5;
        this.mode=mod?? MODE.Focal;
    };
  
    public particles: number=250;
    public step:number=125;
    public maxangle:number=Math.PI/3.;
    public zoom:vec2=new vec2(0.02,0.02);
    public translation:vec2=new vec2(0.,0.);
    public alpha:number=0.5;
    public energy:number=1.;
    public mode:MODE=MODE.Focal;
    public initpos:vec2=new vec2(0.,0.);


  
    public getmatrix():number[]{
        return [this.zoom.x,0.,0.,-this.initpos.x*(this.zoom.x-1)+this.translation.x,
        0.,this.zoom.y,0.,-this.initpos.y*(this.zoom.y-1)+this.translation.y,
        0.,0.,1.,0.,
        0.,0.,0.,1.];
    }

    public initrandom():vec2[]{
        let velocity:vec2;
        let position:vec2;
        let angle:number;
        switch(this.mode){
            case MODE.Focal:
                angle=(2.*Math.random()-1)*this.maxangle;
                velocity=new vec2(Math.cos(angle),Math.sin(angle)).mul(this.energy);
                position=this.initpos;
                break;
            case MODE.Radial:
                angle=Math.random()*2*Math.PI;
                velocity=new vec2(Math.cos(angle),Math.sin(angle)).mul(this.energy);
                position=this.initpos;
                break;
            default:
                velocity=new vec2(this.energy,0);
                let y=(2*Math.random()-1)/this.zoom.y;
                position=new vec2(this.initpos.x,y);
                break;
        }

        return [position,velocity];

    }

  }