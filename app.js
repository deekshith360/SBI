// Account data - Updated with enhanced interest structure
const accountData = {
  "account": {
    "name": "Sakamma",
    "accountNumber": "54022460144",
    "ifsc": "SBIN0040039"
  },
  "fixedDeposit": {
    "fdNumber": "44513163502",
    "principal": 1000000,
    "interestRate": 8.2,
    "startDate": "2025-09-30",
    "maturityDate": "2026-12-18",
    "totalAnnualInterest": 7900,
    "savingsSchemeDeduction": 3200,
    "monthlyInterestCredit": 4700
  },
  "interestCredit": {
    "nextCreditDate": "2025-10-30",
    "monthlyAmount": 4700,
    "frequency": "Monthly"
  },
  "activity": [
    {
      "date": "2025-09-30",
      "desc": "FD Opened",
      "amount": 1000000,
      "balance": 1000000
    }
  ],
  "notifications": [
    "Monthly interest of ₹4,700 will be credited on 03 NOV 2025.",
    "Your FD is maturing on 12 Dec 2026.",
    "Savings scheme deduction: ₹3,200 from total annual interest."
  ]
};

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatCurrencyPlain(amount) {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();
}

function formatAccountNumber(accountNumber) {
  // Add spaces for better readability
  return accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// DOM manipulation functions
function populateAccountSummary(data) {
  try {
    // Header account holder name
    const headerName = document.getElementById('accountHolderName');
    if (headerName) {
      headerName.textContent = data.account.name;
    }

    // Account summary cards
    const accountName = document.getElementById('accountName');
    const accountNumber = document.getElementById('accountNumber');
    const ifscCode = document.getElementById('ifscCode');

    if (accountName) accountName.textContent = data.account.name;
    if (accountNumber) accountNumber.textContent = formatAccountNumber(data.account.accountNumber);
    if (ifscCode) ifscCode.textContent = data.account.ifsc;

  } catch (error) {
    console.error('Error populating account summary:', error);
    showError('Failed to load account summary');
  }
}

function populateFixedDepositDetails(data) {
  try {
    const fd = data.fixedDeposit;
    
    // FD Details
    const fdNumber = document.getElementById('fdNumber');
    const principalAmount = document.getElementById('principalAmount');
    const interestRate = document.getElementById('interestRate');
    const startDate = document.getElementById('startDate');
    const maturityDate = document.getElementById('maturityDate');

    if (fdNumber) fdNumber.textContent = fd.fdNumber;
    if (principalAmount) principalAmount.textContent = formatCurrency(fd.principal);
    if (interestRate) interestRate.textContent = `${fd.interestRate}% p.a.`;
    if (startDate) startDate.textContent = formatDate(fd.startDate);
    if (maturityDate) maturityDate.textContent = formatDate(fd.maturityDate);

    // Enhanced Interest Breakdown
    const totalAnnualInterest = document.getElementById('totalAnnualInterest');
    const savingsSchemeDeduction = document.getElementById('savingsSchemeDeduction');
    const monthlyInterestCredit = document.getElementById('monthlyInterestCredit');

    if (totalAnnualInterest) totalAnnualInterest.textContent = formatCurrency(fd.totalAnnualInterest);
    if (savingsSchemeDeduction) savingsSchemeDeduction.textContent = formatCurrency(fd.savingsSchemeDeduction);
    if (monthlyInterestCredit) monthlyInterestCredit.textContent = formatCurrency(fd.monthlyInterestCredit);

    // Update calculation display
    const calcTotal = document.getElementById('calcTotal');
    const calcDeduction = document.getElementById('calcDeduction');
    const calcResult = document.getElementById('calcResult');

    if (calcTotal) calcTotal.textContent = formatCurrencyPlain(fd.totalAnnualInterest);
    if (calcDeduction) calcDeduction.textContent = formatCurrencyPlain(fd.savingsSchemeDeduction);
    if (calcResult) calcResult.textContent = formatCurrencyPlain(fd.monthlyInterestCredit);

  } catch (error) {
    console.error('Error populating fixed deposit details:', error);
    showError('Failed to load fixed deposit details');
  }
}

function populateInterestCreditInfo(data) {
  try {
    const nextCreditDate = document.getElementById('nextCreditDate');
    const nextCreditAmount = document.getElementById('nextCreditAmount');

    if (nextCreditDate) {
      nextCreditDate.textContent = formatDate(data.interestCredit.nextCreditDate);
    }
    if (nextCreditAmount) {
      nextCreditAmount.textContent = formatCurrency(data.interestCredit.monthlyAmount);
    }

  } catch (error) {
    console.error('Error populating interest credit info:', error);
    showError('Failed to load interest credit information');
  }
}

function populateNotifications(data) {
  try {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;

    if (data.notifications && data.notifications.length > 0) {
      notificationsList.innerHTML = '';
      
      data.notifications.forEach((notification, index) => {
        const notificationDiv = document.createElement('div');
        
        // Apply different styling based on notification content
        let notificationClass = 'notification-item';
        if (notification.includes('Monthly interest')) {
          notificationClass = 'interest-notification';
        } else if (notification.includes('Savings scheme')) {
          notificationClass = 'savings-scheme-notification';
        }
        
        notificationDiv.className = `${notificationClass} flex items-start space-x-3`;
        
        let icon = '!';
        let iconBg = 'bg-yellow-500';
        
        if (notification.includes('Monthly interest')) {
          icon = '💳';
          iconBg = 'bg-green-500';
        } else if (notification.includes('maturing')) {
          icon = '📅';
          iconBg = 'bg-blue-500';
        } else if (notification.includes('Savings scheme')) {
          icon = '📊';
          iconBg = 'bg-orange-500';
        }
        
        notificationDiv.innerHTML = `
          <div class="flex-shrink-0 w-6 h-6 ${iconBg} rounded-full flex items-center justify-center mt-0.5">
            <span class="text-white text-xs">${icon}</span>
          </div>
          <div class="flex-1">
            <p class="text-gray-800 font-medium">${notification}</p>
            ${notification.includes('Monthly interest') ? 
              '<p class="text-xs text-green-600 mt-1 font-semibold">✓ Recurring Monthly Credit</p>' : ''
            }
          </div>
        `;
        
        notificationsList.appendChild(notificationDiv);
      });
    } else {
      notificationsList.innerHTML = '<div class="text-gray-500 text-center py-4">No notifications at this time.</div>';
    }

  } catch (error) {
    console.error('Error populating notifications:', error);
    showError('Failed to load notifications');
  }
}

function populateAccountActivity(data) {
  try {
    const activityTableBody = document.getElementById('activityTableBody');
    if (!activityTableBody) return;

    if (data.activity && data.activity.length > 0) {
      activityTableBody.innerHTML = '';
      
      data.activity.forEach(transaction => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200';
        
        const isCredit = transaction.amount > 0;
        const amountClass = isCredit ? 'text-green-600' : 'text-red-600';
        const amountPrefix = isCredit ? '+' : '-';
        
        row.innerHTML = `
          <td class="py-3 px-2 text-gray-700 date-display">${formatDate(transaction.date)}</td>
          <td class="py-3 px-2 text-gray-800 font-medium">${transaction.desc}</td>
          <td class="py-3 px-2 text-right font-semibold ${amountClass}">
            ${amountPrefix}${formatCurrency(Math.abs(transaction.amount))}
          </td>
          <td class="py-3 px-2 text-right font-semibold text-gray-800">
            ${formatCurrency(transaction.balance)}
          </td>
        `;
        
        activityTableBody.appendChild(row);
      });
    } else {
      activityTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-8 text-gray-500">
            No account activity found.
          </td>
        </tr>
      `;
    }

  } catch (error) {
    console.error('Error populating account activity:', error);
    showError('Failed to load account activity');
  }
}

function showError(message) {
  console.error('Application Error:', message);
  
  // Create error notification
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50';
  errorDiv.innerHTML = `
    <div class="flex items-center space-x-2">
      <span class="text-red-500">⚠️</span>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(errorDiv);
  
  // Remove error after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

function showLoadingState() {
  // Add loading class to elements that should show loading state
  const loadingElements = document.querySelectorAll('[id$="Loading..."]');
  loadingElements.forEach(element => {
    element.classList.add('loading');
  });
}

function hideLoadingState() {
  // Remove loading class from all elements
  const loadingElements = document.querySelectorAll('.loading');
  loadingElements.forEach(element => {
    element.classList.remove('loading');
  });
}

// Alternative function to load data from external JSON file
// This would be used if data.json is served from a web server
async function loadDataFromJSON() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Could not load external data.json, using embedded data:', error);
    return accountData; // Fallback to embedded data
  }
}

// Enhanced animation for monthly credit highlight
function addMonthlyInterestAnimation() {
  const monthlyCredit = document.getElementById('monthlyInterestCredit');
  if (monthlyCredit) {
    monthlyCredit.parentElement.classList.add('monthly-credit-highlight');
  }

  const nextCreditAmount = document.getElementById('nextCreditAmount');
  if (nextCreditAmount) {
    nextCreditAmount.parentElement.parentElement.classList.add('credit-info-card');
  }
}

// Main initialization function
async function initializeApp() {
  try {
    showLoadingState();
    
    // Try to load from external JSON first, fallback to embedded data
    let data;
    try {
      data = await loadDataFromJSON();
    } catch (error) {
      console.log('Using embedded account data');
      data = accountData;
    }
    
    // Validate data structure
    if (!data || !data.account) {
      throw new Error('Invalid account data structure');
    }

    // Populate all sections
    populateAccountSummary(data);
    populateFixedDepositDetails(data);
    populateInterestCreditInfo(data);
    populateNotifications(data);
    populateAccountActivity(data);
    
    hideLoadingState();
    
    // Add enhanced animations after data is loaded
    setTimeout(() => {
      addMonthlyInterestAnimation();
    }, 500);
    
    console.log('Banking dashboard initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
    hideLoadingState();
    showError('Failed to load banking data. Please refresh the page.');
  }
}

// Additional utility functions for enhanced UX
function addInteractiveFeatures() {
  // Add click-to-copy functionality for account number and IFSC
  const accountNumberElement = document.getElementById('accountNumber');
  const ifscElement = document.getElementById('ifscCode');
  
  if (accountNumberElement) {
    accountNumberElement.style.cursor = 'pointer';
    accountNumberElement.title = 'Click to copy account number';
    accountNumberElement.addEventListener('click', () => {
      const accountNum = accountData.account.accountNumber;
      navigator.clipboard.writeText(accountNum).then(() => {
        showSuccessMessage('Account number copied to clipboard!');
      });
    });
  }
  
  if (ifscElement) {
    ifscElement.style.cursor = 'pointer';
    ifscElement.title = 'Click to copy IFSC code';
    ifscElement.addEventListener('click', () => {
      const ifsc = accountData.account.ifsc;
      navigator.clipboard.writeText(ifsc).then(() => {
        showSuccessMessage('IFSC code copied to clipboard!');
      });
    });
  }

  // Add hover effects to interest calculation
  const calculationElement = document.querySelector('.calculation-formula');
  if (calculationElement) {
    calculationElement.addEventListener('mouseenter', () => {
      calculationElement.style.transform = 'scale(1.05)';
      calculationElement.style.background = 'rgba(34, 197, 94, 0.1)';
    });
    
    calculationElement.addEventListener('mouseleave', () => {
      calculationElement.style.transform = 'scale(1)';
      calculationElement.style.background = 'rgba(255, 255, 255, 0.8)';
    });
  }
}

function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50';
  successDiv.innerHTML = `
    <div class="flex items-center space-x-2">
      <span class="text-green-500">✓</span>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  }, 3000);
}

// Enhanced interest information display
function highlightInterestFeatures() {
  // Add monthly badge animation
  const monthlyBadges = document.querySelectorAll('.bg-green-100');
  monthlyBadges.forEach(badge => {
    if (badge.textContent.includes('Monthly Recurring')) {
      badge.classList.add('monthly-badge');
    }
  });

  // Add shimmer effect to credit cards
  const creditCards = document.querySelectorAll('.bg-blue-50, .bg-green-50');
  creditCards.forEach(card => {
    card.classList.add('credit-info-card');
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  
  // Add interactive features after a short delay
  setTimeout(() => {
    addInteractiveFeatures();
    highlightInterestFeatures();
  }, 1000);
});

// Handle page visibility changes to refresh data when tab becomes active
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Optionally refresh data when user returns to tab
    console.log('Tab became active - data could be refreshed here');
  }
});

// Export functions for potential use in other scripts
window.BankingApp = {
  initializeApp,
  formatCurrency,
  formatDate,
  showError,
  showSuccessMessage,
  accountData
};
