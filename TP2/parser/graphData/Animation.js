/**
 * @constructor
 */
function Animation(span) {
    this.span = span;
}

Animation.prototype.getSpan = function(){
    return this.span;
}

Animation.prototype.setSpan = function(span){
    this.span = span;
}