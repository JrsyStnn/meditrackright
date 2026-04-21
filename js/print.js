document.addEventListener('DOMContentLoaded', () => {
  // Get ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    alert('No assessment ID provided.');
    return;
  }

  // Get data from localStorage
  const assessments = JSON.parse(localStorage.getItem('rdana_assessments') || '[]');
  const data = assessments.find(a => a.id === id);

  if (!data) {
    alert('Assessment not found.');
    return;
  }

  // Helper functions
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '';
  };
  
  const checkRadio = (id, expectedValue, actualValue) => {
    const el = document.getElementById(id);
    if (el && expectedValue === actualValue) {
      el.classList.add('checked');
    }
  };
  
  const checkBool = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) {
      el.classList.add('checked');
    }
  };

  // 1. Inspection
  setText('p-inspector', data.inspectorName);
  setText('p-agency', data.agency);
  setText('p-date', data.inspectionDate);
  setText('p-time', data.inspectionTime);
  checkRadio('p-area-ext', 'Exterior Only', data.areasInspected);
  checkRadio('p-area-both', 'Exterior and interior', data.areasInspected);

  // 2. Building Description
  setText('p-bldg-name', data.buildingName);
  setText('p-bldg-address', data.buildingAddress);
  setText('p-bldg-marshal', data.buildingMarshal);
  setText('p-story-above', data.storiesAbove);
  setText('p-story-below', data.storiesBelow);

  checkRadio('p-type-wood', 'Wood Frame', data.structureType);
  checkRadio('p-type-steel', 'Steel Frame', data.structureType);
  checkRadio('p-type-concrete', 'Concrete Frame', data.structureType);
  checkRadio('p-type-masonry', 'Masonry', data.structureType);
  if (data.structureType === 'Other') {
    checkBool('p-type-other', true);
    setText('p-type-other-text', data.structureTypeOther);
  }

  checkRadio('p-occ-single', 'Single Family Dwelling', data.buildingUse);
  checkRadio('p-occ-multi', 'Multi-residential', data.buildingUse);
  checkRadio('p-occ-emerg', 'Emergency Services', data.buildingUse);
  checkRadio('p-occ-ind', 'Industrial', data.buildingUse);
  checkRadio('p-occ-off', 'Offices', data.buildingUse);
  checkRadio('p-occ-com', 'Commercial', data.buildingUse);
  checkRadio('p-occ-school', 'School', data.buildingUse);
  checkRadio('p-occ-gov', 'Government', data.buildingUse);
  if (data.buildingUse === 'Other') {
    checkBool('p-occ-other', true);
    setText('p-occ-other-text', data.buildingUseOther);
  }

  // 3. Evaluation
  const setEval = (prefix, val) => {
    checkRadio(`${prefix}-min`, 'Minor/None', val);
    checkRadio(`${prefix}-mod`, 'Moderate', val);
    checkRadio(`${prefix}-sev`, 'Severe', val);
  };
  setEval('p-cond-col', data.condCollapse);
  setEval('p-cond-lean', data.condLeaning);
  setEval('p-cond-dam', data.condDamage);
  setEval('p-cond-fall', data.condFalling);
  setEval('p-cond-gr', data.condGround);
  setEval('p-cond-fix', data.condFixtures);
  setEval('p-cond-oth', data.condOther);
  setText('p-cond-oth-text', data.condOtherSpecify);

  checkRadio('p-dam-none', 'None', data.estimatedDamage);
  checkRadio('p-dam-10', '1 - 10%', data.estimatedDamage);
  checkRadio('p-dam-30', '11 - 30%', data.estimatedDamage);
  checkRadio('p-dam-60', '31 - 60%', data.estimatedDamage);
  checkRadio('p-dam-99', '61 - 99%', data.estimatedDamage);
  checkRadio('p-dam-100', '100%', data.estimatedDamage);
  
  setText('p-eval-comments', data.evalComments);

  // 4. Posting
  checkRadio('p-post-green', 'Safe', data.safetyStatus);
  checkRadio('p-post-yellow', 'Restricted', data.safetyStatus);
  checkRadio('p-post-red', 'Unsafe', data.safetyStatus);

  checkBool('p-res-enter', data.resDoNotEnter);
  setText('p-res-enter-text', data.resDoNotEnterText);
  checkBool('p-res-brief', data.resBriefEntry);
  setText('p-res-brief-text', data.resBriefEntryText);
  checkBool('p-res-use', data.resDoNotUse);
  checkBool('p-res-oth', data.resOther);
  setText('p-res-oth-text', data.resOtherText);

  // 5. Further Actions
  checkBool('p-act-bar', data.actBarricades);
  setText('p-act-bar-text', data.actBarricadesText);
  checkBool('p-act-det', data.actDetailed);
  checkBool('p-act-det-str', data.actDetailedStructural);
  checkBool('p-act-det-geo', data.actDetailedGeotechnical);
  checkBool('p-act-det-oth', data.actDetailedOther);
  checkBool('p-act-oth', data.actOther);
  setText('p-act-oth-text', data.actOtherText);
  setText('p-act-comments', data.actComments);

  // Trigger print dialog after a brief delay to ensure styles are applied
  setTimeout(() => {
    window.print();
  }, 500);
});
