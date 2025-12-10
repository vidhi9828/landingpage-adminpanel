// Mock Data for Initial Load
const defaultProjects = [
    {
        id: 1,
        name: "Eco-Friendly Office Complex",
        description: "A state-of-the-art sustainable office building featuring solar panels, rainwater harvesting, and green workspaces.",
        image: "images/modern_office_buildi_58cb0637.jpg"
    },
    {
        id: 2,
        name: "Urban Skyline Tower",
        description: "A 50-story residential skyscraper located in the heart of the city, offering luxury living with breathtaking views.",
        image: "images/modern_office_buildi_19897569.jpg"
    },
    {
        id: 3,
        name: "Creative Tech Hub",
        description: "An innovative campus designed for tech startups, with open-plan layouts and collaborative zones.",
        image: "images/modern_office_buildi_ef0c3745.jpg"
    }
];

const defaultClients = [
    {
        id: 1,
        name: "Sarah Johnson",
        designation: "CEO, TechFlow",
        description: "BuildMaster transformed our vision into reality. Their attention to detail and commitment to quality is unmatched.",
        image: "images/professional_busines_c93c40b3.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        designation: "Director, UrbanLiving",
        description: "Professional, timely, and innovative. They managed our complex high-rise project with absolute precision.",
        image: "images/professional_busines_d4461489.jpg"
    },
    {
        id: 3,
        name: "Emily Davis",
        designation: "Founder, GreenSpace",
        description: "Their dedication to sustainable construction practices made them the perfect partner for our eco-friendly headquarters.",
        image: "images/professional_busines_fe1a49b0.jpg"
    }
];

// Application Logic
const app = {
    data: {
        projects: [],
        clients: [],
        messages: [],
        subscribers: []
    },

    init: function() {
        this.loadData();
        this.renderLandingProjects();
        this.renderLandingClients();
        this.setupEventListeners();
        console.log("App Initialized");
    },

    loadData: function() {
        // Load from LocalStorage or use defaults
        const projects = localStorage.getItem('flipr_projects');
        this.data.projects = projects ? JSON.parse(projects) : defaultProjects;

        const clients = localStorage.getItem('flipr_clients');
        this.data.clients = clients ? JSON.parse(clients) : defaultClients;

        const messages = localStorage.getItem('flipr_messages');
        this.data.messages = messages ? JSON.parse(messages) : [];

        const subscribers = localStorage.getItem('flipr_subscribers');
        this.data.subscribers = subscribers ? JSON.parse(subscribers) : [];

        this.saveData(); // Ensure defaults are saved if first run
    },

    saveData: function() {
        localStorage.setItem('flipr_projects', JSON.stringify(this.data.projects));
        localStorage.setItem('flipr_clients', JSON.stringify(this.data.clients));
        localStorage.setItem('flipr_messages', JSON.stringify(this.data.messages));
        localStorage.setItem('flipr_subscribers', JSON.stringify(this.data.subscribers));
    },

    // --- Rendering ---

    renderLandingProjects: function() {
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = this.data.projects.map(p => `
            <article class="project-card">
                <img src="${p.image}" alt="${p.name}" class="project-img">
                <div class="project-body">
                    <h3 class="project-title">${p.name}</h3>
                    <p class="project-desc">${p.description}</p>
                    <button class="btn btn-primary btn-sm" disabled style="opacity: 0.7; cursor: not-allowed;">Read More</button>
                </div>
            </article>
        `).join('');
    },

    renderLandingClients: function() {
        const grid = document.getElementById('clients-grid');
        grid.innerHTML = this.data.clients.map(c => `
            <article class="client-card">
                <img src="${c.image}" alt="${c.name}" class="client-img">
                <p class="client-desc">"${c.description}"</p>
                <h4 class="client-name">${c.name}</h4>
                <span class="client-designation">${c.designation}</span>
            </article>
        `).join('');
    },

    renderAdminProjects: function() {
        const tbody = document.getElementById('admin-projects-list');
        tbody.innerHTML = this.data.projects.map(p => `
            <tr>
                <td><img src="${p.image}" class="admin-img-thumb" alt="thumb"></td>
                <td>${p.name}</td>
                <td>${p.description.substring(0, 50)}...</td>
                <td><button onclick="app.deleteProject(${p.id})" class="action-btn">Delete</button></td>
            </tr>
        `).join('');
    },

    renderAdminClients: function() {
        const tbody = document.getElementById('admin-clients-list');
        tbody.innerHTML = this.data.clients.map(c => `
            <tr>
                <td><img src="${c.image}" class="admin-img-thumb" alt="thumb"></td>
                <td>${c.name}</td>
                <td>${c.designation}</td>
                <td>${c.description.substring(0, 30)}...</td>
                <td><button onclick="app.deleteClient(${c.id})" class="action-btn">Delete</button></td>
            </tr>
        `).join('');
    },

    renderAdminMessages: function() {
        const tbody = document.getElementById('admin-messages-list');
        if (this.data.messages.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No messages yet.</td></tr>';
            return;
        }
        tbody.innerHTML = this.data.messages.map(m => `
            <tr>
                <td>${new Date(m.date).toLocaleDateString()}</td>
                <td>${m.fullName}</td>
                <td>${m.email}</td>
                <td>${m.mobile}</td>
                <td>${m.city}</td>
            </tr>
        `).join('');
    },

    renderAdminSubscribers: function() {
        const tbody = document.getElementById('admin-subscribers-list');
        if (this.data.subscribers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" style="text-align:center;">No subscribers yet.</td></tr>';
            return;
        }
        tbody.innerHTML = this.data.subscribers.map(s => `
            <tr>
                <td>${new Date(s.date).toLocaleDateString()}</td>
                <td>${s.email}</td>
            </tr>
        `).join('');
    },

    // --- Actions ---

    addProject: function(e) {
        e.preventDefault();
        const form = e.target;
        const newProject = {
            id: Date.now(),
            name: form.name.value,
            description: form.description.value,
            image: form.image.value
        };
        this.data.projects.push(newProject);
        this.saveData();
        this.renderLandingProjects();
        this.renderAdminProjects();
        this.toggleModal('project-modal');
        form.reset();
        alert('Project added successfully!');
    },

    addClient: function(e) {
        e.preventDefault();
        const form = e.target;
        const newClient = {
            id: Date.now(),
            name: form.name.value,
            designation: form.designation.value,
            description: form.description.value,
            image: form.image.value
        };
        this.data.clients.push(newClient);
        this.saveData();
        this.renderLandingClients();
        this.renderAdminClients();
        this.toggleModal('client-modal');
        form.reset();
        alert('Client added successfully!');
    },

    deleteProject: function(id) {
        if(confirm('Are you sure you want to delete this project?')) {
            this.data.projects = this.data.projects.filter(p => p.id !== id);
            this.saveData();
            this.renderLandingProjects();
            this.renderAdminProjects();
        }
    },

    deleteClient: function(id) {
        if(confirm('Are you sure you want to delete this client?')) {
            this.data.clients = this.data.clients.filter(c => c.id !== id);
            this.saveData();
            this.renderLandingClients();
            this.renderAdminClients();
        }
    },

    submitContact: function(e) {
        e.preventDefault();
        const form = e.target;
        const msg = {
            id: Date.now(),
            date: new Date().toISOString(),
            fullName: form.fullName.value,
            email: form.email.value,
            mobile: form.mobile.value,
            city: form.city.value
        };
        this.data.messages.push(msg);
        this.saveData();
        this.renderAdminMessages();
        form.reset();
        alert('Thank you! We have received your message.');
    },

    subscribeNewsletter: function(e) {
        e.preventDefault();
        const form = e.target;
        const sub = {
            id: Date.now(),
            date: new Date().toISOString(),
            email: form.email.value
        };
        this.data.subscribers.push(sub);
        this.saveData();
        this.renderAdminSubscribers();
        form.reset();
        alert('Subscribed successfully!');
    },

    // --- UI/Navigation ---

    showLanding: function() {
        document.getElementById('landing-page').classList.remove('hidden');
        document.getElementById('admin-panel').classList.add('hidden');
        document.getElementById('nav-landing').classList.add('active');
        document.getElementById('nav-admin').classList.remove('active');
        window.scrollTo(0, 0);
    },

    showAdmin: function() {
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        document.getElementById('nav-landing').classList.remove('active');
        document.getElementById('nav-admin').classList.add('active');
        
        // Render all admin tables fresh
        this.renderAdminProjects();
        this.renderAdminClients();
        this.renderAdminMessages();
        this.renderAdminSubscribers();
    },

    showAdminTab: function(tabName) {
        // Hide all contents
        document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('hidden'));
        // Remove active class from buttons
        document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Show selected
        document.getElementById(`admin-${tabName}`).classList.remove('hidden');
        document.querySelector(`.admin-tab-btn[data-tab="${tabName}"]`).classList.add('active');
    },

    toggleModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
        }
    },

    setupEventListeners: function() {
        document.getElementById('contact-form').addEventListener('submit', (e) => this.submitContact(e));
        document.getElementById('newsletter-form').addEventListener('submit', (e) => this.subscribeNewsletter(e));
        document.getElementById('add-project-form').addEventListener('submit', (e) => this.addProject(e));
        document.getElementById('add-client-form').addEventListener('submit', (e) => this.addClient(e));
    }
};

// Make app global so onclick handlers work
window.app = app;

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
