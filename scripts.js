(function () {
	// Get relevant elements and collections
	var tabbed = document.querySelector('.tabbed');
	if (tabbed) {
		var tablist = tabbed.querySelector('ul');
		var tabs = tablist.querySelectorAll('a');
		var panels = tabbed.querySelectorAll('[id^="lsection"]');

		// The tab switching function
		var switchTab = function switchTab(oldTab, newTab) {
			newTab.focus(); // Make the active tab focusable by the user (Tab key)

			newTab.removeAttribute('tabindex'); // Set the selected state

			newTab.setAttribute('aria-selected', 'true');
			oldTab.removeAttribute('aria-selected');
			oldTab.setAttribute('tabindex', '-1'); // Get the indices of the new and old tabs to find the correct
			// tab panels to show and hide

			var index = Array.prototype.indexOf.call(tabs, newTab);
			var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
			panels[oldIndex].hidden = true;
			panels[index].hidden = false;
		};

		// Add the tablist role to the first <ul> in the .tabbed container
		tablist.setAttribute('role', 'tablist');

		// Add semantics are remove user focusability for each tab
		Array.prototype.forEach.call(tabs, function (tab, i) {
			tab.setAttribute('role', 'tab');
			tab.setAttribute('id', 'tab' + (i + 1));
			tab.setAttribute('tabindex', '-1');
			tab.parentNode.setAttribute('role', 'presentation'); // Handle clicking of tabs for mouse users

			tab.addEventListener('click', function (e) {
				e.preventDefault();
				var currentTab = tablist.querySelector('[aria-selected]');

				if (e.currentTarget !== currentTab) {
					switchTab(currentTab, e.currentTarget);
				}
			}); // Handle keydown events for keyboard users

			tab.addEventListener('keydown', function (e) {
				// Get the index of the current tab in the tabs node list
				var index = Array.prototype.indexOf.call(tabs, e.currentTarget); // Work out which key the user is pressing and
				// Calculate the new tab's index where appropriate

				var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;

				if (dir !== null) {
					e.preventDefault(); // If the down key is pressed, move focus to the open panel,
					// otherwise switch to the adjacent tab

					dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
				}
			});
		});

		// Add tab panel semantics and hide them all
		Array.prototype.forEach.call(panels, function (panel, i) {
			panel.setAttribute('role', 'tabpanel');
			panel.setAttribute('tabindex', '-1');
			var id = panel.getAttribute('id');
			panel.setAttribute('aria-labelledby', tabs[i].id);
			panel.hidden = true;
		});

		// Initially activate the first tab and reveal the first tab panel
		tabs[0].removeAttribute('tabindex');
		tabs[0].setAttribute('aria-selected', 'true');
		panels[0].hidden = false;
	}

	// meet the team js
	const teammembers = document.querySelectorAll('.meet-the-team-member.selectable')
	const teammemberDescriptions = document.querySelectorAll('.meet-the-team-description.selectable')
	if (teammembers) {
		teammembers.forEach(function(el) {
			el.addEventListener('click', function() {
				const name = el.getAttribute('data-teammember')
				teammembers.forEach(function(x) {
					if (x.getAttribute('data-teammember') === name)
						x.classList.add('selected')
					else x.classList.remove('selected')
				})
				//handling description switching
				let descriptionToDeselect = null
				let descriptionToSelect = null
				teammemberDescriptions.forEach(function(x) {
					if (x.getAttribute('data-selected') === 'true') descriptionToDeselect = x
					if (x.getAttribute('data-teammember') === name) descriptionToSelect = x
				})
				if (descriptionToDeselect !== descriptionToSelect) {
					descriptionToDeselect.setAttribute('data-selected', 'false')
					descriptionToSelect.setAttribute('data-selected', 'true')
					fadeOut(descriptionToDeselect, function() { fadeIn(descriptionToSelect, null, 150) }, 150)
				}
			})
		})
	}

})()

function scrollToSection(el) {
	var check = document.getElementById('burger');
	check.checked = false;
	target = document.getElementById(el)
	target.scrollIntoView({
		behavior: "smooth"
	});

}

//Dismiss alert banner
function dismissAlert() {
	var alert = document.getElementById('covid-alert');
	alert.style.display = 'none';
}

//Show statement modal
function showStatement() {
	var statement = document.getElementById('statement-modal');
	statement.classList.remove("closed");
}
function closeStatement() {
	var statement = document.getElementById('statement-modal');
	statement.classList.add("closed");
}

//Dismiss modal when clicking outside content
var statementContainer = document.getElementById('statement-modal');
var statementContent = document.getElementById('statement-content');
var learnMoreButton = document.getElementById('covid-button');
window.onclick = function (event) {
	if ((event.target != statementContent) && (event.target != learnMoreButton)) {
		statementContainer.classList.add("closed");
	}
}

//fade in and out functions
function fadeOut(element, callback, duration) {
	if (!element.style.opacity) element.style.opacity = 1
	const step = element.style.opacity * 20 / duration
	const animation = setInterval(function() {
		if (element.style.opacity > 0) element.style.opacity -= step
		else {
			element.style.opacity = 0
			clearInterval(animation)
			if (callback) callback()
		}
	}, 20)
}

function fadeIn(element, callback, duration) {
	if (!element.style.opacity) element.style.opacity = 0
	const step = 1 * 20 / duration
	const animation = setInterval(function() {
		if (element.style.opacity < 1) {
			element.style.opacity = parseFloat(element.style.opacity) + step
		}
		else {
			element.style.opacity = 1
			clearInterval(animation)
			if (callback) callback()
		}
	}, 20)
}