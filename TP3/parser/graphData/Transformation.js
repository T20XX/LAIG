/**
 * @constructor
 */
function Transformation()
{
	this.matrix = mat4.create();
}

Transformation.prototype.constructor = Transformation;

Transformation.prototype.applyTranslation=function(transf) 
{
	var translationVec = vec3.fromValues(transf.x,transf.y,transf.z);
	mat4.translate(this.matrix,this.matrix,translationVec);						 
};

Transformation.prototype.applyRotation=function(axis, angle) 
{	
	if(axis == 'x')
	{
		var axisVec = vec3.fromValues(1,0,0);
	}
	else if(axis == 'y')
	{
		var axisVec = vec3.fromValues(0,1,0);
	}
	else if(axis == 'z')
	{
		var axisVec = vec3.fromValues(0,0,1);
	}
	else
	{
		return "Invalid axis: " + axis + "."
	}

	mat4.rotate(this.matrix,this.matrix,angle,axisVec);
	return null;	
};

Transformation.prototype.applyScaling=function(transf) 
{
	var scalingVec = vec3.fromValues(transf.x,transf.y,transf.z);
	mat4.scale(this.matrix,this.matrix,scalingVec);
};

Transformation.prototype.getMatrix=function() 
{
	return this.matrix;
};

Transformation.prototype.multMatrix=function(matrix){
	
	//var result = mat4.asMul(this.matrix, matrix);
var a11 = this.matrix[0];
  var a12 = this.matrix[1];
  var a13 = this.matrix[2];
  var a14 = this.matrix[3];
  var a21 = this.matrix[4];
  var a22 = this.matrix[5];
  var a23 = this.matrix[6];
  var a24 = this.matrix[7];
  var a31 = this.matrix[8];
  var a32 = this.matrix[9];
  var a33 = this.matrix[10];
  var a34 = this.matrix[11];
  var a41 = this.matrix[12];
  var a42 = this.matrix[13];
  var a43 = this.matrix[14];
  var a44 = this.matrix[15];
  var b11 = matrix[0];
  var b12 = matrix[1];
  var b13 = matrix[2];
  var b14 = matrix[3];
  var b21 = matrix[4];
  var b22 = matrix[5];
  var b23 = matrix[6];
  var b24 = matrix[7];
  var b31 = matrix[8];
  var b32 = matrix[9];
  var b33 = matrix[10];
  var b34 = matrix[11];
  var b41 = matrix[12];
  var b42 = matrix[13];
  var b43 = matrix[14];
  var b44 = matrix[15];
  this.matrix[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
  this.matrix[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
  this.matrix[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
  this.matrix[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
  this.matrix[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
  this.matrix[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
  this.matrix[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
  this.matrix[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
  this.matrix[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
  this.matrix[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
  this.matrix[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
  this.matrix[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
  this.matrix[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
  this.matrix[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
  this.matrix[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
  this.matrix[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    //this.matrix = result;
}