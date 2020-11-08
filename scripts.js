// set our variables
const sections = document.querySelectorAll('section');
const tocList = document.querySelector('.toc-list');

// loop through all the section elements on the page
for (i = 0; i < sections.length; i++) {
	
	// create the li element to add to the list
	const tocItem = document.createElement('li');

	// create the a element to add to the list
	const tocLink = document.createElement('a');

	// make sure the li element has the class
	tocItem.classList.add('toc-item');

	// append it to the list
	tocList.appendChild(tocItem);

	// now make the text in the a element match the h2 text
	tocLink.innerText = sections[i].querySelector('.section-heading').innerText;

	// make link of the toc item go to the section
	tocLink.href = `#${sections[i].id}`;

	// add the a element to the li element
	tocItem.appendChild(tocLink);

}

// set event listener for when the user scrolls
window.addEventListener('scroll', function(e) {
	const tocLinks = tocList.querySelector('a');

	// loop through all the section elements on the page as the user scrolls (possible performance issue? too many loops...)
	for (i = 0; i < sections.length; i++) {
		// if the section is within 15px of the top of the window
		if (window.pageYOffset > sections[i].offsetTop - 15) {
			// add class to the section at the top of the window
			sections[i].classList.add('active');

			// remove previous class & toc link active class from previous section if it exists
			if (typeof sections[i - 1] !== 'undefined') {
				sections[i - 1].classList.remove('active');	
				tocList.querySelector(`[href='#${sections[i - 1].id}']`).classList.remove('active');
				tocList.querySelector(`[href='#${sections[i - 1].id}']`).closest('.toc-item').classList.remove('active');
			}

			// add active class to toc link
			tocList.querySelector(`[href='#${sections[i].id}']`).classList.add('active');
			tocList.querySelector(`[href='#${sections[i].id}']`).closest('.toc-item').classList.add('active');

		} else {
			//remove class of the section if it's not within 15px of the top of the window
			sections[i].classList.remove('active');

			// remove active class on toc link
			tocList.querySelector(`[href='#${sections[i].id}']`).classList.remove('active');
			tocList.querySelector(`[href='#${sections[i].id}']`).closest('.toc-item').classList.remove('active');
		}
	}

	// add sticky to sidebar when it's sticky
	if (window.pageYOffset === tocList.offsetTop) {
		tocList.classList.add('sticky');
	} 
	else {
		tocList.classList.remove('sticky');
	}

});





