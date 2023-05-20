const readline = require('readline');
const registeredTrainers = [];


class Trainer {
  constructor(name, age, username, password) {
    this.Name = name;
    this.Age = age;
    this.Username = username;
    this.Password = password;
    this.Pokemon = [];
    this.Friends = {
      closeFriends: [],
      distantFriends: []
    };
  }

  talk() {
    console.log("Pikachu! I choose you!");
  }

  addPokemon(name, level, ability) {
    const newPokemon = new Pokemon(name, level, ability);
    this.Pokemon.push(newPokemon);
    console.log(`Added ${name} to the trainer's Pokemon collection.`);
  }

  displayPokemon() {
    console.log("Trainer's Pokemon:");
    this.Pokemon.forEach(function(pokemon) {
      console.log(`Name: ${pokemon.Name}, Level: ${pokemon.Level}, Ability: ${pokemon.Ability}, Health: ${pokemon.Health}`);
    });
  }
}


class Pokemon {
  constructor(name, level, ability) {
    this.Name = name;
    this.Level = level;
    this.Health = level * 10;
    this.Attack = level * 5;
    this.Ability = ability;
  }

  tackle(targetPokemon) {
    targetPokemon.Health -= this.Attack;
    if (targetPokemon.Health <= 0) {
      this.faint(targetPokemon);
    }
  }

  faint(targetPokemon) {
    console.log(targetPokemon.Name + " has fainted.");
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to register a new trainer
function registerTrainer() {
  console.log("=== Trainer Registration ===");
  rl.question("Enter your name: ", function(name) {
    rl.question("Enter your age: ", function(age) {
      rl.question("Choose a username: ", function(username) {
        rl.question("Choose a password: ", function(password) {
          const newTrainer = new Trainer(name, age, username, password);
          registeredTrainers.push(newTrainer);
          console.log("Registration successful!");
          loginTrainer();
        });
      });
    });
  });
}


function loginTrainer() {
  console.log("=== Trainer Login ===");
  rl.question("Enter your username: ", function(username) {
    rl.question("Enter your password: ", function(password) {
      const trainer = registeredTrainers.find(t => t.Username === username && t.Password === password);
      if (trainer) {
        console.log(`Welcome, ${trainer.Name}!`);
        displayMenu(trainer);
      } else {
        console.log("Invalid username or password. Please try again.");
        loginTrainer();
      }
    });
  });
}


function displayMenu(trainer) {
  console.log("\nMenu:");
  console.log("1. Add Pokemon");
  console.log("2. Display Pokemon");
  console.log("3. Logout");
  console.log("4. Exit");

  rl.question("Enter your choice: ", function(choice) {
    switch (choice) {
      case "1":
        addPokemonMenu(trainer);
        break;
      case "2":
        displayPokemonMenu(trainer);
        break;
      case "3":
        console.log("Logging out...");
        loginTrainer();
        break;
      case "4":
        console.log("Exiting the program...");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        displayMenu(trainer);
        break;
    }
  });
}


function addPokemonMenu(trainer) {
  console.log("\n=== Add Pokemon ===");
  rl.question("Enter the name of the Pokemon: ", function(name) {
    rl.question("Enter the level of the Pokemon: ", function(level) {
      rl.question("Enter the ability of the Pokemon: ", function(ability) {
        trainer.addPokemon(name, parseInt(level), ability);
        displayMenu(trainer);
      });
    });
  });
}


function displayPokemonMenu(trainer) {
  console.log("\n=== Trainer's Pokemon ===");
  trainer.displayPokemon();
  displayMenu(trainer);
}

console.log("=== Pokemon Trainer Program ===");
console.log("1. Register");
console.log("2. Login");
console.log("3. Exit");

rl.question("Enter your choice: ", function(choice) {
  switch (choice) {
    case "1":
      registerTrainer();
      break;
    case "2":
      loginTrainer();
      break;
    case "3":
      console.log("Thank you!");
      rl.close();
      break;
    default:
      console.log("Invalid choice. Please try again.");
      rl.close();
      break;
  }
});
