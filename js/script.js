document.addEventListener('DOMContentLoaded', function() {
    // Activate Swiper for testimonials on the homepage
    if (document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // Load teacher data on About Us page
    if (document.getElementById('teachers-grid')) {
        loadTeachers();
    }
    
    // Logic for the class template page
    if (document.getElementById('class-heading')) {
        handleClassPage();
    }
});

// Fetch and display teacher data
async function loadTeachers() {
    try {
        const response = await fetch('data/teachers.json');
        const teachers = await response.json();
        const grid = document.getElementById('teachers-grid');
        grid.innerHTML = teachers.map(teacher => `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card teacher-card h-100">
                    <img src="${teacher.image}" class="card-img-top" alt="${teacher.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${teacher.name}</h5>
                        <p class="card-text text-primary">${teacher.title}</p>
                        <p class="card-text"><small class="text-muted">${teacher.qualification}</small></p>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load teachers:', error);
    }
}



// Generic function to load JSON data and call a render function
async function loadJsonContent(type, className, renderer) {
    try {
        const response = await fetch(`data/${type}.json`);
        const data = await response.json();
        const classData = data[className] || []; // Get data for the specific class
        renderer(classData);
    } catch (error) {
        console.error(`Failed to load ${type}:`, error);
        document.getElementById(`${type}-grid`).innerHTML = `<p class="text-danger">Could not load content.</p>`;
    }
}

// Render functions for each content type
function renderGames(games) {
    const grid = document.getElementById('games-grid');
    grid.innerHTML = games.map(game => `
        <div class="col-md-4 mb-4">
            <div class="card content-card">
                <img src="${game.thumbnail}" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <a href="${game.url}" target="_blank" class="btn btn-primary">Play Now</a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderStories(stories) {
    const grid = document.getElementById('stories-grid');
    grid.innerHTML = stories.map((story, index) => `
        <div class="col-md-4 mb-4">
            <div class="card content-card story-card" onclick="openStoryModal(${index}, '${story.title}')">
                <img src="${story.cover}" alt="${story.title}">
                <div class="card-body">
                    <h5 class="card-title">${story.title}</h5>
                </div>
            </div>
        </div>
    `).join('');
    // Attach data to a global or accessible scope to be used by the modal
    window.currentStories = stories;
}

function renderVideos(videos) {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = videos.map(video => `
        <div class="col-md-6 mb-4">
            <div class="card content-card">
                <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/${video.youtubeId}" title="${video.title}" allowfullscreen></iframe>
                </div>
                <div class="card-body">
                     <h5 class="card-title">${video.title}</h5>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAchievements(achievements) {
    const list = document.getElementById('achievements-list');
    list.innerHTML = `
        <h3 class="text-center text-danger mb-4">Top Students of the Month</h3>
        <ul class="list-group list-group-flush">
            ${achievements.map(ach => `<li class="list-group-item text-center fs-5">${ach.studentName} - ${ach.achievement}</li>`).join('')}
        </ul>
    `;
}

// Story Modal and Web Speech API Logic
function openStoryModal(index, title) {
    const story = window.currentStories[index];
    document.getElementById('storyModalTitle').textContent = title;
    document.getElementById('storyModalBody').innerHTML = `<p>${story.content.replace(/\n/g, '</p><p>')}</p>`;
    
    const storyModal = new bootstrap.Modal(document.getElementById('storyModal'));
    storyModal.show();

    // Web Speech API
    const readAloudBtn = document.getElementById('readAloudBtn');
    const utterance = new SpeechSynthesisUtterance(story.content);
    
    readAloudBtn.onclick = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        } else {
            speechSynthesis.speak(utterance);
        }
    };
    
    // Stop speaking when modal is closed
    document.getElementById('storyModal').addEventListener('hidden.bs.modal', () => {
        speechSynthesis.cancel();
    });
}

// Add these lines inside the 'DOMContentLoaded' event listener at the top
document.addEventListener('DOMContentLoaded', function() {
    // ... (existing code for swiper, teachers, class page)

    // Load events on the News & Events page
    if (document.getElementById('events-calendar')) {
        loadEvents();
    }
    
    // Load parent resources on the Parent Resources page
    if (document.getElementById('parent-resources')) {
        loadParentResources();
    }

    // Add form submission handler for the contact page
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Clear the form
        });
    }
});


// ... (keep the existing functions: loadTeachers, handleClassPage, etc.)


// NEW FUNCTION: Fetch and display events data
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        const container = document.getElementById('events-calendar');
        if (events.length === 0) {
            container.innerHTML = '<p class="text-center">No upcoming events announced yet. Please check back later.</p>';
            return;
        }
        container.innerHTML = events.map(event => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h6>
                        <p class="card-text">${event.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load events:', error);
    }
}

// NEW FUNCTION: Fetch and display parent resources as an accordion
async function loadParentResources() {
    try {
        const response = await fetch('data/resources.json');
        const resources = await response.json();
        const container = document.getElementById('parent-resources');
        container.innerHTML = resources.map((resource, index) => `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${index}">
                    <button class="accordion-button ${index > 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}">
                        ${resource.title}
                    </button>
                </h2>
                <div id="collapse-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#parent-resources">
                    <div class="accordion-body">
                        ${resource.content}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load parent resources:', error);
    }
}