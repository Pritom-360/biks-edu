let cart = [];
let currentLang = 'bn'; // Default language is Bengali
const WHATSAPP_NUMBER = "+8801815650971";
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartCount = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const navMenu = document.getElementById('nav-menu');
const langSwitcherBtn = document.getElementById('lang-switcher');

// Course Data Mapping (Ensuring correct names and prices for JS)
const courseData = {
    'L1_SCRATCH': { bn: 'লেভেল ১: Scratch/Scratch Jr.', en: 'Level 1: Scratch/Scratch Jr.', price: 1500 },
    'L2_APPINV': { bn: 'লেভেল ২: App Developer (App Inventor)', en: 'Level 2: App Developer (App Inventor)', price: 2000 },
    'L2_ROBLOX': { bn: 'লেভেল ২: Game Designer (Roblox Studio)', en: 'Level 2: Game Designer (Roblox Studio)', price: 2000 },
    'L2_COMBO': { bn: 'লেভেল ২ কম্বো (App Inventor + Roblox)', en: 'Level 2 Combo (App Inventor + Roblox)', price: 3500 },
    'L3_C_LANG': { bn: 'লেভেল ৩: C Language (Logic Builder)', en: 'Level 3: C Language (Logic Builder)', price: 2500 },
    'L3_WEBDEV': { bn: 'লেভেল ৩: Web Dev (Web Architect)', en: 'Level 3: Web Dev (Web Architect)', price: 2500 },
    'L3_COMBO': { bn: 'লেভেল ৩ কম্বো (C Language + Web Dev)', en: 'Level 3 Combo (C Language + Web Dev)', price: 4500 }
};

// --- Translation Dictionary ---
const translations = {
    // Nav & Header
    'page_title': { bn: 'BIKS টেক একাডেমি | কোডিং-এর হাতেখড়ি থেকে AI-এর দুনিয়া!', en: 'BIKS Tech Academy | From Coding Basics to the World of AI!' },
    'logo_title': { bn: 'BIKS টেক একাডেমি', en: 'BIKS Tech Academy' },
    'logo_motto': { bn: '"কোডিং-এর হাতেখড়ি থেকে AI-এর দুনিয়া!"', en: '"From Coding Basics to the World of AI!"' },
    'nav_level_1': { bn: 'লেভেল ১', en: 'Level 1' },
    'nav_level_2': { bn: 'লেভেল ২', en: 'Level 2' },
    'nav_level_3': { bn: 'লেভেল ৩', en: 'Level 3' },
    'nav_pricing': { bn: 'প্রাইসিং', en: 'Pricing' },
    'nav_offers': { bn: 'অফার', en: 'Offers' },
    'nav_contact': { bn: 'যোগাযোগ', en: 'Contact' },
    'phone_label': { bn: 'ফোন:', en: 'Phone:' },
    'email_label': { bn: 'ইমেইল:', en: 'Email:' },
     'nav_mentors': { bn: 'মেন্টর', en: 'Mentors' },

    // Hero Section
    'hero_heading': { bn: 'ভবিষ্যতের জন্য প্রস্তুত হোন: AI ও কোডিং এখন হাতের মুঠোয়', en: 'Prepare for the Future: AI and Coding at Your Fingertips' },
    'hero_subtitle': { bn: '৪ থেকে ১৬ বছর বয়সী শিশুদের জন্য ৩-স্তরের পূর্ণাঙ্গ প্রোগ্রামিং কারিকুলাম।', en: '3-Level Comprehensive Programming Curriculum for Ages 4-16.' },
    'hero_cta': { bn: 'কোর্সগুলো দেখুন ↓', en: 'View Courses ↓' },
        // NEW: Requirements Section (Shared and Specific Keys)
    'req_heading': { bn: 'প্রয়োজনীয় উপকরণ ও সিস্টেম', en: 'Required Tools & System' },
    'req_software_title': { bn: 'সফটওয়্যার/প্ল্যাটফর্ম', en: 'Software/Platforms' },
    'req_device_title': { bn: 'ডিভাইস', en: 'Devices' },
    'req_specs_title': { bn: 'মিনিমাম সিস্টেম', en: 'Minimum System' },


    // Level 1
    'level_tag_1': { bn: 'লেভেল ১', en: 'LEVEL 1' },
    'level_1_title': { bn: 'লিটল এক্সপ্লোরার (Little Explorer) 🍀', en: 'Little Explorer 🍀' },
    'level_1_subtitle': { bn: '(যুক্তি ও কল্পনার ভিত্তি)', en: '(Foundation of Logic and Imagination)' },
    'target_age_label': { bn: 'টার্গেট বয়স:', en: 'Target Age:' },
    'platform_label': { bn: 'প্ল্যাটফর্ম:', en: 'Platform:' },
    'duration_label': { bn: 'সময়কাল:', en: 'Duration:' },
    'main_goal_label': { bn: 'মূল লক্ষ্য:', en: 'Main Goal:' },
    'goal_L1_desc': { bn: 'টাইপিং-এর ভয় দূর করা। \'ট্র্যাগ-এন্ড-ড্রপ\' ব্লক ব্যবহার করে গল্প, অ্যানিমেশন এবং সহজ গেম বানানো।', en: 'Eliminate fear of typing. Kids create stories, animations, and simple games using drag-and-drop blocks.' },
    'syllabus_heading': { bn: 'সিলেবাস হাইলাইটস', en: 'Syllabus Highlights' },
    'L1_syl_1': { bn: 'স্প্রাইট, মোশন, সাউন্ড ব্লক', en: 'Sprites, Motion, Sound Blocks' },
    'L1_syl_2': { bn: 'ইভেন্টস ও লুপস (Loops)', en: 'Events and Loops' },
    'L1_syl_3': { bn: 'ভেরিয়েবল (Score) ও কন্ডিশন (If/Then)', en: 'Variables (Score) & Conditions (If/Then)' },
    'L1_syl_4': { bn: 'প্রজেক্ট: "Catching Game" এবং Maze গেম', en: 'Project: "Catching Game" and Maze Games' },
    'ai_bonus_heading': { bn: 'ফ্রি AI বোনাস', en: 'Free AI Bonus' },
    'L1_ai_1': { bn: '<strong>"AI দিয়ে গল্প লেখা!":</strong> স্ক্র্যাচ গেমের জন্য আইডিয়া ও গল্প তৈরি (Basic Prompt Understanding)।', en: '<strong>"AI Storytelling!":</strong> Generating ideas and stories for Scratch games (Basic Prompt Understanding).' },
    'L1_ai_2': { bn: '<strong>"AI Art for Kids":</strong> AI-কে নির্দেশনা দিয়ে কার্টুন ও ছবি বানানোর আইডিয়া।', en: '<strong>"AI Art for Kids":</strong> Generating cartoon and picture ideas using AI prompts.' },
    'enroll_L1': { bn: 'ভর্তি হন (১,৫০০ টাকা/মাস) 🛒', en: 'Enroll Now (1,500 Taka/Month) 🛒' },
        // Level 1 Requirements
    'req_L1_software_desc': { bn: 'Scratch (ওয়েব) এবং Scratch Jr. (ট্যাবলেট অ্যাপ)। কোনো কিছু ইনস্টল করার জটিলতা নেই।', en: 'Scratch (Web) and Scratch Jr. (Tablet App). No complex installation needed.' },
    'req_L1_device_desc': { bn: 'যেকোনো সাধারণ ল্যাপটপ/ডেস্কটপ এবং Scratch Jr. এর জন্য একটি অ্যান্ড্রয়েড ট্যাব বা আইপ্যাড।', en: 'Any standard Laptop/Desktop and an Android Tablet or an iPad for Scratch Jr.' },
    'req_L1_specs_desc': { bn: 'OS: Windows 10, macOS 10.13+ <br> RAM: 4GB <br> Browser: Chrome/Firefox (Latest)', en: 'OS: Windows 10, macOS 10.13+ <br> RAM: 4GB <br> Browser: Chrome/Firefox (Latest)' },


    // Level 2
    'level_tag_2': { bn: 'লেভেল ২', en: 'LEVEL 2' },
    'level_2_title': { bn: 'ক্রিয়েটিভ বিল্ডার (Creative Builder) 🎮📱', en: 'Creative Builder 🎮📱' },
    'level_2_subtitle': { bn: '(বাস্তব পৃথিবীতে প্রয়োগ)', en: '(Real-World Application)' },
    'track_2_1_title': { bn: 'ট্র্যাক ২.১: অ্যাপ ডেভেলপার', en: 'Track 2.1: App Developer' },
    'goal_T2_1_desc': { bn: 'ব্লক-কোডিং ব্যবহার করে নিজের মোবাইল অ্যাপ তৈরি করা।', en: 'Create their own mobile apps using block coding.' },
    'T2_1_syl_1': { bn: 'অ্যান্ড্রয়েড অ্যাপ ডিজাইন, ইউজার ইন্টারফেস (UI)', en: 'Android App Design, User Interface (UI)' },
    'T2_1_syl_2': { bn: 'প্রজেক্ট: "Talking Pet" অ্যাপ, "Mini Paint" ও "Quiz App"', en: 'Projects: "Talking Pet", "Mini Paint" & "Quiz App"' },
    'enroll_T2_1': { bn: 'ট্র্যাক ২.১ (২,০০০ টাকা/মাস) 🛒', en: 'Track 2.1 (2,000 Taka/Month) 🛒' },
    'track_2_2_title': { bn: 'ট্র্যাক ২.২: গেম ডিজাইনার', en: 'Track 2.2: Game Designer' },
    'goal_T2_2_desc': { bn: '৩ডি গেমিং প্ল্যাটফর্মে নিজের Obstacle Course (Obby) গেম তৈরি ও শেয়ার করা।', en: 'Build and share their own 3D Obstacle Course (Obby) games on a gaming platform.' },
    'T2_2_syl_1': { bn: 'Roblox ৩ডি জগত ডিজাইন, Obby গেম বানানো', en: 'Roblox 3D World Design, Obby Game Creation' },
    'T2_2_syl_2': { bn: 'বেসিক Lua স্ক্রিপ্টিং ও গেম শেয়ারিং', en: 'Basic Lua Scripting & Game Sharing' },
    'enroll_T2_2': { bn: 'ট্র্যাক ২.২ (২,০০০ টাকা/মাস) 🛒', en: 'Track 2.2 (2,000 Taka/Month) 🛒' },
    'save_500': { bn: '৫০০ টাকা ছাড়!', en: '500 Taka Discount!' },
    'combo_L2_title': { bn: 'লেভেল ২ কম্বো অফার', en: 'Level 2 Combo Offer' },
    'combo_L2_desc': { bn: 'অ্যাপ ডেভেলপার + গেম ডিজাইনার (App Inventor + Roblox)', en: 'App Developer + Game Designer (App Inventor + Roblox)' },
    'enroll_combo_L2': { bn: 'কম্বো অফারে ভর্তি হন (৩,৫০০ টাকা/মাস) 🏷️', en: 'Enroll in Combo (3,500 Taka/Month) 🏷️' },
            // Level 2 Requirements
    'req_L2_software_desc': { bn: 'MIT App Inventor (ওয়েব) এবং Roblox Studio (ডেস্কটপ অ্যাপ)। আমরা ইনস্টলেশনে সাহায্য করব।', en: 'MIT App Inventor (Web) and Roblox Studio (Desktop App). We will assist with installation.' },
    'req_L2_device_desc': { bn: 'একটি সচল ল্যাপটপ/পিসি এবং App Inventor-এর জন্য অ্যাপ পরীক্ষার জন্য একটি অ্যান্ড্রয়েড ফোন।', en: 'A functional Laptop/PC and an Android phone for testing apps from App Inventor.' },
    'req_L2_specs_desc': { bn: 'OS: Windows 10, macOS 10.13+ <br> RAM: 4GB', en: 'OS: Windows 10, macOS 10.13+ <br> RAM: 4GB' },
    
    // Level 3
    'level_tag_3': { bn: 'লেভেল ৩', en: 'LEVEL 3' },
    'level_3_title': { bn: 'ফিউচার প্রোগ্রামার (Future Programmer) 💻🌐', en: 'Future Programmer 💻🌐' },
    'level_3_subtitle': { bn: '(ক্যারিয়ার ও ইউনিভার্সিটির প্রস্তুতি)', en: '(Career and University Preparation)' },
    'track_3_1_title': { bn: 'ট্র্যাক ৩.১: ইউনিভার্সিটি ফাউন্ডেশন', en: 'Track 3.1: University Foundation' },
    'goal_T3_1_desc': { bn: 'টেক্সট-বেসড প্রোগ্রামিং লজিক তৈরি ও প্রবলেম সলভিং।', en: 'Develop text-based programming logic and robust problem-solving skills.' },
    'T3_1_syl_1': { bn: 'ভেরিয়েবল, ডেটা টাইপ, if/else, লুপস (Loops)', en: 'Variables, Data Types, if/else, Loops' },
    'T3_1_syl_2': { bn: 'প্রজেক্ট: গ্রেড ক্যালকুলেটর, প্যাটার্ন প্রিন্টিং', en: 'Projects: Grade Calculator, Pattern Printing' },
    'enroll_T3_1': { bn: 'ট্র্যাক ৩.১ (২,৫০০ টাকা/মাস) 🛒', en: 'Track 3.1 (2,500 Taka/Month) 🛒' },
    'track_3_2_title': { bn: 'ট্র্যাক ৩.২: ওয়েব আর্কিটেক্ট', en: 'Track 3.2: Web Architect' },
    'goal_T3_2_desc': { bn: 'নিজস্ব পার্সোনাল ওয়েবসাইট তৈরি এবং ইন্টারঅ্যাক্টিভ করা।', en: 'Build and make interactive a personal website from scratch.' },
    'T3_2_syl_1': { bn: 'HTML কঙ্কাল, CSS ডিজাইন (Flexbox)', en: 'HTML Structure, CSS Design (Flexbox)' },
    'T3_2_syl_2': { bn: 'JavaScript (বেসিক) দিয়ে ওয়েবসাইট ইন্টারঅ্যাক্টিভ করা', en: 'Making websites interactive with basic JavaScript' },
    'T3_2_syl_3': { bn: 'প্রজেক্ট: সম্পূর্ণ পার্সোনাল ওয়েবসাইট', en: 'Project: Complete Personal Website' },
    'enroll_T3_2': { bn: 'ট্র্যাক ৩.২ (২,৫০০ টাকা/মাস) 🛒', en: 'Track 3.2 (2,500 Taka/Month) 🛒' },
    'combo_L3_title': { bn: 'লেভেল ৩ কম্বো অফার', en: 'Level 3 Combo Offer' },
    'combo_L3_desc': { bn: 'ইউনিভার্সিটি ফাউন্ডেশন + ওয়েব আর্কিটেক্ট (C Language + Web Dev)', en: 'University Foundation + Web Architect (C Language + Web Dev)' },
    'enroll_combo_L3': { bn: 'কম্বো অফারে ভর্তি হন (৪,৫০০ টাকা/মাস) 🏷️', en: 'Enroll in Combo (4,500 Taka/Month) 🏷️' },
        // Level 3 Requirements
    'req_L3_software_desc': { bn: 'VS Code (টেক্সট এডিটর), C Compiler এবং আধুনিক ওয়েব ব্রাউজার। সব সফটওয়্যারই ফ্রি এবং আমরা ইনস্টল করতে সাহায্য করব।', en: 'VS Code (Text Editor), a C Compiler, and a modern web browser. All software is free, and we will help install them.' },
    'req_L3_device_desc': { bn: 'একটি ভালো মানের ল্যাপটপ বা ডেস্কটপ কম্পিউটার (Windows/Mac)।', en: 'A good quality Laptop or Desktop computer (Windows/Mac).' },
    'req_L3_specs_desc': { bn: 'OS: Windows 10, macOS 10.15+ <br> RAM: 8GB <br> Storage: 20GB Free Space', en: 'OS: Windows 10, macOS 10.15+ <br> RAM: 8GB <br> Storage: 20GB Free Space' },

    // NEW: Trial Class Section
    'trial_heading': { bn: 'নিশ্চিত নন কোন কোর্সটি সেরা?', en: 'Not Sure Which Course is Best?' },
    'trial_subtitle': { bn: 'আপনার সন্তানের জন্য সঠিক পথ বেছে নিতে আমাদের একটি ফ্রি ট্রায়াল ক্লাসের জন্য অনুরোধ করুন। কোনো বাধ্যবাধকতা নেই!', en: 'Request a free trial class to choose the right path for your child. No obligations!' },
    'trial_cta_btn': { bn: 'ফ্রি ট্রায়াল ক্লাস বুক করুন 🗓️', en: 'Book a Free Trial Class 🗓️' },

    // NEW: Mentors Section
    'mentors_heading': { bn: 'আমাদের অভিজ্ঞ মেন্টর ও কাউন্সিল', en: 'Our Experienced Mentors & Council' },
    'mentors_subtitle': { bn: 'আমাদের শিক্ষকরা শুধুমাত্র কোডার নন, তারা হলেন ভবিষ্যতের পথপ্রদর্শক।', en: 'Our teachers are not just coders; they are guides for the future.' },
    'mentor_card1_title': { bn: 'অভিজ্ঞ শিক্ষক', en: 'Experienced Teachers' },
    'mentor_card1_desc': { bn: 'আমাদের সকল শিক্ষক DSAB মেথড ও ব্রিটিশ কাউন্সিল দ্বারা প্রশিক্ষিত এবং শিশুদের মনস্তত্ত্ব বোঝেন।', en: 'All our teachers are trained in the DSAB method & by the British Council, and they understand child psychology.' },
    'mentor_card2_title': { bn: 'টেকনোলজি মেন্টর', en: 'Technology Mentors' },
    'mentor_card2_desc': { bn: 'টেক ইন্ডাস্ট্রির পেশাদাররা আমাদের মেন্টর কাউন্সিলে আছেন, যারা বাস্তব অভিজ্ঞতা দিয়ে কারিকুলামকে সমৃদ্ধ করেন।', en: 'Professionals from the tech industry are on our mentor council, enriching the curriculum with real-world experience.' },
    'mentor_card3_title': { bn: 'বন্ধুত্বপূর্ণ সাপোর্ট', en: 'Friendly Support' },
    'mentor_card3_desc': { bn: 'আমরা প্রতিটি শিশুর প্রতি ব্যক্তিগতভাবে নজর দিই এবং তাদের শেখার আগ্রহকে সবচেয়ে বেশি গুরুত্ব দিই।', en: 'We provide personalized attention to each child and prioritize their passion for learning.' },

    // NEW: Support Session Section
    'support_heading': { bn: 'মেন্টরশিপ ও সাপোর্ট সেশন', en: 'Mentorship & Support Session' },
    'support_subtitle': { bn: 'আপনার সন্তানের প্রজেক্ট, সমস্যা সমাধান বা ক্যারিয়ার গাইডেন্সের জন্য আমাদের একজন মেন্টরের সাথে একটি ওয়ান-টু-ওয়ান সেশন বুক করুন।', en: 'Book a one-to-one session with one of our mentors for your child\'s project help, problem-solving, or career guidance.' },
    'support_subtitle2': { bn: 'এটি ফ্রি দিতে চেয়েও, আপনাদের প্রচুর চাহিদার জন্য বাধ্য হয়ে কিছু চার্জ করতে হচ্ছে আমাদের। আমরা আন্তরিক ভাবে দুঃখিত।', en: 'Although we wanted to offer this for free, due to high demand, we have to charge a nominal fee. We sincerely apologize.' },
    'support_price': { bn: 'সাধারণ মূল্য: ২০০ টাকা/সেশন', en: 'Regular Price: 200 BDT/Session' },
    'support_discount': { bn: 'BIKS শিক্ষার্থীদের জন্য ৫০% ছাড় (মাত্র ১০০ টাকা)!', en: '50% Discount for BIKS Students (Only 100 BDT)!' },
    'support_cta_btn': { bn: 'সেশন বুক করুন 🎧', en: 'Book a Session 🎧' },



       // Pricing
    'pricing_heading': { bn: 'BIKS টেক একাডেমি: প্রাইসিং মডেল', en: 'BIKS Tech Academy: Pricing Model' },
    'pricing_subtitle': { bn: 'বাজারের সেরা মূল্যে আমাদের পূর্ণাঙ্গ প্রিমিয়াম কারিকুলামে আপনার শিশুকে কোডিং শেখান।', en: 'Enroll your child in our complete premium curriculum at the best market price.' },
    'table_level': { bn: 'লেভেল', en: 'Level' },
    'table_course': { bn: 'কোর্স', en: 'Course' },
    'table_price': { bn: 'BIKS প্রস্তাবিত মূল্য (মাসিক)', en: 'BIKS Proposed Price (Monthly)' },
    'table_order': { bn: 'অর্ডার', en: 'Order' },
    'per_month': { bn: 'টাকা/মাসিক', en: 'Taka/Monthly' },
    'discount_500': { bn: '৫০০ টাকা ছাড়!', en: '500 Taka Discount!' },
    'add_btn': { bn: 'Add', en: 'Add' },
    'select_track': { bn: 'Select Track', en: 'Select Track' },
    'add_combo_btn': { bn: 'Add Combo', en: 'Add Combo' },

    // Offers
    'offers_heading': { bn: 'বিশেষ অফার', en: 'Special Offers' },
    'offer_1_title': { bn: 'BIKS স্টুডেন্ট ডিসকাউন্ট', en: 'BIKS Student Discount' },
    'offer_1_desc': { bn: 'BIKS-এর নিয়মিত ছাত্রছাত্রীদের জন্য সকল কোডিং কোর্সে <strong>আজীবন ২০% ছাড়</strong>!', en: 'Regular BIKS students get a <strong>Lifetime 20% Discount</strong> on all coding courses!' },
    'offer_2_title': { bn: 'ফ্রি AI বোনাস', en: 'Free AI Bonus' },
    'offer_2_desc': { bn: 'প্রতিটি লেভেলের সাথে AI-এর ব্যবহার সম্পূর্ণ ফ্রি! (Prompt Understanding, Debugging ও Art Generation)।', en: 'AI tools usage is completely free with every level! (Prompt Understanding, Debugging, and Art Generation).' },
    'offer_3_title': { bn: 'ফাউন্ডার\'স ব্যাচ অফার', en: 'Founder\'s Batch Offer' },
    'offer_3_desc': { bn: 'প্রথম ব্যাচে ভর্তি হলেই প্রথম মাসের ফি-এর উপর <strong>অতিরিক্ত ৫০০ টাকা ছাড়</strong>।', en: 'Get an <strong>Extra 500 Taka Discount</strong> on the first month\'s fee when enrolling in the first batch.' },

    // CTA
    'cta_heading': { bn: 'আজই আপনার সন্তানের উজ্জ্বল ভবিষ্যতের পথে যাত্রা শুরু করুন!', en: 'Start your child\'s journey toward a bright future today!' },
    'cta_whatsapp_btn': { bn: 'WhatsApp-এ কথা বলুন 💬', en: 'Talk on WhatsApp 💬' },

    // Footer
    'footer_contact_title': { bn: 'যোগাযোগের ঠিকানা', en: 'Contact Address' },
    'footer_links_title': { bn: 'গুরুত্বপূর্ণ লিংক', en: 'Important Links' },
    'link_L1': { bn: 'লেভেল ১ (৪-৬+ বছর)', en: 'Level 1 (Ages 4-6+)' },
    'link_L2': { bn: 'লেভেল ২ (১০-১৩ বছর)', en: 'Level 2 (Ages 10-13)' },
    'link_L3': { bn: 'লেভেল ৩ (১৩-১৬ বছর)', en: 'Level 3 (Ages 13-16)' },
    'link_offers': { bn: 'বিশেষ ছাড় ও অফার', en: 'Special Discounts & Offers' },
    'footer_goal_title': { bn: 'আমাদের লক্ষ্য', en: 'Our Goal' },
    'footer_mission_desc': { bn: 'BIKS টেক একাডেমি শিশুদের মধ্যে Logic ও Problem Solving-এর ভিত্তি মজবুত করতে বদ্ধপরিকর।', en: 'BIKS Tech Academy is committed to strengthening the foundation of Logic and Problem Solving in children.' },
    'copyright_text': { bn: '&copy; ২০২৫ BIKS টেক একাডেমি। সকল স্বত্ব সংরক্ষিত।', en: '&copy; 2025 BIKS Tech Academy. All rights reserved.' },

    // Cart Modal
    'cart_heading': { bn: 'আপনার কোর্সের ঝুড়ি (Cart)', en: 'Your Course Cart' },
    'cart_total_label': { bn: 'মোট মূল্য:', en: 'Total Price:' },
    'cart_checkout_btn': { bn: 'অর্ডার কনফার্ম করুন (WhatsApp)', en: 'Confirm Order (WhatsApp)' },
    'cart_empty_msg': { bn: 'আপনার ঝুড়ি খালি। একটি কোর্স নির্বাচন করুন।', en: 'Your cart is empty. Please select a course.' },
};

// --- Language Functions ---

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    langSwitcherBtn.textContent = (lang === 'bn' ? 'EN' : 'BN'); // Toggle button text
    
    // 1. Translate main content elements
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[key] && translations[key][lang]) {
            // Preserve inner HTML for tags like <strong> inside the text
            if (element.children.length > 0 && element.tagName !== 'A' && element.tagName !== 'BUTTON') {
                 // For complex text like offer descriptions, replace only text nodes or use innerHTML
                 element.innerHTML = translations[key][lang];
            } else {
                element.textContent = translations[key][lang];
            }
        }
    });

    // 2. Update Cart UI for potentially translated course names
    updateCartUI();
}

function switchLanguage() {
    const newLang = currentLang === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
}

// --- Cart Functions (Modified to handle translated names) ---

function addToCart(id, name, price) {
    // We use the ID to look up the name in the current language
    const currentName = courseData[id][currentLang]; 

    if (cart.some(item => item.id === id)) {
        alert(`${currentName} ${currentLang === 'bn' ? 'কোর্সটি ইতিমধ্যে আপনার ঝুড়িতে আছে!' : 'is already in your cart!'}`);
        return;
    }
    
    // Combo conflict logic (same as before)
    if (id === 'L2_COMBO') {
        cart = cart.filter(item => item.id !== 'L2_APPINV' && item.id !== 'L2_ROBLOX');
    } else if (id === 'L3_COMBO') {
        cart = cart.filter(item => item.id !== 'L3_C_LANG' && item.id !== 'L3_WEBDEV');
    }

    cart.push({ id, name: currentName, price }); // Store the name in the current language context
    updateCartUI();
    toggleCart(true); // Open cart after adding item
    alert(`${currentName} ${currentLang === 'bn' ? 'সফলভাবে ঝুড়িতে যোগ হয়েছে!' : 'successfully added to cart!'}`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    cartItemsList.innerHTML = '';
    let total = 0;
    const lang = currentLang;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p class="empty-cart-message">${translations['cart_empty_msg'][lang]}</p>`;
        cartCount.textContent = 0;
        cartTotalElement.textContent = lang === 'bn' ? '০' : '0';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        // Ensure the item name is in the current language context when rendering the cart
        const translatedName = courseData[item.id][lang];
        const currency = lang === 'bn' ? ' টাকা' : ' Taka';
        
        itemElement.innerHTML = `
            <span class="item-name">${translatedName}</span>
            <div>
                <span class="item-price">${item.price.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}${currency}</span>
                <span class="remove-item" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash"></i></span>
            </div>
        `;
        cartItemsList.appendChild(itemElement);
        total += item.price;
    });

    cartCount.textContent = cart.length;
    cartTotalElement.textContent = total.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');
    
    // Update total label (since it is outside the translation loop)
    const totalLabel = document.querySelector('[data-key="cart_total_label"]');
    const currencyText = lang === 'bn' ? ' টাকা' : ' Taka';
    if(totalLabel) {
         totalLabel.innerHTML = `${translations['cart_total_label'][lang]} <span id="cart-total">${total.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}${currencyText}</span>`;
    }
}

function toggleCart(show) {
    cartModal.style.display = show ? 'block' : 'none';
}

function redirectToWhatsApp() {
    if (cart.length === 0) {
        alert(currentLang === 'bn' ? "অর্ডার করার জন্য অনুগ্রহ করে কোর্সের ঝুড়িতে একটি আইটেম যোগ করুন।" : "Please add an item to the cart to place an order.");
        return;
    }

    const lang = currentLang;
    const currency = lang === 'bn' ? ' টাকা' : ' Taka';
    
    let message = lang === 'bn' 
        ? "প্রিয় BIKS টেক একাডেমি,\nআমি নিচের কোর্সগুলো অর্ডার করতে চাই:\n\n"
        : "Dear BIKS Tech Academy,\nI would like to order the following courses:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        const translatedName = courseData[item.id][lang];
        message += `${index + 1}. ${translatedName} - ${item.price.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}${currency}\n`;
        total += item.price;
    });

    message += lang === 'bn' 
        ? `\nমোট মূল্য: ${total.toLocaleString('bn-BD')} টাকা (মাসিক ফি)।\nভর্তি প্রক্রিয়া ও পেমেন্ট সম্পর্কে বিস্তারিত জানতে চাই। ধন্যবাদ।`
        : `\nTotal Price: ${total.toLocaleString('en-US')} Taka (Monthly Fee).\nI would like to know more about the enrollment process and payment. Thank you.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// --- Menu Functions (Mobile Responsiveness) ---

function toggleMenu() {
    navMenu.classList.toggle('open');
    if(window.innerWidth <= 768 && navMenu.classList.contains('open')) {
        // Close menu on link click only when menu is open on mobile
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            }, { once: true });
        });
    }
}


// Initialize Language and Cart on load
document.addEventListener('DOMContentLoaded', () => {
    // Set default language (Bengali)
    setLanguage('bn'); 
    updateCartUI();
});
