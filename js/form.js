document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('assessmentForm');
  const statusCards = document.querySelectorAll('.status-card');
  const safetyStatusInput = document.getElementById('safetyStatus');

  // Handle status card selection
  statusCards.forEach(card => {
    card.addEventListener('click', () => {
      statusCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      safetyStatusInput.value = card.getAttribute('data-value');
    });
  });

  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!safetyStatusInput.value) {
        alert('Please select a Posting (Overall Safety Status) before submitting.');
        return;
      }

      const formData = new FormData(form);
      const assessmentId = Date.now().toString();
      
      const assessmentData = {
        id: assessmentId,
        timestamp: new Date().toISOString(),
        
        // 1. Inspection
        inspectorName: formData.get('inspectorName'),
        agency: formData.get('agency'),
        inspectionDate: formData.get('inspectionDate'),
        inspectionTime: formData.get('inspectionTime'),
        areasInspected: formData.get('areasInspected'),

        // 2. Building Description
        buildingName: formData.get('buildingName'),
        buildingAddress: formData.get('buildingAddress'),
        buildingMarshal: formData.get('buildingMarshal'),
        storiesAbove: formData.get('storiesAbove'),
        storiesBelow: formData.get('storiesBelow'),
        structureType: formData.get('structureType'),
        structureTypeOther: formData.get('structureTypeOther'),
        buildingUse: formData.get('buildingUse'),
        buildingUseOther: formData.get('buildingUseOther'),

        // 3. Evaluation
        condCollapse: formData.get('condCollapse'),
        condLeaning: formData.get('condLeaning'),
        condDamage: formData.get('condDamage'),
        condFalling: formData.get('condFalling'),
        condGround: formData.get('condGround'),
        condFixtures: formData.get('condFixtures'),
        condOther: formData.get('condOther'),
        condOtherSpecify: formData.get('condOtherSpecify'),
        estimatedDamage: formData.get('estimatedDamage'),
        evalComments: formData.get('evalComments'),

        // 4. Posting
        safetyStatus: formData.get('safetyStatus'), // Safe, Restricted, Unsafe
        resDoNotEnter: formData.get('resDoNotEnter') === 'on',
        resDoNotEnterText: formData.get('resDoNotEnterText'),
        resBriefEntry: formData.get('resBriefEntry') === 'on',
        resBriefEntryText: formData.get('resBriefEntryText'),
        resDoNotUse: formData.get('resDoNotUse') === 'on',
        resOther: formData.get('resOther') === 'on',
        resOtherText: formData.get('resOtherText'),

        // 5. Further Actions
        actBarricades: formData.get('actBarricades') === 'on',
        actBarricadesText: formData.get('actBarricadesText'),
        actDetailed: formData.get('actDetailed') === 'on',
        actDetailedStructural: formData.get('actDetailedStructural') === 'on',
        actDetailedGeotechnical: formData.get('actDetailedGeotechnical') === 'on',
        actDetailedOther: formData.get('actDetailedOther') === 'on',
        actOther: formData.get('actOther') === 'on',
        actOtherText: formData.get('actOtherText'),
        actComments: formData.get('actComments')
      };

      // Get existing assessments
      let assessments = JSON.parse(localStorage.getItem('rdana_assessments') || '[]');
      assessments.push(assessmentData);
      localStorage.setItem('rdana_assessments', JSON.stringify(assessments));

      // Redirect to analytics view
      window.location.href = 'analytics.html';
    });
  }
});
