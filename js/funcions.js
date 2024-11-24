let arrayNotes = [];

document.addEventListener("DOMContentLoaded", function () {

    let text = localStorage.getItem(localStorage.key("Nota"));
    var nota = JSON.parse(text);

    const inputNota = document.getElementById("buscarNota");
    const seccioNotes = document.getElementById("llistar-notes");

    // Funció per filtrar notes
    window.filtrarNotas = function () {
        const filtre = inputNota.value.toLowerCase();
        const notes = seccioNotes.getElementsByClassName("dades_nota");

        for (let i = 0; i < notes.length; i++) {
            const contingutNota = notes[i].textContent.toLowerCase();

            if (contingutNota.includes(filtre)) {
                notes[i].style.display = "";
            } else {
                notes[i].style.display = "none";
            }
        }
    };

    for (i = 0; i <= nota.length - 1; i++) {
        const obj = nota[i];
        arrayNotes.push({ data: obj.data, titol: obj.titol, contingut: obj.contingut });
    }

    mostrarNotes();
});

// Funció per crear una nova nota
function crearNovaNota() {
    window.location.href = "contingutNota.html";
}

// Función per guardar nota i tornar a inici
function enrereGuardar() {
    guardar_dades();
    window.location.href = "index.html";
}

//Funció per guardar dades
function guardar_dades() {
    let data = document.getElementById('data-hora').value;
    let titol = document.getElementById('titulo-nota').value;
    let contingut = document.getElementById('contenido-nota').value;

    const myObj = { data: data, titol: titol, contingut: contingut };
    arrayNotes.push(myObj);

    const myJSON = JSON.stringify(arrayNotes);
    localStorage.setItem("Nota", myJSON);
}


function mostrarNotes() {

    document.getElementById("notas").innerHTML =
        ` <div id="izquierda"></div>
            <div id="derecha"></div>`;

    let text = localStorage.getItem(localStorage.key("Nota"));
    var nota = JSON.parse(text);

    let indicarDireccio = true;

    for (i = 0; i <= nota.length - 1; i++) {
        const obj = nota[i];

        if (indicarDireccio) {
            document.getElementById("izquierda").innerHTML += `
                <div class="nota">
                    <h2>${obj.titol}</h2>
                    <p>${obj.contingut}</p>
                    <p id="temps">${obj.data}</p>
                </div>`
        } else {
            document.getElementById("derecha").innerHTML += `
                <div class="nota">
                    <h2>${obj.titol}</h2>
                    <p>${obj.contingut}</p>
                    <p id="temps">${obj.data}</p>
                </div>`
        }

        indicarDireccio = !indicarDireccio;

    }
}