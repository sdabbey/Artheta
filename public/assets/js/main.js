// SideNav trigger
let nav_trigger = document.querySelector('#nav-trigger');
let sidebar = document.querySelector('.sidebar');
let nav_item = document.querySelectorAll('.nav_list li')
nav_item.forEach(item => {
    item.addEventListener('click', () => {
        sidebar.classList.remove('active')
        nav_trigger.classList.remove('active')
    })
        
    }
);

nav_trigger.onclick = function() {
    sidebar.classList.toggle('active')
    nav_trigger.classList.toggle('active')
}


function smoothScrollTo(targetElement, duration = 800) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animationScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollProgress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutQuad(scrollProgress));
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animationScroll);
      }
    }
  
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
  
    requestAnimationFrame(animationScroll);
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.getElementById(this.getAttribute('href').substring(1));
      if (targetElement) smoothScrollTo(targetElement, 1000); // Adjust duration in milliseconds
    });
  });


  //Send Mail
document.getElementById('contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;
  const email = document.getElementById('email').value;

  try {
      const response = await fetch('/api/send_email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, message }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();
      alert(result.message);
      document.getElementById('contact-form').reset(); // Reset the form after successful submission

  } catch (error) {
      console.error('Error:', error);
      alert('There was a problem sending your message. Please try again later.');
  }
});