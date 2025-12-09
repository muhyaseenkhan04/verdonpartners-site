  <script>
  (function () {
    var form = document.getElementById('unified-contact-form');
    if (!form) return;

    var typeSelect   = document.getElementById('enquiry-type');
    var subjectInput = document.getElementById('contact-subject');
    var hiddenSubject = document.getElementById('email-subject');

    var ENDPOINTS = {
      client:  'https://formsubmit.co/clients@averdonpartners.com',
      talent:  'https://formsubmit.co/talent@averdonpartners.com',
      general: 'https://formsubmit.co/info@averdonpartners.com'
    };

    function syncTypeFromHash() {
      if (!typeSelect) return;
      var hash = window.location.hash;

      if (hash === '#client-enquiries') {
        typeSelect.value = 'client';
      } else if (hash === '#talent-enquiries') {
        typeSelect.value = 'talent';
      } else if (hash === '#general-contact') {
        typeSelect.value = 'general';
      }
      // Anything else: leave current selection as-is
    }

    // Run on load + whenever hash changes
    syncTypeFromHash();
    window.addEventListener('hashchange', syncTypeFromHash);

    form.addEventListener('submit', function () {
      var type = typeSelect ? typeSelect.value : 'general';
      if (!ENDPOINTS[type]) type = 'general';

      // Set the correct FormSubmit endpoint
      form.action = ENDPOINTS[type];

      // Build email subject
      if (hiddenSubject) {
        var label = '';
        if (type === 'client') label = '[Client] ';
        else if (type === 'talent') label = '[Talent] ';
        else label = '[General] ';

        var userSubject = subjectInput && subjectInput.value
          ? subjectInput.value.trim()
          : 'Website enquiry';

        hiddenSubject.value = label + userSubject + ' – Averdon Partners';
      }
    });
  })();
</script>
