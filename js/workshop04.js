
	showLibrary();
	var submitBtn = $("#submit");
	submitBtn.on("click", function (event) {
		event.preventDefault();
		addBook();
		$("#newBook")[0].reset();
		//https://stackoverflow.com/questions/8701812/clear-form-after-submission-with-jquery
	});


function showLibrary(){
	var onDone = showAllBooks;
	setAjax ("", $("#books").data("method"), {}, onDone);
}

function showAllBooks (jsonBooks) {
	$.each(jsonBooks, function(index, book) {
		if (!book) {
			return;
		}
		var bookDiv = $("<div>").addClass("bookEntry");
		var aBook = $("<p>").text(book.title).attr("data-method", "GET");
		var deleteBtn = $("<button>").text("delete").attr("id", "delete_book_" + book.id).attr("data-method", "DELETE").addClass("button");
		$("#books").append(bookDiv);
		bookDiv.append(aBook).append(deleteBtn);
		var aDiv = $("<div>").addClass("titles").addClass("hide");
		aBook.after(aDiv);
		aBook.on("click", function() {
			showABook(book.id, aDiv);
		});
		deleteBtn.on("click", function() {
			deleteBook(book.id);
		});
	});
}

function showABook(bookId, aDiv) {
	var onDone = function (jsonBook) {
					var aBook = aDiv.html($("<p>").text("id: " + jsonBook.id)
						.add($("<p>").text("title: " + jsonBook.title))
						.add($("<p>").text("author: " + jsonBook.author))
						.add($("<p>").text("isbn: " + jsonBook.isbn))
						.add($("<p>").text("type: " + jsonBook.type)));
					aDiv.toggleClass("hide");					
				};
	setAjax (bookId, aDiv.prev().data("method"), {}, onDone);
}

function addBook() {	
	var additionalData = JSON.stringify({
		"isbn": $("#isbn").val(),
		"title": $("#title").val(),
		"author": $("#author").val(),
		"publisher": $("#publisher").val(),
		"type": $("#type").val()
	});
	var onDone =  function () {
		$("#books").empty();
		showLibrary();
	};
	setAjax ("", $("#newBook").data("method"), additionalData, onDone)
}

function deleteBook(id) {
	var onDone = function () {
		$("#books").empty();
		showLibrary();
	};
	setAjax (id, $("#delete_book_" + id).data("method"), {}, onDone)
}

function setAjax(id, httpMethod, additionalData, onDone) {
	$.ajax({
		headers: { 
	        'Content-Type': 'application/json' 
	    },
		url: "http://localhost:8282/books/" + id,
		type: httpMethod,
		dataType: "json",
		data: additionalData,
	}).done(onDone);
}

