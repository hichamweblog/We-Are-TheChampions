import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

const firebaseConfig = {
	databaseURL: 'https://endorsements-f7a1d-default-rtdb.firebaseio.com/',
};

export const app = initializeApp(firebaseConfig);
