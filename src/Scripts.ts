import { calculation } from "./calculations";
import { renderer } from "./renderer";
import { MODE, parameter, } from "./types";

export function InitScript(mode:MODE):void{

    if(mode==MODE.Focal){
      document.querySelectorAll(".inoptional").forEach(function(el:HTMLElement){
        el.style.visibility="visible";
    });}
    else{
      document.querySelectorAll(".inoptional").forEach(function(el:HTMLElement){
        el.style.visibility="visible";
    });
      // document.getElementById("initposx").style.visibility="visible";
      // document.getElementById("initposy").style.visibility="visible";
      // document.getElementById("inputangle").style.visibility="visible";
    }
  }

  export function RunScript(render:renderer,par:parameter):void{
    par.particles=parseFloat((<HTMLInputElement>document.getElementById("input1")).value);
    par.step=parseFloat((<HTMLInputElement>document.getElementById("input2")).value);
    par.alpha=parseFloat((<HTMLInputElement>document.getElementById("input3")).value);
    par.energy=parseFloat((<HTMLInputElement>document.getElementById("inputenergy")).value);
      par.initpos.x=parseFloat((<HTMLInputElement>document.getElementById("initposx")).value);
      par.initpos.y=parseFloat((<HTMLInputElement>document.getElementById("initposy")).value);
      par.maxangle=parseFloat((<HTMLInputElement>document.getElementById("inputangle")).value)*Math.PI/180.;

    render.draw(calculation(par),par);

  }