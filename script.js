// Store trips in local storage
let trips = JSON.parse(localStorage.getItem('trips')) || [];

// Navigation
document.querySelectorAll('nav a, .cta-buttons .btn').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-section');
        showSection(targetSection);
    });
});

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Add trip form submission
const addTripForm = document.getElementById('add-trip-form');
if (addTripForm) {
    addTripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newTrip = {
            from: document.getElementById('from').value,
            to: document.getElementById('to').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            seats: document.getElementById('seats').value,
            contact: document.getElementById('contact').value
        };
        trips.push(newTrip);
        localStorage.setItem('trips', JSON.stringify(trips));
        alert('Trip added successfully!');
        addTripForm.reset();
        showSection('home');
    });
}

// Search trips form submission
const searchTripsForm = document.getElementById('search-trips-form');
const searchResults = document.getElementById('search-results');
if (searchTripsForm && searchResults) {
    searchTripsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.getElementById('search-destination').value.toLowerCase();
        const date = document.getElementById('search-date').value;
        
        const filteredTrips = trips.filter(trip => 
            trip.to.toLowerCase().includes(destination) &&
            (!date || trip.date === date)
        );

        displaySearchResults(filteredTrips);
    });
}

// Display search results
function displaySearchResults(filteredTrips) {
    searchResults.innerHTML = '';
    if (filteredTrips.length === 0) {
        searchResults.innerHTML = '<p>No trips found.</p>';
    } else {
        filteredTrips.forEach(trip => {
            const tripCard = document.createElement('div');
            tripCard.classList.add('trip-card');
            tripCard.innerHTML = `
                <h3>${trip.from} to ${trip.to}</h3>
                <p>Date: ${trip.date}</p>
                <p>Time: ${trip.time}</p>
                <p>Available Seats: ${trip.seats}</p>
                <p>Contact: ${trip.contact}</p>
            `;
            searchResults.appendChild(tripCard);
        });
    }
}

// Initialize the page
showSection('home');