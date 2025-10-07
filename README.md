# 💰 Personal Budget App

A modern, intuitive personal budget management application built with React. Track your income, create budget categories, manage expenses, and monitor your spending habits with an elegant user interface.

## 📋 Overview

Personal Budget App is a client-side React application that helps you manage your personal finances effectively. Set your monthly income, create custom budget categories, allocate funds, and track all your transactions in real-time. All data is stored locally in your browser, ensuring privacy and offline functionality.

## ✨ Features

### Dashboard
- **Income Management**: Set and update your monthly income
- **Budget Summary**: View total income, allocated funds, unallocated budget, and total spending at a glance
- **Category Management**: Create, edit, rename, and delete budget categories
- **Real-time Calculations**: Automatically calculates remaining budget and spending across all categories
- **Visual Progress Bars**: Track spending progress for each category
- **Budget Alerts**: Visual warnings when categories exceed allocated amounts

### Category Detail View
- **Transaction Tracking**: Add and manage both expenses (debits) and income/refunds (credits)
- **Transaction History**: View all transactions in reverse chronological order
- **Budget Progress**: Visual progress bar showing percentage of budget used
- **Detailed Summary**: See allocated amount, spent amount, and remaining budget
- **Edit Functionality**: Update category name and allocation directly from detail view

### Data Persistence
- **LocalStorage Integration**: All data automatically saved to browser's localStorage
- **Persistent State**: Data persists across browser sessions
- **Auto-save**: Changes are saved immediately without manual intervention

## 🏗️ How It Works

### Application Architecture

The app uses a component-based architecture with React Router for navigation:

1. **[App.js](src/App.js)** - Main application component
   - Manages global state (income and categories)
   - Handles localStorage persistence
   - Provides CRUD operations for categories and transactions
   - Sets up routing between Dashboard and CategoryDetail views

2. **[Dashboard.js](src/components/Dashboard.js)** - Main dashboard view
   - Displays income input and financial summary
   - Lists all budget categories with their allocations and spending
   - Provides forms to add new categories
   - Allows inline editing of category details
   - Shows visual progress bars for each category

3. **[CategoryDetail.js](src/components/CategoryDetail.js)** - Individual category view
   - Displays detailed category information
   - Provides transaction entry form (debit/credit)
   - Shows complete transaction history
   - Allows category editing and transaction deletion
   - Calculates and displays budget utilization

### Data Flow

1. **State Management**: All data is managed in the main App component and passed down as props
2. **LocalStorage Sync**: React's `useEffect` hooks automatically sync state with localStorage
3. **Category Structure**:
   ```javascript
   {
     id: "unique-timestamp",
     name: "Category Name",
     allocated: 500.00,
     transactions: [
       {
         id: "unique-timestamp",
         type: "debit" | "credit",
         amount: 50.00,
         description: "Transaction description",
         date: "ISO-date-string"
       }
     ]
   }
   ```

### Key Calculations

- **Total Allocated**: Sum of all category allocations
- **Total Spent**: Sum of absolute values of all transaction totals across categories
- **Unallocated Budget**: Income - Total Allocated
- **Category Spent**: Sum of transactions (debits as negative, credits as positive)
- **Category Remaining**: Allocated - Spent

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-kata-claude
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads automatically when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Ejects from Create React App configuration, giving you full control over webpack, Babel, ESLint, etc.

## 🛠️ Technologies Used

- **React 19.2.0** - UI library
- **React Router DOM 7.9.3** - Client-side routing
- **React Scripts 5.0.1** - Build tooling (Create React App)
- **Testing Library** - Component testing
- **CSS3** - Styling and animations

## 📱 Usage Guide

### Setting Up Your Budget

1. Enter your monthly income in the "Monthly Income" field
2. Click "Add New Category" to create budget categories (e.g., Groceries, Rent, Entertainment)
3. Set an allocated amount for each category

### Managing Categories

- **Edit**: Click the "Edit" button on any category to modify its name or allocation
- **Delete**: Click the "Delete" button to remove a category
- **View Details**: Click on the category name to view detailed transactions

### Tracking Transactions

1. Click on a category name to open the detail view
2. Select transaction type (Expense or Income/Refund)
3. Enter the amount and optional description
4. Click "Add Transaction" to record it
5. View all transactions in the list below, with the most recent at the top

### Monitoring Your Budget

- The dashboard shows color-coded indicators:
  - **Green**: Under budget or within limits
  - **Red**: Over budget or negative balance
- Progress bars visualize spending relative to allocated amounts
- Budget alerts (⚠️) appear when categories are over budget

## 📂 Project Structure

```
ai-kata-claude/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── Dashboard.js        # Main dashboard component
│   │   ├── Dashboard.css       # Dashboard styles
│   │   ├── CategoryDetail.js   # Category detail component
│   │   └── CategoryDetail.css  # Category detail styles
│   ├── App.js          # Main app component & routing
│   ├── App.css         # App-level styles
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🔐 Privacy & Data Storage

All data is stored locally in your browser's localStorage. No data is sent to external servers. Your financial information remains private and under your control.

## 🤝 Contributing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 📚 Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [React Router documentation](https://reactrouter.com/)

## 📄 License

This project is open source and available for personal use.
