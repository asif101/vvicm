document.addEventListener('click', function(e) {
  
  
  if (e.target.tagName !== 'A') return;
  
  if ((e.target.href && e.target.href.indexOf('#') != -1) && ((e.target.pathname == location.pathname) || ('/' + e.target.pathname == location.pathname)) && (e.target.search == location.search)) {
			scrollAnchors(e, e.target); 
  }  
});

	
function scrollAnchors(e, respond = null) {
	// const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

function distanceToTop(el) { 
	return Math.floor(el.getBoundingClientRect().top); 
}

e.preventDefault();
var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
var targetAnchor = document.querySelector(targetID);
if (!targetAnchor) return;
var originalTop = distanceToTop(targetAnchor);
window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
var checkIfDone = setInterval(function() {
	var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
	if (distanceToTop(targetAnchor) === 0 || atBottom) {
		targetAnchor.tabIndex = '-1';
		targetAnchor.focus();

if ('history' in window) {

			window.history.pushState('', '', targetID);

} else {
window.location = targetID;

}

		clearInterval(checkIfDone);
	}
}, 100);
}


//Dismiss alert banner
function dismissAlert() {
	let alert = document.getElementById('covid-alert');
	alert.style.display = 'none';
  }
  
  //Show statement modal
  function showStatement() {
	let statement = document.getElementById('statement-modal');
	statement.classList.remove("closed");
  }
  function closeStatement() {
	let statement = document.getElementById('statement-modal');
	statement.classList.add("closed");
  }
  
  //Dismiss modal when clicking outside content
  let statementContainer = document.getElementById('statement-modal');
  let statementContent = document.getElementById('statement-content');
  let learnMoreButton = document.getElementById('covid-button');
  window.onclick = function(event) {
	if ((event.target != statementContent) && (event.target != learnMoreButton)) {
	  statementContainer.classList.add("closed");
	}
  }