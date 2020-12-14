$(document).ready(function () {
	const baseURL = "https://photos.humanclock.com/";
	
	var timenow = new Date;
	date = timenow.getFullYear() + "-" + (timenow.getMonth() + 1) + "-" + timenow.getDate() + "-" + timenow.getHours() + "-" + timenow.getMinutes() + "-" + timenow.getSeconds();
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://humanclock.com/index.php?l=" + date
	}).done(function (parsedJson) {
		var numImages = Object.keys(parsedJson["rd"]["data"][0]["images"]["imgData"]).length
		for (let idx = 0; idx < numImages; idx++) {
			var imgURL = baseURL + parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["imgSizes"]["lg"]["basePath"];
			var imgCaption = parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["captionText"];
			var imgLocation = parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["moLocation"];
			var imgCreateDate = parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["createDateStr"];
			var imgInfo = "";
			if (imgCaption) {
				imgInfo += "Caption: " + imgCaption
			}
			if (imgLocation) {
				imgInfo += "\nFrom: " + imgLocation
			}
			if (imgCreateDate) {
				imgInfo += "\nOn: " + imgCreateDate
			}
			$("#imagesgohere").prepend('<figure><img id="theImg" src=' + imgURL + ' /><figcaption>' + imgInfo + '</figcaption></figure>');
		}
	//$("#loader").css("display", "none");
	//$("#content").css("display", "block");
		
	})
	


});