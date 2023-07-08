<?php

require_once 'tareas.php';

$tr = new Tareas();

$tr = $tr->mostrar_tarea_id(7);

print_r($tr);

?>