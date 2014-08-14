function Line() {

  this.container, this.renderer, this.scene, this.camera;
  this.light, this.light_right, this.light_left;
  this.content, this.settings, this.group, this.mesh;

  this.characters = [];

}

Line.prototype.init = function(elementID, content, settings) {

  this.container = document.getElementById(elementID);
  var $container = $(this.container);


  // ADD CHECKS FOR VARIABLE EXISTANCE (IE. CONTENT)
  // SET BASE VARAIBLES OR OVERRIDES



  // >>> END

  this.content = content.trim();
  this.content = this.content.toUpperCase();

  this.settings = settings;

  this.setHeight();
  var width = $container.width();
  var height = $container.height();

  this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  this.camera.position.z = 100;

  this.scene = new THREE.Scene();

  this.setupLights();

  this.setupContent();

  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  this.renderer.setSize($container.width(), $container.height());

  this.container.appendChild( this.renderer.domElement );

  this.addListeners();

  this.render();

}

Line.prototype.setupLights = function() {
  this.light = new THREE.DirectionalLight(0xffffff, 1.0);
  this.light.position.set(0,0,200);
  this.scene.add(this.light);

  this.light_right = new THREE.DirectionalLight(0xD6CC8B, 0.5);
  this.light_right.position.set(200,0,0);
  this.scene.add(this.light_right);

  this.light_left = new THREE.DirectionalLight(0xD6CC8B, 0.5);
  this.light_left.position.set(-200,0,0);
  this.scene.add(this.light_left);
}

Line.prototype.setupContent = function() {
  this.group = new THREE.Object3D();

  var ratio = this.getContainerRatio();
  var offsetX = 0;
  var spacing = 20 * ratio;

  for (var i = 0; i < this.content.length; i++)
  {
    var character = new Character();
    character.init(this, this.content.charAt(i), this.settings, offsetX, ratio);
    this.characters.push(character);

    console.log(">>> CHAR = " + character.char + " X = " + character.group.position.x + " , W = " + character.x + " , P = " + character.mesh.position.x);

    this.group.add(character.group);
    offsetX += character.box.max.x + spacing;
  }

  this.width = offsetX - spacing;

  // Center the group in world
  this.group.position.x -= (this.width / 2);

  // Add content group to scene
  this.scene.add(this.group);

}

Line.prototype.resize = function() {
  this.setHeight();
  this.renderer.setSize( $container.width(), $container.height() );
}

// Currently resizes based on CSS max width/height - REVIST!
Line.prototype.setHeight = function() {
  $container = $(this.container);
  var ratio = this.getContainerRatio();
  var height = parseInt($container.css('max-height')) * ratio;
  $container.height(height);
}

Line.prototype.getContainerRatio = function() {
  return $container.width() / parseInt($container.css("max-width"));
}

Line.prototype.update = function(percentage) {

  if(this.characters) 
  {
    for (var i = 0; i < this.characters.length; i++)
    {
      this.characters[i].update(percentage);
    }
  }

}

Line.prototype.addListeners = function() {

  this.renderer.domElement.addEventListener("webglcontextlost", function(event) {
    event.preventDefault();
  }, false);

  this.renderer.domElement.addEventListener("webglcontextrestored", function(event) {
    this.restore.bind(this);
  }, false);
}

Line.prototype.restore = function() {
  console.log("Context Restored: Initialise Setup.");
  var elementID = $(this.container).attr('id');
  var content = this.content;

  console.log("ElementID: " + elementID + " Content: " + content);

  // Clear Container
  $(this.container).html("");

  this.init(elementID, content);
}

Line.prototype.render = function() {
  requestAnimationFrame(this.render.bind(this));
  this.camera.lookAt( this.scene.position );
  this.renderer.render( this.scene, this.camera );
}