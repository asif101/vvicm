function scrollTo(el) {
	target = document.getElementById(el)
	target.scrollIntoView({
		behavior: "smooth"
	});

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