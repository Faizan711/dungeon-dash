#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";
import figlet from "figlet";

// Utility function to use sleep for waiting wherever needed
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Game data
const dungeons = [
  {
    name: "Goblin Cave",
    description: "A dark cave filled with goblins.",
    enemies: ["Goblin"],
  },
  {
    name: "Dragon’s Lair",
    description: "A lair of a fierce dragon.",
    enemies: ["Dragon"],
  },
];

const player = {
  name: "",
  health: 100,
  attack: 10,
  defense: 5,
  inventory: [],
};

// Start Game
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

  // Spinner for player creation
  const spinner = createSpinner("Creating Player...").start();
  await sleep();
  if (answers.name) {
    spinner.success({
      text: chalk.cyanBright(
        `Welcome ${answers.name}! Your adventure begins now.`
      ),
    });
    player.name = answers.name;
    await chooseDungeon();
  } else {
    spinner.error({
      text: chalk.redBright("Error creating player, Try again!"),
    });
    process.exit(1);
  }
};

// Choose Dungeon
const chooseDungeon = async () => {
  const spinner = createSpinner("Loading dungeons...").start();
  await sleep();
  spinner.success({ text: chalk.green("Dungeons loaded!") });

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "dungeon",
      message: "Choose a dungeon to explore:",
      choices: dungeons.map((d) => d.name),
    },
  ]);

  const selectedDungeon = dungeons.find((d) => d.name === answers.dungeon);
  console.log(
    chalk.yellow(
      `You have entered the ${selectedDungeon.name}. ${selectedDungeon.description}`
    )
  );
  await exploreDungeon(selectedDungeon);
};

// Explore Dungeon
const exploreDungeon = async (dungeon) => {
  const spinner = createSpinner("Exploring the dungeon...").start();
  await sleep(3000); // Simulate time taken for exploring
  spinner.stop();
  // Simulate encounter
  const encounterEnemy = dungeon.enemies[0];
  console.log(chalk.red(`An enemy ${encounterEnemy} appears!`));

  const action = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What will you do?",
      choices: ["Attack", "Defend", "Use Item"],
    },
  ]);

  switch (action.action) {
    case "Attack":
      console.log(chalk.green(`You attack the ${encounterEnemy}.`));
      break;
    case "Defend":
      console.log(chalk.blue("You defend against the attack."));
      break;
    case "Use Item":
      console.log(chalk.cyan("You use an item from your inventory."));
      break;
    default:
      console.log(chalk.red("Invalid action."));
      break;
  }

  spinner.success({
    text: chalk.green("You have defeated the enemy and completed the dungeon!"),
  });

  // Victory message with gradient and figlet
  console.log(
    gradient.rainbow(figlet.textSync("Victory!", { horizontalLayout: "full" }))
  );
  console.log(gradient.pastel(`Congratulations ${player.name}!`));
};

// Start the game
startGame();
