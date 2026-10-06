// Importes do Firebase
import { db } from "./firebase.js";
import { ref, onValue, push, set, remove } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// Importes do Cloudinary
import { uploadImage, uploadAudio } from "./cloudinary.js";

// Elementos da página
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const musicFormDiv = document.getElementById("musicFormDiv");
const musicForm = document.getElementById("musicForm");
const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const coverInput = document.getElementById("cover");
const audioInput = document.getElementById("audio");
const musicList = document.getElementById("musicList");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const audioPlayer = document.getElementById("audioPlayer");
let editingId = null;
let editingCover = null;
let editingAudio = null;

// Aparecer formulário
addBtn.addEventListener("click", () => {
    editingId = null;
    musicForm.reset();
    musicFormDiv.classList.add("active");
    editingId = null;
    editingCover = null;
    editingAudio = null;
});
cancelBtn.addEventListener("click", () => {
    musicFormDiv.classList.remove("active");
    musicForm.reset();
    let editingId = null;
    let capaUrl = editingCover;
    let audioUrl = editingAudio;
});

// Mandar músicas
const musicasRef = ref(db, "musicas");
musicForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = titleInput.value;
    const artista = artistInput.value;
    const capa = coverInput.files[0];
    const audio = audioInput.files[0];

    if (!titulo || !artista) {
        alert("Preencha título e artista!");
        return;
    }

    // Editar música
    if (editingId) {

        let capaUrl = editingCover;
        let audioUrl = editingAudio;


        if (capa) {
            capaUrl = await uploadImage(capa);
        }
        if (audio) {
            audioUrl = await uploadAudio(audio);
        }
        const musicaEditada = {
            titulo: titulo,
            artista: artista,
            capa: capaUrl,
            audio: audioUrl
        };

        const musicaRef = ref(db, `musicas/${editingId}`);
        await set(musicaRef, musicaEditada);
    }
    // Criar Música
    else {

        if (!capa || !audio) {
            alert("Selecione a capa e o áudio!");
            return;
        }

        const capaUrl = await uploadImage(capa);
        const audioUrl = await uploadAudio(audio);

        const novaMusica = {
            titulo: titulo,
            artista: artista,
            capa: capaUrl,
            audio: audioUrl
        };

        const novaMusicaRef = push(musicasRef);

        await set(novaMusicaRef, novaMusica);
    }

    musicForm.reset();
    musicFormDiv.classList.remove("active");

    editingId = null;
});

// Músicas do Firebase pro HTML
onValue(musicasRef, (snapshot) => {

    musicList.innerHTML = "";
    
    const musicas = snapshot.val();

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
            </button>
            <button class="deleteBtn">
                <i class="fa-solid fa-trash"></i>
            </button>
            <button class="editBtn">
                <i class="fa-solid fa-pen"></i>
            </button>`
        
        // Tocar música
        const playBtn = musicElement.querySelector(".playBtn");

        playBtn.addEventListener("click", () => {

            playerCover.src = musica.capa;
            playerCover.style.display = "block";

            playerTitle.textContent = musica.titulo;
            playerArtist.textContent = musica.artista;

            audioPlayer.src = musica.audio;
            audioPlayer.play();

        });

        // Excluir música
        const deleteBtn = musicElement.querySelector(".deleteBtn");

        deleteBtn.addEventListener("click", async () => {
            const confirmar = confirm(
                `Deseja realmente excluir "${musica.titulo}"?`
            );

            if (!confirmar) {
                return;
            }

            const musicaRef = ref(db, `musicas/${id}`);

            await remove(musicaRef);
        });

        // Editar música
        const editBtn = musicElement.querySelector(".editBtn");

        editBtn.addEventListener("click", () => {
            editingId = id;

            editingCover = musica.capa;
            editingAudio = musica.audio;
            titleInput.value = musica.titulo;
            artistInput.value = musica.artista;

            musicFormDiv.classList.add("active");
        });

        musicList.appendChild(musicElement);
    }
});