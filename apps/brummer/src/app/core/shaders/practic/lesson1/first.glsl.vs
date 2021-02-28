precision highp float;

attribute vec3 position;
attribute vec2 uv;

varying vec2 v_uv;
varying vec3 v_position;
varying vec4 v_color;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main(){
  
  v_position=position;
  v_uv=uv;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
  v_color=gl_Position;
}