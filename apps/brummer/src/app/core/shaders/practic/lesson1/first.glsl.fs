precision highp float;

uniform float u_time;
uniform vec3 u_color;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;
varying vec3 v_position;
varying vec4 v_color;

void main(){
  
  float inCircle=1.-step(.1,length(v_position.xy));
  vec3 color=vec3(0.,1.,1.)*inCircle;
  gl_FragColor=vec4(color,1.);
}