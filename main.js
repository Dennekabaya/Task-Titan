// Select elements
const statContainer = document.querySelector('.stat-container');
const leftButton = document.querySelector('.slider-btn.left');
const rightButton = document.querySelector('.slider-btn.right');
const statItems = document.querySelectorAll('.stat');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

let currentIndex = 0;
const statWidth = statItems[0].offsetWidth + 32; // Item width + gap
const totalItems = statItems.length;
let autoSlideInterval;

// Function to update the slider's position
function updateSlider() {
  statContainer.style.transform = `translateX(-${currentIndex * statWidth}px)`;
}

// Function to move slider automatically
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems; // Loop back to the start
    updateSlider();
  }, 3000); // Slide every 3 seconds
}

// Stop slider on interaction
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Restart auto-slide after idle time
function restartAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Move Right
rightButton.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = (currentIndex + 1) % totalItems; // Loop back to start
  updateSlider();
  restartAutoSlide();
});

// Move Left
leftButton.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Loop back to the end
  updateSlider();
  restartAutoSlide();
});

// Stop auto-slide when any stat item is clicked
statItems.forEach((item) => {
  item.addEventListener('click', () => {
    stopAutoSlide();
  });
});

// Toggle mobile navigation on hamburger click
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('active'); // Show/hide the mobile nav
});

// Handle window resize
window.addEventListener('resize', () => {
  updateSlider();
});

// Start auto-slide on page load
startAutoSlide();
const heroHeading = document.querySelector('.hero h1');
const currentTime = new Date().getHours();

if (currentTime < 12) {
  heroHeading.innerHTML = 'Good Morning, <span>HUMANGPT</span> <span class="emoji">☀️</span>!';
} else if (currentTime < 18) {
  heroHeading.innerHTML = 'Good Afternoon, <span>HUMANGPT</span> <span class="emoji">🌤️</span>!';
} else {
  heroHeading.innerHTML = 'Good Evening, <span>HUMANGPT</span> <span class="emoji">🌙</span>!';
}

const emojiSpan = document.querySelector('.emoji');
const emojis = ['🤖', '🚀', '🌟', '🔥', '💡'];
const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
emojiSpan.textContent = randomEmoji;

// Get elements
const todayList = document.getElementById('today-schedule-list');
const monthlyList = document.getElementById('monthly-targets-list');
const showMoreToday = document.getElementById('show-more-today');
const showMoreMonthly = document.getElementById('show-more-monthly');

// Number of visible tasks
const maxVisible = 3;

// Hide extra tasks initially
function limitTasks() {
  // Limit Today's Schedule tasks
  const todayTasks = todayList.querySelectorAll('li');
  todayTasks.forEach((task, index) => {
    if (index >= maxVisible) {
      task.style.display = 'none';
    }
  });

  // Limit Monthly Targets tasks
  const monthlyTasks = monthlyList.querySelectorAll('li');
  monthlyTasks.forEach((task, index) => {
    if (index >= maxVisible) {
      task.style.display = 'none';
    }
  });
}

// Function to show more tasks with sliding effect
function slideUpTasks(list, button) {
  const hiddenTasks = list.querySelectorAll('li[style="display: none;"]');
  hiddenTasks.forEach((task, index) => {
    setTimeout(() => {
      task.style.display = 'list-item'; // Reveal the task
      task.classList.add('slide-up'); // Add slide-up effect class
    }, index * 100); // Stagger the reveal slightly
  });

  button.style.display = 'none'; // Hide the button after showing all tasks
}

// Event listeners for show more buttons
showMoreToday.addEventListener('click', () => slideUpTasks(todayList, showMoreToday));
showMoreMonthly.addEventListener('click', () => slideUpTasks(monthlyList, showMoreMonthly));

// Initial setup
limitTasks()


document.addEventListener('DOMContentLoaded', () => {
  const calendarDays = document.querySelector('.calendar-days');
  const monthYearElement = document.querySelector('.month-year');
  const prevMonthButton = document.querySelector('.prev-month');
  const nextMonthButton = document.querySelector('.next-month');
  const deadlineInfoSection = document.querySelector('#deadline-info');
  const deadlineDescription = document.querySelector('#deadline-description');

  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Example deadlines (This can be dynamically generated or fetched from an API)
  const deadlines = [
    { day: 12, month: 11, year: 2024, description: 'Task Deadline for Project Alpha' },
    { day: 18, month: 11, year: 2024, description: 'Project Milestone for Beta Testing' }
  ];

  // Render the calendar
  renderCalendar(currentYear, currentMonth, currentDay, deadlines);

  // Event listeners for buttons
  prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth, currentDay, deadlines);
  });

  nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth, currentDay, deadlines);
  });

  function renderCalendar(year, month, today, deadlines) {
    // Update month-year display
    monthYearElement.textContent = `${getMonthName(month)} ${year}`;

    // Clear previous days
    calendarDays.innerHTML = '';

    // Get the first day of the month and how many days are in the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Add empty spaces for the start of the month
    const startingDay = firstDay.getDay(); // Get the starting weekday (0-6)
    for (let i = 0; i < startingDay; i++) {
      const emptyCell = document.createElement('div');
      calendarDays.appendChild(emptyCell);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('calendar-day');
      
      // Highlight today
      if (i === today && month === currentMonth && year === currentYear) {
        dayCell.classList.add('today');
      }

      // Mark deadlines
      const deadline = deadlines.find(d => d.day === i && d.month === month && d.year === year);
      if (deadline) {
        dayCell.classList.add('has-deadline');
        dayCell.setAttribute('data-day', i);
        dayCell.setAttribute('data-month', month);
        dayCell.setAttribute('data-year', year);
        dayCell.setAttribute('data-description', deadline.description);
      }

      dayCell.textContent = i;
      calendarDays.appendChild(dayCell);

      // Add click event to show the deadline details
      dayCell.addEventListener('click', (e) => {
        const day = e.target.getAttribute('data-day');
        const month = e.target.getAttribute('data-month');
        const year = e.target.getAttribute('data-year');
        const description = e.target.getAttribute('data-description');

        // Show the deadline information
        if (description) {
          deadlineDescription.textContent = `Deadline: ${description}`;
        }
      });
    }
  }

  function getMonthName(monthIndex) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }
});