#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); //function to use sleep
const startGame = () => {
  console.log(chalk.green("Welcome to Faizan's CLI RPG Game!"));
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your character's name?",
      },
    ])
    .then(async (answers) => {
      const spinner = createSpinner("Creating Player...").start();
      await sleep();
      if (answers) {
        spinner.success({
          text: chalk.cyanBright(
            `Welcome ${answers.name}! Your adventure begins now.`
          ),
        });
      } else {
        spinner.error({
          text: chalk.redBright(`Error creating player, Try again!`),
        });
        process.exit(1);
      }
      // Add more game logic here
    });
};

startGame();
