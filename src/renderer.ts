import { vssource, fssource} from "./shadersources";

export class renderer{

    constructor(){
      this.setupwebgl();
    };
  
    private gl:WebGL2RenderingContext;
    private program:WebGLProgram; 
  
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
    }
  
    public draw(position:number[][],alpha:number):void{

      this.gl.clearColor(1.,0.,0.,1.);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.DST_ALPHA);

      this.gl.useProgram(this.program);

      let utrans=this.gl.getUniformLocation(this.program,'trans');
      let trans=[.02, 0., 0., -1., 
        0., 0.02, 0., 0., 
        0., 0., 1., 0., 
        0., 0., 0., 1.];
      this.gl.uniformMatrix4fv(utrans,true,trans);

      let upos=this.gl.getAttribLocation(this.program,'pos');
      let ualpha=this.gl.getUniformLocation(this.program,'alpha');

      this.gl.uniform1f(ualpha,alpha);
      
      let bufferpos=this.gl.createBuffer();
      
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER,bufferpos);
        this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(position[0]),this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(upos, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(upos);

      for(let i=1;i<position.length;++i){
        this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(position[i]),this.gl.STATIC_DRAW);
        this.gl.drawArrays(this.gl.LINE_STRIP,0,position[1].length*.5);
      }
  }
}