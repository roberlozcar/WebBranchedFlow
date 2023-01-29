export const vssource=`#version 300 es

in vec2 pos;

uniform mat4 trans;

void main() {
  gl_Position = trans*vec4(pos.x-1.,pos.y, 0.0, 1.0);
}`;

export const fssource=`#version 300 es
precision highp float;

out vec4 color;

uniform float alpha;

void main() {
  color = vec4(1.,1.,0.,alpha);
}`;

export const cssource=`#version 300 es
layout(local_size_x=1024) in;

layout(std430,binding=2) buffer pos{
	vec4 position[];
};

layout(std430,binding=3) buffer vel{
	vec2 velocity[];
};

uniform ivec2 size;

const uint gid=gl_GlobalInvocationID.x;

uniform float w[10];
uniform float phi[10];

void main(){

	vec2 pos=position[gid].xy;
	vec2 vel=velocity[gid];

	for(int i=0;i<10;++i){
	
		vel=vel+0.0025*(-w[i]*sin(w[i]*pos*phi[i])+cos(w[i]*pos.yx+phi[i]));
	
	}

	position[gid].zw=pos;
	velocity[gid]=vel;
	position[gid].xy=pos+vel;

}`;