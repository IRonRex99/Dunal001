// functions onclick attributes
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function launchApp() {
    alert('Launching ශ්‍රීMaps Application!\n\nIn production, Please Waite until we fully Lunch it.');
}

function handleSubmit(e) {
    e.preventDefault();

    // Get form elements
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = 'Sending... ⏳';
    submitBtn.disabled = true;

    // Get form data
    const inputs = form.querySelectorAll('input, textarea');
    const contactData = {
        name: inputs[0].value,
        email: inputs[1].value,
        message: inputs[2].value,
        timestamp: new Date().toISOString()
    };

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwT6s_Vwg3W6TB1UTyWHS6si6z-lx98vaciSAoOeTrpCLIFGwviqqLp6g7xKir1xlZiZw/exec';

    // Send to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
    })
        .then(() => {
            alert('✅ Thank you for your message!\n\nWe\'ll get back to you soon.');
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('❌ Something went wrong. Please try again or email us at srimapslk@gmail.com');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Wait for DOM to allow other scripts to run safely
document.addEventListener('DOMContentLoaded', () => {

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.remove('active');
            }
        });
    });

    // Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});
