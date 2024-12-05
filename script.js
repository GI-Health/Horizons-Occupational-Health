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
