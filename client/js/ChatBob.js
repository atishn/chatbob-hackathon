// App structure stuffs
// var structureJSON = require('ChatBobConversation.json');	// the json structure file
var structure;
var current = 0;
var userInputText = '';
var structureJSON = fetch('js/ChatBobConversation.json').then((response) => {
	response.json().then((data) => {
		structure = data; // JSON.parse(structureJSON);				// THIS parses the JSON into a javascript OBJECT
		console.log(data, structure);
		startApp();
	});
});

// UI stuffs
var chatWindow = document.querySelector('#chat');			// get reference to chat window
var inputFields = document.querySelectorAll('.user-input'); // all user input field types

/**
 * Creates a message element for a user with optional image
 * and posts it into the chat window.
 * @param {Object} message A message object
 */
function showMessage(message) {
	var message_el = document.createElement('div');
	message_el.classList.add(message.user);
	message_el.classList.add('user-message');

	if (message.text) {
		var span_el = document.createElement('span');
		span_el.innerHTML =  message.text;
		if (message.customInput === true ) {
			span_el.innerHTML = userInputText;
		}
		message_el.appendChild(span_el);
	}

	if (message.image) {
		var img_el = document.createElement('img');
		img_el.setAttribute('src', message.image);
		message_el.appendChild(img_el);
	}

	chatWindow.appendChild(message_el).scrollIntoView({block: "end"});
	step();
}

/**
 * Prepares to show next step either waiting with a timeout, or adding a prompt
 * and waiting for the user to trigger next step manually.
 */
function step() {
	var active = structure.messages[current];

	if (active.input === false) {
		setTimeout(() => {
			nextMessage();
		}, 2500);
	} else {
		displayInputType(active.input);
	}
}

/**
 * Jumps to the next message in the sequence.
 */
function nextMessage() {
	current++;

	if (current < structure.messages.length) {
		showMessage(structure.messages[current]);
	}
}

/**
 * Displays a specific dialogue for a given input type.
 * @param {string} inputType BEM style modifier for input type class selection
 */
function displayInputType(inputType) {
	var activeInputField = document.querySelector('.user-input--' + inputType);
	activeInputField.classList.add('active');
}

function clearInputFields() {
	for (var i =0; i < inputFields.length; i++) {
		inputFields[i].classList.remove('active');
	}
}

///////// START APP /////////
function startApp() {
	for (var i =0; i < inputFields.length; i++) {
		inputFields[i].querySelector('.trigger-next').addEventListener("click", (e) => {

			var parent =  e.target.parentNode;
			if (parent.classList.contains('input-text')) {
				var input = parent.querySelector('.chat-input');
				userInputText = input.value;
			}

			clearInputFields();
			nextMessage();
		});
	}

	// first, print first "text" from json
	showMessage(structure.messages[current]);
}
