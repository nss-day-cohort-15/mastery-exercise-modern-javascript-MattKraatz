
// On load, hide battlefield
$("#battlefield").hide();

// SPA click handler on 'Do Battle' button
$("#do-battle").click(function(evt){
  if ($("#player1").val() === $("#player2").val()) {
    alert("Please select two different robot models");
  } else {
    $("#fighter-select").hide();
    $("#battlefield").show();
    setFighters();
  }
})

// Loop through list of fighters to find each selection,
// assign selection and name to fighter1 and fighter2 object
function setFighters(){
  for(f in fighters) {
    if (fighters[f].name == $("#player1").val()) {
      $.extend(true,fighter1,fighters[f]);
      fighter1.customName = $("#player1").parent("label").prev().val();
      if (fighter1.customName === "") {
        fighter1.customName = "John Doe";
      }
    }
    if (fighters[f].name == $("#player2").val()) {
      $.extend(true,fighter2,fighters[f])
      fighter2.customName = $("#player2").parent("label").prev().val();
      if (fighter2.customName === "") {
        fighter2.customName = "John Doe";
      }
    }
  }
  fighter1.health = fighter1.maxHealth;
  fighter2.health = fighter2.maxHealth;
  displayBattlefield();
}

// Initial print for the battlefield, referencing fighter objects
function displayBattlefield(){
  fighter1Progress = parseInt((fighter1.health / fighter1.maxHealth) * 100)
  fighter2Progress = parseInt((fighter2.health / fighter2.maxHealth) * 100)
  $("#battlefield").html(`
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <h3>${fighter1.customName}</h3>
      <div class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%" id="f1progress">
          <span id="f1Health">${fighter1.health} HP</span>
        </div>
      </div>
      <div class="cropper">
        <img src="${fighter1.img}">
      </div>
      <p>Model: ${fighter1.name}</p>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <h3>${fighter2.customName}</h3>
      <div class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%" id="f2progress">
          <span id="f2Health">${fighter2.health} HP</span>
        </div>
      </div>
      <div class="cropper">
        <img src="${fighter2.img}">
      </div>
      <p>Model: ${fighter2.name}</p>
    </div>
    <div class="centerer col-lg-12 col-md-12 col-sm-12 col-xs-12" id="game-over">
      <button id="attack">Attack!</button>
    </div>
  `)
  $("#attack").click(attack);
}

var fighter1Progress = 0;
var fighter2Progress = 0;

// Attack functionality
function attack() {
  doDamage(fighter1, fighter2);
  if (fighter2.health <= 0) {
    gameOver(fighter1,fighter2);
  } else {
    doDamage(fighter2,fighter1);
    if (fighter1.health <= 0) {
    gameOver(fighter2,fighter1);
    }
  }
  updateBattlefield();
}

// Damage functionality
function doDamage(attacker,receiver) {
  receiver.health -= attacker.maxDamage;
}

// Update the health bars with new values after attack
function updateBattlefield() {
  fighter1Progress = parseInt((fighter1.health / fighter1.maxHealth) * 100)
  fighter2Progress = parseInt((fighter2.health / fighter2.maxHealth) * 100)
  $("#f1progress").attr("style","width: " + fighter1Progress + "%")
  $("#f1Health").html(`${fighter1.health} HP`)
  $("#f2progress").attr("style","width: " + fighter2Progress + "%")
  $("#f2Health").html(`${fighter2.health} HP`)

}

// Game over functionality
function gameOver(winner,loser) {
  $("#attack").remove();
  $("#game-over").append(`
    <h2>GAME OVER</h2>
    ${winner.customName} has prevailed over ${loser.customName}!
  `);
}
