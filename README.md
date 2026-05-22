<a href="README.md">
  <img src="https://img.shields.io/badge/Language-English-blue?style=flat-square&logo=google-translate&logoColor=white" alt="English">
</a>
<a href="README-TR.md">
  <img src="https://img.shields.io/badge/Dil-Türkçe-red?style=flat-square&logo=google-translate&logoColor=white" alt="Türkçe">
</a>

  <br />
  <br />

<div align="center">
  <img src="frontend/public/logo.png" width="120" height="120" />

  <br />
  <br />

  <p>
    Player Query & Analysis Tool for FiveM Servers
  </p>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

  <p>
    <a href="#features">Features</a> •
    <a href="#technologies">Technologies</a> •
    <a href="#installation">Installation</a> •
    <a href="#license">License</a> •
    <a href="#gallery">Gallery</a>
  </p>

  <br />
  <br />
</div>

## 📋 About

**Aether Fivem** is a web application that allows you to query any FiveM game server and instantly view all connected players with their detailed information.

<img src="frontend/public/md/20260227203204299.jpg" width="100%"  />

## ✨ Features <a id="features"></a>

### Server Querying

- Enter the `players.json` endpoint URL of any FiveM server to pull live player data.
- Instant feedback with loading icons, error handling, and success status.
- **New Query** button to clear results and start fresh at any time.

### Player List & Details

- All online players are displayed in a responsive, animated card grid.
- Each card shows the **player name**, **server ID**, and **ping** value, complete with a color-coded latency indicator.
- Click on any player to open a **detailed modal**:

### Advanced Filtering

Real-time, multi-criteria search to quickly find specific players:

- **Player Name**: Filter by in-game name.
- **Player ID**: Filter by the ID assigned by the server.
- **Steam ID**: Filter by Steam hex identifier.
- **Discord ID**: Filter by Discord identifier.
- All filters work simultaneously for precise results.
- **Clear All** button to reset all filters instantly.

### Live Statistics

Dashboard stat cards showing at a glance:

- **Total Players**: Number of connected players.
- **Filtered**: How many players match the current filter criteria.
- **Average Ping**: The average latency of all connected players.
- **Server**: Online status indicator.

## 🛠️ Technologies <a id="technologies"></a>

- **Frontend:** `React 19`, `Vite`, `Tailwind CSS`, `Axios`
- **Backend:** `Node.js`, `Express.js`, `CORS`

## 🚀 Installation <a id="installation"></a>

Follow the steps below to run the project in your local environment.

### Requirements

- **Node.js** (v18+)
- **npm**

### Step-by-Step Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/xkintaro/aether-fivem.git
    cd aether-fivem
    ```

2.  **Install Backend Dependencies**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Start the Backend Server**

    ```bash
    cd ../backend
    node index.js
    ```

    The backend will run at `http://localhost:5000`.

5.  **Start the Frontend Server**
    Open a new terminal:
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will run at `http://localhost:5173`.

### Usage

1. Open `http://localhost:5173` in your browser.
2. Enter the player endpoint URL of a FiveM server (e.g., `http://ip:port/players.json`).
3. Click **Query** to pull and display all connected players.
4. Use the filter inputs to search by Name, ID, Steam, or Discord.
5. Click on any player card to view their detailed information.

## 📄 License <a id="license"></a>

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🖼️ Gallery <a id="gallery"></a>

<img src="frontend/public/md/20260227203204081.jpg" width="100%"  />

#

<img src="frontend/public/md/20260227203204191.jpg" width="100%"  />

#

<p align="center">
  <sub>❤️ Developed by "Mustafa TAŞAL" (kintaro)</sub>
</p>
