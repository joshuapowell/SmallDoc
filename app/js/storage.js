/**
 * @file
 * Define our implementation of the HTML5 localStorage features
 */

(function($) {

	/**
	 * WARNING:
	 *
	 * Do not define an empty localStorage variable to use. It will
	 * break everything and make you very sad.
	 *
	 * var localStorage = ''; BAD
	 */
	
	
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
	 * Define the namespace to append to our UUID to ensure we
	 * are not pulling incorrect data.
	 *
	 * Handles the display of data being served to our edit & list
	 * pages and ensures we are only display application specific 
	 * document data.
	 */
	var documentNamespace = 'com.smalldoc.storage.';


	/**
	 * Define the various page variables
	 *
	 * Defines the pages of the application and the unique ID of
	 * each page, do be used for toggling between list & edit view
	 */
	var page = new Array(
		'#page-list',
		'#page-edit'
	);

	var pages = page.join(", ");


	/**
	 * Define the various form field variables
	 *
	 * Defines the fields of the application and the unique ID of
	 * each form field. Used for document editing & creation.
	 */
	var field = new Array(
		'#title',
		'#body',
		'#uuid'
	);

	var fields = field.join(", ");
	
	/**
	 * Define our SmallDoc Storage Object
	 * 
	 * @return
	 *   Checks if the browser being used supports the localStorage
	 *   features provided by HTML5. If it does, then it will send
	 *   us a message via the Javascript Console (e.g. Firebug for Firefox,
	 *   Web Inspector Console for Google Chrome & Safari)
	 */
	SD_Storage = function() {
	
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
	SD_Storage.prototype.saveDocument = function( uuid, documentTitle, documentBody ) {
	
		// Define Variables
		var getTime = jQuery.now();

		// Make double sure we have a UUID or else our data will be lost
		if (uuid == 'make') {
			var uuid_no = parseInt(localStorage.length);
			var setKey  = documentNamespace + uuid_no;
			var method  = 'created';
			this.setMessage('We are creating a new document');
		} else {
			var setKey = uuid;
			var method = 'updated';
			this.setMessage('We are editing an existing document');
		}

		if (!documentTitle) {
			documentTitle = "New Document " + uuid_no;
		}
	
		// Create a JSON object based on #title (documentTitle) & #body (documentBody)
    	var documentObjectStore = '{' +
    		'"title":"' + documentTitle + '",' +
    		'"body":"' + this.checkTextarea(documentBody) + '",' +
    		'"geo":"' + '' + '",' +
    		'"created":"' + getTime + '",' +
    		'"updated":"' + getTime + '"' +
    	'}';

		try {
    		// Save the UUID & JSON object to localStorage
    		localStorage.setItem(setKey, documentObjectStore);
			alert('Your document was successfully saved');
    	} catch (error) {
    		if (error == QUOTA_EXCEEDED_ERR) {
    			this.setMessage('Quota exceeded!');
    		}
    	}

		// If the document is new, then make sure to display it in the Document List view
		if (method == 'created') {
			$(page[0] + " ul").append('<li><a id="item_' + uuid_no + '" href="#">' + documentTitle + '</a></li>');
		}

		if (pages) {
			$(pages).toggle();
		}

		// Let us know our document is saved in the Javascript Console
    	this.setMessage("Document was " + method);
	}
	
	
	/**
	 * Cancel the editing of a document
	 *
	 * Return the user to the Document List screen and do not save
	 * the changes to the document being edited.
	 *
	 */
	SD_Storage.prototype.cancelDocument = function() {
		if (pages) {
			$(pages).toggle();
		}
	}


	/**
	 * Edit a document saved in localStorage
	 *
	 * Edit the data of an object, based on the UUID localStorage Key.
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
	SD_Storage.prototype.editDocument = function( uuid ) {

		// Make sure our pages show/hide appopriately
		if (pages) {
			$(pages).toggle();
		}

		if ( uuid != 'make' ) {
			// Retrieve all our data from the localStorage object & parse JSON to Javascript Array
			var note = jQuery.parseJSON(localStorage.getItem(documentNamespace + uuid));
	
			// Set a hidden field with the value of our UUID for proper saving
			$(field[2]).val(documentNamespace + uuid);

			// Set the page title to that of the document title
			$(page[1] + " header h1").text(note.title);

			// Set the form field defaults to that of the saved document
			$(field[0]).val(note.title);
			$(field[1]).val(note.body);
	
			// Let us know our document is saved in the Javascript Console
			this.setMessage(note.title + " has been loaded");
		} else {
			$(page[1] + " header h1").text('New Document');

			// Double check for empty form fields during creation
			$('form input, form textarea, form select').val("");
			$(field[2]).val('make');
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
			var confirmRemoval = confirm("Are you sure that you want to delete this document?");
			if (confirmRemoval == true) {
				localStorage.removeItem(uuid);
				this.setMessage("The document " + uuid + "was deleted.");
				if (pages) {
					$(pages).toggle();
				}
			}
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
	SD_Storage.prototype.listDocument = function() {

		var totalDocuments = localStorage.length, n = 0;

		if (totalDocuments <= 0) {
			this.setMessage("You haven't created any documents yet");
		} else {
			// Create an empty list
			$(page[0] + " header").after('<ul></ul>');

			for (n = 0; n <= totalDocuments; n++) {
	
	    		var note = jQuery.parseJSON(localStorage.getItem(documentNamespace + n));
	
				try {
	    			$(page[0] + " ul").append('<li><a id="item_' + n + '" href="#">' + note.title + '</a></li>');
				} catch (error) {
					this.setMessage(documentNamespace + n + ' is an empty document');
				}

	    	}
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
	 *   com.smalldoc.storage.00000000-0000-0000-0000-000000000000
	 */
	SD_Storage.prototype.createUUID = function() {
	
		var UUID = function() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
	
		return (UUID()+UUID()+"-"+UUID()+"-"+UUID()+"-"+UUID()+"-"+UUID()+UUID()+UUID());
	}


	/**
	 * Retrieve the GeoLocation of the user and save that data to their document
	 *
	 * @return
	 *   Generate a JSON object and save the current GeoLocation of the user
	 * @todo
	 *   Make this work. For more information:
	 *   @see http://html5demos.com/geo#view-source
	 */
	SD_Storage.prototype.getPosition = function( location ) {
		if (navigator.geolocation) {
			var geoDocument = '{"lat":"' + location.coords.latitude + '","long":"' + location.coords.longitude + '"}';
		}
	}


	/**
	 * Santize the string to ensure that line breaks & carriage returns are
	 * being handled properly, so that JSON has the ability to display them.
	 *
	 * @param text
	 *   The string of text to santize for JSON usage
	 * @return text
	 *   The final santized string ready for JSON usage
	 */
	SD_Storage.prototype.checkTextarea = function( text ) {

		text = text.replace("\r\n", "\n");
		text = text.replace("\r", "\n");

		// JSON requires new line characters be escaped
		return text.replace("\n", "\\n");
	}


})(jQuery);
