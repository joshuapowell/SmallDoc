/* Global Javascript
------------------------------------------------------------------------------------ */
$(document).ready(function() {
	console.log("jquery is ready");

	var storage = new SD_Storage();

	storage.listDocument();

	// Edit a document from the list
	$("#page-list ul li a").live('click', function () {

		var uuid = $(this).attr("id").replace("item_","");

		storage.editDocument(uuid);
	});

	// Create a new document
	$("#button-create").live('click', function () {
		storage.editDocument('make');
	});


	// Cancel the editing or creation of a document
	$("#button-cancel").live('click', function () {
		storage.cancelDocument();
	});


	// Save changes to the document
	$("#button-submit").live('click', function () {

		var uuid = $("#uuid").val();

		if (uuid) {
			storage.saveDocument(uuid, $("#title").val(), $("#body").val());
		} else {
			// Set the UUID value to make, grab the #title & #body values to save
			storage.saveDocument('make', $("#title").val(), $("#body").val());
		}
	});

	// Remove a document from the list
	$("#button-remove").live('click', function () {
		storage.removeDocument($("#uuid").val());
		storage.listDocument();
	});

});
