#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float du;
uniform float dv;
uniform float su;
uniform float sv;

uniform vec4 c1;
uniform vec4 c2;
uniform vec4 cs;

void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = gl_FragColor.rgba;

}