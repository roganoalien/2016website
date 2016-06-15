<?php
	$theString = $_POST['mensaje'];
	$theString = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $theString);
	mail("hola@rodrigogarcia.com.mx", "Sitio Web | Portafolio", $theString);
?>