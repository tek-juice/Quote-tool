# Quote Tool

## Overview
The Quote Tool is a React-based web application designed to provide users with property-related quotes. It features a clean UI built with Material UI and manages application state using Redux.

## Features
- **User-friendly UI**: Built with Material UI for a responsive and modern design.
- **State Management**: Uses Redux to manage global state efficiently.
- **Quote Categories**: Allows users to get quotes for different property-related actions (Buying, Selling, Remortgaging, etc.).
- **Reusable Components**: Modular design with reusable Material UI components.
- **Fast and Efficient**: Optimized for performance with React best practices.

## Technologies Used
- **React (TypeScript)**: Frontend library for building the UI.
- **Redux**: State management.
- **Material UI (MUI)**: UI component library for styling.
- **React Router**: Handles navigation.
- **Vite**: Build tool for fast development.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/tek-juice/Quote-tool.git
   cd quote-tool
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure
```
quote-tool/
│── node_modules/
│── public/
│── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── data/             # Static or API data
│   ├── pages/            # Page components
│   ├── routes/           # Routing components
│   ├── services/         # API and business logic
│   ├── store/            # Redux store and slices
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Application entry point
│── .gitignore
│── eslint.config.js
│── index.html
│── LICENSE
│── package-lock.json
│── package.json
│── README.md
│── tsconfig.app.json
│── tsconfig.json
│── tsconfig.node.json
│── vite.config.ts
```

## Usage
- Click on one of the property options to get a quote.
- The selected category will trigger an action handled by Redux.
- The UI updates dynamically based on user interactions.

## Contribution
Feel free to contribute by forking the repo and submitting pull requests.

## License
This project is licensed under the MIT License.

