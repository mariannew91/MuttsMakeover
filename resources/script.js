const contactForm = document.getElementById('contact-form');
const submitDone = document.getElementById('submit-done');
const contactPage = document.getElementById('contact-body');
const newMessageBtn = document.getElementById('new-message');
const loginBtn = document.querySelectorAll('.login-btn');
const logoutBtn = document.getElementById('logout-btn');
const signupBtn = document.getElementById('signup-btn');
const accountBtn = document.getElementById('account-btn');
const loginPopup = document.getElementById('login-popup');
const loginCloseBtn = document.getElementById('login-close');
const loginSubmitBtn = document.getElementById('login-submit');
const blurOverlay = document.getElementById('blur-overlay');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const accountPage = document.getElementById('account-body');
const accountPageLoggedOut = document.getElementById('logged-out');
const accountDetails = document.getElementById('account-details');
const signUpForm = document.getElementById('signup-form');
const bookingPage = document.getElementById('booking-body');

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});


if (contactPage) {
    contactForm.addEventListener('submit', (e) => {
        contactForm.style.display = 'none';
        submitDone.style.display = 'flex';
        e.preventDefault();
    });

    newMessageBtn.addEventListener('click', (e) => {
        contactForm.style.display = 'flex';
        submitDone.style.display = 'none';
        document.getElementById('message').value = '';
    });
};

if (loginBtn && loginCloseBtn && loginSubmitBtn) {
    loginBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            loginPopup.style.display = 'flex';
            blurOverlay.style.display = 'flex';
        });
    });

    loginCloseBtn.addEventListener('click', (e) => {
        loginPopup.style.display = 'none';
        blurOverlay.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
        if (e.target === blurOverlay) {
            loginPopup.style.display = 'none';
            blurOverlay.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            loginPopup.style.display = 'none';
            blurOverlay.style.display = 'none';
            loginBtn.blur();
        }
    });

    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            localStorage.setItem('isLoggedIn', 'true');
            checkLoginStatus();
            loginPopup.style.display = 'none';
            blurOverlay.style.display = 'none';
            loginEmail.value = '';
            loginPassword.value = '';
            if (accountPage) {
                accountPage.style.display = 'block';
                accountPageLoggedOut.style.display = 'none';
            }
        });
    };
};

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        loginBtn.forEach((btn) => {
            btn.style.display = 'none';
        });
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        accountBtn.style.display = 'inline-block';
    } else {
        loginBtn.forEach((btn) => {
            btn.style.display = 'inline-block';
        });
        signupBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        accountBtn.style.display = 'none';
    }
};

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        localStorage.setItem('isLoggedIn', 'false');
        checkLoginStatus();
        if (accountPage) {
            accountPage.style.display = 'none';
            accountPageLoggedOut.style.display = 'block';
        }
    });
};

const defaultUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    dogName: "Buddy",
    dogBreed: "Golden Retriever",
    bookings: [
        { service: "Nail Trim", date: "Friday 19th December at 2:00 PM"},
        { service: "Full Groom", date: "Thursday 3rd January at 10:00 AM"}
    ]
};

if (accountPage) {
    checkLoginStatus();
    if (localStorage.getItem('isLoggedIn') === 'true') {
        accountPage.style.display = 'flex';
        accountPageLoggedOut.style.display = 'none';
        renderAccountPage();
    } else {
        accountPage.style.display = 'none';
        accountPageLoggedOut.style.display = 'block';
    };
};

// Sign up page //

if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('signup-name').value;
        const userEmail = document.getElementById('signup-email').value;
        const userPassword = document.getElementById('signup-password').value;
        const userDogName = document.getElementById('signup-dog-name').value;
        const userDogBreed = document.getElementById('signup-dog-breed').value;

        const newUser = {
            name: userName,
            email: userEmail,
            password: userPassword,
            dogName: userDogName,
            dogBreed: userDogBreed
        };

        localStorage.setItem('userProfile', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'account.html';
    });
};

// Account Page //

function renderAccountPage() {

    if (!localStorage.getItem('userProfile')) {
        accountDetails.innerHTML = `
            <h2>Account Details</h2>
            <p>Name: ${defaultUser.name}</p>
            <p>Dog's Name: ${defaultUser.dogName}</p>
            <p>Dog's Breed: ${defaultUser.dogBreed}</p>
            <p>Email: ${defaultUser.email}</p>
        `
    } else {
        const savedUser = JSON.parse(localStorage.getItem('userProfile'));
        accountDetails.innerHTML = `
            <h2>Account Details</h2>
            <p>Name: ${savedUser.name}</p>
            <p>Dog's Name: ${savedUser.dogName}</p>
            <p>Dog's Breed: ${savedUser.dogBreed}</p>
            <p>Email: ${savedUser.email}</p>
        `
    };
};

// Booking Page //

const serviceData = [
    {
        title: "Bath",
        image: "./resources/images/wash.png",
        price: 30,
        time: 45,
        duration: 55
    },
    {
        title: "Brushing",
        image: "./resources/images/brush.png",
        price: 20,
        time: 30,
        duration: 40
    },
    {
        title: "Full groom",
        image: "./resources/images/groom.png",
        price: 45,
        time: 90,
        duration: 105
    },
    {
        title: "Nail trimming",
        image: "./resources/images/nails.png",
        price: 15,
        time: 10,
        duration: 15
    },
    {
        title: "Ear cleaning",
        image: "./resources/images/ears.png",
        price: 10,
        time: 10,
        duration: 15
    },
    {
        title: "Teeth Brushing",
        image: "./resources/images/teeth.png",
        price: 20,
        time: 15,
        duration: 20
    }
]

let selectedDayOffset = 0;
let selectedDuration = null;
let pendingBooking = null;

const existingBookings = [
    {
        bookingNum: 1,
        type: "Ear cleaning",
        start: 630,
        end: 645,
        dayOffset: 0
    },
    {
        bookingNum: 2,
        type: "Full Groom",
        start: 860,
        end: 965,
        dayOffset: 1
    },
    {
        bookingNum: 3,
        type: "Bath",
        start: 920,
        end: 975,
        dayOffset: 2
    },
    {
        bookingNum: 4,
        type: "Teeth Brushing",
        start: 740,
        end: 760,
        dayOffset: 0
    },
    {
        bookingNum: 5,
        type: "Nail trimming",
        start: 830,
        end: 845,
        dayOffset: 0
    },
    {
        bookingNum: 6,
        type: "Brushing",
        start: 645,
        end: 685,
        dayOffset: 1
    },
    {
        bookingNum: 7,
        type: "Full Groom",
        start: 540,
        end: 645,
        dayOffset: 2
    }
]

const serviceCard = document.getElementById('service-card-array');
const stepOne = document.getElementById('booking-step-one');
const resetBookingsBtn = document.getElementById('reset-bookings');

function renderServiceCards() {
    stepOne.style.display = 'block';
    serviceCard.style.display = 'flex';
    resetBookingsBtn.style.display = 'none';
    serviceCard.innerHTML = '';
    serviceData.forEach((service) => {
        serviceCard.innerHTML += `
            <div class="service-card" data-duration="${service.time}">
                <div class="card-top">
                    <img src="${service.image}">
                    <h2 class="service-name">${service.title}</h2>
                </div>
                <div class="card-bottom">
                    <h3 class="time"><span><i class="fa-solid fa-clock"></i></span>${service.time} m</h3>
                    <h3 class="price">£${service.price}</h3>
                </div>
            </div>
        `
    });
};

if (bookingPage) {
    renderServiceCards();

    const serviceDateOptions = document.getElementById('service-date');
    const serviceTimeOptions = document.getElementById('service-time');
    const services = document.querySelectorAll('.service-card');
    const dateSelect = document.getElementById('date-select');

    serviceCard.addEventListener('click', (e) => {
        selectedService = clickedCard.classList.contains('selected') ? clickedCard : null;
        const clickedCard = e.target.closest('.service-card');
        if (!clickedCard) return;
        serviceCard.querySelectorAll('.service-card').forEach((s) => {
            if (s !== clickedCard) s.classList.remove('selected');
        });
        clickedCard.classList.toggle('selected');
        serviceTimeOptions.style.display = 'none';
        if (clickedCard.classList.contains('selected')) {
            serviceDateOptions.style.display = 'block';
            selectedDuration = Number(clickedCard.dataset.duration);
            if (selectedDayOffset !== null) {
                renderServiceTimes(selectedDuration, selectedDayOffset);
            }
            renderServiceDates();
        }
        dateSelect.scrollIntoView({ behavior: 'smooth' });
    });
    



    function renderServiceDates() {
        dateSelect.innerHTML = '';
        for (let i = 0; i < 14; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);
            const dayName = currentDate.toLocaleDateString('en-GB', { weekday: 'short'});
            const dayNumber = currentDate.toLocaleDateString('en-GB', { day: 'numeric'});
            const monthName = currentDate.toLocaleDateString('en-GB', { month: 'short'});
            dateSelect.innerHTML += `
                <button class="date-card" data-day-offset="${i}">
                    <span class="day-name">${dayName}</span>
                    <span class="day-num">${dayNumber}</span>
                    <span class="month-name">${monthName}</span>
                </button>
            `
        };
    };

    dateSelect.addEventListener('click', (event) => {

        
        const dateButton = event.target.closest('button[data-day-offset]');
        if (!dateButton) {
            return;
        }
        const dates = dateSelect.querySelectorAll('.date-card');
        dates.forEach((d) => {
            d.classList.remove('selected');
        });
        dateButton.classList.toggle('selected');
        if (dateButton.classList.contains('selected')) {
            serviceTimeOptions.style.display = 'block';
        };
        timeSelect.scrollIntoView({ behavior: 'smooth' });
        selectedDayOffset = Number(dateButton.dataset.dayOffset);
        if (selectedDuration !== null) {
            renderServiceTimes(selectedDuration, selectedDayOffset);
        }

    
    });

    const timeSelect = document.getElementById('time-select');

    function renderServiceTimes(duration, dayOffset) {
        selectedDuration = duration;
        selectedDayOffset = dayOffset;
        timeSelect.innerHTML = '';
        const freeTimeSlots = getFreeTimes(duration, dayOffset);
        freeTimeSlots.forEach((slotMinutes) => {
            const hours = String(Math.floor(slotMinutes / 60));
            const minutes = String(slotMinutes % 60);
            const formattedHours = hours.padStart(2, '0');
            const formattedMinutes = minutes.padStart(2, '0');
            const formattedTime = `${formattedHours}:${formattedMinutes}`;
            timeSelect.innerHTML += `<button data-time="${slotMinutes}">${formattedTime}</button>`
        });
    };

    timeSelect.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-time]');
        if (!button) {
            return;
        }
        if (selectedDuration === null || selectedDayOffset === null) { 
            return; 
        }
        const startMinutes = Number(button.dataset.time);
        const endMinutes = startMinutes + selectedDuration;
        const hasOverlap = existingBookings.some((booking) => {
            return (
                booking.dayOffset === selectedDayOffset &&
                startMinutes < booking.end && 
                booking.start < endMinutes
            );
        });
        if (hasOverlap) {
            return;
        }
        const timeButtons = timeSelect.querySelectorAll('button[data-time]');
        timeButtons.forEach((btn) => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
        pendingBooking = { dayOffset: selectedDayOffset, start: startMinutes, end: endMinutes };
        const summary = document.getElementById('summary');
        const selectedService = document.querySelector('.service-card.selected');
        const selectedDate = new Date();
        selectedDate.setDate(selectedDate.getDate() + selectedDayOffset);
        const dayNum = selectedDate.getDate();
        const lastTwo = dayNum % 100;
        const suffix = (lastTwo >= 11 && lastTwo <= 13)
            ? 'th'
            : (dayNum % 10 === 1)
                ? 'st'
                : (dayNum % 10 === 2)
                    ? 'nd'
                    : (dayNum % 10 === 3)
                        ? 'rd'
                        : 'th';
        const weekday = selectedDate.toLocaleDateString('en-GB', { weekday: 'long' });
        const month = selectedDate.toLocaleDateString('en-GB', { month: 'short' });
        const hour24 = Math.floor(pendingBooking.start / 60);
        const period = hour24 < 12 ? 'am' : 'pm';
        const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
        const minutesFormatted = String(pendingBooking.start % 60).padStart(2, '0');
        summary.style.display = 'flex';
        summary.innerHTML = `
            <div id="summary-card">
                <div id="summary-top">
                    <i id="cancel-btn" class="fa-solid fa-xmark"></i>
                    <h2>Your Booking</h2>
                </div>
                <div id="summary-middle">
                    <img id="summary-img" src="${selectedService.querySelector('img').src}">
                    <h2>${selectedService.querySelector('.service-name').textContent}</h2>
                </div>
                <div id="summary-date">
                    <p>${weekday} ${dayNum}${suffix} ${month}</p>
                    <p>${hour12}:${minutesFormatted} ${period}</p>
                </div>
                <p>${selectedService.querySelector('.price').textContent}</p>
            </div>
            <button id="confirm-booking">Confirm</button>`
        summary.scrollIntoView({ behavior: 'smooth' });
        const cancelBtn = document.getElementById('cancel-btn');
        const confirmBtn = document.getElementById('confirm-booking');
        cancelBtn.addEventListener('click', (e) => {
            summary.innerHTML = '';
            summary.style.display = 'none';
            document.querySelectorAll('.selected').forEach((btn) => {
                btn.classList.remove('selected');
            });
            serviceDateOptions.classList.add('hidden');
            serviceTimeOptions.classList.add('hidden');
            setTimeout(() => {
                serviceDateOptions.style.display = 'none';
                serviceTimeOptions.style.display = 'none';
                serviceDateOptions.classList.remove('hidden');
                serviceTimeOptions.classList.remove('hidden');
                serviceCard.scrollIntoView({ behavior: 'smooth' });
                pendingBooking = null;
            }, 120);
        });
        confirmBtn.addEventListener('click', (e) => {
            const bookingToSave = {
                ...pendingBooking,
                serviceTitle: selectedService.querySelector('.service-name').textContent,
                price: selectedService.querySelector('.price').textContent,
                image: selectedService.querySelector('img').src,
                dateLabel: `${weekday} ${dayNum}${suffix} ${month}`
            }
            localStorage.setItem('pendingBooking', JSON.stringify(bookingToSave));
            resetBookingsBtn.style.display = 'block';
            summary.innerHTML = `<div id="summary-card">
                <div id="summary-top">
                    <h2>Booking Confirmed</h2>
                </div>
                <img id="confirm-img" src="./resources/images/happy.png">
                <a href="account.html">Check out your bookings here</a>
                <a href="account.html"><i id="calender-i" class="fa-solid fa-calendar-check"></i></a>
            </div>`
            document.querySelectorAll('.selected').forEach((btn) => {
                btn.classList.remove('selected');
            });
            serviceDateOptions.classList.add('hidden');
            serviceTimeOptions.classList.add('hidden');
            setTimeout(() => {
                serviceDateOptions.style.display = 'none';
                serviceCard.style.display = 'none';
                stepOne.style.display = 'none';
                serviceTimeOptions.style.display = 'none';
                serviceDateOptions.classList.remove('hidden');
                serviceTimeOptions.classList.remove('hidden');
                pendingBooking = null;
            }, 120);
        });
        resetBookingsBtn.addEventListener('click', (e) => {
            summary.style.display = 'none';
            renderServiceCards();
        });
    });

    const openingTime = 9 * 60;
    const closingTime = 17 * 60;
    const stepInterval = 30;


    function checkExistingBookings(dayOffset) {
        return existingBookings.filter(function (booking) {
            return booking.dayOffset === dayOffset;
        });
    };

    function getFreeTimes(duration, dayOffset) {
        const dayBookings = checkExistingBookings(dayOffset);
        const availableStarts = []
        for (let candidateStart = openingTime; candidateStart < closingTime; candidateStart += stepInterval) {
            const candidateEnd = candidateStart + duration
            if (candidateEnd > closingTime) {
                continue;
            }
            const hasOverlap = dayBookings.some((booking) => {
                return candidateStart < booking.end && candidateEnd > booking.start;
            });
            if (!hasOverlap) {
                availableStarts.push(candidateStart);
            }
        };
        return availableStarts;
    };

};

const savedRaw = localStorage.getItem('confirmedBooking');
const savedBooking = savedRaw ? JSON.parse(savedRaw) : null;
