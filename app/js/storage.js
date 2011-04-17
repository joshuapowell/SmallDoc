/**
 * @file
 * Define our implementation of the HTML5 localStorage features
 */

/**
 * Define an empty localStorage variable for us to use.
 */
var localStorage;


/**
 * Define the console_message variable
 *
 * Handles the display of messages sent to the console
 * via the functions in this document. If this is set
 * to true then we will always display console messages. The on
 * state or true state is primarly used for development and
 * should be set to false before deploying the application.
 */
var console_message = true;


/**
 * Define our SmallDoc Storage Object
 * 
 * @return
 *   Checks if the browser being used supports the localStorage
 *   features provided by HTML5. If it does, then it will send
 *   us a message via the Javascript Console (e.g. Firebug for Firefox,
 *   Web Inspector Console for Google Chrome & Safari)
 */
function SD_Storage() {

	if (typeof(localStorage) == 'undefined') {
		return this.setMessage('Your browser does not support local storage');
	}

	this.setMessage("Storage is loaded");
}


/**
 * Create a log message to display in the Javascript Console
 * 
 * @param (string) message
 *   A string to be displayed in the Javascript Console
 * 
 * @return console.log
 *   Checks if the console_message's are enabled. If console_message
 *   is set to true, then the message set the 'message' parameter will
 *   be display in the Javascript Console for debug purposes.
 */
SD_Storage.prototype.setMessage = function( message ) {
	if (console_message) {
		console.log(message);
	}
}


/**
 * Create a new document object and save it to localStorage
 *
 * Create a new document object that is based off of data
 * form the form page's #title input text form field and the
 * #body textarea.
 *
 * @param (string) UUID
 *   A UUID for our document, See SD_Storage.prototype.createUUID
 *   for more information about UUID's set via Javascript
 * @param (string) documentTitle
 *   The title of the document being created, this is set in the
 *   #title input text field on the form page
 * @param (string) documentBody
 *   The body of the document being created, this is set in the
 *   #body textarea on the form page
 * @return
 *   No real return, but the action will be that a localStorage
 *   object will be created with the UUID as the localStorage Key
 *   and the data will be compiled & stored as a JSON object
 *   as the localStorage Value
 */
SD_Storage.prototype.createDocument = function( uuid, documentTitle, documentBody ) {

	if (uuid == 'make') {
		// Create a new UUID for this document
		this.createUUID();
	}

	// Make double sure we have a UUID or else our data will be lost
	if (uuid) {
		// Create a JSON object based on #title (documentTitle) & #body (documentBody)
		var documentObject = '{"title":"' + documentTitle + '","body":"' + documentBody '"}';

		// Save the UUID & JSON object to localStorage
		localStorage.setItem(uuid, documentObject);

		// Let us know our document is saved in the Javascript Console
		this.setMessage("A new document was created");
	}

}


/**
 * Update a document saved in localStorage
 *
 * Update the data of an object, based on the UUID localStorage Key.
 * As with viewDocument, we will be saving our data in JSON format
 * so that the data retains a usable structure.
 *
 * @param (string) UUID
 *   A UUID for our document, See SD_Storage.prototype.createUUID
 *   for more information about UUID's set via Javascript
 * @param (string) documentTitle
 *   The title of the document being created, this is set in the
 *   #title input text field on the form page
 * @param (string) documentBody
 *   The body of the document being created, this is set in the
 *   #body textarea on the form page
 * @return
 *   Again no return, but the action will be that a localStorage
 *   object will be updated that matches the UUID provided in the
 *   parameter, and document data will be compiled & stored as a
 *   JSON object as the localStorage Value
 */
SD_Storage.prototype.updateDocument = function( uuid, documentTitle, documentBody ) {

	// Make double sure we have a UUID or else our data will be lost
	if (uuid) {
		// Create a JSON object based on #title (documentTitle) & #body (documentBody)
		var documentObject = '{"title":"' + documentTitle + '","body":"' + documentBody '"}';

		// Save the UUID & JSON object to localStorage
		localStorage.setItem(uuid, documentObject);

		// Let us know our document is saved in the Javascript Console
		this.setMessage(documentTitle + " was updated");
	}

}


/**
 * Remove a document saved in localStorage
 *
 * Remove the Key/Value pair from localStorage, based on the UUID
 * provided as the parameter.
 *
 * @param (string) UUID
 *   A UUID for our document, See SD_Storage.prototype.createUUID
 *   for more information about UUID's set via Javascript
 * @return
 *   @todo
 *      Determine if a deletion notifcation is necessary. From standard
 *      Apple best practices, I believe there is no physical on-screen
 *      notification, it simply disappears from the screen once removal
 *      has been confirmed by the user.
 */
SD_Storage.prototype.removeDocument = function( uuid ) {
	if (uuid) {
		localStorage.removeItem(uuid);
		this.setMessage("The document " + uuid + "was deleted.");
	}
}


/**
 * Retreive a document saved in localStorage
 *
 * Retreive the data of an object, based on the UUID localStorage Key,
 * to display it on-screen. We save our data in JSON format so that we
 * retain a usable structure. Once the object is fetched, the Value which
 * contains JSON is parsed into an array that is usable by Javascript.
 *
 * @param (string) UUID
 *   A UUID for our document, See SD_Storage.prototype.createUUID
 *   for more information about UUID's set via Javascript
 * @return
 *   @todo
 *      Determine how we are going to return this value .. array? HTML?
 */
SD_Storage.prototype.viewDocument = function( uuid ) {
	if (uuid) {
		var doc = jQuery.parseJSON(localStorage.getItem(uuid));
		this.setMessage("Content from " + doc.title + " > " + doc.body);
	}
}


/**
 * Create a UUID or a Universally Unique Indentifier for our document
 *
 * Create a UUID for identifying our documents and keeping them in order.
 * There is a catch to using UUID's soley in Javascript, that catch is, well
 * since UUID's really depend upon the a local computer to generate authenitcally
 * unique numbers, and browser cannot provide that functionality. The upside is
 * that this generator will create a random 20 character hex value, this greatly
 * lowers are probability of duplication.
 * 
 *
 * @return
 *   Generates a random 20 character hex string in the format of:
 *   00000000-0000-0000-0000-000000000000
 */
SD_Storage.prototype.createUUID() {

	var UUID = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};

	return (UUID()+UUID()+"-"+UUID()+"-"+UUID()+"-"+UUID()+"-"+UUID()+UUID()+UUID());
}


