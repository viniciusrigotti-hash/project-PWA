// Importes do Firebase
import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// Elementos da página
const musicList = document.getElementById("musicList");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const audioPlayer = document.getElementById("audioPlayer");

const musicasRef = ref(db, "musicas");

// Músicas do Firebase pro HTML
onValue(musicasRef, (snapshot) => {
    const musicas = snapshot.val();

    // Limpa a lista UMA vez, antes do loop
    musicList.innerHTML = "";

    for (const id in musicas) {

        const musica = musicas[id];
        
        const musicElement = document.createElement("div");
        musicElement.classList.add("music");

        musicElement.innerHTML = `
            <img src="${musica.capa}" alt="Capa da música">

            <div class="musicInfo">
                <h3>${musica.titulo}</h3>
                <p>${musica.artista}</p>
            </div>

            <button class="playBtn">
                <i class="fa-solid fa-play"></i>
            </button>`

        //Tocar música
        const playBtn = musicElement.querySelector(".playBtn");

        playBtn.addEventListener("click", () => {

            playerCover.src = musica.capa;
            playerCover.style.display = "block";

            playerTitle.textContent = musica.titulo;
            playerArtist.textContent = musica.artista;

            audioPlayer.src = musica.audio;
            audioPlayer.play();

        });

        musicList.appendChild(musicElement);
    }
});
