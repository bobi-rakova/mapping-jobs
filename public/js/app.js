$(function(){
	function loadJosters() {
		$.get("/get-all", function(res, err){
			console.log(res)

			var jobs = []
			for(var i=0; i<res.length; i++)
				jobs.push(JSON.parse(res[i]))
			
			var objects = {items: jobs}
			var template = $('#template').html();
			// Mustache.parse(template);
			var rendered = Mustache.render(template, objects);
			$('#target').html(rendered);
		})

	  //var template = $('#template').html();
	  //Mustache.parse(template);   // optional, speeds up future uses
	  //var rendered = Mustache.render(template, {name: "Luke"});
	  //$('#target').html(rendered);
	}

	loadJosters()
})