function SubCharacter() {

  this.parent;
  this.mesh;

  this.x0_rotation = 0; this.x1_rotation = 0;
  this.y0_rotation = 0; this.y1_rotation = 0;

}

SubCharacter.prototype.init = function(parent,mesh,type,rotate_from,rotate_to) {

  this.parent = parent;
  this.mesh = mesh;

  this.mesh.rotation.x = this.x0_rotation;
  this.mesh.rotation.x = this.x0_rotation;

}

SubCharacter.prototype.setRotation = function(i,axis) {

  var sign = (i === 0) ? 1 : -1;

  this.x0_rotation = (axis.y) ? 0 : 0;
  this.x1_rotation = (axis.y) ? (sign * -Math.PI/2) : 0;

  this.y0_rotation = (axis.x) ? 0 : 0;
  this.y1_rotation = (axis.x) ? (sign * Math.PI/2) : 0;

}

SubCharacter.prototype.update = function(percentage) {

  var x_rotation = this.x0_rotation + ((this.x1_rotation - this.x0_rotation) * (percentage / 100));
  var y_rotation = this.y0_rotation + ((this.y1_rotation - this.y0_rotation) * (percentage / 100));

  this.mesh.rotation.x = x_rotation;
  this.mesh.rotation.y = y_rotation;

}