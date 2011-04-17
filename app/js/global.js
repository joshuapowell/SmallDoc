/* Global Javascript
------------------------------------------------------------------------------------ */
$(document).ready(function() {
	console.log("jquery is ready");

	var storage = new SD_Storage();

	$("#button-submit").click(function () {
		// Set the UUID value to make, grab the #title & #body values to save
		storage.createDocument('make', $("#title").val(), $("#body").val());
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
