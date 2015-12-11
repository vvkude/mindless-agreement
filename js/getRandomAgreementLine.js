/**
 *
 * getRandomAgreementLine.js:
 * Loads an XML file of snippets built from splitting various companies' privacy agreements by new lines 
 * No PHP is used, so there is no access to string(ucfirst) or passing DOM elements to &attr->nodeName;
 *
 * This script is good for testing when clients don't know what type of server they are going to use
 * (whether it will support PHP or not) and also while testing CORS and cross-server issues with iframes
 *
 * The largest hurdle here is that JavaScript doesnt have unicode support for RegExes! OUCH!
 * This means that if strings are preceded by symbols, functions and prototypes like toUpperCase() won't work
 * Formatting and styling will have to be built into the XML or possibly through Python modules
 * Also, the XML itself will most likely have to be built by python 
 * See comments in the XML files, but lines are split with:
 *  ^ beginning of string anchor
 * 	$ end of string anchor
 * 	\s whitespace character class
 * 	* is zero-or-more repetition of
 * 	m is the multiline modifier, characters only match string-beginnings OR endings
 * 	\r - only covers mac line endings! gahhhhh!
 * 
 * So, check for lines like, "B)You owe us your firstborn" or asterisks, such as, "*We own all of your data, sucker"
 *
 * [TODO] prototype a titlecase capitalization function
 * [TODO] Add sanity checking
 * [TODO] Make a better random - maybe use Chance.js
 * [TODO] Make a better safegaurd against against displaying the same random AGREEMENTSNIPPET twice in a row
 * [TODO] ADD ARIA attributes explictly when function writes to innerHTML
 * [TODO] Incorporate weights when displaying AGREEMENTSNIPPETS
 * [TODO] If I added checksums, could I enforce greater variatino in AGREEMENTSNIPPETS displayed?
 * [TODO] Make more TODO's
 *
 */

function getRandomAgreementLine(xml) {									// invoked by getResource.js when server OK
	var i;
	var j= 0;															// index for checking which company the agreement belongs to
	var lastRandomNumber = 0;											// for ensuring the same random number isn't pulled twice in a row
	var xmlInfo = xml.responseXML;										// XML data response object
	var lenXML = xmlInfo.length; 										// Total number of XML objects
	var catalog = xmlInfo.getElementsByTagName("CATALOG");				// reusable access to the overall CATALOG node object from the XML file
	var s = xmlInfo.getElementsByTagName("AGREEMENTSNIPPET");			// reusable access to AGREEMENTSNIPPET node objects from the XML file
	var c = xmlInfo.getElementsByTagName("COMPANY");					// reusable access to the COMPANY node object from the XML file
	var source = xmlInfo.getElementsByTagName("SOURCE");

	var lenSnippets = s.length;											// Total number of agreement snippets, specifically
	var randomNodeNumber = Math.floor( Math.random() * lenSnippets);	// Random number between 0 and the total number of snippets

	// Call for a random AGREEMENTSNIPPET from the COMPANY'S CATALOG in the XML file
	var randomSnippet = catalog[0].getElementsByTagName("AGREEMENTSNIPPET")[randomNodeNumber].childNodes[0].nodeValue;
	console.log(lenSnippets);
	console.log(randomNodeNumber);
	var companyName = c[0].childNodes[0].nodeValue;
	
	/**
	 * The full access path is :: xml.responseXML.getElementsByTagName("CATALOG")[0].getElementsByTagName("AGREEMENTSNIPPET")[randomNodeNumber].childNodes[0].nodeValue
	 *
	 * To condense it a little bit:
	 *
	 * catalog[0].getElementsByTagName("AGREEMENTSNIPPET")[randomNodeNumber].childNodes[0].nodeValue;
	 *
	 */


	var table = "<p>" + randomSnippet + "</p>";
	var table3 = "<h3>From the" + " " + companyName + " " + source[randomNodeNumber].childNodes[0].nodeValue + " " + "agreement</h3>";
	var allSnippets = xmlInfo.getElementsByTagName("SNIPPET");	// So, this is an Object NodeList that represents all of the SNIPPETS
	console.log(randomNodeNumber);
	//var randomSnippet = allSnippets[randomNodeNumber].childNodes[randomNodeNumber].nodeValue; // Get a random SNIPPET node from the XML file
	/*for (i = 0; i < xmlInfo.length; i++) {
		table += "<tr>From the<td> " + source[0].childNodes[0].nodeValue + " " + "agreement..."
		s[i].getElementsByTagName("SNIPPET")[0].childNodes[0].nodeValue +
		"</td><td>" +
		s[i].getElementsByTagName("AGREEMENTSNIPPET")[0].childNodes[0].nodeValue +
		"</td></tr>";
		
	}*/

	// Named table because the original idea was to display the data in a table
	// However, table cells don't wrap and the layout was a DISASTERRRRrrr
	//document.getElementById("s"pecial").innerHTML = table;
	/* I don't want this element to take up the same space when it is hidden */
	
	CSSTarget(document.getElementById("instructions"), 10, 10,
    { // Small easing in from the top and from the left
      // Gives users feedback that their button pushing is doing stuff
      top: function(frame,time) { return frame*.3 + "px";},
      left: function(frame,time) { return frame*.55 + "px";},
    });


	document.getElementById("COA").style.visibility='visible';
	document.getElementById("testing").innerHTML = table;

	/**
	 *
	 * The same ID that displays the agreement is ultimately handled by CSSTarget.js so, 
	 * when the algorithm is more complex there is a seperate function that keeps track of  
	 * load time and encapsulates the easing of the display/
	 *
	 * Ultimately, visibility should be handled by a separate function or method so the
	 * data displayed can be sanitized to prevent any injection or confused deputy attacks
	 *
	 */

	

	/*document.getElementById("special").innerHTML = table2;*/
	document.getElementById("source").innerHTML = table3;
}
