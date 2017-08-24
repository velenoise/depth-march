precision mediump float;

varying vec2 vUv;
varying vec3 vEyeDirection, vPos;

uniform vec4 color;
uniform sampler2D tex;

#define STEPS 256
#define MAX_DEPTH 1.0

vec3 march(vec3 p, vec3 dir)
{
    float d = 0.;
    float t = 0.02;
    vec2 coord;

    for (int i = 0; i < STEPS; i++)
    {
        vec3 pos = p + dir * t;
        coord = vUv + pos.xy;
        vec4 col = texture2D(tex, coord);
        d = abs(pos.z);

        if (dot(col.xyz, col.xyz) > 0.5 || d >= MAX_DEPTH)
        {
            break;
        }
        else
        {
            t += 0.02;
        }
    }

    return vec3(coord, d);
}

void main ()
{
    vec3 texCol = texture2D(tex, vUv).xyz;

    vec3 col = vec3(vEyeDirection);

    if (dot(texCol, texCol) >= .5)
    {
        col = vec3(1,0,0);
    }
    else
    {
        vec3 d = march(vPos, vEyeDirection);

        //col = vec3(0,1,0) * (1. - d / MAX_DEPTH);
        col = vec3(d.z / MAX_DEPTH);
    }

    gl_FragColor = vec4(col, 1);
}