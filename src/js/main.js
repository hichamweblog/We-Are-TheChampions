// Imports
import { app } from '/src/js/firebase.js';
import {
	getDatabase,
	ref,
	push,
	onValue,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Firebase
const database = getDatabase(app);
const endorsementsInDB = ref(database, 'endorsements');

// DOM elements
const textEl = document.querySelector('.text');
const btnEl = document.querySelector('.btn');
const endorsementsWrapperEl = document.querySelector('.endorsements-wrapper');

// Event listeners
btnEl.addEventListener('click', addEndorsement);
textEl.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		addEndorsement();
	}
});

// Functions
function addEndorsement() {
	const text = textEl.value.trim();
	if (text === '') return;
	// Push endorsement to DB
	push(endorsementsInDB, text);
	clearTextEl();
}

function clearTextEl() {
	textEl.value = '';
	textEl.focus();
}
function clearEndorsementsWrapperEl() {
	endorsementsWrapperEl.innerHTML = '';
}
function updateUI(value) {
	const endorsementTxt = document.createElement('p');
	endorsementTxt.classList.add('endorsement_txt');
	endorsementTxt.textContent = value;
	endorsementsWrapperEl.appendChild(endorsementTxt);
}
// Get data from DB and update UI
onValue(endorsementsInDB, function (snapshot) {
	if (snapshot.exists() && snapshot.val() !== null) {
		const data = Object.values(snapshot.val());

		clearEndorsementsWrapperEl();
		if (data.length > 0) {
			data.forEach(function (endorsement) {
				updateUI(endorsement);
			});
		}
	} else {
		clearEndorsementsWrapperEl();
		endorsementsWrapperEl.innerHTML = `<p class="no-item">No endorsement... yet</p>`;
	}
});
