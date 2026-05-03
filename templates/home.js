// // const cards = document.querySelectorAll('.scrolling-container .event-card');
// // const container = document.querySelector('.scrolling-container');
// // const totalCards = cards.length;
// // let currentIndex = 0;

// // // Function to rotate events
// // function rotateEvents() {
// //     currentIndex = (currentIndex + 1) % totalCards;

// //     const newCards = [...Array(3).keys()].map(i => (currentIndex + i) % totalCards);
// //     const newHTML = newCards.map(i => cards[i].outerHTML).join('');

// //     container.innerHTML = newHTML;
// // }

// // // Start the rotation
// // setInterval(rotateEvents, 3000); // Rotate every 3 seconds

// let currentSlideIndex = 0;

// function showSlides() {
//     const slides = document.querySelectorAll('.scrolling-container');
//     const dots = document.querySelectorAll('.dot');

//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.transform = `translateX(-${currentSlideIndex * 100}%)`;
//     }

//     dots.forEach((dot, index) => {
//         dot.classList.remove('active');
//         if (index === currentSlideIndex) {
//             dot.classList.add('active');
//         }
//     });
// }

// function currentSlide(n) {
//     currentSlideIndex = n - 1;
//     showSlides();
// }

// // Initialize the first slide
// showSlides();


//Scroll our team to meet our team
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    fetch('/get-events')
        .then(response => response.json())
        .then(events => {
            const eventList = document.getElementById('event-list');
            let currentIndex = 0;
            let filteredEvents = events; // Initialize filtered events with all events

            // Function to filter events
            function filterEvents(category) {
                filteredEvents = category === 'all' ?
                    events :
                    events.filter(event => event.type === category);

                eventList.innerHTML = ''; // Clear existing events
                currentIndex = 0;

                filteredEvents.forEach((event, index) => {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event-item');
                    eventDiv.innerHTML = `
                        <div class="card_container">
                            <div class="event-image">
                                <img src="${event.image}" alt="${event.name}" />
                            </div>
                            <div class="event-details">
                                <h3>${event.name}</h3>
                                <p><strong>Start Date:</strong> ${new Date(event.start_date).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> ${new Date(event.end_date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> ${event.location}</p>
                                <p><strong>Description:</strong> ${event.description}</p>
                                <!-- Registration Form -->
                                <form id="register-form-${event.id}" action="/register" method="POST">
                                    <input type="hidden" name="name" value="<%= name %>">
                                    <input type="hidden" name="email" value="<%= email %>">
                                    <input type="hidden" name="category" value="${event.type}">
                                    <input type="hidden" name="event_id" value="${event.id}">
                                    <input type="hidden" name="event_description" value="${event.description}">
                                    <input type="hidden" name="event_start_date" value="${event.start_date}">
                                    <input type="hidden" name="event_last_date" value="${event.end_date}">
                                    <input type="hidden" name="event_image" value="${event.image}">
                                    <input type="hidden" name="event_name" value="${event.name}">
                                    <input type="hidden" name="event_location" value="${event.location}">
                                    <input type="hidden" name="event_email" value="${event.created_by_email }">
                                    <button type="submit" class="register-button">Register Now</button>
                                </form>
                            </div>
                        </div>
                    `;
                    eventList.appendChild(eventDiv);
                });

                updateSlider();
                updateSliderDots();
            }
            
            // Attach event listeners to filter buttons
            document.getElementById('filter-all').addEventListener('click', () => filterEvents('all'));
            document.getElementById('filter-seminar').addEventListener('click', () => filterEvents('seminar'));
            document.getElementById('filter-social').addEventListener('click', () => filterEvents('social'));
            document.getElementById('filter-education').addEventListener('click', () => filterEvents('education'));

            // Function to update slider position
            function updateSlider() {
                const eventItems = document.querySelectorAll('.event-item');
                const itemWidth = eventItems[0]?.offsetWidth || 0; // Width
                const newPosition = -currentIndex * itemWidth;
                document.getElementById('event-list').style.transform = `translateX(${newPosition}px)`;
            }

            // Function to handle next slide
            function nextSlide() {
                if (currentIndex < filteredEvents.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Go back to the first event
                }
                updateSlider();
                updateSliderDots();
            }

            // Function to handle previous slide
            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = filteredEvents.length - 1; // Go to the last event
                }
                updateSlider();
                updateSliderDots();
            }

            // Initialize event listeners for next and previous buttons
            document.getElementById('nextBtn').addEventListener('click', nextSlide);
            document.getElementById('prevBtn').addEventListener('click', prevSlide);

            // Function to update slider pagination dots
            function updateSliderDots() {
                const dotsContainer = document.getElementById('slider-dots');
                dotsContainer.innerHTML = '';
                filteredEvents.forEach((event, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('slider-dot');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateSlider();
                        updateSliderDots();
                    });
                    dotsContainer.appendChild(dot);
                });
            }

            // Initially display all events
            filterEvents('all');
        })
        .catch(error => console.error('Error fetching events:', error));
});

// Toggle Navbar for mobile
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarRight = document.querySelector('.navbar-right');
const closeButton = document.querySelector('.close-button');

navbarToggle.addEventListener('click', () => {
    navbarRight.classList.toggle('active');
});

closeButton.addEventListener('click', () => {
    navbarRight.classList.remove('active');
});

// FAQ Section Toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     // Get all FAQ question elements
//     const faqQuestions = document.querySelectorAll('.faq-question');

//     // Add click event listener to each FAQ question
//     faqQuestions.forEach(question => {
//         question.addEventListener('click', function() {
//             // Get the associated answer element (next sibling)
//             const answer = this.nextElementSibling;
            
//             // Toggle the active class on the question
//             this.classList.toggle('active');
            
//             // Toggle the visibility of the answer
//             if (answer.style.maxHeight) {
//                 answer.style.maxHeight = null;
//                 // Rotate the plus icon back
//                 const svg = this.querySelector('svg');
//                 svg.style.transform = 'rotate(0deg)';
//             } else {
//                 answer.style.maxHeight = answer.scrollHeight + "px";
//                 // Rotate the plus icon to make it a minus
//                 const svg = this.querySelector('svg');
//                 svg.style.transform = 'rotate(45deg)';
//             }
//         });
//     });
// });
