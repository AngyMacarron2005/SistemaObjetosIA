document.addEventListener("DOMContentLoaded", () => {

    const inputImagen = document.getElementById("imagen");
    const preview = document.getElementById("preview");
    const boton = document.getElementById("btnAnalizar");
    const resultado = document.getElementById("resultado");

    inputImagen.addEventListener("change", function () {

        const archivo = this.files[0];

        if (!archivo) return;

        const reader = new FileReader();

        reader.onload = function(e){
            preview.src = e.target.result;
            preview.style.display = "block";
        }

        reader.readAsDataURL(archivo);

    });

    boton.addEventListener("click", async () => {

        if(inputImagen.files.length===0){

            alert("Seleccione una imagen");

            return;

        }

        const formData = new FormData();

        formData.append("imagen", inputImagen.files[0]);

        resultado.innerHTML = "Analizando imagen...";

        const respuesta = await fetch("/predecir",{

            method:"POST",

            body:formData

        });

        const datos = await respuesta.json();

        let html = "<h3>Resultado</h3>";

        datos.forEach(item => {

            html += `
                <p>
                    <strong>${item.clase}</strong><br>
                    Probabilidad: ${item.probabilidad}%<br>
                    Detectado: ${item.detectado ? "✅ Sí" : "❌ No"}
                </p>
                <hr>
            `;

        });

        resultado.innerHTML = html;

    });

});