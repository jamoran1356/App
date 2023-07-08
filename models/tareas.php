<?php

require_once 'connect.php';

class Tareas {
    private $conexion;

    public function __construct(){
        $this->conexion = new ConexionBDD();
        $this->conexion = $this->conexion->connect();
    }

   
    public function agregar_tarea ($titulo, $contenido){
        $fecha = date('Y-m-d');
        $sql = "INSERT INTO tareas (tarea, descripcion, fecha_creado) VALUES (?,?,?)";
        $insert = $this->conexion ->prepare($sql);
        $Data = array($titulo, $contenido, $fecha);
        $excInsert = $insert->execute($Data);
        $Id = $this->conexion->lastInsertId();
        return $Id;
    }

    public function editar_tarea($id, $titulo, $contenido){
        $sql = "UPDATE tareas SET tarea = ?, descripcion = ? WHERE id = ?";
        $stmt = $this->conexion->prepare($sql);
        $data = $stmt->execute([$titulo, $contenido, $id]);
        return $data;
    }

    public function mostrar_tarea_id($id){
        $sql = "SELECT id as id, tarea as titulo, descripcion as descripcion FROM tareas WHERE id =? ";
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute([$id]);
        $data = $stmt -> fetchAll();
        return $data;
        
    }

    public function mostrar_tareas(){
        $sql = "SELECT * FROM tareas";
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        return $data;
        
    }

    public function eliminar_tarea($id){
        $sql = "DELETE FROM tareas  WHERE id = ?";
        $insert = $this->conexion ->prepare($sql);
        $result = $insert->execute([$id]);
        return $result;
    }

}



?>