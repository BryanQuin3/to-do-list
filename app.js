const inputTarea = $("#input");
const cuadro = $("#cuadro");
const btn = $("#btn");
const spanTask = $("#task");
let id = 1;

function agregarTarea(tarea) {
  id++;
  const divTarea = $("<div>").addClass("flex justify-between items-center mt-5 px-7 ").attr("data-id", id);
  const span = $("<span>").addClass("text-white text-lg").text(tarea);
  divTarea.append(span);

  const section = $("<section>").addClass("flex gap-3");
  const iconos = ["./img/papelera.svg", "./img/edit.svg"];
  iconos.forEach((icono) => {
    const div = $("<div>").addClass("flex justify-center items-center bg-gray-800 rounded-full p-2 hover:bg-gray-700 cursor-pointer");
    const img = $("<img>").attr("src", icono).addClass("h-7");
    if(icono == iconos[0]){
        div.addClass("borrar");
    } else{
        div.addClass("editar");
    }
    div.append(img);
    section.append(div);
  });
  if (spanTask.text() === 'First task') {
    spanTask.text(tarea); 
  } else {
    divTarea.append(section);
    const hr = $("<hr>").addClass("h-px w-11/12 my-4 mx-auto").attr("data-id", id);;
    cuadro.append(divTarea).append(hr);
  }
}

function manejarClic() {
  const tarea = inputTarea.val().trim();
  if (tarea !== "") {
    agregarTarea(tarea);
    inputTarea.val("");
  }
}

btn.click(manejarClic);


cuadro.on('click', '.borrar', function() {
  // Encuentra la tarea correspondiente
  const tareaAEliminar = $(this).closest("[data-id]");
  tareaAEliminar.remove();
  // Encuentra el hr correspondiente a la tarea
  const linea = cuadro.find(`hr[data-id='${tareaAEliminar.data('id')}']`);
  linea.remove();
});
