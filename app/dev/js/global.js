$(document).ready(function() {
	
	var delete_btn = 'show';
	var docFile = new Array;
    
    if (!localStorage.getItem('docFileCount')) {
    	$("ul.docList").after('<p class="first-time"><a href="#" id="addFirst"><span>+</span><br />Create your first note</p>');
    }

    for (i = 1; i <= localStorage.getItem('docFileCount'); i++) {

    	if (localStorage.getItem("doc" + i + "_title") != '' && localStorage.getItem("doc" + i + "_title") != 0 && localStorage.getItem("doc" + i + "_title") != "null") {
    		$("ul.docList").append('<li class="item_' + i + '"><a class="delete" id="delete_' + i + '" href="#"><img src="img/deleteButton.png" alt="delete" /></a><a class="item" id="item_' + i + '" href="#">' + localStorage.getItem("doc" + i + "_title") + '</a> </li>');
    	}

    }

    function loadDocData(id) {
    	
    	$("#existing").val(id);
    	$("#title").val(localStorage.getItem("doc" + id + "_title"));
    	$("#content").val(localStorage.getItem("doc" + id + "_content"));

    }

    $("#submit").click(function() {
    	
    	if ($("#existing").val()) {

    		var id = $("#existing").val();

    	} else {

    		var submitCount = localStorage.getItem('docFileCount');
    		var id = Number(submitCount) + 1;
    		
    		docFile[id] = "item_" + id; 

    		localStorage.setItem('docFileCount', docFile);
    	}

    		localStorage.setItem("doc" + id + "_title", $("#title").val());
    		localStorage.setItem("doc" + id + "_content", $("#content").val());
    						
    });
    
    $(".delete").click(function() {
    	var id = $(this).attr("id").replace("delete_","");
    	
/*
    	localStorage.removeItem("doc" + id + "_title");
    	localStorage.removeItem("doc" + id + "_content");
*/
		$("ul.docList li.item_" + id).fadeOut();
    });

    $("#delete").click(function() {
    	$(".delete").toggle();
    	    	
    	if (delete_btn == 'show') {
    		delete_btn = "hide";
    		$(this).text("Done");
    	} else {
    		delete_btn = "show";
    		$(this).text("Edit");
    	}
    });
    
    $("ul.docList li a.item").click(function () {
    	var id = $(this).attr("id").replace("item_","");
    	
    	$(".list,.edit,#addNew,#delete").toggle();
    	loadDocData(id);
    });
    
    $("#addNew,#addFirst").click(function() {
    	$(".list,.edit,#addNew,#delete").toggle();
    	$("#content,#title").val("");
    });
    
    $("#cancel").click(function() {
    	$(".list,.edit,#addNew,#delete").toggle();
    });

});

