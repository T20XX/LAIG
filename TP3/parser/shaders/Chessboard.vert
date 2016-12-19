attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float du;
uniform float dv;
uniform float su;
uniform float sv;


void main() {
    
    	if (su > -1.0){
    	float posX = floor(du*aTextureCoord.s);
    	float posY = floor(dv*aTextureCoord.t);

    	if((posX == su) && (posY == sv))
    		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+vec3(0.0,0.0,0.05), 1.0);
		else
    		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    	}else{
    		    		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
		vTextureCoord = aTextureCoord;
}