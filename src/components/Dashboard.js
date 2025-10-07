import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({
  income,
  setIncome,
  categories,
  addCategory,
  deleteCategory,
  renameCategory,
  updateCategoryAllocation
}) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAllocation, setNewCategoryAllocation] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingAllocation, setEditingAllocation] = useState('');

  const calculateCategorySpent = (category) => {
    return category.transactions.reduce((total, transaction) => {
      return total + (transaction.type === 'debit' ? -transaction.amount : transaction.amount);
    }, 0);
  };

  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + Math.abs(calculateCategorySpent(cat)), 0);
  const unallocated = income - totalAllocated;

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName, newCategoryAllocation);
      setNewCategoryName('');
      setNewCategoryAllocation('');
    }
  };

  const handleEditCategory = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setEditingAllocation(category.allocated.toString());
  };

  const handleSaveEdit = () => {
    if (editingName.trim()) {
      renameCategory(editingId, editingName);
      updateCategoryAllocation(editingId, editingAllocation);
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingAllocation('');
  };

  return (
    <div className="dashboard">
      <div className="income-section">
        <h2>Monthly Income</h2>
        <div className="income-input">
          <span>$</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
            placeholder="Enter monthly income"
            step="0.01"
          />
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Income</h3>
          <p className="amount">${income.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Allocated</h3>
          <p className="amount">${totalAllocated.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Unallocated</h3>
          <p className={`amount ${unallocated < 0 ? 'over-budget' : 'under-budget'}`}>
            ${unallocated.toFixed(2)}
          </p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="amount">${totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <div className="add-category-section">
        <h2>Add New Category</h2>
        <form onSubmit={handleAddCategory} className="add-category-form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
          />
          <input
            type="number"
            value={newCategoryAllocation}
            onChange={(e) => setNewCategoryAllocation(e.target.value)}
            placeholder="Allocated amount"
            step="0.01"
          />
          <button type="submit">Add Category</button>
        </form>
      </div>

      <div className="categories-section">
        <h2>Budget Categories</h2>
        {categories.length === 0 ? (
          <p className="no-categories">No categories yet. Add one above!</p>
        ) : (
          <div className="categories-list">
            {categories.map((category) => {
              const spent = calculateCategorySpent(category);
              const remaining = category.allocated + spent;
              const isOverBudget = remaining < 0;

              if (editingId === category.id) {
                return (
                  <div key={category.id} className="category-card editing">
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        placeholder="Category name"
                      />
                      <input
                        type="number"
                        value={editingAllocation}
                        onChange={(e) => setEditingAllocation(e.target.value)}
                        placeholder="Allocated amount"
                        step="0.01"
                      />
                      <div className="edit-buttons">
                        <button onClick={handleSaveEdit} className="save-btn">Save</button>
                        <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={category.id} className={`category-card ${isOverBudget ? 'over-budget-card' : ''}`}>
                  <div className="category-header">
                    <Link to={`/category/${category.id}`} className="category-name">
                      <h3>{category.name}</h3>
                    </Link>
                    <div className="category-actions">
                      <button onClick={() => handleEditCategory(category)} className="edit-btn">
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteCategory(category.id)} className="delete-btn">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <div className="category-details">
                    <div className="detail-row">
                      <span>Allocated:</span>
                      <span className="allocated">${category.allocated.toFixed(2)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Spent:</span>
                      <span className="spent">${Math.abs(spent).toFixed(2)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Remaining:</span>
                      <span className={`remaining ${isOverBudget ? 'over-budget' : 'under-budget'}`}>
                        ${remaining.toFixed(2)}
                        {isOverBudget && ' ⚠️'}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${isOverBudget ? 'over-budget-bar' : ''}`}
                      style={{ width: `${Math.min((Math.abs(spent) / category.allocated) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
