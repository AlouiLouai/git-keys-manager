#!/usr/bin/env node

const inquirer = require("inquirer");
const shelljs = require("shelljs");
const chalk = require("chalk");
const { join } = require("path");
const { existsSync, readFileSync } = require("fs");
const axios = require("axios");
const clipboardy = require("clipboardy");

const homeDir = process.env.USERPROFILE || process.env.HOME;
const sshDir = join(homeDir, ".ssh");

const switchSSHKey = (keyPath) => {
  if (!existsSync(keyPath)) {
    console.error(chalk.red(`❌ SSH key not found: ${keyPath}`));
    return;
  }
  const command = `ssh-agent cmd /C "ssh-add ${keyPath}"`;
  const result = shelljs.exec(command);
  if (result.code === 0) {
    console.log(chalk.green(`✔ SSH key switched to: ${keyPath}`));
  } else {
    console.error(chalk.red("❌ Failed to add SSH key to the agent"));
  }
};

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
    return { keyPath, email };
  } else {
    console.error(chalk.red("❌ Failed to generate SSH key"));
    return null;
  }
};

const uploadSSHKeyToGitHub = async (keyPath, email) => {
  const publicKeyPath = `${keyPath}.pub`;
  if (!existsSync(publicKeyPath)) {
    console.error(chalk.red(`❌ Public key not found: ${publicKeyPath}`));
    return false;
  }

  const publicKey = readFileSync(publicKeyPath, "utf8").trim();

  const { token, title } = await inquirer.prompt([
    {
      type: "password",
      name: "token",
      message:
        "Enter your GitHub Personal Access Token (with admin:public_key scope):",
      validate: (input) => (input ? true : "Token cannot be empty"),
    },
    {
      type: "input",
      name: "title",
      message: "Enter a title for the SSH key on GitHub (e.g., My Laptop):",
      default: `Generated Key - ${new Date().toISOString().split("T")[0]}`,
    },
  ]);

  try {
    const response = await axios.post(
      "https://api.github.com/user/keys",
      {
        title: title,
        key: publicKey,
      },
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.status === 201) {
      console.log(chalk.green(`✔ SSH key uploaded to GitHub: ${title}`));
      return true;
    }
  } catch (error) {
    console.error(
      chalk.red(
        `❌ Failed to upload SSH key to GitHub: ${
          error.response?.data?.message || error.message
        }`
      )
    );
    return false;
  }
};

const copySSHKeyToClipboard = async (keyPath) => {
  const publicKeyPath = `${keyPath}.pub`;
  if (!existsSync(publicKeyPath)) {
    console.error(chalk.red(`❌ Public key not found: ${publicKeyPath}`));
    return;
  }

  const publicKey = readFileSync(publicKeyPath, "utf8").trim();
  try {
    await clipboardy.write(publicKey);
    console.log(chalk.green("✔ Public key copied to clipboard!"));
    console.log(
      chalk.yellow(
        "➡️ Paste it into GitHub: Settings > SSH and GPG keys > New SSH key"
      )
    );
  } catch (error) {
    console.error(
      chalk.red(`❌ Failed to copy to clipboard: ${error.message}`)
    );
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
  } else {
    let keyPath = choice;

    if (choice === "new") {
      const result = await generateSSHKey();
      if (result) {
        keyPath = result.keyPath;
        const { action } = await inquirer.prompt([
          {
            type: "list",
            name: "action",
            message: "What would you like to do with the new SSH key?",
            choices: [
              {
                name: "📋 Copy to clipboard (paste into GitHub manually)",
                value: "copy",
              },
              {
                name: "🌐 Upload to GitHub (requires Personal Access Token)",
                value: "upload",
              },
            ],
          },
        ]);

        if (action === "upload") {
          await uploadSSHKeyToGitHub(keyPath, result.email);
        } else {
          await copySSHKeyToClipboard(keyPath);
        }
      }
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
      keyPath = join(sshDir, keyName);
    }

    if (keyPath) {
      switchSSHKey(keyPath);
    }
  }

  await inquirer.prompt([
    {
      type: "input",
      name: "pause",
      message: chalk.green("\nPress ENTER to exit..."),
    },
  ]);
};

// Run the script
(async () => {
  await main();
})();
