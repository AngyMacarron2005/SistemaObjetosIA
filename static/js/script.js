document.addEventListener("DOMContentLoaded", () => {

    const inputImagen = document.getElementById("imagenInput");
    const preview = document.getElementById("preview");
    const boton = document.getElementById("btnAnalizar");
    const resultado = document.getElementById("resultado");


    // Verificación de elementos HTML
    if (!inputImagen || !preview || !boton || !resultado) {
        console.error("Error: No se encontraron todos los elementos HTML.");
        return;
    }



    // ============================
    // Vista previa de imagen
    // ============================

    inputImagen.addEventListener("change", function () {

        const archivo = this.files[0];

        if (!archivo) {

            preview.style.display = "none";
            return;

        }


        const reader = new FileReader();


        reader.onload = function (e) {

            preview.src = e.target.result;
            preview.style.display = "block";

        };


        reader.readAsDataURL(archivo);

    });





    // ============================
    // Analizar imagen
    // ============================

    boton.addEventListener("click", async () => {


        if (inputImagen.files.length === 0) {

            alert("Seleccione una imagen antes de analizar.");
            return;

        }



        const formData = new FormData();

        formData.append(
            "imagen",
            inputImagen.files[0]
        );



        resultado.style.display = "block";


        resultado.innerHTML = `

            <p class="cargando">
                Analizando imagen...
            </p>

        `;



        try {


            const respuesta = await fetch("/predecir", {

                method: "POST",
                body: formData

            });




            if (!respuesta.ok) {


                resultado.innerHTML = `

                    <p class="error">
                        Error del servidor (${respuesta.status})
                    </p>

                `;

                return;

            }





            const datos = await respuesta.json();



            console.log("Respuesta del servidor:", datos);




            if (!Array.isArray(datos)) {


                resultado.innerHTML = `

                    <p class="error">
                        Formato de respuesta incorrecto.
                    </p>

                `;

                return;

            }




            // Ordenar de mayor a menor probabilidad
            datos.sort(
                (a,b) => b.probabilidad - a.probabilidad
            );




            let html = `

                <h3>
                    Resultado del análisis
                </h3>

            `;




            datos.forEach(item => {


                let claseObjeto = item.clase
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");



                let colorClase = "general";



                if(item.detectado){


                    switch(claseObjeto){


                        case "celular":

                            colorClase = "celular";
                            break;



                        case "lentes":

                            colorClase = "lentes";
                            break;



                        case "cartera":

                            colorClase = "cartera";
                            break;



                        default:

                            colorClase = "general";

                    }


                }
                else{

                    colorClase = "no-detectado";

                }





                html += `


                    <div class="resultado-item ${colorClase}">


                        <h4>
                            ${item.clase}
                        </h4>



                        <p>

                            Probabilidad:

                            <strong>
                                ${item.probabilidad}%
                            </strong>

                        </p>




                        <p>

                            Estado:

                            <strong class="${item.detectado ? "detectado" : "no-detectado-text"}">

                                ${item.detectado ? "Detectado" : "No detectado"}

                            </strong>

                        </p>



                    </div>


                `;



            });




            resultado.innerHTML = html;




        } catch(error) {



            console.error("Error:", error);



            resultado.innerHTML = `


                <p class="error">

                    No fue posible conectar con el servidor.

                </p>


            `;


        }



    });



});