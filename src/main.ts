import { renderer } from "./renderer";
import { parameter, MODE } from "./types";
import { InitScript, RunScript} from "./Scripts";

window.onload=()=>{
  const render=new renderer();
  const buttonfocal=<HTMLButtonElement>document.getElementById("buttonfocal");
  const buttondisk=<HTMLButtonElement>document.getElementById("buttondisk");
  const buttondirectional=<HTMLButtonElement>document.getElementById("buttondirectional");
  const runbutton=<HTMLButtonElement>document.getElementById("runbutton");
  let par:parameter=new parameter();
  buttonfocal.addEventListener("click",() =>{
    InitScript(MODE.Focal);
    par.mode=MODE.Focal;
  })
  buttondisk.addEventListener("click",() =>{
    InitScript(MODE.Radial);
    par.mode=MODE.Radial;
  })
  buttondirectional.addEventListener("click",() =>{
    InitScript(MODE.Directional);
    par.mode=MODE.Directional;
  })
  runbutton.addEventListener("click",()=>{
    RunScript(render,par);
  })
}

