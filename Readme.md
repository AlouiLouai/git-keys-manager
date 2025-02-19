# 🚀 SSH Switcher

SSH Switcher is a simple CLI tool that allows users to easily switch between multiple SSH keys or generate a new SSH key. This is particularly useful when working with multiple Git accounts, such as a company GitLab and a personal GitHub account.

## 📥 Download & Install

### 🔽 Download the latest version
You can download the latest `ssh-switcher.exe` from the [GitHub Releases](https://github.com/AlouiLouai/git-keys-manager/releases/latest).

Click to `Source code (zip)`

### 🏃‍♂️ Run the tool
Unzip the git-keys-manager-1.0.1 (actually the last release)

After unzipping, simply double-click `ssh-switcher.exe` or run it from the command line:

```sh
ssh-switcher.exe
```

## ⚡ Features
- Easily switch between SSH keys for different Git accounts
- Generate a new SSH key and save it automatically
- Simple command-line interface with interactive prompts

## 🛠️ Building from Source
If you want to build the executable yourself, follow these steps:

### 1️⃣ Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then install the dependencies:
```sh
npm install
```

### 2️⃣ Build the Executable
Run the following command to create a standalone Windows executable:
```sh
pkg -t node18-win-x64 -o ssh-switcher.exe index.js
```

The built `ssh-switcher.exe` will be generated in the project directory.

## 📌 Usage
Run the executable and follow the on-screen prompts to:
- **Switch to a different SSH key** (e.g., `id_rsa` for company GitLab or a personal SSH key for GitHub)
- **Generate a new SSH key** with a custom name
- **Exit** the program when done

## 🎯 Example Output
```
🚀 SSH Key Switcher
? Select an option:
  💼 Company GitLab (id_rsa)
  🏠 Personal GitHub (Enter custom key name)
  ➕ Generate and use a new SSH key
  ❌ Exit
✔ SSH key switched to: C:\Users\YourUser\.ssh\id_rsa
Press ENTER to exit...
```

## 👨‍💻 Author
- **Aloui Louai** – [GitHub Profile](https://github.com/alouilouai)

## 📜 License
This project is licensed under the MIT License.