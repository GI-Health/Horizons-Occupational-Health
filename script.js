



function toggleContent(id) {
	// Select all service content divs
	var contents = document.querySelectorAll('.service-content');

	// Loop through all service content divs
	contents.forEach(function(content) {
		// Hide any content that isn't the clicked one
		if (content.id !== id) {
			content.style.display = "none";
		}
	});

	// Toggle visibility of the clicked content
	var selectedContent = document.getElementById(id);
		if (selectedContent.style.display === "none" || selectedContent.style.display === "") {
			selectedContent.style.display = "block";
		} else {
			selectedContent.style.display = "none";
		}
}

function toggleMoreContent(id) {
	var content = document.getElementById(id);
	var moreLink = document.getElementById(id + '-link');
		if (content.style.display === "none" || content.style.display === "") {
			content.style.display = "block";
			moreLink.innerText = "less...";
		} else {
			content.style.display = "none";
			moreLink.innerText = "more...";
		}
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
    console.log('Button clicked'); // Debugging checkpoint
    navMenu.classList.toggle("hidden");
});

// Close the menu if the user clicks anywhere outside the menu or button
document.addEventListener("click", (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickInsideButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickInsideButton && !navMenu.classList.contains("hidden")) {
        navMenu.classList.add("hidden"); // Close the menu
    }
});

	const slideInTextElements = document.querySelectorAll('.feature-text');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
			}
		});
	}, {
		threshold: 0.1, // Trigger when 10% of the element is visible
	});

	slideInTextElements.forEach((el) => observer.observe(el));
	


// Listen for the form submission event
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form fields
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const phoneField = document.getElementById('phone');
  const messageField = document.getElementById('message');
  const feedback = document.getElementById('form-feedback'); // Element to display feedback messages

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const phone = phoneField.value.trim();
  const message = messageField.value.trim();

  // Clear previous invalid class
  nameField.classList.remove('invalid');
  emailField.classList.remove('invalid');
  phoneField.classList.remove('invalid');
  messageField.classList.remove('invalid');

  // Simple validation to ensure all fields are filled out correctly
  if (name && isValidEmail(email) && isValidPhone(phone) && message) {
    // Display success feedback
    feedback.style.color = 'green';
    feedback.textContent = 'Form submitted successfully!';
    feedback.style.display = 'block';

    // Call the function to submit the form to Google Forms using iframe
    handleFormSubmit();

  } else {
    // Show error feedback if validation fails
    feedback.style.color = 'red';
    feedback.textContent = 'Please fill out highlighted fields correctly.';
    feedback.style.display = 'block';

    // Highlight invalid fields in red
    if (!name) nameField.classList.add('invalid');
    if (!isValidEmail(email)) emailField.classList.add('invalid');
    if (!isValidPhone(phone)) phoneField.classList.add('invalid');
    if (!message) messageField.classList.add('invalid');
  }
});

// Function to validate email
function isValidEmail(email) {
  // Regular expression for basic email validation (requires both "@" and ".")
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function isValidPhone(phone) {
	// Array of valid prefixes
  const validPrefixes = [
  "101", "110", "701", "702", "703", "704", "705", "706", "707", "708",
  "709", "710", "711", "712", "713", "714", "715", "716", "717", "718",
  "719", "720", "721", "722", "723", "724", "725", "726", "727", "728",
  "729", "730", "731", "732", "733", "734", "735", "736", "737", "738",
  "739", "740", "741", "742", "743", "744", "745", "746", "747", "748",
  "750", "751", "752", "753", "754", "755", "756", "757", "758", "759",
  "760", "761", "762", "763", "764", "765", "766", "767", "768", "769",
  "770", "771", "772", "773", "774", "775", "776", "777", "778", "779",
  "780", "781", "782", "783", "784", "785", "786", "787", "788", "789",
  "790", "791", "792", "793", "794", "795", "796", "797", "798", "799",
  "201", "40", "41", "42", "43", "44", "45", "46", "50", "51", "52", "53", 
  "54", "55", "56", "57", "58", "59", "60", "61", "62", "64", "66", "67", 
  "68", "69",  "111","112", "113", "114", "115", "202", "203", "204", 
  "205", "206", "207", "208", "209",
];
  
  // Regex to validate structure
  const phoneRegex = /^(?:\+254|254|0)?[0-9]{9}$/;

  if (!phoneRegex.test(phone)) return false;

  const normalizedPhone = phone.replace(/^\+254|^254|^0/, "");
  const prefix = normalizedPhone.substring(0, normalizedPhone.length === 9 ? 3 : 2);

  return validPrefixes.includes(prefix);
}

// Function to handle form submission without redirect
function handleFormSubmit() {
  var form = document.getElementById("contact-form");
  event.preventDefault();

  // Create a hidden iframe to submit the form to Google Forms without redirecting
  var iframe = document.createElement("iframe");
  iframe.name = "hidden_iframe"; // The iframe name is used as the form's target
  iframe.style.display = "none"; // Hide the iframe
  form.target = "hidden_iframe"; // Set the form's target to the iframe

  // Append the iframe to the body of the document
  document.body.appendChild(iframe);

  // Submit the form
  form.submit();
  
  // Show a custom success message on the page
  document.getElementById("form-feedback").style.display = "block"; // Display the custom confirmation message
  
        // Optionally reset form fields after submission
  setTimeout(() => {
    form.reset(); // Reset form fields
    document.getElementById("form-feedback").style.display = "none"; // Display success message
  }, 2000);
}



