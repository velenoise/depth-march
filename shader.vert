precision mediump float;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying vec3 vEyeDirection, vPos;

uniform mat4 projection, view;
uniform vec3 eye, center;

void main () 
{
    vUv = uv;
    
    vEyeDirection = normalize(position - eye);

    gl_Position = projection * view * vec4(position, 1);
}