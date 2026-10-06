// Funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Dados do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyACtWjjRvNURVIsczrmcJZQ9imlCRXR_ok",
    authDomain: "evil-spotify-23805.firebaseapp.com",
    projectId: "evil-spotify-23805",
    storageBucket: "evil-spotify-23805.firebasestorage.app",
    messagingSenderId: "315444755252",
    appId: "1:315444755252:web:779c66a6fa1661aff4c361",
    databaseURL: "https://evil-spotify-23805-default-rtdb.firebaseio.com/"
};

// Inicialização
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

export { db, auth };