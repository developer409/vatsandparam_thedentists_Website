/* ===================================================================
   doctor-profiles.js  —  Vats & Param Doctor Profile Data & Logic
   =================================================================== */

const doctorData = {
    'vats': {
        name: 'Prof. Dr. Srivats Bharadwaj',
        role: 'Healthcare Entrepreneur & Mentor',
        specialization: 'Functional & Integrative Dentist',
        image: 'assets/Doctors/Dr_Srivats_B/Dr_srivats.png',
        education: 'BDS, MDS, FADI',
        experience: '30+ Years Clinical Practice',
        languages: 'English, Hindi, Kannada, Telugu, Nepali',
        location: 'Hulimavu Clinic, Bengaluru',
        locationFull: 'Ground floor, 363, Bannerghatta Main Road, Hulimavu, Bengaluru - 560076',
        tags: [
            { label: 'BDS, MDS, FADI', gold: true },
            { label: 'Healthcare Entrepreneur', gold: false },
            { label: '30+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Diagnostic-Driven Care:</strong> Focuses on identifying underlying causes to support accurate diagnosis and effective treatment planning.',
            '<strong>Precision Preventive Dentistry:</strong> Delivers evidence-based care with an emphasis on prevention and long-term oral health outcomes.',
            '<strong>Holistic Health Approach:</strong> Considers the relationship between oral health and overall well-being when developing treatment plans.',
            '<strong>Functional Rehabilitation Focus:</strong> Specialises in occlusion and functional rehabilitation while promoting early intervention and patient education.',
        ],
        intro: `Prof. Dr. Srivats Bharadwaj is one of India's foremost voices in functional and integrative dentistry, with over 30 years of clinical practice spanning diagnosis-led care, occlusal rehabilitation, and oral-systemic health. His work is built on a foundational belief that dentistry must look beyond the tooth — understanding the patient's whole biology, lifestyle, and systemic health before arriving at a treatment plan.`,
        introExtra: `Over three decades, he has developed a clinical framework that integrates bite dynamics, airway evaluation, oral microbiome assessment, and jaw function into a unified diagnostic approach. Internationally recognised through affiliations with NASA's GeneLab Microbiome AWG, the Holomedicine Association (Belgium), and Special Olympics International, Dr. Srivats brings a global perspective to every patient interaction. He is the founder of Vats & Param – The Dentists, Vatsalya Oral Health Foundation, and The League of Dentists — each reflecting his commitment to elevating standards of care across clinical practice, education, and public health.`,
        philosophy: [
            `Dr. Srivats always says — the best dental treatment is the one you never need again. His goal is to find the cause, fix it properly, and give you the tools to stay healthy.`,
            `In 30 years, Dr. Srivats has learned that patients who understand what's happening in their mouth make far better decisions. He spends real time explaining things — not rushing through it.`,
            `For Dr. Srivats, your mouth doesn't exist in isolation. What's happening with your gums, your bite, your jaw — it's all connected to how the rest of you feels. He takes that seriously.`,
            `Dr. Srivats got into dentistry because he wanted to help people, not just treat teeth. That hasn't changed. Every patient who walks in deserves that same attention, regardless of how straightforward or complex their case is.`,
        ],
        specializations: [
            { icon: '🌿', label: 'Functional & Integrative Dentistry' },
            { icon: '🦷', label: 'Occlusal Rehab & Bite Dynamics' },
            { icon: '🛡️', label: 'Tooth Wear & Bruxism Management' },
            { icon: '🧬', label: 'Oral-Systemic Health Interface' },
            { icon: '📊', label: 'Risk-Based Treatment Planning' },
            { icon: '💡', label: 'Preventive Oral Health Models' },
            { icon: '♿', label: 'Wheelchair Accessible Care' },
            { icon: '🤝', label: 'Dentistry for Specially Abled' },
        ],
        treatments: [
            { image: 'assets/Doctors/Dr_Srivats_B/full_mouth_rehab_1776251165269.png', label: 'Full Mouth Rehabilitation' },
            { image: 'assets/Doctors/Dr_Srivats_B/bite_correction_1776251183741.png', label: 'Occlusal & Bite Correction' },
            { image: 'assets/Doctors/Dr_Srivats_B/attrition_management_1776251198717.png', label: 'Severe Attrition Management' },
            { image: 'assets/Doctors/Dr_Srivats_B/tmj_therapy_1776251214544.png', label: 'TMJ Evaluation & Therapy' },
            { image: 'assets/Doctors/Dr_Srivats_B/aesthetic_rehab_1776251228800.png', label: 'Aesthetic Rehabilitation' },
            { image: 'assets/Doctors/Dr_Srivats_B/periodontal_stabilisation_1776251244341.png', label: 'Periodontal Stabilisation' },
            { image: 'assets/Doctors/Dr_Srivats_B/plaque_protocols_1776251258888.png', label: 'Preventive Plaque Protocols' },
            { image: 'assets/Doctors/Dr_Srivats_B/wheelchair_accessible_dental_chair_1776855221440.png', label: 'Wheelchair Accessible Dentistry' },
            { image: 'assets/Doctors/Dr_Srivats_B/home_care_dentistry_visit_1776861146255.png', label: 'Home Care Dentistry' },
        ],
        memberships: [
            { icon: '🏥', label: 'Founder — Vats & Param – The Dentists' },
            { icon: '🇮🇳', label: 'Founder — Vatsalya Oral Health Foundation (India)' },
            { icon: '🦷', label: 'Founder — The League Of Dentists' },
            { icon: '🇧🇪', label: 'Founding Member — The Holomedicine Association (Belgium)' },
            { icon: '🏅', label: 'Clinical Director — Special Olympics International (USA)' },
            { icon: '🇺🇸', label: 'Former Council Member — IADH (USA)' },
            { icon: '🇬🇧', label: 'Founding Committee Member — ACAMH (UK)' },
            { icon: '📰', label: 'Editorial Board Member — Global Healthcare Journal' },
            { icon: '🚀', label: 'Member — NASA GeneLab Microbiome AWG (USA)' },
        ],
    },

    'param': {
        name: 'Dr. Paramjot Kaur',
        role: 'Lead Dentist & Co-Founder',
        specialization: 'Specialist Periodontist',
        image: 'assets/Doctors/Dr_Paramjot_Kaur/Dr_Param.png',
        education: 'BDS, MDS (Periodontics)',
        experience: '20+ Years Clinical Practice',
        languages: 'English, Hindi, Punjabi',
        location: 'J.P Nagar Branch, Bengaluru',
        locationFull: 'KR Layout, 2nd Phase, J. P. Nagar, Bengaluru - 560078',
        tags: [
            { label: 'Periodontics', gold: false },
            { label: 'BDS, MDS', gold: true },
            { label: '18+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Specialist Periodontist | 18+ Years Experience</strong>',
            '<strong>Methodical Approach</strong>: Known for her precise clinical skill and focus on long-term oral health and preservation.',
            '<strong>Specialist-Led Assessment</strong>: Detailed evaluation of periodontal health, risk factors, and disease progression.',
            '<strong>Calm and Reassuring Environment</strong>: A composed clinical approach that prioritises patient comfort and confidence.',
            '<strong>Precision in Treatment</strong>: Therapies are delivered with accuracy, restraint, and a focus on tissue preservation.',
            '<strong>Preventive and Maintenance Focus</strong>: Strong emphasis on biofilm control, regular monitoring, and long-term stability.',
        ],
        intro: `Dr. Paramjot Kaur is a specialist Periodontist with over 20 years of clinical experience dedicated to the diagnosis, management, and long-term preservation of periodontal health. She is widely recognised for her precise clinical technique, composed approach, and an unwavering commitment to doing things thoroughly — without unnecessary intervention.`,
        introExtra: `Her practice is anchored in a preventive philosophy: identifying disease early, stabilising the periodontium through the most conservative means possible, and equipping patients with the knowledge to maintain their results. Dr. Paramjot's calm, methodical presence has made her a trusted clinician for patients who have previously been told their tooth loss was inevitable. As a co-founder of Vats & Param – The Dentists, she brings the same discipline and precision to clinical leadership that she applies at chairside — building a practice culture where gum health is treated as foundational to overall well-being.`,
        philosophy: [
            `Gum health is the foundation everything else sits on. Dr. Paramjot always tells her patients — we can do the most beautiful dental work in the world, but if the foundation isn't strong, nothing will last.`,
            `Dr. Paramjot doesn't believe in rushing treatment. Periodontal care takes time and consistency, and she'd rather do it properly once than have a patient come back with the same problem.`,
            `Dr. Paramjot genuinely enjoys educating patients. When someone leaves her chair understanding why their gums bled and what they can do about it at home — that's a win for her.`,
            `For Dr. Paramjot, minimally invasive is always the first instinct. Preserving what's natural is almost always better than replacing it.`,
        ],
        specializations: [
            { icon: '🦷', label: 'Periodontology & Gum Disease Management' },
            { icon: '🛡️', label: 'Preventive & Maintenance-Based Healthcare' },
            { icon: '🔪', label: 'Non-Surgical & Surgical Periodontal Therapy' },
            { icon: '⚖️', label: 'Long-Term Periodontal Stabilisation' },
            { icon: '🗣️', label: 'Oral Hygiene Behavioural Guidance' },
            { icon: '🔬', label: 'Minimally Invasive Techniques' },
        ],
        treatments: [
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/periodontal_evaluation_1776407108860.png', label: 'Comprehensive Periodontal Evaluation & Risk Assessment' },
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/scaling_root_planing_1776407126075.png', label: 'Scaling & Root Planing (Non-Surgical Therapy)' },
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/gum_disease_management_1776407144839.png', label: 'Management of Gingivitis & Periodontitis' },
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/periodontal_maintenance_1776407160462.png', label: 'Periodontal Maintenance & Supportive Therapy' },
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/gum_health_optimisation_param_1776407253807.png', label: 'Gum Health Optimisation & Tissue Preservation' },
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/plaque_disclosure_param_1776407269257.png', label: 'Plaque Disclosure & Biofilm Control Protocols' },
            { image: 'assets/Doctors/Dr_Paramjot_Kaur/disease_prevention_param_1776407284316.png', label: 'Early Intervention & Disease Prevention' },
        ],
        memberships: [
            { icon: '🚀', label: 'Entrepreneur & Mentor' },
            { icon: '🦷', label: 'Periodontist' },
            { icon: '🏥', label: 'Founder — Vats & Param – The Dentists' },
            { icon: '🇮🇳', label: 'Founder — Vatsalya Oral Health Foundation (India)' },
            { icon: '👨‍🏫', label: 'Founder — The League Of Dentists' },
            { icon: '🇧🇪', label: 'Founding Member — The Holomedicine Association (Belgium)' },
        ],
    },

    'saloni': {
        name: 'Dr. Saloni',
        role: 'Clinical Director and Senior Partner',
        specialization: 'General Dentistry and Rehabilitation',
        image: 'assets/Doctors/Dr_Saloni/Saloni.png',
        fullImage: 'assets/Doctors/Dr_Saloni/Saloni.png',
        education: 'BDS',
        experience: '13+ Years Clinical Practice',
        languages: 'English, Hindi',
        location: 'Arekere Clinic, Bengaluru',
        locationFull: '83, 6th Cross Rd, Arekere MICO Layout 2nd Stage, Bengaluru - 560076',
        tags: [
            { label: 'BDS', gold: true },
            { label: 'IDA Member', gold: false },
            { label: '13+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Comprehensive Dental Care:</strong> Provides personalised dental care through a structured approach focused on diagnosis, planning, and treatment.',
            '<strong>Detailed Treatment Planning:</strong> Thorough assessment and careful planning support precise, predictable, and long-lasting outcomes.',
            '<strong>Patient-Centred Approach:</strong> Clear communication and attention to comfort help create a positive and reassuring treatment experience.',
            '<strong>Preventive Focus:</strong> Emphasises preventive care and maintenance to support long-term oral health and treatment success.',
        ],
        intro: 'Dr. Saloni is a highly experienced general and restorative dentist with over 13 years of clinical practice. She combines technical precision with a deeply patient-centred approach.',
        introExtra: 'Her expertise spans restorative dentistry, prosthodontics, bite rehabilitation, and neuromuscular dentistry. Dr. Saloni is known for her thorough diagnostic process and ability to communicate complex clinical findings.',
        philosophy: [
            'Dr. Saloni never wants a patient to leave confused about their treatment.',
            'For Dr. Saloni, dentistry should fit your life and specific needs.',
            'Dr. Saloni believes prevention is always better than treatment.',
            'Every mouth is different, and Dr. Saloni has a structured process she adapts to each individual.',
        ],
        specializations: [
            { icon: '🦷', label: 'Restorative Dentistry' },
            { icon: '🏗️', label: 'Prosthodontics & Rehabilitation' },
            { icon: '⚙️', label: 'Neuromuscular Dentistry' },
            { icon: '⚖️', label: 'Bite Rehabilitation' },
            { icon: '💆', label: 'TMJ Dysfunction Management' },
            { icon: '📋', label: 'Comprehensive Treatment Planning' },
        ],
        treatments: [
            { image: 'assets/Doctors/Dr_Saloni/Treatments/restorative_dentistry_procedure_1777875814089.png', label: 'Restorative Treatments' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/crown_and_bridge_dental_1777875828109.png', label: 'Crown and Bridge Work' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/full_mouth_rehab_dental_1777875841937.png', label: 'Full Mouth Rehabilitation' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/bite_rehabilitation_dynamics_1777875857358.png', label: 'Bite Rehabilitation' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/neuromuscular_dentistry_tech_1777875873833.png', label: 'Neuromuscular Procedures' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/tmj_disorder_management_clinic_1777875888671.png', label: 'TMJ Disorder Management' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/gum_treatment_periodontal_care_1777875903736.png', label: 'Gum Treatments' },
            { image: 'assets/Doctors/Dr_Saloni/Treatments/preventive_dental_care_maintenance_1777875918493.png', label: 'Preventive Dental Care' },
        ],
        memberships: [
            { icon: 'education', label: 'Bachelor of Dental Surgery (BDS)' },
            { icon: 'india', label: 'Indian Dental Association (IDA)' },
        ],
    },

    'nishitha': {
        name: 'Dr. Nishitha Shetty',
        role: 'Clinical Head and Senior Consultant',
        specialization: 'Restorative Specialist',
        image: 'assets/Doctors/nishita_1.png',
        fullImage: 'assets/Doctors/nishita_1.png',
        education: 'BDS',
        experience: '6+ Years Clinical Practice',
        languages: 'English, Kannada, Telugu',
        location: 'J.P Nagar Branch, Bengaluru',
        locationFull: 'KR Layout, 2nd Phase, J. P. Nagar, Bengaluru - 560078',
        tags: [
            { label: 'Restorative Dentistry', gold: false },
            { label: 'BDS', gold: true },
            { label: '6+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Restorative Specialist | 6+ Years Experience</strong>',
            '<strong>Comprehensive Care</strong>: Tailored dental solutions structured around individual patient needs.',
            '<strong>Systematic Planning</strong>: Thorough diagnosis followed by structured treatment blueprints.',
            '<strong>Patient-First Approach</strong>: Prioritising comfort and a positive, reassuring clinical experience.',
            '<strong>Long-Term Stability</strong>: Focus on outcomes that are both effective and durable over time.',
        ],
        intro: `Dr. Nishitha Shetty is a restorative and general dentist with over six years of clinical experience, known for her evidence-based approach and her commitment to preserving natural tooth structure wherever clinically possible. She delivers comprehensive dental care with a focus on precision, comfort, and outcomes that stand the test of time.`,
        introExtra: `Her clinical work spans restorative dentistry, fixed prosthodontics, preventive care, and pediatric dentistry. Dr. Nishitha approaches every case with a thorough diagnostic process — ensuring that treatment is planned carefully and executed with accuracy. She places strong value on patient education, taking time to ensure each individual understands their condition and the reasoning behind their care, so they can make confident, informed decisions about their oral health.`,
        philosophy: [
            'For Dr. Nishitha, evidence-based clinical decision-making is the standard of high-quality care.',
            'Dr. Nishitha prioritizes preserving natural tooth structure in every restorative procedure.',
            'Dr. Nishitha believes patient education is central to successful outcomes and informed decision-making.',
            'High-quality dentistry, according to Dr. Nishitha, should be delivered in a way that is effective, comfortable, and long-lasting.',
        ],
        specializations: [
            { icon: '🦷', label: 'Restorative Dentistry' },
            { icon: '👑', label: 'Fixed Prosthodontics (Crowns & Bridges)' },
            { icon: '🛡️', label: 'Preventive & General Dentistry' },
            { icon: '👶', label: 'Pediatric Dental Care' },
            { icon: '📋', label: 'Comprehensive Treatment Planning' },
        ],
        treatments: [
            { image: 'assets/Doctors/Dr_Nishitha_Shetty/crown_bridge_preps.png', label: 'Crown & Bridge Preparations' },
            { image: 'assets/Doctors/Dr_Nishitha_Shetty/cares_management.png', label: 'Caries Management' },
            { image: 'assets/Doctors/Dr_Nishitha_Shetty/full_mouth_assessment.png', label: 'Full Mouth Assessment & Planning' },
            { image: 'assets/Doctors/Dr_Nishitha_Shetty/preventive_treatments.png', label: 'Preventive Care (Sealants & Fluoride)' },
            { image: 'assets/Doctors/Dr_Nishitha_Shetty/pediatric_care.png', label: 'Pediatric Dental Care' },
        ],
        memberships: [
            { icon: '🇮🇳', label: 'Indian Dental Association (IDA)' },
            { icon: '🩺', label: 'Karnataka State Dental Council' },
        ],
    },

    'dhijila': {
        name: 'Dr. Dhijila Dinesh',
        role: 'Clinical Head and Senior Consultant',
        specialization: 'General Dentistry',
        image: 'assets/Doctors/Dr_dhijila/Dhijila.png',
        education: 'BDS',
        experience: 'Clinical Professional',
        languages: 'English, Hindi, Kannada, Malayalam',
        location: 'Hulimavu Clinic, Bengaluru',
        locationFull: 'Ground floor, 363, Bannerghatta Main Road, Hulimavu, Bengaluru - 560076',
        tags: [
            { label: 'General Dentistry', gold: false },
            { label: 'BDS', gold: true },
            { label: 'Center Head', gold: false },
        ],
        overview: [
            '<strong>Patient-Centered Care</strong>: Built on empathy, trust, and integrity.',
            '<strong>Transparent Communication</strong>: Empowering patients with clear information on options and costs.',
            '<strong>Comprehensive Strategy</strong>: Focus on improving overall health through preventive and restorative care.',
            '<strong>Well-being First</strong>: Prioritizing patient health over commercial interests.',
        ],
        intro: `Dr. Dhijila Dinesh is a general dentist and Center Head whose practice is defined by a clear set of values — empathy, transparency, and a genuine commitment to patient well-being over commercial interest. She brings both clinical competence and a deeply human approach to every patient interaction, creating an environment where people feel informed, respected, and at ease.`,
        introExtra: `As Center Head at the Hulimavu branch, Dr. Dhijila oversees the day-to-day clinical and patient experience, ensuring that every individual who walks in receives consistent, high-quality care. Her clinical focus spans general dentistry, laser treatment, preventive care, and full mouth rehabilitation. She is known for her transparency — taking time to clearly explain diagnoses, treatment options, and costs so that patients can make decisions that are right for them, not just clinically, but practically.`,
        philosophy: [
            'Dr. Dhijila practices a patient-centered approach built on empathy, trust, and integrity.',
            'For Dr. Dhijila, transparency is fundamental to empowering patients in their health journey.',
            'Dr. Dhijila believes in treating the cause, not just the symptoms, through long-term care strategies.',
            'Dr. Dhijila prioritizes patient well-being over commercial interests.',
        ],
        specializations: [
            { icon: '🦷', label: 'General Dentistry' },
            { icon: '✨', label: 'Laser Treatment' },
            { icon: '🩹', label: 'Extractions' },
            { icon: '👶', label: 'Pediatric & Preventive Care' },
            { icon: '🏛️', label: 'Full Mouth Rehabilitations' },
        ],
        treatments: [
            { image: 'assets/Doctors/Dr_dhijila/laser_treatment.png', label: 'Laser Treatment' },
            { image: 'assets/Doctors/Dr_dhijila/extractions.png', label: 'Extractions' },
            { image: 'assets/Doctors/Dr_dhijila/pediatric_care.png', label: 'Pediatric & Preventive Care' },
            { image: 'assets/Doctors/Dr_dhijila/full_mouth_rehab.png', label: 'Full Mouth Rehabilitations' },
        ],
        memberships: [
            { icon: '🏛️', label: 'Indian Dental Association (IDA)' },
            { icon: '🩺', label: 'State Dental Council' },
        ],
    },

    'gloria': {
        name: 'Dr. Gloria',
        role: 'Clinical Head and Senior Consultant',
        specialization: 'Pediatric Dentist',
        image: 'assets/Doctors/Dr_gloria.png',
        education: 'BDS',
        experience: '10+ Years Clinical Practice',
        languages: 'English, Kannada, Malayalam',
        location: 'Hulimavu Clinic, Bengaluru',
        locationFull: 'Ground floor, 363, Bannerghatta Main Road, Hulimavu, Bengaluru - 560076',
        tags: [
            { label: 'BDS', gold: true },
            { label: 'Pediatric Dentistry', gold: false },
            { label: '10+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Pediatric Dental Care:</strong> Creates a welcoming and comfortable environment for our youngest patients.',
            '<strong>Oral Health Education:</strong> Passionate about educating families on preventive care and habits.',
            '<strong>Nutritional Counseling:</strong> Emphasizes the role of diet in early childhood dental health.',
            '<strong>Early Intervention:</strong> Identifies developmental concerns early to minimize future complex treatments.',
        ],
        intro: `Dr. Gloria specializes in <strong>Pediatric Dentistry</strong>, creating a welcoming, friendly environment for our youngest patients. She is passionate about <strong>Oral Health Education</strong> for families.`,
        introExtra: `With over a decade of clinical experience, Dr. Gloria focuses on preventive care, behavior management, and pediatric restorative treatments. She believes that positive early dental visits lay the foundation for a lifetime of healthy smiles.`,
        philosophy: [
            'Early childhood is the best time to establish lifelong healthy habits.',
            'Every child deserves a gentle, stress-free introduction to dental care.',
            'Preventive care and family education are the keys to avoiding childhood decay.',
            'We treat children with the utmost empathy, patience, and behavioral understanding.',
        ],
        specializations: [
            { icon: '👶', label: 'Pediatric Dentistry' },
            { icon: '🛡️', label: 'Preventive Care' },
            { icon: '🍎', label: 'Nutritional Counseling' },
            { icon: '🗣️', label: 'Oral Health Education' },
            { icon: '✨', label: 'Behavior Management' },
        ],
        treatments: [
            { icon: '👶', label: 'Pediatric Restorations' },
            { icon: '🛡️', label: 'Fluoride Applications & Pit and Fissure Sealants' },
            { icon: '🦷', label: 'Early Orthodontic Evaluation' },
            { icon: '🦷', label: 'Space Maintainers' },
        ],
        memberships: [
            { icon: '🏛️', label: 'Indian Dental Association (IDA)' },
            { icon: '🩺', label: 'Karnataka State Dental Council' },
        ],
    },

    'rakshitha': {
        name: 'Dr. Rakshitha',
        role: 'Clinical Head and Senior Consultant',
        specialization: 'Orthodontist',
        image: 'assets/Doctors/Dr_rakshitha.png',
        education: 'BDS, MDS (Orthodontics)',
        experience: '8+ Years Clinical Practice',
        languages: 'English, Kannada, Hindi',
        location: 'J.P Nagar Branch, Bengaluru',
        locationFull: 'KR Layout, 2nd Phase, J. P. Nagar, Bengaluru - 560078',
        tags: [
            { label: 'BDS, MDS', gold: true },
            { label: 'Orthodontist', gold: false },
            { label: '8+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Orthodontic Correction:</strong> Expert in structural alignment and malocclusion correction.',
            '<strong>Clear Aligner Specialist:</strong> Specializes in advanced invisible aligner treatments.',
            '<strong>Bite Dynamics:</strong> Focuses on functional bite harmony and jaw relationships.',
            '<strong>Patient-Centered Design:</strong> Designs custom treatment plans for kids, teens, and adults.',
        ],
        intro: `Dr. Rakshitha is an expert Orthodontist specializing in <strong>Clear Aligners</strong>, braces, and dentofacial orthopedics. She is dedicated to creating balanced, healthy smiles.`,
        introExtra: `With over 8 years of clinical experience, Dr. Rakshitha uses state-of-the-art diagnostic and digital tools to design custom orthodontic solutions. She prioritizes both functional bite stability and natural aesthetic alignment, ensuring long-term results.`,
        philosophy: [
            'Orthodontics is about more than just straight teeth; it is about functional bite alignment and facial balance.',
            'Modern digital tools allow us to make orthodontic treatment more comfortable and predictable.',
            'A healthy, beautiful smile boosts self-confidence at any age.',
            'Every patient is unique, and their orthodontic treatment plan should reflect their specific goals.',
        ],
        specializations: [
            { icon: '🦷', label: 'Orthodontics & Dentofacial Orthopedics' },
            { icon: '✨', label: 'Clear Aligner Therapy' },
            { icon: '⚙️', label: 'Bite Correction & Dynamics' },
            { icon: '📈', label: 'Growth Modulation Treatments' },
            { icon: '📋', label: 'Digital Smile Design' },
        ],
        treatments: [
            { icon: '✨', label: 'Clear Aligners' },
            { icon: '⚙️', label: 'Traditional & Ceramic Braces' },
            { icon: '👶', label: 'Interceptive Orthodontics' },
            { icon: '🦷', label: 'Myofunctional Appliances' },
        ],
        memberships: [
            { icon: '🏛️', label: 'Indian Orthodontic Society (IOS)' },
            { icon: '🇮🇳', label: 'Indian Dental Association (IDA)' },
        ],
    },

    'vikram': {
        name: 'Dr. Vikram',
        role: 'Consultant Oral Surgeon',
        specialization: 'Oral Surgery',
        image: 'assets/Doctors/Dr_Srivats_B/Dr_srivats.png',
        education: 'BDS, MDS (Oral & Maxillofacial Surgery)',
        experience: '25+ Years Clinical Practice',
        languages: 'English, Hindi, Kannada, Marathi',
        location: 'Arekere Clinic, Bengaluru',
        locationFull: '83, 6th Cross Rd, Arekere MICO Layout 2nd Stage, Bengaluru - 560076',
        tags: [
            { label: 'BDS, MDS', gold: true },
            { label: 'Oral Surgeon', gold: false },
            { label: '25+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Maxillofacial Surgery:</strong> Expertise in complex extractions, jaw reconstructions, and surgical procedures.',
            '<strong>Dental Implants:</strong> High success rate in placement and rehabilitation of dental implants.',
            '<strong>Procedural Precision:</strong> Performs surgeries with minimal discomfort and efficient recovery planning.',
            '<strong>Patient Safety Focus:</strong> Strict adherence to sterile techniques and safety monitoring.',
        ],
        intro: `Dr. Vikram is a seasoned expert in <strong>Maxillofacial Surgery</strong> and <strong>Dental Implants</strong>. He handles complex surgical extractions and structural reconstructions with precision.`,
        introExtra: `With over 25 years of specialized clinical practice, Dr. Vikram delivers advanced surgical solutions for tooth restoration, jaw injuries, and wisdom tooth extraction. He combines technical mastery with anatomical understanding for superior outcomes.`,
        philosophy: [
            'Surgical excellence requires a combination of technical mastery and deep anatomical understanding.',
            'We prioritize safety and efficient recovery in every procedural blueprint.',
            'Patient comfort and minimizing anxiety are essential parts of surgical care.',
            'Every procedure is planned with digital precision to ensure long-term stability.',
        ],
        specializations: [
            { icon: '🦷', label: 'Oral & Maxillofacial Surgery' },
            { icon: '🔩', label: 'Dental Implantology' },
            { icon: '🔪', label: 'Complex Surgical Extractions' },
            { icon: '🛡️', label: 'Trauma & Reconstruction' },
        ],
        treatments: [
            { icon: '🦷', label: 'Wisdom Teeth Removal' },
            { icon: '🔩', label: 'Dental Implants' },
            { icon: '🩹', label: 'Surgical Extractions' },
            { icon: '🏥', label: 'Jaw Reconstruction' },
        ],
        memberships: [
            { icon: '🏛️', label: 'Association of Oral and Maxillofacial Surgeons of India (AOMSI)' },
            { icon: '🇮🇳', label: 'Indian Dental Association (IDA)' },
        ],
    },

    'ragunath': {
        name: 'Prof. Dr. N. Raghunath',
        role: 'Professor & Head of Department of Orthodontics',
        specialization: 'Orthodontist',
        image: 'assets/consulting/Raghunath_1.png',
        education: 'BDS, MDS (Orthodontics)',
        experience: '20+ Years Clinical Practice',
        languages: 'English, Hindi, Kannada',
        location: 'JSS Dental College',
        locationFull: 'JSS Dental College, Mysore',
        tags: [
            { label: 'BDS, MDS (Orthodontics)', gold: true },
            { label: 'Professor & HOD', gold: false },
            { label: '20+ Years Experience', gold: false },
        ],
        overview: [
            '<strong>Academic Leadership:</strong> Professor and Head of Department of Orthodontics at JSS Dental College.',
            '<strong>Orthodontic Excellence:</strong> Specialist in dentofacial orthopedics and comprehensive bite correction.',
            '<strong>Research & Innovation:</strong> Committed to quality dental education through innovative teaching methods.',
            '<strong>Clinical Expertise:</strong> Over two decades of experience in orthodontic diagnosis, treatment planning, and management.',
            '<strong>Professional Involvement:</strong> Active member of various dental boards and professional organizations.',
        ],
        intro: `Prof. Dr. N. Raghunath is an accomplished Orthodontist and academic leader with over 20 years of clinical and educational experience. As Professor and Head of the Department of Orthodontics at JSS Dental College, he combines rigorous clinical expertise with a passion for advancing dental education through innovative teaching methodologies.`,
        introExtra: `With qualifications including BDS from University of Mysore (1992-1997) and MDS in Orthodontics from Rajiv Gandhi University (1999-2002), Dr. Raghunath has developed a comprehensive approach to dentofacial orthopedics that integrates the latest techniques with traditional clinical wisdom. His work spans interdisciplinary collaboration, postgraduate supervision, and active involvement in clinical research. He is widely recognized for his contributions to orthodontic education and his commitment to nurturing the next generation of dental professionals.`,
        philosophy: [
            'Orthodontics is about creating functional, aesthetic, and stable results that serve patients for a lifetime.',
            'Quality dental education requires not just technical knowledge, but innovative teaching approaches that engage students in critical thinking.',
            'Every patient\'s dental development is unique—treatment plans must be individualized and based on thorough diagnostic understanding.',
            'Advancing the profession through research and scholarly contribution is as important as clinical excellence at the patient level.',
        ],
        specializations: [
            { icon: '🦷', label: 'Orthodontics & Dentofacial Orthopedics' },
            { icon: '👶', label: 'Interceptive Orthodontics & Growth Modulation' },
            { icon: '⚙️', label: 'Comprehensive Bite Correction' },
            { icon: '📊', label: 'Diagnostic & Treatment Planning' },
            { icon: '👨‍🏫', label: 'Dental Education & Academic Leadership' },
            { icon: '🔬', label: 'Orthodontic Research & Innovation' },
        ],
        treatments: [
            { icon: '⚙️', label: 'Fixed Appliance Therapy (Braces)' },
            { icon: '✨', label: 'Clear Aligner Treatments' },
            { icon: '👶', label: 'Early Interceptive Treatment' },
            { icon: '🦷', label: 'Myofunctional Appliances' },
            { icon: '📈', label: 'Growth Modulation & Space Management' },
            { icon: '⚖️', label: 'Complex Malocclusion Management' },
        ],
        memberships: [
            { icon: '👨‍🏫', label: 'Professor & Head, Dept. of Orthodontics, JSS Dental College' },
            { icon: '🇮🇳', label: 'Indian Orthodontic Society (IOS)' },
            { icon: '🇮🇳', label: 'Indian Dental Association (IDA)' },
            { icon: '📚', label: 'Active Researcher & Academic Contributor' },
        ],
    }
};

/* ===== VIDEO LINKS ===== */
const videoLinks = {
    'Root-Cause Dentistry': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    'Anatomical Understanding': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
};

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('dr');
    const doctor = doctorData[doctorId] || doctorData['vats'];

    /* --- Populate header card --- */
    document.getElementById('doctor-name').textContent = doctor.name;
    document.getElementById('doctor-role').textContent = doctor.role;
    var badge = document.getElementById('doctor-spec-badge');
    if (badge) badge.textContent = doctor.specialization;
    document.getElementById('doctor-location').textContent = doctor.experience;
    document.getElementById('sidebar-education').textContent = doctor.education;
    document.getElementById('sidebar-experience').textContent = doctor.experience;
    document.getElementById('sidebar-languages').textContent = doctor.languages || 'English, Hindi, Kannada';


    /* --- Doctor Image --- */
    const imgEl = document.getElementById('doctor-image');
    imgEl.src = (doctor.fullImage) || doctor.image;
    imgEl.onerror = () => { imgEl.src = doctor.image; };
    imgEl.alt = doctor.name;

    /* --- Tags --- */
    const tagsEl = document.getElementById('doctor-tags');
    tagsEl.innerHTML = doctor.tags.map(t =>
        `<span class="dp-tag ${t.gold ? 'dp-tag--gold' : ''}">${t.label}</span>`
    ).join('');

    /* --- Care Overview --- */
    const overviewEl = document.getElementById('doctor-overview');
    overviewEl.innerHTML = doctor.overview.map(o => {
        const strongMatch = o.match(/<strong>(.*?)<\/strong>(.*)/);
        if (strongMatch) {
            const label = strongMatch[1];
            const description = strongMatch[2].trim();
            return `<li><div class="overview-content"><strong>${label}</strong><div class="overview-desc">${description}</div></div></li>`;
        }
        return `<li>${o}</li>`;
    }).join('');

    /* --- Profile Summary (split into short + full for Read More) --- */
    const shortText = doctor.intro;
    const fullText = doctor.introExtra || '';
    document.getElementById('doctor-intro-short').innerHTML = shortText;

    const readmoreFull = document.getElementById('doctor-intro-full');
    const readmoreBtn = document.getElementById('readmore-btn');

    if (fullText) {
        readmoreFull.innerHTML = fullText;
        readmoreBtn.style.display = 'inline-flex';
    } else {
        readmoreBtn.style.display = 'none';
    }

    /* --- Philosophy (Full tab) --- */
    document.getElementById('doctor-philosophy-full').innerHTML = doctor.philosophy
        .map(p => `<p style="margin-bottom:10px;">• ${p}</p>`).join('');

    /* --- Specializations --- */
    const specEl = document.getElementById('doctor-specializations');
    specEl.innerHTML = (doctor.specializations || []).map(s =>
        `<div class="dp-spec-item"><div class="dp-spec-item__icon">${s.icon}</div><div class="dp-spec-item__label">${s.label}</div></div>`
    ).join('');

    /* --- Treatments --- */
    const treatEl = document.getElementById('doctor-treatments');
    treatEl.innerHTML = (doctor.treatments || []).map(t => {
        if (t.image) {
            return `<div class="dp-treatment-card">
                        <img src="${t.image}" alt="${t.label}" class="dp-treatment-card__img">
                        <div class="dp-treatment-card__overlay">
                            <span class="dp-treatment-card__text">${t.label}</span>
                        </div>
                    </div>`;
        }
        return `<div class="dp-spec-item"><div class="dp-spec-item__icon">${t.icon}</div><div class="dp-spec-item__label">${t.label}</div></div>`;
    }).join('');

    /* --- Memberships --- */
    const membersEl = document.getElementById('doctor-memberships');
    membersEl.innerHTML = (doctor.memberships || []).map(m =>
        `<div class="dp-spec-item"><div class="dp-spec-item__icon">${m.icon}</div><div class="dp-spec-item__label">${m.label}</div></div>`
    ).join('');

    /* ===== VIDEO MODAL ===== */
    const modal = document.getElementById('dp-modal');
    const iframe = document.getElementById('dp-modal-iframe');
    const closeBtn = document.getElementById('dp-modal-close');

    function openModal(keyword) {
        const url = videoLinks[keyword] || videoLinks['Root-Cause Dentistry'];
        iframe.src = url + '?autoplay=1';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    }

    // Add click to all strong tags after DOM is fully populated
    setTimeout(() => {
        document.querySelectorAll('strong').forEach(el => {
            el.style.cursor = 'pointer';
            el.setAttribute('title', 'Click to watch video about ' + el.textContent);
            el.addEventListener('click', () => openModal(el.textContent));
        });
    }, 100);

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});

