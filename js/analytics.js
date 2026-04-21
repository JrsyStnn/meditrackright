document.addEventListener('DOMContentLoaded', () => {
  // Get data from localStorage
  const assessments = JSON.parse(localStorage.getItem('rdana_assessments') || '[]');

  // Elements
  const totalEl = document.getElementById('totalAssessments');
  const safeEl = document.getElementById('safeBuildings');
  const restrictedEl = document.getElementById('restrictedBuildings');
  const unsafeEl = document.getElementById('unsafeBuildings');
  const tableBody = document.getElementById('recentTableBody');
  const clearDataBtn = document.getElementById('clearDataBtn');

  // Calculate stats
  let safeCount = 0;
  let restrictedCount = 0;
  let unsafeCount = 0;
  
  const typeCount = {};

  assessments.forEach(a => {
    // Status counts
    if (a.safetyStatus === 'Safe') safeCount++;
    else if (a.safetyStatus === 'Restricted') restrictedCount++;
    else if (a.safetyStatus === 'Unsafe') unsafeCount++;

    // Type counts
    if (a.structureType) {
      typeCount[a.structureType] = (typeCount[a.structureType] || 0) + 1;
    }
  });

  // Update DOM stats
  totalEl.textContent = assessments.length;
  safeEl.textContent = safeCount;
  restrictedEl.textContent = restrictedCount;
  unsafeEl.textContent = unsafeCount;

  // Render Status Chart (Doughnut)
  const ctxStatus = document.getElementById('statusChart').getContext('2d');
  new Chart(ctxStatus, {
    type: 'doughnut',
    data: {
      labels: ['Safe (Green)', 'Restricted (Yellow)', 'Unsafe (Red)'],
      datasets: [{
        data: [safeCount, restrictedCount, unsafeCount],
        backgroundColor: [
          '#10b981', // Status Green
          '#f59e0b', // Status Yellow
          '#ef4444'  // Status Red
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // Render Type Chart (Bar)
  const ctxType = document.getElementById('typeChart').getContext('2d');
  new Chart(ctxType, {
    type: 'bar',
    data: {
      labels: Object.keys(typeCount),
      datasets: [{
        label: 'Number of Buildings',
        data: Object.values(typeCount),
        backgroundColor: '#dc2626', // Primary Red
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  // Populate Table
  if (assessments.length > 0) {
    tableBody.innerHTML = '';
    // Sort by timestamp descending and take top 10
    const recent = [...assessments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
    
    recent.forEach(a => {
      const date = new Date(a.timestamp).toLocaleDateString();
      
      let statusColor = '';
      if(a.safetyStatus === 'Safe') statusColor = 'color: #10b981; font-weight: 600;';
      if(a.safetyStatus === 'Restricted') statusColor = 'color: #f59e0b; font-weight: 600;';
      if(a.safetyStatus === 'Unsafe') statusColor = 'color: #ef4444; font-weight: 600;';

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #f3f4f6';
      tr.innerHTML = `
        <td style="padding: 1rem;">${date}</td>
        <td style="padding: 1rem; font-weight: 500; color: #1e3a8a;">${a.buildingName}</td>
        <td style="padding: 1rem;">${a.inspectorName}</td>
        <td style="padding: 1rem;"><span style="${statusColor}">${a.safetyStatus}</span></td>
        <td style="padding: 1rem; text-align: center;">
          <a href="print.html?id=${a.id}" target="_blank" class="btn btn-secondary btn-sm" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
            <i class="fa-solid fa-print"></i> View
          </a>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Clear Data Button
  if (clearDataBtn) {
    clearDataBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all local assessment data? This cannot be undone.')) {
        localStorage.removeItem('rdana_assessments');
        location.reload();
      }
    });
  }
});
