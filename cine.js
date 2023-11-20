
// Capturar los documentos del DOM
const contenedor = document.querySelector('.contenedor');

// Toma los asiento que no tengan la clase ocupado, se hace todo esto para que no tome los de la leyenda por eso hacemos  ".fila .asiento"
const asientos = document.querySelectorAll('.fila .asiento:not(.ocupado)');
// console.log(asientos);
const contador = document.getElementById('contador');
const total = document.getElementById('total');

// Captura pelicula
const peliculaSelect = document.getElementById('pelicula');

// Para tomar el valor de los options del select solo ponemos .value
let precioDelTicket = +peliculaSelect.value;
// console.log(precioDelTicket);
// console.log(typeof(precioDelTicket));

// Llenamos la interfaz de usuario
llenaUI();

function actualizaSeleccionAsientos(){
    // Cuando dos clases estan juntas en el query selector se toma como que tenga dos clases ( .fila > .asiento .seleccionado)
    const asientosSeleccionados = document.querySelectorAll('.fila .asiento.seleccionado');
    // console.log(asientosSeleccionados);

    // Spreed --> [...], toma elemento a elemento los elementos de la coleccion y los pone en la array que hemos creado luego la recorre con la funcion de array map y devuelve los indices de los asientos que iremos seleccionando
    // const asientosIndex = [...asientosSeleccionados].map(function(asiento){
    //     return [...asientos].indexOf(asiento);
    // });
    
    // Spreed --> [...], toma elemento a elemento los elementos de la coleccion y los pone en la array que hemos creado luego la recorre con la funcion de array map y devuelve los indices de los asientos que iremos seleccionando
    const asientosIndex = [...asientosSeleccionados].map((asiento) => [...asientos].indexOf(asiento));
    // console.log(asientosIndex);

    // Seteamos los datos con el JSON.stringify para que se guarde como un objeto(Array)
    localStorage.setItem('asientosSeleccionados', JSON.stringify(asientosIndex));

    // cuenta cuantos asientos seleccionados hay y cambia el contador de asientos seleccionados por los que conto
    const contadorAsientosSeleccionados = asientosSeleccionados.length;
    contador.innerText = contadorAsientosSeleccionados;

    total.innerText = contadorAsientosSeleccionados * precioDelTicket;
}

// recupera del local storage y los carga 
function llenaUI(){
    const asientosSeleccionados = JSON.parse(localStorage.getItem('asientosSeleccionados'));
    
    // Siempre compara el primero contra null SIEMPRE sino explota
    if(asientosSeleccionados !== null && asientosSeleccionados.length > 0){
        // Recorro los asientos y si alguno de los asientos tiene el mismo index que asientosSeleccionados le agrega la clase seleccionado
        asientos.forEach((asiento, index) => {
            if(asientosSeleccionados.indexOf(index) > -1 ){
                asiento.classList.add('seleccionado');
            }
        });
    }

    const indexPeliculaSeleccionada = localStorage.getItem('indexPeliculaSeleccionada');

    if(indexPeliculaSeleccionada !== null){
        peliculaSelect.selectedIndex = indexPeliculaSeleccionada;
    }

    const precioPeliculaSeleccionada = localStorage.getItem('precioPeliculaSeleccionada');

    if(precioPeliculaSeleccionada !== null){
        precioDelTicket = +precioPeliculaSeleccionada;
    }

}

/*
    EVENTOS
*/
// Con el target me devuelve el div o elemento
contenedor.addEventListener('click', (e) => {
    // console.log(e.target);

    // 
    if(e.target.classList.contains('asiento') && !e.target.classList.contains('ocupado')){
        // console.log("Hola asiento");
        // Toggle permuta entre un estado y otro, da una clase si doy click en este caso y si presiono de nuevo la quita
        e.target.classList.toggle('seleccionado');
        // Guarda los asientos seleccionados en una coleccion
        actualizaSeleccionAsientos();
    }
});

peliculaSelect.addEventListener('change', (e) => {
    precioDelTicket = +e.target.value;
    // console.log(precioDelTicket);
    localStorage.setItem('indexPeliculaSeleccionada', e.target.selectedIndex);
    localStorage.setItem('precioPeliculaSeleccionada', e.target.value);

    actualizaSeleccionAsientos();
});

actualizaSeleccionAsientos();