// This script is the engine of this application. We will have ajax posts and fetch done by this script
// I try my best to make this as simple as possible both for my future self and who ever may look at this in the future ...
// I also try my best to make this less boring ...
// Author: @the_ozmic
// Date Last Modified: today

var pageLoader

var isLoaded = false

// this variable is to store the previous url
var lastUrl
// adnd it's scroll position ...
var lastScrollPos = 0

// messages begin
var error

var success

var info
// messages end

var comment

var noCommentsElement

var wait = false

var time

var thisPage

$(document).ready(function() {
	thisPage = location.href
	// Save the page loader thingy
	pageLoader = $('.page-loader')

	// get error element
	error = $('.error.alert')

	// get success element
	success = $('.success.alert')

	// get info element
	info = $('.info.alert')

	// Checking to see if the page is the home page ... since this script will be included into various files

	if ((thisPage == "http://localhost/idv") || (thisPage == "http://localhost/idv/")) {
	// Now we use ajax to get all the vexations ...

		loadPage("vexations.php", ".page-content")
	}

	// Heads up, RegExp coming through ...
	// Checking to see if home page contains a hash string
	if (/http:\/\/localhost\/idv\/#/.test(thisPage)) {


		// Now we use ajax to get all the vexations ...
		loadPage("vexations.php", ".page-content", scrollTo)

	}

	// Checking to see if page is new-post
	if (/http:\/\/localhost\/idv\/p\/post/.test(thisPage)) {

		// prepare the id to be used in scrollTo function
		//lastScrollPos = "#"+thisPage.split("#")[1]

		// Now we use ajax to get all the vexations ...
		loadPage("http://localhost/idv/new-post.php", ".page-content")

	}



	showSingleVexation()

	setWindowScrollListener()



})


function showSingleVexation () {
	thisPage = location.href
	// Checking to see if home page contains a hash string
	if (/http:\/\/localhost\/idv\/vexation-/.test(thisPage)) {

		// Now we use ajax to get a single vexation
		loadPage("vexation.php?id="+thisPage.split("-")[1], ".page-content", validateLastVexClicked)

		// we change the contents of the address bar for obvious reasons
		pushHistory(thisPage)

	}
}

validateLastVexClicked = function () {
	// check if lastVexClicked is available to be accessed
		if (typeof(lastUrl) == "undefined") {
			$(".back").remove();
		}
}


// Function to get any page using ajax
function loadPage (pageName, putWhere, callBack) {
	// don't laugh at this ...
	var putHere = putWhere
	// show page Loader
	pageLoader.show()

	// ajax call

	$.ajax({url:pageName, dataType: "text", accept: "text/html"}).done( function( data ) {
		// remove loader
		pageLoader.hide()
		lastUrl = location.href
		// insert the data gotten
		if ($(putHere).text() !== data) {
			$(putHere).html("")
			$(putHere).html(data)
			//pushHistory(pageName)
		}



		// run the callBack funtion if there is one
		if (typeof(callBack) !== "undefined") {
			callBack()

		}

		// load tooltip script
		if (isLoaded == false) {
			var url = "http://localhost/idv/assets/js/kawo-tooltip.js"
			$.getScript(url)
			isLoaded = true;
		}



		// vital tool for setting all click listeners since page loades dynamically. We set the listeners when a new page is dynamically loaded
		setClickListeners()

	})
}

// Callback function to be ran after the vexations have been loaded to the index page via ajax
setVexClickListener = function () {
	$(".avexation").on("click", function(){
		// Show the page loader thingy
		$(".page-content").html(pageLoader);

		// we change the contents of the address bar for obvious reasons
		// make sure you pushHistory first before calling showSingleVexation method
		pushHistory(this.getAttribute("href"))

		// Now we use ajax to get a single vexation
		showSingleVexation()


		// prevent the browser from navigating to a diff page
		return false
	})
}

// Simple function to change contents of the address bar ...
function pushHistory (withWhat) {
	// don't laugh at this ...
	var withThis = withWhat
	history.pushState(null, null, withThis)
}

// Now we want to make the back button take the user to the index page and focusing/scrolling to the last clicked vexation post
// Callback function to be ran after the back button has been clicked
setBackClickListener = function () {
$(".back").on("click", function(){
		// Show the page loader thingy
		$(".page-content").html(pageLoader)

		// check if lastVexClicked is available to be accessed
		if (typeof(lastUrl) == "undefined") {
			$(".back").hide();
		}


		// Now we use ajax to get previous page
		//loadPage(lastUrl, ".page-content", scrollTo)

		// we change the contents of the address bar for obvious reasons
		//pushHistory(lastUrl)

		// prevent the browser from navigating to a diff page
		return false
	})
}

// submit comments
setCommentPostListener = function () {
	$(".post-comment").on("click", function(){

			comment = $(".rant-box").val().trim()
			var vexationid = $(".id").text()

			noCommentsElement = ""

			if ((comment.length > 0) && (vexationid.trim() !== "")) {
				// save the no comments comment card
				try {
					noCommentsElement = $('.no-comments')
				} catch (e) {
					noCommentsElement = false
				}

				// call doAjaxPost Method
				// check if there is a pending request
				if (wait == false) {
					wait = true
					var dateObject = new Date()
					var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    				time = dateObject.getDate()+"."+month[dateObject.getMonth()]+"."+dateObject.getFullYear().toString().substr(2)+" "+dateObject.toString("hh:mm tt")

					doAjaxPost("writes/insert-comment.php", {content: comment, vexationid: vexationid, time: time}, setResult)

				} else {
					info.text("Please wait ...").show().delay( 2000 ).fadeOut()
				}

			} else {

				error.text("Cannot post empty comments").show().delay( 2000 ).fadeOut()
			}
		})
}

// Listen for post button click

setPostClickListener = function () {
	$(".new-post").unbind("click")
	$(".new-post").on("click", function(){
		if (location.href !== "http://localhost/idv/p/post") {
			loadPage("new-post.php", ".page-content")
			// we change the contents of the address bar for obvious reasons
		}

		return false
	})
}

// Listen for scroll event

setWindowScrollListener = function () {
	$(window).on("scroll", function(){
		if (/http:\/\/localhost\/idv\/#/.test(thisPage)) {
			lastScrollPos = window.pageYOffset
			console.log("sCROLED - here")
		}

		if (location.href == "http://localhost/idv/") {
			lastScrollPos = window.pageYOffset
			console.log("sCROLED")
		}
	})
}

setClickListeners = function () {
	setBackClickListener()
	setVexClickListener()
	setCommentPostListener()
	setPostClickListener()
}

setResult = function (result) {
	wait = false
	if (result) {

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
					success.text("Comment successfully saved").show().delay( 2000 ).fadeOut()
				} else {
					//$('.comments').children()[$('.comments').children().length-1].remove()

					error.text("Error saving comment. Please try again").show().delay( 2000 ).fadeOut()
				}
}

scrollTo = function () {
	var here = lastScrollPos
	window.scrollBy(0, lastScrollPos)
	return true
}


function doAjaxPost (url, data, callBack) {
	// do ajax
	$.ajax({
	  type: "POST",
	  url: url,
	  data: data,
	  success: function(){
	  	if (typeof(callBack) !== "undefined") {

			callBack(true)
		}
	  },

	  error: function (e) {
	  	if (typeof(callBack) !== "undefined") {
			callBack(false)
		}
	  }
	})
}




