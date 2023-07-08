<?php

require_once '../models/tareas.php';

if(empty($_REQUEST['op'])){
    echo "error en la solicitud";
} else {
    $option = $_REQUEST['op'];

    if ($option == "__agregar") {
        if (isset($_POST)) {
            // Receive the data from the form
            $titulo = trim($_POST['titulo']);
            $contenido = trim($_POST['contenido']);
    
            // Create a new News object
            $tarea = new Tareas();
    
            // Add the news to the database
            $rs = $tarea-> agregar_tarea($titulo, $contenido);
    
            // Check if the news was added successfully
            if ($rs > 0) {
                // The page was added successfully, so create a JSON response
                $arrResp = array('status' => true, 'msg' => 'SUCCESS');
                echo json_encode($arrResp);
            } else {
                // The page was not added successfully, so create a JSON response
                $arrResp = array('status' => false, 'msg' => 'ERROR');
                echo json_encode($arrResp);
            }
        }
    }

    if ($option == "__editar") {
        if (isset($_POST)) {
            // Receive the data from the form
            $id = trim($_POST['id']);
            $titulo = trim($_POST['titulo']);
            $contenido = trim($_POST['descripcion']);
    
            // Create a new News object
            $tarea = new Tareas();
    
            // Add the news to the database
            $rs = $tarea-> editar_tarea($id, $titulo, $contenido);
    
            // Check if the news was added successfully
            if ($rs > 0) {
                // The page was added successfully, so create a JSON response
                $arrResp = array('status' => true, 'msg' => 'SUCCESS');
                echo json_encode($arrResp);
            } else {
                // The page was not added successfully, so create a JSON response
                $arrResp = array('status' => false, 'msg' => 'ERROR');
                echo json_encode($arrResp);
            }
        }
    }

    if ($option == "__eliminar") {
        if (isset($_POST)) {
            // Receive the data from the form
            $id = trim($_POST['id']);
            // Create a new News object
            $tarea = new Tareas();
            $rs = $tarea->eliminar_tarea($id);
            // Check if the news was added successfully
            if ($rs) {
                // The page was added successfully, so create a JSON response
                $arrResp = array('status' => true, 'msg' => 'SUCCESS');
                echo json_encode($arrResp);
            } else {
                // The page was not added successfully, so create a JSON response
                $arrResp = array('status' => false, 'msg' => 'ERROR');
                echo json_encode($arrResp);
            }
        }
    }
    
    if ($option == "listarTareas") {
            // Receive the data from the form
            $tarea = new Tareas();
            // Add the news to the database
            $rs = $tarea-> mostrar_tareas();
    
            // Check if the news was added successfully
            //if (!empty($rs)) {
                // The page was added successfully, so create a JSON response
                $arrResp = array('status' => true, 'msg' => 'SUCCESS', 'data' => $rs);
                echo json_encode($arrResp);
            //} else {
                // The page was not added successfully, so create a JSON response
            //    $arrResp = array('status' => false, 'msg' => 'ERROR');
            //    echo json_encode($arrResp);
            //}
    }
    
    if ($option == "__mostrarTarea") {
        if (isset($_POST)) {
            // Receive the data from the form
            $id = trim($_POST['id']);
            // Create a new News object
            $tarea = new Tareas();
            $rs = $tarea->mostrar_tarea_id($id);
            // Check if the news was added successfully
            if ($rs) {
                // The page was added successfully, so create a JSON response
                $arrResp = array('status' => true, 'msg' => 'SUCCESS');
                echo json_encode($arrResp);
            } else {
                // The page was not added successfully, so create a JSON response
                $arrResp = array('status' => false, 'msg' => 'ERROR');
                echo json_encode($arrResp);
            }
        }
    }


}

?>