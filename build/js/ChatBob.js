
// App structure stuffs
// var structureJSON = require('ChatBobConversation.json');	// the json structure file
var structure, current;
var structureJSON = fetch('js/ChatBobConversation.json').then((response) => {
	response.json().then((data) => {
		structure = data; // JSON.parse(structureJSON);				// THIS parses the JSON into a javascript OBJECT
		current = structure;   // this "holds" the position in the "tree choices"
		startApp();
	});
});

// UI stuffs
var chatWindow = document.querySelector('#chat');			// get reference to chat window
var response = document.querySelector('#response');		// the user input field
var button = document.querySelector('#submit');				// the user input submit button


// THIS will update the user's position in the TREE
function updatePosition(choice) {
	current = current.next[choice];
	return current;
}

function showMessage(text) {
	var message = document.createElement('div');
	message.innerHTML =  text;  // "Hi there! I'm Little Bob!

	chatWindow.appendChild(message);
}

function getInput(e) {
	// do something. This will depend on where in the "structure" you are
	console.log(input.value);
}

function step() {

	// DO WE NEED A USER REPSONSE?
	if (current.needResponse || 			// if needResponse is true
		current.next.length > 1)  			// or, if there are multiple options
	{
		// await response
		console.log('do something');
		// listen for user input
		button.addEventListener('click', getInput);
	}  else {
	// OTHERWISE, WAIT AND SHOW NEXT
		button.removeEventListener('click', getInput);
		console.log('wait 2 seconds, then load next');
		setTimeout(() => {
			updatePosition(0);		// "0" index -- the only choice, here
			showMessage(current.text);
		}, 2000);
	}

	step();
};




///////// START APP /////////
function startApp() {

	// first, print first "text" from json
	showMessage(structure.text);
	step();
}
