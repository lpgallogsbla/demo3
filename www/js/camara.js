
function onSuccess(imageData) {
	$("#listadoFotos").append("<li><img src='data:image/jpeg;base64,"+ imageData +"' /></li>");
}

function onFail(message) {
	alert('Failed because: ' + message);
}

function tomarFoto() {
	navigator.camera.getPicture(onSuccess, onFail, {quality: 50, destinationType: Camera.DestinationType.DATA_URL, targetWidth: 100, targetHeight: 100});
}
