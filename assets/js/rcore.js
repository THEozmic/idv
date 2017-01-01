//// Dynamic page stuff

function engineStart (with) {
	if (engineIsOn) {

	}
	var listenersIsInit = false
	var newPage
	var prevPage
	var tooltipIsLoaded = false
	// called when any link is clicked
	function hijackLink (link) {
		pageLoader.show()
		fetchPage (link)

	}

	// method to fetch page using ajax
	function fetchPage (page) {

		// ajax call

		$.ajax({url:pageName, dataType: "text", accept: "text/html"}).done( function( pageData ) {
			// remove loader
			pageLoader.hide()

			// load tooltip script
			if (tooltipIsLoaded == false) {
				var url = "http://localhost/idv/assets/js/kawo-tooltip.js"
				$.getScript(url)
				tooltipIsLoaded = true;
			}

			renderPage(pageData)
			initListeners()
			newPage = page

		})


	}

	// renders page gotten from ajax
	function renderPage (pageData) {
		// save previous page
		prevPage = location.href
		// push History
		pushHistory(newPage)
		// render the page

		$(".page-content").html(pageData)

	}

	function pushHistory (page) {
		// push History

		setBackButton()
	}

	function setBackButton () {
		backButton.attr("href") = prevPage
	}

	if (typeof(with) !== "undefined") {
		fetchPage(with)
	}

}




function initListeners() {

	if (!listenersIsInit) {

		$('.dyna-link').on("click" function() {

			enginStart()
			hijackLink(this.getAttribute("href"))
			return false

		})


	}

	listenersIsInit = true

}


// first initialization

$(document).ready(function() {
	initListeners()
	engineStart(location.href)
})
