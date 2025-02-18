#!/usr/bin/env node

import inquirer from "inquirer";
import shelljs from "shelljs";
import chalk from "chalk";
import { join } from "path";

// Get the user's home directory (Windows style)
const homeDir = process.env.USERPROFILE || process.env.HOME;
const sshDir = join(homeDir, ".ssh");

// Function to add SSH key
const switchSSHKey = (keyPath) => {
  // Windows uses ssh-agent differently, using Git Bash or WSL could be an option
  const command = `ssh-agent cmd /C "ssh-add ${keyPath}"`;
  const result = shelljs.exec(command);
  if (result.code === 0) {
    console.log(chalk.green(`✔ SSH key switched to: ${keyPath}`));
  } else {
    console.error(chalk.red("❌ Failed to add SSH key to the agent"));
  }
};

// Function to generate SSH key
const generateSSHKey = async () => {
  const { keyName, email } = await inquirer.prompt([
    {
      type: "input",
      name: "keyName",
      message: "Enter a name for your new SSH key (e.g., id_custom):",
      validate: (input) => (input ? true : "Key name cannot be empty"),
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email for the SSH key:",
      validate: (input) =>
        input.includes("@") ? true : "Enter a valid email address",
    },
  ]);

  const keyPath = join(sshDir, keyName);
  const command = `ssh-keygen -t rsa -b 4096 -C "${email}" -f ${keyPath} -N ""`;
  const result = shelljs.exec(command);
  if (result.code === 0) {
    console.log(chalk.green(`✔ SSH key generated: ${keyPath}`));
    return keyPath;
  } else {
    console.error(chalk.red("❌ Failed to generate SSH key"));
    return null;
  }
};

const main = async () => {
  console.clear();
  console.log(chalk.blue.bold("\n🚀 SSH Key Switcher"));

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Select an option:",
      choices: [
        { name: "💼 Company GitLab (id_rsa)", value: join(sshDir, "id_rsa") },
        {
          name: "🏠 Personal GitHub (Enter custom key name)",
          value: "personal",
        },
        { name: "➕ Generate and use a new SSH key", value: "new" },
        { name: "❌ Exit", value: "exit" },
      ],
    },
  ]);

  if (choice === "exit") {
    console.log(chalk.yellow("🔴 Exiting..."));
    process.exit(0);
  }

  let keyPath = choice;

  if (choice === "new") {
    keyPath = await generateSSHKey();
  } else if (choice === "personal") {
    const { keyName } = await inquirer.prompt([
      {
        type: "input",
        name: "keyName",
        message:
          "Enter the name of your personal GitHub SSH key (e.g., id_custom):",
        validate: (input) => (input ? true : "Key name cannot be empty"),
      },
    ]);

    keyPath = join(sshDir, keyName); // Dynamically build the key path
  }

  if (keyPath) {
    switchSSHKey(keyPath);
  }
};

main();
