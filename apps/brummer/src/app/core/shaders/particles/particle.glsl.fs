precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;

void main(){
  vec4 color=vec4(0.);
  vec2 uv=vUv;
  vec2 puv=vPUv;
  
  // pixel color
  vec4 colA=texture2D(uTexture,puv);
  
  // greyscale
  float grey=colA.r*.22+colA.g*.231+colA.b*.237;
  vec4 colB=vec4(grey,grey,grey,.4);
  
  // circle
  float border=.9;
  float radius=.4;
  float dist=radius-distance(uv,vec2(.5));
  float t=smoothstep(0.,border,dist);
  
  // final color
  color=colB;
  color.a=t;
  
  gl_FragColor=color;
}