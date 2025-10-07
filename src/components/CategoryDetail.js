import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryDetail.css';

function CategoryDetail({
  categories,
  addTransaction,
  deleteTransaction,
  renameCategory,
  updateCategoryAllocation
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find(cat => cat.id === id);

  const [transactionType, setTransactionType] = useState('debit');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAllocation, setEditAllocation] = useState('');

  if (!category) {
    return (
      <div className="category-detail">
        <div className="error-message">
          <h2>Category not found</h2>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return category.transactions.reduce((total, transaction) => {
      return total + (transaction.type === 'debit' ? -transaction.amount : transaction.amount);
    }, 0);
  };

  const total = calculateTotal();
  const remaining = category.allocated + total;
  const isOverBudget = remaining < 0;

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (transactionAmount && parseFloat(transactionAmount) > 0) {
      addTransaction(id, {
        type: transactionType,
        amount: parseFloat(transactionAmount),
        description: transactionDescription || `${transactionType === 'debit' ? 'Expense' : 'Income'}`,
        date: new Date().toISOString()
      });
      setTransactionAmount('');
      setTransactionDescription('');
    }
  };

  const handleEditCategory = () => {
    setEditingCategory(true);
    setEditName(category.name);
    setEditAllocation(category.allocated.toString());
  };

  const handleSaveCategory = () => {
    if (editName.trim()) {
      renameCategory(id, editName);
      updateCategoryAllocation(id, editAllocation);
      setEditingCategory(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(false);
    setEditName('');
    setEditAllocation('');
  };

  return (
    <div className="category-detail">
      <button onClick={() => navigate('/')} className="back-button">← Back to Dashboard</button>

      <div className="category-header-detail">
        {editingCategory ? (
          <div className="edit-category-form">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Category name"
            />
            <input
              type="number"
              value={editAllocation}
              onChange={(e) => setEditAllocation(e.target.value)}
              placeholder="Allocated amount"
              step="0.01"
            />
            <div className="edit-buttons">
              <button onClick={handleSaveCategory} className="save-btn">Save</button>
              <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>{category.name}</h1>
            <button onClick={handleEditCategory} className="edit-category-btn">✏️ Edit Category</button>
          </>
        )}
      </div>

      <div className="category-summary">
        <div className="summary-item">
          <h3>Allocated</h3>
          <p className="amount">${category.allocated.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Spent</h3>
          <p className="amount spent-amount">${Math.abs(total).toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Remaining</h3>
          <p className={`amount ${isOverBudget ? 'over-budget' : 'under-budget'}`}>
            ${remaining.toFixed(2)}
            {isOverBudget && ' ⚠️'}
          </p>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar-large">
          <div
            className={`progress-fill-large ${isOverBudget ? 'over-budget-bar' : ''}`}
            style={{ width: `${Math.min((Math.abs(total) / category.allocated) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {((Math.abs(total) / category.allocated) * 100).toFixed(1)}% of budget used
        </p>
      </div>

      <div className="transaction-form-section">
        <h2>Add Transaction</h2>
        <form onSubmit={handleAddTransaction} className="transaction-form">
          <div className="form-row">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="debit">Expense (Debit)</option>
              <option value="credit">Income/Refund (Credit)</option>
            </select>
            <input
              type="number"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              placeholder="Amount"
              step="0.01"
              min="0.01"
            />
          </div>
          <input
            type="text"
            value={transactionDescription}
            onChange={(e) => setTransactionDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      <div className="transactions-section">
        <h2>Transactions</h2>
        {category.transactions.length === 0 ? (
          <p className="no-transactions">No transactions yet. Add one above!</p>
        ) : (
          <div className="transactions-list">
            {[...category.transactions].reverse().map((transaction) => (
              <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                <div className="transaction-info">
                  <span className="transaction-description">{transaction.description}</span>
                  <span className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="transaction-right">
                  <span className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'debit' ? '-' : '+'}${transaction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => deleteTransaction(id, transaction.id)}
                    className="delete-transaction-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;
