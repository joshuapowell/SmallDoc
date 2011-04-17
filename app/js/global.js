/* Global Javascript
------------------------------------------------------------------------------------ */
$(document).ready(function() {
	console.log("jquery is ready");

	var storage = new SD_Storage();

	$("#button-add").click(function () {
		storage.createDocument($("#uuid").val(), $("#title").val(), $("#body").val());
	});

	$("#button-update").click(function () {
		storage.updateDocument($("#uuid").val(), $("#title").val(), $("#body").val());
	});

	$("#button-remove").click(function () {
		storage.removeDocument($("#uuid").val());
	});

	$("#button-view").click(function () {
		var uuid = '';
		storage.viewDocument(uuid);
	});

});
