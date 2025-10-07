import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CategoryDetail from './components/CategoryDetail';
import './App.css';

function App() {
  const [income, setIncome] = useState(0);
  const [categories, setCategories] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedIncome = localStorage.getItem('income');
    const savedCategories = localStorage.getItem('categories');

    if (savedIncome) setIncome(parseFloat(savedIncome));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('income', income.toString());
  }, [income]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name, allocated) => {
    const newCategory = {
      id: Date.now().toString(),
      name,
      allocated: parseFloat(allocated) || 0,
      transactions: []
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const renameCategory = (id, newName) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, name: newName } : cat
    ));
  };

  const updateCategoryAllocation = (id, allocated) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, allocated: parseFloat(allocated) || 0 } : cat
    ));
  };

  const addTransaction = (categoryId, transaction) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, transactions: [...cat.transactions, { ...transaction, id: Date.now().toString() }] }
        : cat
    ));
  };

  const deleteTransaction = (categoryId, transactionId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, transactions: cat.transactions.filter(t => t.id !== transactionId) }
        : cat
    ));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>💰 Personal Budget App</h1>
          <Link to="/" className="home-link">Dashboard</Link>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                income={income}
                setIncome={setIncome}
                categories={categories}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
                renameCategory={renameCategory}
                updateCategoryAllocation={updateCategoryAllocation}
              />
            }
          />
          <Route
            path="/category/:id"
            element={
              <CategoryDetail
                categories={categories}
                addTransaction={addTransaction}
                deleteTransaction={deleteTransaction}
                renameCategory={renameCategory}
                updateCategoryAllocation={updateCategoryAllocation}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
