const btn = document.getElementById('btngrabar');

btn.addEventListener('click', async function(e) {
  e.preventDefault();

  const url = 'controllers/tareas.php?op=__agregar';

  const tarea = document.getElementById('tarea').value;
  const descripcion = document.getElementById('descripcion').value;

  const param = {
    tarea: tarea,
    descripcion: descripcion
  };

  console.log(param);
  try{
        const resp = await fetch(url, {
            type: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: param
        });
        json = await resp.json();
        console.log(resp.json);

    } catch(error){
        console.log("Error al procesar "+error);
    }

});

async function getTareas(){
    try {
        let resp = await fetch("controllers/tareas.php?op=listarTareas");
        json = await resp.json();
        console.log(json);
        if(json.status){
            let data = json.data;
            console.log(data);
            data.forEach(item => {
                let newtr = document.createElement("tr");
                newtr.id = "row_"+item.id;
                newtr.innerHTML = `
                <tr>
                    <td>${item.id}</td> 
                    <td>${item.tarea}</td>
                    <td>Editar  |  Eliminar</td>`;
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
