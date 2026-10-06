// Cloud name
const cloudName = "wn8esjpk";

// Upload presets
const imagePreset = "evil_spotify_covers";
const audioPreset = "evil_spotify_audios";

// Adicionar imagem
async function uploadImage(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", imagePreset);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    return data.secure_url;
}

// Adicionar áudio
async function uploadAudio(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", audioPreset);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    return data.secure_url;
}

// Exportar
export { uploadImage, uploadAudio };