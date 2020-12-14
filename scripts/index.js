$(document).ready(function () {
	var timenow = new Date;
	date = timenow.getFullYear() + "-" + (timenow.getMonth() + 1) + "-" + timenow.getDate() + "-" + timenow.getHours() + "-" + timenow.getMinutes() + "-" + timenow.getSeconds();
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://humanclock.com/index.php?l=" + date
	}).done(function (parsedJson) {
		var imgURL = "https://photos.humanclock.com/" + parsedJson["rd"]["data"][0]["images"]["imgData"][0]["imgSizes"]["lg"]["basePath"];
		$('#imagesgohere').prepend('<img id="theImg" src=' + imgURL + ' />');
	})


});