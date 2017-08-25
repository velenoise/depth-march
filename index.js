const regl = require('regl')();
const glslify = require('glslify');
const camera = require('regl-camera')(regl, {
    center: [0, 0, 0],
    distance: 2.5,
    theta: Math.PI * .5
})

const drawTriangle  = regl({
    frag: glslify('./shader.frag'),

    vert: glslify('./shader.vert'),

    attributes: {
        position: [
            [-.5, .5, 0],
            [-.5, -.5, 0],
            [.5, -.5, 0],
            [.5, .5, 0]
        ],
        uv: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ]
    },

    elements: [
        [2, 1, 0], 
        [2, 0, 3]
    ],

    uniforms: {
        color: regl.prop('color'),
        tex: regl.prop('texture')
    }
});

require('resl')({
    manifest: {
        'texture': {
            type: 'image',
            src: './texture.jpg',
            parser: (data) => regl.texture({
                data: data, 
                mag: 'linear',
                min: 'linear'
            })
        }
    },

    onDone: ({ texture }) => {
        regl.frame(({ time }) => {
            camera((state) => {
                regl.clear({
                    color: [0, 0, 0, 0],
                    depth: 1
                });
            
                drawTriangle({
                    color: [
                        1, (1 + Math.sin(time)) * .5, 0, 1
                    ],
                    texture
                });
            });
        });
    }
});