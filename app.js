const inputTarea = $("#input");
const cuadro = $("#cuadro");
const btn = $("#btn");
const spanTask = $("#no-task");
const divMensaje = $("#contenedor-mensaje");
let id = 1;
let hayTarea = false;

function agregarTarea(tarea) {
  id++;
  const divTarea = $("<div>").addClass("flex justify-between items-center mt-5 px-7 ").attr("data-id", id);
  const span = $("<span>").addClass("text-white text-lg").text(tarea);
  divTarea.append(span);

  const iconos = ["./img/papelera.svg", "./img/edit.svg"];
  const section = $("<section>").addClass("flex gap-3").append(
    iconos.map((icono) => {
      const div = $("<div>").addClass("flex justify-center items-center bg-gray-800 rounded-full p-2 hover:bg-gray-700 cursor-pointer");
      const img = $("<img>").attr("src", icono).addClass("h-7");
      if(icono === iconos[0]){
        div.addClass("borrar");
      } else{
        div.addClass("editar");
      }
      return div.append(img);
    })
  );
  divTarea.append(section);
  const hr = $("<hr>").addClass("h-px w-11/12 my-4 mx-auto").attr("data-id", id);
  if (!hayTarea) {
    cuadro.empty().append(divTarea, hr);
    hayTarea = true;
  } else {
    cuadro.append(divTarea, hr);
  }
}

function manejarClic() {
  const tarea = inputTarea.val().trim();
  if (tarea !== "") {
    agregarTarea(tarea);
    inputTarea.val("");
  }
}

btn.on('click', manejarClic);

cuadro.on('click', '.borrar', function() {
  const tareaAEliminar = $(this).closest("[data-id]");
  tareaAEliminar.next("hr").remove();
  tareaAEliminar.remove();
  if (cuadro.children().length === 0) {
    hayTarea = false;
    cuadro.empty().append(divMensaje, $("<hr>").addClass("h-px w-11/12 my-4 mx-auto"));
  }
});
