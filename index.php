<?php

require_once 'config.php';

// iniciamos la conexion con la base de datos
try{
	$pdo = new PDO( 
		'mysql:host=' . HOST . ';dbname=' . DBNAME, 
		USERNAME, 
		PASSWD,
		array(
			PDO::ATTR_PERSISTENT => false,
			PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
		)
	);
} catch (PDOException $e) {
	echo 'El sitio se encuentra fuera de servicio por un error interno. Disculpad las molestias.';
	die;
}

// definicion de variables
$url_datos = './xml/data/';

// elegir la pareja que se quiera importar
$materia   = 'filosofia';
$materia_h = 'Filosofía';
//~ $materia   = 'economia';
//~ $materia_h = 'Economía';
//~ $materia   = 'matematicas';
//~ $materia_h = 'Matemáticas';
//~ $materia   = 'fisica';
//~ $materia_h = 'Física';
//~ $materia   = 'quimica';
//~ $materia_h = 'Química';
//~ $materia   = 'biologia';
//~ $materia_h = 'Biología';
//~ $materia   = 'musica';
//~ $materia_h = 'Música';
//~ $materia   = 'ingles';
//~ $materia_h = 'Inglés';
//~ $materia   = 'lengua-y-literatura';
//~ $materia_h = 'Lengua y Literatura';
//~ $materia   = 'geografia';
//~ $materia_h = 'Geografía';
//~ $materia   = 'historia';
//~ $materia_h = 'Historia';

// cargamos el xml
try {
	$monografias = simplexml_load_file($url_datos.$materia.'.xml');
} catch (PDOException $e) {
	echo 'El sitio se encuentra fuera de servicio por un error interno. Disculpad las molestias.';
	die;
}

// funciones
function nombre_propiedad ($codigo, $legible=false) {
	$propiedades = array (
		0 => array('titulo',    'Título'),
		1 => array('subtitulo', 'Subtítulo'),
		2 => array('autor',     'Autor'),
		3 => array('anio',      'Año'),
		4 => array('numero',    'Número'),
		5 => array('signatura', 'Signatura'),
	);
	if ($legible === true)
		return $propiedades[$codigo][1];
	return $propiedades[$codigo][0];
}

// comenzamos la grabacion de datos
$i = 0;
foreach ($monografias as $monografia) {
	echo 'Insertando monografía ' . $i . '<br />';
	$propiedades = array();
	$j = 0;
	foreach ($monografia as $propiedad) {
		$aux = (string) $propiedad;
		$propiedad = trim(str_replace('&nbsp;','',$aux));
		if (!empty($propiedad)) {
			$propiedades[nombre_propiedad($j)] = $propiedad;
		} else {
			$propiedades[nombre_propiedad($j)] = '';
		}
		$j++;
	}
	$sql = 'INSERT INTO `sagasta_monografias`
				(`numero`, `titulo`, `subtitulo`, `autor`, `anio`, `categoria`, `signatura`) 
			VALUES 
				(:numero,   :titulo,  :subtitulo,  :autor,  :anio,  :categoria,  :signatura)';
	$stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$params = array (
		':numero'    => $propiedades[nombre_propiedad(4)],
		':titulo'    => $propiedades[nombre_propiedad(0)],
		':subtitulo' => $propiedades[nombre_propiedad(1)],
		':autor'     => $propiedades[nombre_propiedad(2)],
		':anio'      => $propiedades[nombre_propiedad(3)],
		':categoria' => $materia_h,
		':signatura' => $propiedades[nombre_propiedad(5)]
	);
	//var_dump($params);
	$stmt->execute($params);
	$i++;
}
