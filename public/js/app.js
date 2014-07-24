$.post( "/add-new", { 
	name: $("#name").val(), 
	email: $("#email").val(),
	title: $("#title").val(),
	description: $("#description").val(),
	skillset: $("#skillset").val()
} );