precision mediump float;

varying vec2 vUv;
varying vec3 vEyeDirection;

uniform vec4 color;
uniform sampler2D tex;

#define STEPS 256.0
#define MAX_DEPTH 0.6

vec2 vUv2;

vec3 march(vec3 dir)
{
    float d = 0.;
    float t = 0.002;
    vec2 coord;

    for (float i = 0.; i < STEPS; i++)
    {
        vec3 uv2 = vec3(vUv2, 0) + dir * t * i;
        
        uv2.y = 1. - uv2.y;
        vec4 col = texture2D(tex, uv2.xy);
        
        d = i / STEPS;

        if (col.r > 0.5 || d >= MAX_DEPTH)
        {
            break;
        }
        
    }

    return vec3(coord, d);
}

void main ()
{
    vUv2 = vec2(vUv.x, 1. - vUv.y);
    vec3 texCol = texture2D(tex, vUv).xyz;

    vec3 col;
    float a;

    if (texCol.r >= .5)
    {
        col = vec3(1,0,0);
        a = 0.;
    }
    else
    {
        vec3 d = march(vEyeDirection);

        col = vec3(0,1,0) * (1. - d.z / MAX_DEPTH);
        a = 1.;
    }

    gl_FragColor = vec4(col, a);
}