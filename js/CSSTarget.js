/**
 *
 * CSSTarget.js:
 * A Jquery-less framework to target CSS elements for animation
 * 
 * The CSS animation property isn't supported in lte IE 9
 * This script came about as a work around to issues with older browsers
 *
 * Values of animation objects will be defined with the same name as the CSS style property
 * Animations will run for the amount of time specified when the function is invoked
 * 
 * Each individual frame will be displayed once and only once during the animation
 *
 * To grab the element with id "greeting" and animate it for 50 frames  
 * for 50 milliseconds such that it slides in from the top and to the left:
 * CSSTarget(document.getElementById("greeting"), 50, 50,
 *		{ // The top and left attributes for EACH frame are:
 *			top: function(frame,time) { return frame*8 + "px";},
 *			left: function(frame,time) { return frame*8 + "px";}
 *		});
 *
 *
 **/

 function CSSTarget(targetedElement, numberOfFrames, timeForFrame, animation, itsOver) {
 	var frame = 0;	//current frame in animation [TODO] add support for keyframes
 	var time = 0;	//total time the animation took to run, useful for progress bars and load time

 	// Call displayNextFrame() every timeForFrame milliseconds, displaying each of the frames for the animation
 	var intervalId = setInterval(displayNextFrame, timeForFrame); // the function will be evoked once for each frame 

 	// Call to CSSTarget() returns
 	function displayNextFrame() {
 		if (frame >= numberOfFrames) {				// are we done yet?
 			clearInterval(intervalId);			// if we are done, stop calling
 			if (itsOver) itsOver(element);		// invoke itsOver function
 			return;								// and it's over!
 		} // end of displayNextFrame closure

 		// Loop through the css style properties defined in the animation objects
 		for(var cssprop in animation) {
 			// For each CSS property, call its animation function
 			// Current frame number and elapsed time are passed with the frame and time variables
 			// [TODO] Better error handling...silently breaking isn't exactly good enough!
 			try {
 				targetedElement.style[cssprop] = animation[cssprop](frame, time);
 			} catch(e) {}
 		}

 		frame++;				// move forward one frame
 		time += timeForFrame;	// Add the amount of time that passed for that frame
 		console.log(time);
 	}
 }
