(function () {
  'use strict';

  const contactForms = document.querySelectorAll('#contactForm');

  contactForms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const phone = form.querySelector('input[name="phone"]').value;
      const message = form.querySelector('textarea[name="message"]').value;
      const submitBtn = form.querySelector('button[type="submit"]');

      // Disable button
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch('https://formspree.io/f/xvgzoeed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message,
            _subject: `New inquiry from ${name}`,
          }),
        });

        if (response.ok) {
          alert('Thank you! Your message has been sent to happytohelp@vatsandparam.com');
          form.reset();
        } else {
          alert('Error sending message. Please try again or contact us directly.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Error sending message. Please try again or contact us directly.');
      }

      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
})();
