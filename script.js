new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      this.monsterHealth -= this.calculateDamage(3, 10);
      if (this.checkWin()) {
        return; // Return for so if return true, i dont continue the code execution
      }

      this.monsterAttack();
    },
    specialAttack() {
      this.monsterHealth -= this.calculateDamage(10, 20);
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
      this.playerHealth -= this.calculateDamage(5, 12);
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
