# 🚀 SSH Switcher

SSH Switcher is a simple CLI tool that allows users to easily switch between multiple SSH keys or generate a new SSH key. This is particularly useful when working with multiple Git accounts, such as a company GitLab and a personal GitHub account.

## 📥 Download & Install

### 🔽 Download the latest version

You can download the latest `ssh-switcher.exe` from the [GitHub Releases](https://github.com/AlouiLouai/git-keys-manager/releases/latest).

1. Click to `Source code (zip)`

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
- **Generate a new SSH key** Create a new key and choose to:
  - **Copy to Clipboard**: Paste it into GitHub manually.
  - **Upload to GitHub**: Use a Personal Access Token (PAT) to upload it automatically (see below for PAT creation).
- **Exit** the program when done

### Adding a New Key to GitHub

When generating a new SSH key:

- **Clipboard Option**: Select "Copy to clipboard," then paste it into GitHub at _Settings > SSH and GPG keys > New SSH key_.

- **Upload Option**: Select "Upload to GitHub," then provide a PAT (see "Creating a GitHub Personal Access Token" below).

## 🔑 Creating a GitHub Personal Access Token (PAT)

To upload an SSH key to GitHub automatically, you’ll need a Personal Access Token (PAT) with the **admin:public_key** scope. Here’s how to create and use it:

1. Log in to GitHub:

- Go to github.com and sign in.

2. Access Token Settings:

- Click your profile picture (top-right) > **Settings > Developer settings (in the left sidebar) > Personal access tokens > Tokens (classic)**.

3. Generate a New Token:

- Click Generate new token (classic).
- Enter a Note (e.g., "SSH Switcher").
- Set an Expiration (e.g., "No expiration" or a custom date).
- Under Select scopes, check the box for admin:public_key (this allows the token to manage SSH keys).

3. Create and Copy the Token:

- Click Generate token.
- Copy the token immediately (e.g., **ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx**). You won’t see it again after leaving the page.

4. Use the Token in SSH Switcher:

- Run **ssh-switcher.exe**.
- Select "Generate and use a new SSH key."
- After generating the key, choose "Upload to GitHub."
- When prompted: Enter your GitHub Personal Access Token (with admin:public_key scope):, paste the token (right-click to paste in the terminal or press Ctrl+V) and press Enter.

Note: The input is hidden for security, so it won’t display as you paste.

## 🎯 Example Output

```sh
🚀 SSH Key Switcher
? Select an option:
  💼 Company GitLab (id_rsa)
  🏠 Personal GitHub (Enter custom key name)
  ➕ Generate and use a new SSH key
  ❌ Exit

[User selects "Generate and use a new SSH key"]
? Enter a name for your new SSH key (e.g., id_custom): my_key
? Enter your email for the SSH key: user@example.com
✔ SSH key generated: C:\Users\YourUser\.ssh\my_key

? What would you like to do with the new SSH key?
  📋 Copy to clipboard (paste into GitHub manually)
  🌐 Upload to GitHub (requires Personal Access Token)

[User selects "Copy to clipboard"]
✔ Public key copied to clipboard!
➡️ Paste it into GitHub: Settings > SSH and GPG keys > New SSH key

✔ SSH key switched to: C:\Users\YourUser\.ssh\my_key
Press ENTER to exit...

[Alternatively, if "Upload to GitHub" is selected]
? Enter your GitHub Personal Access Token (with admin:public_key scope): [hidden input]
? Enter a title for the SSH key on GitHub (e.g., My Laptop): My Device
✔ SSH key uploaded to GitHub: My Device
✔ SSH key switched to: C:\Users\YourUser\.ssh\my_key
Press ENTER to exit...
```

## 👨‍💻 Author

- **Aloui Louai** – [GitHub Profile](https://github.com/alouilouai)

## 📜 License

This project is licensed under the MIT License.
