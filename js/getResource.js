function getResource() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {	// wait until server status is OK
			getRandomAgreementLine(xhr);
		}
		// [TODO] Hook progress bar from CSSTarget.js
		// [TODO] Error handling and fallbacks
		// [TODO] Package request as a callback?

	};
	
	xhr.open("GET", "xml/appleAgreement.xml", true); 		// should probably pass file name as a variable
	xhr.send();
	
	CSSTarget(document.getElementById("testing"), 10, 10,
    { // Small easing in from the top and from the left
      // Gives users feedback that their button pushing is doing stuff
      top: function(frame,time) { return frame*.3 + "px";},
      left: function(frame,time) { return frame*.55 + "px";},
    });
}