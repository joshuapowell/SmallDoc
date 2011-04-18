/* Global Javascript
------------------------------------------------------------------------------------ */
$(document).ready(function() {
	console.log("jquery is ready");

	var storage = new SD_Storage();

	storage.listDocument();

	$("#page-list ul li a").live('click', function () {

		var uuid = $(this).attr("id").replace("item_","");

		storage.editDocument(uuid);
	});

	$("#button-create").click(function () {
		storage.editDocument('make');
	});

	$("#button-cancel").click(function () {
		storage.cancelDocument();
	});

	$("#button-submit").click(function () {

		var uuid = $("#uuid").val();

		if (uuid) {
			storage.saveDocument(uuid, $("#title").val(), $("#body").val());
		} else {
			// Set the UUID value to make, grab the #title & #body values to save
			storage.saveDocument('make', $("#title").val(), $("#body").val());
		}
	});

	$("#button-update").click(function () {
		storage.updateDocument($("#uuid").val(), $("#title").val(), $("#body").val());
	});

	$("#button-remove").click(function () {
		storage.removeDocument($("#uuid").val());
	});

});
