// Global variables to hold list of all fighters, and user-selected fighter 1 and 2
let fighters = {};
let fighter1 = {};
let fighter2 = {};

// XML call to load fighters
var data = $.getJSON("characters.json");
data.then(Main).catch(console.error);

function Main() {
  // Original Robot prototype
  let Robot = function() {
    this.name = "";
  };

  // Adding properties to Robot prototype for determining health and damage
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

  // Declaring robot type functions and prototypes
  fighters = data.responseJSON;

  fighters.optimusPrime.prototype = new Transformer();
  fighters.megatron.prototype = new Transformer();
  fighters.megazord.prototype = new Ranger();
  fighters.alpha5.prototype = new Ranger();
  fighters.bob.prototype = new Reboot();
  fighters.megabyte.prototype = new Reboot();

  // Assigning Health and Damage properties with more randomizers
  for (var f in fighters) {
    let x = Math.ceil(Math.random() * 10);
    let y = Math.ceil(Math.random() * 4);
    let maxH = 200 + (2 * x);
    let minH = 150 - (1 * x);
    let maxD = 75 + (2 * y);
    let minD = 50 + (1 * y);
    fighters[f].prototype.setMaxHealth.call(fighters[f],maxH,minH);
    fighters[f].prototype.setMaxDamage.call(fighters[f],maxD,minD);
    selectionPrinter(fighters[f]);
  }

  // Function to print each fighter to the select elements on the DOM
  function selectionPrinter(option) {
    $("#player1").append(`
      <option>${option.name}</option>
    `)
    $("#player2").append(`
      <option>${option.name}</option>
    `)
  }
}
