#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float du;
uniform float su;

uniform vec4 color;
uniform vec4 backgroundColor;

void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord);

    float posX = floor(du*vTextureCoord.s);
    //float posY = floor(dv*vTextureCoord.t);

    if(gl_FragColor == vec4(0,0,0,1)){
        gl_FragColor = backgroundColor;
    } else{
     gl_FragColor = color;
    }
    /*if((posX == su) && (posY == sv))
        gl_FragColor = vec4(0.5*gl_FragColor.rgba+0.5*cs.rgba);
    else if(mod((posX + posY),2.0) == 0.0)
        gl_FragColor = vec4(0.5*gl_FragColor.rgba+0.5*c1.rgba);
    else
        gl_FragColor = vec4(0.5*gl_FragColor.rgba+0.5*c2.rgba);*/

}