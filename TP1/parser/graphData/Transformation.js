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
	
	var result = [];
    for (var i = 0; i < this.matrix.length; i++) {
        result[i] = [];
        for (var j = 0; j < matrix[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < this.matrix[0].length; k++) {
                sum += this.matrix[i][k] * matrix[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;	
}