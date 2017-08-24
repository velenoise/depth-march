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
    vPos = position;

    vec3 n = normalize(position);
    vec3 up = vec3(0, 1, 0);
    vec3 t = cross(n, up);
    vec3 b = cross(n, t);

    vEyeDirection = normalize(position - eye);
    /*vec3 v = vec3(
        dot(vEyeDirection, t),
        dot(vEyeDirection, b),
        dot(vEyeDirection, n)
    );

    vEyeDirection = normalize(v);*/

    gl_Position = projection * view * vec4(position, 1);
}