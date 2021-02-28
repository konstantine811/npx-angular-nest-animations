attribute vec2 coordinates;

void main(){
  gl_Position=vec4(coordinates,0.,1.);
}