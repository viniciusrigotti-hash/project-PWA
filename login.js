// Importes do Firebase
import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// Elementos da página
const logInForm = document.getElementById("logInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

logInForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    const userRef = ref(db, `usuarios/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    if (userData.admin === true) {
        window.location.href = "./adminPanel.html";
    } else {
        window.location.href = "./home.html";
    }
    });