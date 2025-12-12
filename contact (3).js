(function () {
  var form = document.getElementById('unified-contact-form');
  if (!form) return;

  var typeSelect    = document.getElementById('enquiry-type');
  var subjectInput  = document.getElementById('contact-subject');
  var hiddenSubject = document.getElementById('email-subject');

  var ENDPOINTS = {
    client:  'https://formsubmit.co/clients@averdonpartners.com',
    talent:  'https://formsubmit.co/talent@averdonpartners.com',
    general: 'https://formsubmit.co/info@averdonpartners.com'
  };

  function setTypeFromHash() {
    if (!typeSelect) return;
    var hash = window.location.hash;

    if (hash === '#contact-client') {
      typeSelect.value = 'client';
    } else if (hash === '#contact-talent') {
      typeSelect.value = 'talent';
    } else if (hash === '#contact' || hash === '#contact-general') {
      typeSelect.value = 'general';
    }
    // Anything else: leave current selection alone
  }

  // Run on load + whenever hash changes
  setTypeFromHash();
  window.addEventListener('hashchange', setTypeFromHash);

  form.addEventListener('submit', function () {
    var type = typeSelect ? typeSelect.value : 'general';
    if (!ENDPOINTS[type]) type = 'general';

    // Set the correct FormSubmit endpoint
    form.action = ENDPOINTS[type];

    // Build email subject
    if (hiddenSubject) {
      var label;
      if (type === 'client') {
        label = '[Client] ';
      } else if (type === 'talent') {
        label = '[Talent] ';
      } else {
        label = '[General] ';
      }

      var userSubject = subjectInput && subjectInput.value
        ? subjectInput.value.trim()
        : 'Website enquiry';

      hiddenSubject.value = label + userSubject + ' – Averdon Partners';
    }
  });
})();
