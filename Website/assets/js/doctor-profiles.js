const doctorData = {
    'vats': {
        name: 'Dr. Srivats B',
        role: 'Lead Dentist & Co-Founder',
        specialization: 'Endodontist',
        image: 'assets/Doctors/Dr_srivats.jpeg',
        education: 'BDS, MDS (Endodontics)',
        experience: '30+ Years Clinical Practice',
        languages: 'English, Hindi, Kannada, Telugu, Nepali',
        intro: `Dr. Srivats is a pioneer in <strong>Root-Cause Dentistry</strong>, focusing on the systemic connection between oral health and whole-body wellness. With over two decades of experience, he has mastered <strong>Precision Endodontics</strong> using advanced microscopic techniques.`,
        philosophy: `We don't just treat symptoms; we investigate the underlying biological and structural factors. My goal is to ensure <strong>Holistic Integration</strong> of dental care into your overall health journey, ensuring long-term stability and <strong>Vitality</strong>.`
    },
    'param': {
        name: 'Dr. Param',
        role: 'Lead Dentist & Co-Founder',
        specialization: 'Prosthodontist',
        image: 'assets/Doctors/Dr_Param.png',
        education: 'BDS, MDS (Prosthodontics)',
        experience: '20+ Years Clinical Practice',
        languages: 'English, Hindi, Punjabi',
        intro: `Dr. Param specializes in <strong>Precision Restorative Dentistry</strong>, focusing on functional harmony and aesthetic excellence. His expertise in <strong>Dental Implants</strong> and full-mouth rehabilitation has helped thousands regain their confidence.`,
        philosophy: `Modern dentistry is about more than just repair; it's about <strong>Bio-Mimetic Reconstruction</strong>. We use the latest <strong>Digital Dentistry</strong> tools to create restorations that feel and look completely natural.`
    },
    'saloni': {
        name: 'Dr. Saloni Gaur',
        role: 'Clinical Director',
        specialization: 'General Dentist & Orthodontist',
        image: 'assets/Doctors/Dr_saloni.jpeg',
        fullImage: 'assets/Doctors/Dr_saloni_full.png',
        education: 'BDS, PGD (Orthodontics)',
        experience: '12+ Years Clinical Practice',
        languages: 'English, Hindi',
        intro: `Dr. Saloni leads our clinical operations with a focus on <strong>General Dentistry</strong> and advanced <strong>Orthodontics</strong>. She is an expert in <strong>Clear Aligners</strong>, helping patients achieve perfect smiles with minimal discomfort.`,
        philosophy: `I believe in <strong>Preventive Orthodontics</strong> — identifying structural issues early to prevent complex treatments later in life. Every smile tells a story of health and balance.`
    },
    'nishitha': {
        name: 'Dr. Nishitha',
        role: 'Clinical Head (JP Nagar)',
        image: 'assets/Doctors/Dr_nishitha.jpeg',
        education: 'BDS',
        experience: '13+ Years Clinical Practice',
        languages: 'English, Kannada, Telugu',
        intro: `Dr. Nishitha is dedicated to <strong>Painless Root Canal</strong> treatments and restorative care. She utilizes <strong>Microscopic Dentistry</strong> to extract maximum precision during every procedure.`,
        philosophy: `My approach is centered around <strong>Patient Comfort</strong>. By combining technology with a gentle touch, we ensure that even the most complex root canal is a stress-free experience.`
    },
    'gloria': {
        name: 'Dr. Gloria',
        role: 'Clinical Head (Hulimavu)',
        image: 'assets/Doctors/Dr_gloria.png',
        education: 'BDS',
        experience: '10+ Years Clinical Practice',
        languages: 'English, Kannada, Malayalam',
        intro: `Dr. Gloria specializes in <strong>Pediatric Dentistry</strong>, creating a welcoming environment for our youngest patients. She is passionate about <strong>Oral Health Education</strong> for families.`,
        philosophy: `Early childhood is the best time to establish lifelong habits. We focus on <strong>Nutritional Counseling</strong> and preventive care to ensure a healthy future for every child.'`
    },
    'vikram': {
        name: 'Dr. Vikram',
        role: 'Consultant Oral Surgeon',
        image: 'assets/Doctors/Dr_srivats.jpeg', // Using srivats as placeholder if vikram missing
        education: 'BDS, MDS (Oral & Maxillofacial Surgery)',
        experience: '25+ Years Clinical Practice',
        languages: 'English, Hindi, Kannada, Marathi',
        intro: `Dr. Vikram is a seasoned expert in <strong>Maxillofacial Surgery</strong> and <strong>Dental Implants</strong>. He handles complex surgical extractions and structural reconstructions with unparalleled precision.`,
        philosophy: `Surgical excellence requires a combination of <strong>Technical Mastery</strong> and deep <strong>Anatomical Understanding</strong>. We prioritize safety and efficient recovery in every procedural blueprint.`
    }
};

const videoLinks = {
    'Root-Cause Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    'Precision Endodontics': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Holistic Integration': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Vitality': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Precision Restorative Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Dental Implants': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Bio-Mimetic Reconstruction': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Digital Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'General Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Orthodontics': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Clear Aligners': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Preventive Orthodontics': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Painless Root Canal': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Microscopic Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Patient Comfort': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Pediatric Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Oral Health Education': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Nutritional Counseling': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Maxillofacial Surgery': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Technical Mastery': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'Anatomical Understanding': 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('dr');
    const doctor = doctorData[doctorId] || doctorData['vats']; // Fallback to vats

    // Populate Page
    document.getElementById('doctor-name').textContent = doctor.name;
    document.getElementById('doctor-role').textContent = doctor.role;
    
    // Image Handling with error fallback
    const imgEl = document.getElementById('doctor-image');
    imgEl.src = doctor.fullImage || doctor.image;
    imgEl.onerror = () => {
        imgEl.src = doctor.image; // Fallback to headshot if full image fails
    };
    imgEl.alt = doctor.name;

    document.getElementById('doctor-intro').innerHTML = doctor.intro;
    document.getElementById('doctor-education').textContent = doctor.education;
    document.getElementById('doctor-experience').textContent = doctor.experience;
    document.getElementById('doctor-languages').textContent = doctor.languages || 'English, Hindi, Kannada';
    document.getElementById('doctor-philosophy').innerHTML = doctor.philosophy;

    // Populate Specialization Badge
    const specBadge = document.getElementById('doctor-spec-badge');
    if (doctor.specialization) {
        specBadge.textContent = doctor.specialization;
    }

    // Video Modal Logic
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    const closeBtn = document.getElementById('modal-close');

    function openModal(keyword) {
        const videoUrl = videoLinks[keyword] || videoLinks['Root-Cause Dentistry'];
        iframe.src = videoUrl + "?autoplay=1";
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        iframe.src = "";
    }

    // Add click listeners to strong tags
    document.querySelectorAll('strong').forEach(el => {
        el.addEventListener('click', () => {
            openModal(el.textContent);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
