function getFacebook() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {	// wait until server status is OK
			getRandomAgreementLine(xhr);
			// [FIXME] Add if statement here
			document.getElementById("instructions").style.display='none';
		}
		// [TODO] Hook progress bar from CSSTarget.js
		// [TODO] Error handling and fallbacks
		// [TODO] Package request as a callback?

	};

	xhr.open("GET", "http://7c17463f1596fe090e72-72cc7b7e3d1bfe016e789931389f4585.r49.cf2.rackcdn.com/xml/facebookAgreement.xml", true); 		// should probably pass file name as a variable
	xhr.send();
	
	CSSTarget(document.getElementById("testing"), 10, 10,
    { // Small easing in from the top and from the left
      // Gives users feedback that their button pushing is doing stuff
      top: function(frame,time) { return frame*.3 + "px";},
      left: function(frame,time) { return frame*.55 + "px";},
    });
}