
/* Storage
------------------------------------------------------------------------------------ */

var localStorage;
var console_message = true;

function SD_Storage() {

	if (typeof(localStorage) == 'undefined') {
		return this.setMessage('Your browser does not support local storage');
	}

	this.setMessage("Storage is loaded");
}

SD_Storage.prototype.setMessage = function( message ) {
	if (console_message) {
		console.log(message);
	}
}

SD_Storage.prototype.createDocument = function( uuid, documentTitle, documentBody ) {
	if (uuid) {
		var documentStoreTitle = '{"title":"' + documentTitle + '"}';
		var documentStoreBody  = '"body":"' + documentBody + '"';
		var documentStoreObject = '{"title":"' + documentTitle + '"' + ',' + '"body":"' + documentBody + '"}';

		localStorage.setItem(uuid, documentStoreObject);
		this.setMessage("A new document was created");
	}
}

SD_Storage.prototype.updateDocument = function( uuid, documentData ) {
	if (uuid) {
		localStorage.setItem(uuid, documentData);
		this.setMessage(uuid + " was updated");
	}
}

SD_Storage.prototype.removeDocument = function( uuid ) {
	if (uuid) {
		localStorage.removeItem(uuid);
		this.setMessage("The document " + uuid + "was deleted.");
	}
}

SD_Storage.prototype.viewDocument = function( uuid ) {
	if (uuid) {
		var obj = jQuery.parseJSON(localStorage.getItem(uuid));
		this.setMessage("Content from " + obj.title + " > " + obj.body);
	}
}
