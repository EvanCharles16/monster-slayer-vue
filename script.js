new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
    currentTurn: 0,
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;

      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + damage,
        id: this.currentTurn + 1,
      });
      this.currentTurn++;

      if (this.checkWin()) {
        return; // Return for so if return true, i dont continue the code execution
      }

      this.monsterAttack();
    },
    specialAttack() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;

      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster Hard for " + damage,
        id: this.currentTurn + 1,
      });
      this.currentTurn++;

      if (this.checkWin()) {
        return; // Return for so if return true, i dont continue the code execution
      }
      this.monsterAttack();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10",
        id: this.currentTurn + 1,
      });
      this.currentTurn++;

      this.monsterAttack();
    },
    giveup() {
      if (confirm("Are you sure to give up?")) {
        this.gameIsRunning = false;
      }
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    monsterAttack() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;

      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage,
        id: this.currentTurn + 1,
      });
      this.currentTurn++;

      this.checkWin();
    },
    checkWin() {
      // Player Win
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
        //Monster Win
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
