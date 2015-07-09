
var apiURL = "http://192.168.1.172:4567/movimientos/9/2001-01-01/2015-12-31/0/100";
var listadoSelector = "#listadoAPI";

function getMovimientos(callback) {
	$.get(apiURL, function(data) {
		callback(data.result);
	});
}

function render() {
	var movimiento, i;
	
	$(listadoSelector).html("");
	
	getMovimientos(function (movimientos) {
		for (i = 0; i < movimientos.length; i++) {
			movimiento = movimientos[i];
			$(listadoSelector).append("<li><h2>"+ movimiento.mov_id +"</h2><p>"+ movimiento.mov_detalle +"</p></li>");
		}
		
		$(listadoSelector).listview("refresh");
	});
}
