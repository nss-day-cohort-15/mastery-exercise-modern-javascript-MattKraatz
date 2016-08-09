// Original Robot prototype
let Robot = function() {
  this.name = "";
};

Robot.prototype.setMaxHealth = function(maxHealth,minHealth){
  this.maxHealth = Math.ceil(Math.random() * (maxHealth - minHealth) + minHealth) || 0;
};

Robot.prototype.setMaxDamage = function(maxDamage,minDamage){
  this.maxDamage = Math.ceil(Math.random() * (maxDamage - minDamage) + minDamage) || 0;
};

// Declaring robot types and generating prototypes
let Transformer = function(){};
let Ranger = function(){};
let Reboot = function(){};

Transformer.prototype = new Robot();
Transformer.prototype.type = "transformer";
Ranger.prototype = new Robot();
Ranger.prototype.type = "ranger";
Reboot.prototype = new Robot();
Reboot.prototype.type = "reboot";

// Declaring robot model functions and generating prototypes

let types = {
  optimusPrime() {},
  megatron() {},
  megazord() {},
  alpha5() {},
  bob() {},
  megabyte() {}
}

types.optimusPrime.prototype = new Transformer();
types.megatron.prototype = new Transformer();
types.megazord.prototype = new Ranger();
types.alpha5.prototype = new Ranger();
types.bob.prototype = new Reboot();
types.megabyte.prototype = new Reboot();

for (t in types) {
  types[t].prototype.setMaxHealth.call(types[t],200,150);
  types[t].prototype.setMaxDamage.call(types[t],60,45);
}

