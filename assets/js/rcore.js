var engineIsOn = false
//// Dynamic page stuff

function engineStart (withThis) {
	if (typeof(withThis) !== "undefined") {
		hijackLink(withThis)
	}
	engineIsOn = true
}

if (!engineIsOn) {
	var newPage
	var prevPage
	var tooltipIsLoaded = false
	var pageLoader = '<div class="page-loader"></div>'
	var xhr
	var comment
	var noCommentsElement
	var time
	// called when any link is clicked
	function hijackLink (link) {
		fetchPage (link)

	}

	// method to fetch page using ajax
	function fetchPage (page) {

		if (page !== location.href) {
			renderPage(pageLoader)
		}

		// stop previous xhr
		if (typeof(xhr) !== "undefined") {
			xhr.abort()
		}


		// ajax call
		var actualPage = page

		if (page == "http://localhost/idv/") {
			actualPage = "http://localhost/idv/vexations.php"

		} else {
			if (page == location.href) {
				return false
			}
		}

		if (/vexation-/.test(page)) {
			actualPage = "vexation.php?id="+page.split("-")[1]
		}

		if (/post/.test(page)) {
			newPage = page
			renderPage('<div class="nav"><a class= "back">← Back</a></div><div class="comments-card"><div class="comments-header">Post watin dey make you vex</div><textarea class="rant-box"></textarea><div class="secondary post-comment action-link" data-action="post">POST</div></div>')
			// unbind first !!!
			$(".dyna-link").unbind()
			initListeners()
			return true
		}



		xhr = $.ajax({url:actualPage, dataType: "text", accept: "text/html"}).done( function( pageData ) {
			console.log(actualPage)
			// remove loader
			$(".page-loader").hide()

			// load tooltip script
			if (tooltipIsLoaded == false) {
				var url = "http://localhost/idv/assets/js/kawo-tooltip.js"
				$.getScript(url)
				tooltipIsLoaded = true;
			}
			newPage = page

			renderPage(pageData)

			// unbind first !!!
			$(".dyna-link").unbind()
			initListeners()


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
		history.pushState(null, null, page)
		setBackButton()
	}

	function setBackButton () {
		$(".back").attr("href", prevPage)
	}

	function doAction (action, button) {




		// comment post action
		if (action == "post") {


				// get data for ajax
				var post = $(".rant-box").val().trim()
				var dateObject = new Date()
				var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    			var time = dateObject.getDate()+"."+month[dateObject.getMonth()]+"."+dateObject.getFullYear().toString().substr(2)+" "+dateObject.toString("hh:mm tt")


				// do ajax
				if (post !== "") {
					button.innerHTML = "Saving ..."
					$('.action-link').unbind()
					$.ajax({
					  type: "POST",
					  url: "../writes/submit-rant.php",
					  data: {content: post, time: time},
					  success: function(){


							$(".success.alert").text("Post saved").show().delay( 5000 ).fadeOut()
							button.innerHTML = "POST"
							$('.action-link').on("click", function(e) {
								doAction(this.getAttribute("data-action"), this)
								return false
							})

							renderPage('<div class="page-loader"></div>')

							fetchPage("http://localhost/idv/")

					  },

					  error: function (e) {

					  	$(".error.alert").text("Unable to save. Please try again").show().delay( 5000 ).fadeOut()

						$('.action-link').on("click", function(e) {
								doAction(this.getAttribute("data-action"), this)
								return false
							})
					  }
					})

				} else {
					$(".error.alert").text("Unable to save empty post. Please type a post and try again").show().delay( 5000 ).fadeOut()
				}

			}

		if (action == "comment") {


				// get data for ajax
				var comment = $(".rant-box").val().trim()
				var vexationid = $(".id").text()
				var dateObject = new Date()
				var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    			var time = dateObject.getDate()+"."+month[dateObject.getMonth()]+"."+dateObject.getFullYear().toString().substr(2)+" "+dateObject.toString("hh:mm tt")


				// do ajax
				if (comment !== "") {
					button.innerHTML = "Saving ..."
					$('.action-link').unbind()
					$.ajax({
					  type: "POST",
					  url: "writes/insert-comment.php",
					  data: {content: comment, time: time, vexationid: vexationid},
					  success: function(){

							$(".success.alert").text("Comment saved").show().delay( 5000 ).fadeOut()
							button.innerHTML = "POST"
							$('.action-link').on("click", function(e) {
								doAction(this.getAttribute("data-action"), this)
								return false
							})

							noCommentsElement = $('.no-comments')

							var newCommentElement = '<div class="comments-card pending">'+comment+' <span class="inside">'+time+'</span></div>';
							$('.comments').append(newCommentElement)
							var OldCommentsCount = parseInt($('.comment-count').text())
							var newCommentsCount  = OldCommentsCount + 1
							$('.comment-count').text(newCommentsCount)
								// check if it exits
							if (noCommentsElement !== false) {
								// change it
								noCommentsElement.remove()
							}
							$(".rant-box").val("")

					  },

					  error: function (e) {

					  	$(".error.alert").text("Unable to save. Please try again").show().delay( 5000 ).fadeOut()

						$('.action-link').on("click", function(e) {
								doAction(this.getAttribute("data-action"), this)
								return false
							})
					  }
					})

				} else {
					$(".error.alert").text("Unable to save empty comment. Please type a comment and try again").show().delay( 5000 ).fadeOut()
				}

			}
		}
	}




function initListeners() {
		engineStart()
		$('.dyna-link').on("click", function(e) {
			hijackLink(this.getAttribute("href"))
			return false
		})

		$('.action-link').on("click", function(e) {
			doAction(this.getAttribute("data-action"), this)
			return false
		})


}


// first initialization

$(document).ready(function() {
	$('a').on("click", function() {
		return false
	})
	initListeners()
	engineStart(location.href)
})


