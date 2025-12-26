# E-Bike Store

A modern e-commerce application for browsing and purchasing electric bikes, built with React, JavaScript, and Tailwind CSS.

## Features

- 🚴 Browse a collection of premium e-bikes
- 🔍 View detailed specifications for each bike
- 🛒 Shopping cart functionality
- 📱 Responsive design for all devices
- ⚡ Fast and modern UI with Tailwind CSS

## Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── BikeCard.js       # Individual bike display card
│   ├── BikeDetails.js    # Modal for bike specifications
│   ├── Cart.js           # Shopping cart modal
│   └── Header.js         # Navigation header
├── data/
│   └── bikes.js          # Bike inventory data
├── App.js                # Main application component
├── App.css               # Custom styles
└── index.css             # Tailwind CSS imports
```

## Technologies Used

- **React** - UI framework
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

## Available Bikes

The store features 6 different e-bike models:
- Urban Commuter Pro
- Mountain Explorer X
- City Cruiser Lite
- Cargo Master 3000
- Speed Demon Elite
- Folding Compact Plus

Each bike includes specifications like price, range, max speed, and battery capacity.
