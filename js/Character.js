function Character() {

  this.parent;
  this.mesh, this.box, this.group, this.params;
  this.char, this.color, this.settings, this.font_family, this.font_size, this.thickness, this.posX;
  this.x, this.y, this.z;

  this.boxes = [];
  this.subchars = [];

  this.x0_rotation = 0; this.x1_rotation = 0;
  this.y0_rotation = 0; this.y1_rotation = 0;
  this.z0_rotation = 0; this.z1_rotation = 0;

}

Character.prototype.init = function(parent,char,settings,posX,ratio) {

    this.parent = parent;
    this.char = char;

    this.settings = settings;

    this.color = 0xF7F7EB;

    this.font_family = this.settings.font;
    this.font_size = this.settings.size * ratio;
    this.thickness = Math.ceil(this.settings.thickness * ratio);

    this.params = {};

    this.posX = posX;

    this.setupBaseChar();

    this.setupParams();

    this.setupEffects();

}

Character.prototype.setupBaseChar = function() {
  
  var material = new THREE.MeshBasicMaterial({color: this.color});
  var params = { size: this.font_size, height: this.thickness, font: this.font_family };
  var geometry = new THREE.TextGeometry( this.char, params );
  
  this.mesh = new THREE.Mesh(geometry, material);

}

Character.prototype.setupParams = function() {
  
  var options = this.getOptions();
    
  if (options.split !== undefined) {
    this.params['split'] = options.split;
  }

  if (options.rotation !== undefined) {
    this.params['rotation'] = options.rotation;
  }
}

Character.prototype.getOptions = function() {

  var options = this.settings.options;
  var characters = this.settings.characters;
  var option = characters['default'];

  for (var index in characters) {
    if (index === this.char) {
      var option = options[characters[index]];
      break;
    }
  }

  return option;

}

Character.prototype.setupEffects = function() {

  this.updateBoundingBox();

  // Init vars and change letter origin to center
  this.x = this.box.max.x - this.box.min.x;
  this.y = this.box.max.y - this.box.min.y;
  this.z = this.box.max.z - this.box.min.z;
  this.mesh.applyMatrix( new THREE.Matrix4().makeTranslation( -this.x/2, -this.y/2, -this.z/2 ));

  this.createSubChars();

  // Create a group for the letter sub characters
  this.group = new THREE.Object3D();

  for (var i = 0; i < this.subchars.length; i++) {
    this.group.add(this.subchars[i].mesh);
  }

  //this.group.position.x += this.posX;
  this.group.position.x += this.posX + (this.x/2);

  this.setupRotation();

}

Character.prototype.createSubChars = function() {

  // If split parameters exist in params then create 2 sub chars else 1.
  if (this.params.split !== undefined) {
    this.splitInTwo();
  }
  else {
    this.createSingleSubChar();
  }

}

Character.prototype.createSingleSubChar = function() {

  var mesh = this.mesh.clone();
  mesh.material = new THREE.MeshLambertMaterial({color: this.color, shading: THREE.SmoothShading});
  mesh.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -this.box.min.x, 0, - this.box.max.z ));

  var subchar = new SubCharacter();
  subchar.init(this, mesh, "split", 0, 0);

  this.subchars.push(subchar); 

}

Character.prototype.splitInTwo = function() {

  // Create box for bounds
  var material = new THREE.MeshBasicMaterial({});
  var geometry = new THREE.BoxGeometry(this.x,this.y,this.z);
  var box = new THREE.Mesh(geometry, material);

  // Loop creating both subchars
  for(var i = 0; i <= 1; i++) {

    // Calculate split locations
    var split = this.params.split;
    var posX = (split.x) ? (this.x * (split.x / 100)) - (i * this.x) : 0;
    var posY = (split.y) ? (this.y * (split.y / 100)) - (i * this.y) : 0;
    var posZ = (split.z) ? (this.z * (split.z / 100)) - (i * this.z) : 0;

    box.position.x = posX + this.box.min.x;
    box.position.y = posY + this.box.min.y;
    box.position.z = posZ + this.box.min.z;

    var mesh = this.substractBoxFromLetter(box);

    // Update position of origin
    var ox = (i * posX * 2);
    var oy = (i * posY * 2);
    var oz = (i * posZ * 2);
    var ox = (split.x) ? -(i * this.x) : 0;
    var oy = (split.y) ? -(i * this.y) : 0;
    var oz = (split.z) ? -(i * this.z) : 0;

    mesh.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( ox - this.box.min.x, oy, (oz) ));

    // Update relative position
    mesh.position.x += (split.x) ? (i * this.x) : 0;
    mesh.position.y += (split.y) ? (i * this.y) : 0;
    mesh.position.z += (split.z) ? (i * this.z) : 0;

    var subchar = new SubCharacter();
    subchar.init(this, mesh, "split");
    subchar.setRotation(i,split);
      
    this.subchars.push(subchar); 
  }
}

Character.prototype.substractBoxFromLetter = function(box) {
    
    var mesh = this.mesh.clone();

    var CSG_mesh = new ThreeBSP(mesh);
    var CSG_box = new ThreeBSP(box);

    CSG_mesh = CSG_mesh.subtract(CSG_box);

    return CSG_mesh.toMesh(new THREE.MeshLambertMaterial({color: this.color, shading: THREE.SmoothShading}));
}

Character.prototype.updateBoundingBox = function() {

  this.mesh.geometry.computeBoundingBox();
  this.box = this.mesh.geometry.boundingBox.clone();

}

Character.prototype.setupRotation = function() {

  if (this.params.rotation !== undefined) {

    this.x0_rotation = this.params.rotation.r0.x;
    this.x1_rotation = this.params.rotation.r1.x;
    this.y0_rotation = this.params.rotation.r0.y;
    this.y1_rotation = this.params.rotation.r1.y;
    this.z0_rotation = this.params.rotation.r0.z;
    this.z1_rotation = this.params.rotation.r1.z;

  }
}

Character.prototype.update = function(percentage) {

  for (var i = 0; i < this.subchars.length; i++)
  {
    this.subchars[i].update(percentage);
  }

  var x_rotation = this.x0_rotation + ((this.x1_rotation - this.x0_rotation) * (percentage / 100));
  var y_rotation = this.y0_rotation + ((this.y1_rotation - this.y0_rotation) * (percentage / 100));
  var z_rotation = this.z0_rotation + ((this.z1_rotation - this.z0_rotation) * (percentage / 100));
      
  var resetMatrix = new THREE.Matrix4();
  this.group.matrix = resetMatrix;
  this.group.rotation.setFromRotationMatrix(this.group.matrix);

  rotateAroundWorldAxis(this.group, new THREE.Vector3(1,0,0), x_rotation);
  rotateAroundWorldAxis(this.group, new THREE.Vector3(0,1,0), y_rotation);
  rotateAroundWorldAxis(this.group, new THREE.Vector3(0,0,1), z_rotation);

}