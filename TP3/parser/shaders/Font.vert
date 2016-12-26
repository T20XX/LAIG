attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float du;
uniform float su;


void main() {

    	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

		vTextureCoord[0] = (su + aTextureCoord[0]) / du;

		vTextureCoord[1] = aTextureCoord[1];
}