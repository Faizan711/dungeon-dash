#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";
import figlet from "figlet";
import ora from "ora"; // For additional spinner animations

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Game Data
const worldMap = [
  {
    name: "Enchanted Forest",
    description: "A mystical forest filled with magical creatures.",
    enemies: ["Fairy", "Troll"],
    miniBoss: "Forest Guardian",
    difficulty: 1,
    loot: { name: "Magic Bow", attack: 10 },
  },
  {
    name: "Haunted Castle",
    description: "A dark castle haunted by restless spirits.",
    enemies: ["Ghost", "Vampire"],
    miniBoss: "Phantom Knight",
    difficulty: 2,
    loot: { name: "Silver Sword", attack: 15 },
  },
  {
    name: "Sunken Ruins",
    description: "Ancient underwater ruins teeming with sea creatures.",
    enemies: ["Mermaid", "Giant Octopus"],
    miniBoss: "Kraken",
    difficulty: 3,
    loot: {
      name: "Trident of Poseidon",
      attack: 20,
      effect: "Deals double damage to sea creatures",
    },
  },
  {
    name: "Dwarven Mines",
    description: "Deep underground mines filled with rare minerals and gems.",
    enemies: ["Goblin", "Rockbiter"],
    miniBoss: "Mole King",
    difficulty: 2,
    loot: {
      name: "Adamantium Pickaxe",
      attack: 12,
      effect: "Doubles mining yield",
    },
  },
  {
    name: "Volcanic Lair",
    description: "A fiery lair nestled within an active volcano.",
    enemies: ["Lava Elemental", "Fire Drake"],
    miniBoss: "Magma Lord",
    difficulty: 4,
    loot: {
      name: "Inferno Greaves",
      attack: 18,
      effect: "Immune to fire damage",
    },
  },
];

const player = {
  name: "",
  level: 1,
  health: 100,
  attack: 10,
  defense: 5,
  inventory: [],
  currency: 50,
  xp: 0,
  xpToLevelUp: 100,
  magic: 0,
};

// Utility function for leveling up
const levelUp = async () => {
  if (player.xp >= player.xpToLevelUp) {
    player.level++;
    player.xp -= player.xpToLevelUp;
    player.xpToLevelUp *= 1.5;
    player.attack += 5;
    player.defense += 3;
    player.health += 20;
    console.log(
      chalk.magenta(`Congratulations! You leveled up to level ${player.level}!`)
    );
  }
};

// Game Start
const startGame = async () => {
  console.log(chalk.green("Welcome to DungeonDash!"));

  // Prompt for player name
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your character's name?",
    },
  ]);

  const spinner = createSpinner("Creating Player...").start();
  await sleep();
  if (answers.name) {
    spinner.success({
      text: chalk.cyanBright(
        `Welcome ${answers.name}! Your adventure begins now.`
      ),
    });
    player.name = answers.name;
    await exploreWorld();
  } else {
    spinner.error({
      text: chalk.redBright("Error creating player, Try again!"),
    });
    process.exit(1);
  }
};

// Explore the World Map
const exploreWorld = async () => {
  const spinner = ora("Loading the world map...").start();
  await sleep();
  spinner.succeed(chalk.green("World map loaded!"));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "dungeon",
      message: "Choose a location to explore:",
      choices: worldMap.map((d) => d.name),
    },
  ]);

  const selectedDungeon = worldMap.find((d) => d.name === answers.dungeon);
  console.log(
    chalk.yellow(
      `You have arrived at the ${selectedDungeon.name}. ${selectedDungeon.description}`
    )
  );
  await exploreDungeon(selectedDungeon);
};

// Explore Dungeon
const exploreDungeon = async (dungeon) => {
  const spinner = ora(`Exploring the ${dungeon.name}...`).start();
  await sleep(3000); // Simulate time taken for exploring
  spinner.stop();

  // First Encounter
  console.log(chalk.red(`An enemy ${dungeon.enemies[0]} appears!`));
  await combat(dungeon.enemies[0], dungeon.difficulty);

  // Second Encounter or Event
  const randomEvent = Math.random();
  if (randomEvent > 0.5) {
    console.log(chalk.red(`Another enemy ${dungeon.enemies[1]} appears!`));
    await combat(dungeon.enemies[1], dungeon.difficulty);
  } else {
    console.log(chalk.yellow("You found a treasure chest!"));
    player.inventory.push({ name: "Health Potion", effect: "Restore 20 HP" });
    console.log(chalk.green("You received a Health Potion!"));
  }

  // Mini-Boss Encounter
  console.log(chalk.red(`The Mini-Boss ${dungeon.miniBoss} challenges you!`));
  await combat(dungeon.miniBoss, dungeon.difficulty + 1);

  // Victory and Loot
  console.log(chalk.green(`You have defeated the ${dungeon.miniBoss}!`));
  player.xp += 100 * dungeon.difficulty;
  player.inventory.push(dungeon.loot);
  console.log(chalk.green(`You found a ${dungeon.loot.name}!`));
  await levelUp();
  await showVictory();
};

// Combat Function
const combat = async (enemy, difficulty) => {
  let enemyHealth = 50 * difficulty;
  let playerHealth = player.health;

  while (enemyHealth > 0 && playerHealth > 0) {
    const action = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: `What will you do? (${enemy} - ${enemyHealth} HP) | (${player.name} - ${playerHealth} HP)`,
        choices: ["Attack", "Defend", "Use Magic", "Use Item", "Run Away"],
      },
    ]);

    switch (action.action) {
      case "Attack":
        const damage = player.attack + Math.floor(Math.random() * 10);
        enemyHealth -= damage;
        console.log(chalk.green(`You dealt ${damage} damage to the ${enemy}!`));
        break;
      case "Defend":
        const blocked = player.defense + Math.floor(Math.random() * 5);
        console.log(chalk.blue(`You blocked ${blocked} damage!`));
        break;
      case "Use Magic":
        if (player.magic > 0) {
          const magicDamage = player.magic + Math.floor(Math.random() * 20);
          enemyHealth -= magicDamage;
          player.magic -= 10;
          console.log(
            chalk.magenta(`You cast a spell and dealt ${magicDamage} damage!`)
          );
        } else {
          console.log(chalk.red("You don't have enough magic!"));
        }
        break;
      case "Use Item":
        if (player.inventory.length > 0) {
          const item = await inquirer.prompt([
            {
              type: "list",
              name: "item",
              message: "Choose an item to use:",
              choices: player.inventory.map((i) => i.name),
            },
          ]);
          const selectedItem = player.inventory.find(
            (i) => i.name === item.item
          );
          if (selectedItem.effect.includes("Restore")) {
            const restoreAmount = parseInt(selectedItem.effect.match(/\d+/)[0]);
            playerHealth += restoreAmount;
            console.log(
              chalk.green(
                `You used ${selectedItem.name} and restored ${restoreAmount} HP!`
              )
            );
          }
        } else {
          console.log(chalk.red("You have no items!"));
        }
        break;
      case "Run Away":
        const escapeChance = Math.random();
        if (escapeChance > 0.5) {
          console.log(chalk.yellow("You successfully ran away!"));
          return "escape";
        } else {
          console.log(chalk.red("You failed to escape!"));
        }
        break;
    }

    // Enemy Attack
    if (enemyHealth > 0) {
      const enemyDamage = difficulty * 5 + Math.floor(Math.random() * 10);
      playerHealth -= enemyDamage;
      console.log(
        chalk.red(`The ${enemy} attacked and dealt ${enemyDamage} damage!`)
      );
    }

    if (playerHealth <= 0) {
      console.log(chalk.red("You were defeated!"));
      await showDefeat();
      return;
    }
  }

  player.health = playerHealth;
};

// Show Victory Screen
const showVictory = async () => {
  console.log(chalk.green("You have completed the dungeon successfully!"));
  console.log(
    gradient.rainbow(figlet.textSync("Victory!", { horizontalLayout: "full" }))
  );
  console.log(gradient.pastel(`Congratulations ${player.name}!`));
  await sleep();

  const playAgain = await inquirer.prompt([
    {
      type: "confirm",
      name: "playAgain",
      message: "Do you want to play again?",
      default: true,
    },
  ]);

  if (playAgain.playAgain) {
    await exploreWorld();
  } else {
    console.log(chalk.blue("Thanks for playing!"));
    process.exit(0);
  }
};

// Show Defeat Screen
const showDefeat = async () => {
  console.log(chalk.red("Game Over! You have been defeated."));
  console.log(
    gradient.cristal(figlet.textSync("Defeat!", { horizontalLayout: "full" }))
  );
  console.log(gradient.pastel(`Better luck next time, ${player.name}.`));
  await sleep();

  const playAgain = await inquirer.prompt([
    {
      type: "confirm",
      name: "playAgain",
      message: "Do you want to play again?",
      default: true,
    },
  ]);

  if (playAgain.playAgain) {
    player.health = 100;
    await exploreWorld();
  } else {
    console.log(chalk.blue("Thanks for playing!"));
    process.exit(0);
  }
};

// Start the game
startGame();
