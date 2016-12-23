/**
 * @constructor
 */
function PieceAnimation(velocity) {
    Animation.call(this, 0);

    this.velocity = velocity;

    this.move = [];
    this.deltaX = 0;
    this.deltaY = 0;
}

PieceAnimation.prototype = Object.create(Animation.prototype);
PieceAnimation.prototype.constructor = PieceAnimation;

PieceAnimation.prototype.setMove=function(move)
{
	this.move = move;
	this.deltaX = this.move[2] - this.move[0];
    this.deltaY = -(this.move[3] - this.move[1]);
    this.span = Math.sqrt(this.deltaX^2 + this.deltaY^2) / this.velocity;
};

PieceAnimation.prototype.getMove=function()
{
    return this.move;
};

PieceAnimation.prototype.getSpan=function()
{
    return this.span;
};


PieceAnimation.prototype.getTransformation = function(deltaTime) {
    var transf = mat4.create();
    if (deltaTime >= 0){
        var interPoint;
        interPoint = this.calculateInterpolatePoint([0,0], [this.deltaX,this.deltaY], deltaTime/this.span);
        if(deltaTime < this.span/2) {
            interPoint.push((deltaTime / this.span)*2);
        }else{
            interPoint.push((1- deltaTime / this.span)*2);
		}

        mat4.translate(transf, transf, interPoint);
    }

    return transf;
}

PieceAnimation.prototype.calculateInterpolatePoint = function(p1, p2, t) {
    var result = [];
    for (var i = 0; i < p1.length; i++)
    {
        result[i] = (1.0 - t) * p1[i]  + (p2[i] * t);
    }
    return result;
}