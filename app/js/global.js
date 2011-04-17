/* Global Javascript
------------------------------------------------------------------------------------ */
$(document).ready(function() {
	console.log("jquery is ready");

	var storage = new SD_Storage();

	$("#button-add").click(function () {
		storage.createDocument("SD_933823837478499", 'Proin quis tortor orci. Etiam at.', 'Aenean facilisis nulla vitae urna tincidunt congue sed ut dui. Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis quam. Morbi ac commodo nulla. In condimentum orci id nisl volutpat bibendum. Quisque commodo hendrerit lorem.');
	});

	$("#button-update").click(function () {
		storage.createDocument("SD_933823837478499", "The new title of my document");
	});

	$("#button-remove").click(function () {
		storage.removeDocument("SD_933823837478499");
	});

	$("#button-view").click(function () {
		storage.viewDocument("SD_933823837478499");
	});

});
