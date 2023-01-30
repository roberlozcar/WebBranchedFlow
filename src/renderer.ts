import { vssource, fssource} from "./shadersources";
import { parameter,vec2 } from "./types";

export class renderer{

    constructor(){
      this.setupwebgl();
    };
  
    private gl:WebGL2RenderingContext;
    private program:WebGLProgram; 
    private upos:number;
    private utrans:WebGLUniformLocation;
    private ualpha:WebGLUniformLocation;
    private bufferpos:WebGLBuffer;
  
    private setupwebgl():void{
      const canvas=<HTMLCanvasElement>document.getElementById("gl");
      canvas.width=canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      this.gl=canvas.getContext('webgl2');
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      
      let vertexshader:WebGLShader=this.gl.createShader(this.gl.VERTEX_SHADER);
      let fragmenshader:WebGLShader=this.gl.createShader(this.gl.FRAGMENT_SHADER);
      
      this.gl.shaderSource(vertexshader,vssource);
      this.gl.compileShader(vertexshader);
      if (!this.gl.getShaderParameter(vertexshader, this.gl.COMPILE_STATUS)) {
        console.error(this.gl.getShaderInfoLog(vertexshader));
      
      }
      
      this.gl.shaderSource(fragmenshader,fssource)
      this.gl.compileShader(fragmenshader);
      if (!this.gl.getShaderParameter(fragmenshader, this.gl.COMPILE_STATUS)) {
        console.error(this.gl.getShaderInfoLog(fragmenshader));
      }
      
      this.program=this.gl.createProgram();
      this.gl.attachShader(this.program,vertexshader);
      this.gl.attachShader(this.program,fragmenshader);
      this.gl.linkProgram(this.program);
      if(!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){
        console.error(this.gl.getProgramInfoLog(this.program));

      }

      this.gl.clearColor(0.,0.,0.,0.);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.DST_ALPHA);
      this.gl.disable(this.gl.DEPTH_TEST);

      this.gl.useProgram(this.program);
      this.utrans=this.gl.getUniformLocation(this.program,'trans');
      this.upos=this.gl.getAttribLocation(this.program,'pos');
      this.ualpha=this.gl.getUniformLocation(this.program,'alpha');
      this.bufferpos=this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferpos);
    }
  
    public draw(position:number[][],par:parameter):void{

      this.gl.clearColor(1.,0.,0.,1.);

      const trans=par.getmatrix();
      this.gl.uniformMatrix4fv(this.utrans,true,trans);
      this.gl.uniform1f(this.ualpha,par.alpha);

      for(let i=0;i<position.length;++i){
        this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(position[i]),this.gl.DYNAMIC_DRAW);
        this.gl.vertexAttribPointer(this.upos, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.upos);
        this.gl.drawArrays(this.gl.LINE_STRIP,0,position[i].length*.5);
      }
    }      
}