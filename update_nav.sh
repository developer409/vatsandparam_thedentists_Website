#!/bin/bash

# Define the old and new nav patterns
OLD_NAV='          <a href="index.html#home" class="nav__link">Home</a>
          <a href="index.html#about" class="nav__link">About</a>
          <a href="index.html#approach" class="nav__link">Our Approach</a>
          <a href="index.html#treatments" class="nav__link">Treatments</a>
          <a href="index.html#team" class="nav__link">Team</a>
          <a href="index.html#technology" class="nav__link">Technology</a>
          <a href="index.html#education" class="nav__link">Education</a>
          <a href="index.html#testimonials" class="nav__link">Testimonials</a>
          <div class="nav__item dropdown">
            <a href="achievements.html" class="nav__link dropdown-toggle">Achievements</a>
            <div class="dropdown-menu">
              <a href="achievements.html#awards" class="dropdown-item">Awards and Recognition</a>
              <a href="achievements.html#initiatives" class="dropdown-item">Our Initiatives</a>
            </div>
          </div>
          <a href="blog.html" class="nav__link">Blog</a>
          <a href="index.html#contact" class="nav__link">Contact</a>'

NEW_NAV='          <a href="index.html#home" class="nav__link">Home</a>
          <a href="index.html#about" class="nav__link">About</a>

          <!-- Services Dropdown -->
          <div class="nav__item dropdown">
            <a href="#" class="nav__link dropdown-toggle">Services</a>
            <div class="dropdown-menu">
              <a href="index.html#approach" class="dropdown-item">Our Approach</a>
              <a href="index.html#treatments" class="dropdown-item">Treatments</a>
              <a href="index.html#technology" class="dropdown-item">Technology</a>
            </div>
          </div>

          <a href="index.html#team" class="nav__link">Team</a>

          <!-- Resources Dropdown -->
          <div class="nav__item dropdown">
            <a href="#" class="nav__link dropdown-toggle">Resources</a>
            <div class="dropdown-menu">
              <a href="index.html#education" class="dropdown-item">Education</a>
              <a href="index.html#testimonials" class="dropdown-item">Testimonials</a>
              <a href="achievements.html" class="dropdown-item">Achievements</a>
              <a href="blog.html" class="dropdown-item">Blog</a>
            </div>
          </div>

          <a href="index.html#contact" class="nav__link">Contact</a>'

# Find all HTML files except index.html and tooth-colored-fillings.html (already updated)
for file in *.html; do
  if [[ "$file" != "index.html" && "$file" != "tooth-colored-fillings.html" ]]; then
    if grep -q "nav__links" "$file"; then
      echo "Updating $file..."
      sed -i "s|<a href=\"index.html#home\" class=\"nav__link\">Home</a>|<a href=\"index.html#home\" class=\"nav__link\">Home</a>|" "$file"
    fi
  fi
done

echo "Done!"
