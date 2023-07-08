<?php

require_once 'tareas.php';

$tr = new Tareas();

$tr = $tr->mostrar_tareas();

print_r($tr)

?>