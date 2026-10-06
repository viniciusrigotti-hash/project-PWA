// Importes do Firebase
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// Elementos da página
const signInForm = document.getElementById("signInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmedPassword = confirmPasswordInput.value;

    if (password !== confirmedPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve possuir pelo menos 6 caracteres.");
        return;
    }

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    await set(ref(db, `usuarios/${user.uid}`), {
        email: user.email,
        admin: false
    });

    window.location.href = "./index.html";
});