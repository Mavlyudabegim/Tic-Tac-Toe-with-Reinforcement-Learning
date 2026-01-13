# 🧠 Q-Learning Tic-Tac-Toe

An interactive web application that demonstrates **Q-Learning Reinforcement Learning** through the classic game of Tic-Tac-Toe. Train an AI agent from scratch and watch it learn optimal strategies through self-play.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

[**Live Demo**](https://tic-tac-toe-with-reinforcement-lear.vercel.app/) | [**Report Bug**](https://github.com/yourusername/tic-tac-toe-rl/issues) | [**Request Feature**](https://github.com/yourusername/tic-tac-toe-rl/issues)

## ✨ Features

### 🎮 **Interactive Gameplay**
- Play against a trained AI agent
- Real-time action evaluation
- Visual feedback for game outcomes

### 🤖 **AI Training**
- Train from scratch with adjustable parameters
- Customizable exploration rate (epsilon)
- Self-play learning mechanism

### 📊 **Visualization & Analytics**
- Real-time training statistics
- Q-value visualization for each move
- Win/loss/draw tracking

---

### Try It Yourself

1. **Train the AI**: Click "Train 10K" to train with 10,000 games
2. **Adjust Parameters**: Use the epsilon slider to control exploration
3. **Play**: Challenge the trained AI to a game
4. **Analyze**: Show Q-values to see the AI's move evaluation
5. **Test**: Run diagnostics to verify strategic learning

---

## 🧮 How It Works

### Q-Learning Overview

Q-Learning is a **model-free reinforcement learning algorithm** that learns the value of actions in different states through trial and error.

**Core Concepts:**

1. **State (s)**: Current board configuration 
2. **Action (a)**: Placing a piece in an empty cell (0-8)
3. **Reward (r)**: +1 for winning, -1 for losing, +0.5 for draw
4. **Q-Value**: Expected future reward for taking action `a` in state `s`

**Update Formula:**
```
Q(s,a) ← Q(s,a) + α[r + γ·max Q(s',a') - Q(s,a)]
```

Where:
- `α` (alpha) = Learning rate (0.3)
- `γ` (gamma) = Discount factor (0.95)
- `s'` = Next state
- `a'` = Best action in next state

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps
```bash
# Clone the repository
git clone https://github.com/yourusername/tic-tac-toe-rl.git

# Navigate to project directory
cd tic-tac-toe-rl

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`




