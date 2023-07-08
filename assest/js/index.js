const btn = document.getElementById('btngrabar');

btn.addEventListener('click', async function(e) {
  e.preventDefault();

  const url = 'controllers/tareas.php?op=__agregar';

  const tarea = document.getElementById('tarea').value;
  const descripcion = document.getElementById('descripcion').value;


  // Convertir param en FormData
  const formData = new FormData();
  formData.append('titulo', tarea);
  formData.append('contenido', descripcion);

  try{
        const resp = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: formData // Enviar formData como el cuerpo
        });
        if(resp.status){
            document.querySelector("#tareas").innerHTML="";
            getTareas();
        }

    } catch(error){
        console.log("Error al procesar "+error);
    }

});


async function getTareas(){
    try {
        let resp = await fetch("controllers/tareas.php?op=listarTareas");
        json = await resp.json();
        if(json.status){
            let data = json.data;
            data.forEach(item => {
                let newtr = document.createElement("tr");
                newtr.id = "row_"+item.id;
                newtr.innerHTML = `
                <tr>
                    <td>${item.id}</td> 
                    <td>${item.tarea}</td>
                    <td>
                    <a href="#" class="editar" data-id="${item.id}">Editar</a> |
                    <a href="#" class="eliminar" data-id="${item.id}">Eliminar</a>
                    </td>`;
                document.querySelector("#tareas").appendChild(newtr)
            });
        }
    } catch (error) {
        console.log("Ocurrio un error "+error);
    }
}

if(document.querySelector("#tareas")){
    getTareas();
}

// Eliminar
document.querySelector("#tareas").addEventListener("click", async function(e) {
  if (e.target.classList.contains("eliminar")) {
    e.preventDefault();
    
    // Pregunta de confirmación
    const confirmacion = confirm("¿Estás seguro de querer eliminar el registro?");
    
    if (confirmacion) {
        if (e.target.classList.contains("eliminar")) {
            e.preventDefault();
            const id = e.target.getAttribute("data-id");
            const Data = new FormData();
            Data.append('id', id);
            try {
              const resp = await fetch(`controllers/tareas.php?op=__eliminar`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: Data,
              });
              if (resp.status === 200) {
                const row = document.getElementById("row_" + id);
                row.parentNode.removeChild(row);
                //alert("Tarea eliminada con éxito.");
              } else {
                console.log("Error al eliminar la tarea.");
              }
            } catch (error) {
              console.log("Error al procesar " + error);
            }
          }
    }
  }
});

//editar tareas
  document.querySelector("#tareas").addEventListener("click", function(event) {
    if(event.target.classList.contains("editar")) {
      let tareaId = event.target.getAttribute("data-id");
      cargarDatosTarea(tareaId);
    }
  });


  async function cargarDatosTarea(tareaId) {
    const Data = new FormData();
    Data.append('id', tareaId);
    
    try {
      let resp = await fetch("controllers/tareas.php?op=__mostrarTarea", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: Data,
      });
      
      let json = await resp.json();
      
      if (json.status) {
        let data = json.data;
        if (data.length > 0) {
          let tarea = data[0];
          document.getElementById("tareatxt").value = tarea.titulo;
          document.getElementById("descripciontxt").value = tarea.descripcion;
          document.getElementById("idtxt").value = tarea.id;
  
          let modal = new bootstrap.Modal(document.querySelector("#editarTarea"));
          modal.show();
        } else {
          console.log("No se encontraron datos de tarea");
        }
      } else {
        console.log("Error en la respuesta del servidor");
      }
    } catch(error) {
      console.log(`Hubo un problema con el servidor: ${error}`);
    }
  }
  

  document.querySelector("#btneditar").addEventListener("click", async function() {
    // Realiza la lógica de edición aquí, por ejemplo:
    let tareaId = document.querySelector("#idtxt").value;
    let nuevaTarea = document.querySelector("#tareatxt").value;
    let nuevaDescripcion = document.querySelector("#descripciontxt").value;
    const data = new FormData();
    data.append('id', tareaId);
    data.append('tarea', nuevaTarea);
    data.append('descripcion', nuevaDescripcion);

    try {
        const resp = await fetch(`controllers/tareas.php?op=__editar`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          body: data,
        });
        if(resp.status){
            document.querySelector("#tareas").innerHTML="";
            getTareas();
        }
      } catch (error) {
        console.log("Error al procesar " + error);
      }
    
    // Cierra el modal
    let modal = bootstrap.Modal.getInstance(document.querySelector("#editarTarea"));
    modal.hide();
  });
  
  
  