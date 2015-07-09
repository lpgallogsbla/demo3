
var currentItem = null;

$.jStorage.set("items", []);

function addFakeItems() {
	var items = $.jStorage.get("items");
	
	items.push({nombre: "Item 1", descripcion: "El primer item"});
	items.push({nombre: "Item 2", descripcion: "Un item adicional"});
	
	$.jStorage.set("items", items);
}

function editar(id) {
	currentItem = getItem(id);
	
	if (currentItem) {
		$("#nombre").val(currentItem.nombre);
		$("#descripcion").val(currentItem.descripcion);
		$.mobile.navigate("#paginaFormulario");
	}
}

function getItem(id) {
	var item = null;
	var items = $.jStorage.get("items");
	
	for (var i = 0; i < items.length; i++) {
		if (items[i].id && parseInt(items[i].id) === parseInt(id)) item = items[i];
	}
	
	return item;
}

function goToFormulario() {
	currentItem = null;
	$("#nombre").val("");
	$("#descripcion").val("");
	$.mobile.navigate("#paginaFormulario");
}

function renderItems() {
	currentItem = null;
	var items = $.jStorage.get("items");
	
	$("#listadoItems").html("");
	
	items.forEach(function (item) {
		$("#listadoItems").append("<li><a href='javascript: editar("+ item.id +");'><h2>"+ item.id +" "+ item.nombre +"</h2><p>"+ item.descripcion +"</p></a></li>");
	});
	$("#listadoItems").listview("refresh");
}

function proximoId() {
	var items = $.jStorage.get("items"),
		maximoId = 0,
		itemId = null;

	for (var i = 0; i < items.length; i++) {
		if (items[i].id) {
			itemId = parseInt(items[i].id);
			if (itemId > maximoId) maximoId = itemId;
		}
	}
	
	return maximoId + 1;
}

function grabar() {
	var nombre = $("#nombre").val(),
		descripcion = $("#descripcion").val(),
		item = currentItem && currentItem.id ? getItem(currentItem.id) : null,
		items = $.jStorage.get("items");

	if (!item) {
		items.push({id: proximoId(), nombre: nombre, descripcion: descripcion});
	} else {
		item.nombre = nombre;
		item.descripcion = descripcion;
	}
	
	$.jStorage.set("items", items);
	
	renderItems();
	
	$.mobile.navigate("#paginaListado");
}

//addFakeItems();
renderItems();
