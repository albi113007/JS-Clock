// ===== GET HTML ELEMENTS =====
const clockDisplay = document.getElementById('clockDisplay');
const themeBtn = document.getElementById('themeBtn');
const timezoneSelect = document.getElementById('timezoneSelect');
const designBtns = document.querySelectorAll('.designBtn');

// ===== VARIABLES =====
let currentDesign = 'digital'; // default design
let currentTimezone = 'UTC';   // default timezone

// ===== FUNCTION: UPDATE CLOCK =====
function updateClock() {
    // Get current time in selected timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: currentTimezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const timeString = formatter.format(now);
    
    // Display based on selected design
    if (currentDesign === 'digital') {
        clockDisplay.textContent = timeString;
        clockDisplay.style.fontSize = '72px';
    }
}

// ===== FUNCTION: THEME TOGGLE =====
themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('darkMode');
    
    // Change button text
    if (document.body.classList.contains('darkMode')) {
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
    }
});

// ===== FUNCTION: TIMEZONE CHANGE =====
timezoneSelect.addEventListener('change', function(e) {
    currentTimezone = e.target.value;
    updateClock(); // Update immediately
});

// ===== FUNCTION: DESIGN CHANGE =====
designBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove 'active' class from all buttons
        designBtns.forEach(b => b.classList.remove('active'));
        
        // Add 'active' class to clicked button
        this.classList.add('active');
        
        // Change design
        currentDesign = this.dataset.design;
        updateClock(); // Update clock display
    });
});

// ===== RUN CLOCK EVERY SECOND =====
setInterval(updateClock, 1000);

// ===== RUN ONCE ON PAGE LOAD =====
updateClock();

// Set Digital as active on page load
document.querySelector('[data-design="digital"]').classList.add('active');