



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
