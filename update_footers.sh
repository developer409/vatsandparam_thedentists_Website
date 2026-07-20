#!/bin/bash

# Footer template with legal disclaimers and YouTube
FOOTER='  <footer class="footer" id="mainFooter">
    <div class="container">
      <div class="footer__grid">
        <div>
          <a href="index.html#home" class="nav__logo nav__logo--footer"
            style="margin-bottom:var(--space-sm);display:inline-flex;">
            <div class="nav__logo-icon-container">
              <img src="assets/logo_teeth.png" alt="Vats & Param logo" class="nav__logo-img" style="width:32px;height:auto;">
            </div>
            <div class="nav__logo-text" style="color:#fff;">
              Vats &amp; Param
              <div class="nav__logo-subtitle">
                <span class="logo-line"></span>
                <span>The Dentists</span>
                <span class="logo-line"></span>
              </div>
              <p class="footer__brand-tagline">Longevity &amp; Whole-Body Focused Dentistry.</p>
            </div>
          </a>
        </div>
        <div>
          <h4 class="footer__heading">Navigation</h4>
          <a href="index.html#home" class="footer__link">Home</a>
          <a href="index.html#about" class="footer__link">About</a>
          <a href="index.html#treatments" class="footer__link">Services</a>
          <a href="index.html#approach" class="footer__link">Our Approach</a>
          <a href="index.html#team" class="footer__link">Team</a>
        </div>
        <div>
          <h4 class="footer__heading">Resources</h4>
          <a href="index.html#technology" class="footer__link">Technology</a>
          <a href="index.html#education" class="footer__link">Education</a>
          <a href="index.html#testimonials" class="footer__link">Testimonials</a>
          <a href="index.html#careers" class="footer__link">Careers</a>
          <a href="index.html#contact" class="footer__link">Contact</a>
        </div>
        <div>
          <h4 class="footer__heading">Contact & Timings</h4>
          <p class="footer__link"><a href="mailto:happytohelp@vatsandparam.com" style="color: inherit; text-decoration: none;">happytohelp@vatsandparam.com</a></p>
          <p class="footer__link"><a href="tel:+919900114151" style="color: inherit; text-decoration: none;">+91 9900114151</a></p>
          <p class="footer__link">Mon – Sun: 10:00 AM – 7:00 PM</p>
          <p class="footer__link">Thursday: Closed</p>
          <p class="footer__link">Bengaluru: <a href="https://maps.google.com/?q=363,Bannerghatta+Rd,opposite+Reliance+Digital,Pai+Layout,Hulimavu,Bengaluru,Karnataka+560076" target="_blank" style="color:inherit;text-decoration:underline;">Hulimavu</a> | <a href="https://maps.google.com/?q=WH4P%2B95Q,KR+Layout,2nd+Phase,JP+Nagar,Bengaluru,Karnataka+560078" target="_blank" style="color:inherit;text-decoration:underline;">J.P Nagar</a> | <a href="https://maps.google.com/?q=83,6th+Cross+Rd,Arekere+MICO+Layout+2nd+stage,Araka+Mico+Layout,Arekere,Bengaluru,Karnataka+560076" target="_blank" style="color:inherit;text-decoration:underline;">Arekere</a></p>
        </div>
      </div>
      <div class="footer__socials">
        <a href="https://instagram.com/vatsandparam" target="_blank" class="footer__social-icon" title="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
          </svg>
        </a>
        <a href="https://www.youtube.com/@ScrubGuru-un3wu" target="_blank" class="footer__social-icon" title="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>
      <!-- ===== LEGAL LINKS ===== -->
      <div class="footer__disclaimers">
        <p class="footer__legal-notice">Educational information only. Individual treatment needs and outcomes vary. No guarantee or warranty is provided regarding treatment outcomes, timelines or longevity. Consultation required before treatment recommendations can be made.</p>
        <div class="footer__policy-links">
          <button class="footer__policy-link" data-modal="modal-medical">Medical Disclaimer</button>
          <span class="footer__policy-sep">&middot;</span>
          <button class="footer__policy-link" data-modal="modal-terms">Terms &amp; Conditions</button>
          <span class="footer__policy-sep">&middot;</span>
          <button class="footer__policy-link" data-modal="modal-privacy">Privacy Policy</button>
        </div>
      </div>
      <!-- ===== END LEGAL ===== -->

      <div class="footer__bottom">
        <span>&copy; 2026 <img src="assets/logo.png" alt="Vats &amp; Param" class="footer-brand-logo">. All rights reserved.</span>
        <span>Dentistry, Reconnected to the Body</span>
      </div>
    </div>
  </footer>'

# Find all treatment HTML files and update them
for file in *.html; do
  # Skip index and specific files
  if [[ "$file" == "index.html" || "$file" == "achievements.html" || "$file" == "blog.html" || "$file" == "doctor-profile.html" || "$file" == "care-philosophy.html" || "$file" =~ "_backup" ]]; then
    continue
  fi
  
  # Check if file has footer section
  if grep -q '<footer class="footer"' "$file"; then
    echo "Updating $file..."
    # Remove old footer and add new one
    sed -i '/<footer class="footer"/,/<\/footer>/c\'"$FOOTER"'' "$file"
  fi
done

echo "Done updating all treatment page footers!"
