function getInfo(parsedJson, idx) {
	const baseURL = "https://photos.humanclock.com/";
	var imgURL = baseURL + parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["imgSizes"]["lg"]["basePath"];
	var imgCaption = parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["captionText"];
	var imgLocation = parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["moLocation"];
	var imgCreateDate = parsedJson["rd"]["data"][0]["images"]["imgData"][idx]["createDateStr"];
	var imgInfo = "";
	
	if (imgCaption)
		imgInfo += "Caption: " + imgCaption;
	if (imgLocation)
		imgInfo += "\nFrom: " + imgLocation;
	if (imgCreateDate)
		imgInfo += "\nOn: " + imgCreateDate;
	
	return {URL: imgURL, Caption: imgInfo};
}

function displayImg(parsedJson, idx = -1, numberOfImages = 1){
	if (numberOfImages == 1) {
		imgInfo = getInfo(parsedJson, idx);	
		$("#imagesgohere").prepend('<figure><img id="theImg" src=' + imgInfo["URL"] + ' /><figcaption>' + imgInfo["Caption"] + '</figcaption></figure>');
	}

	else {
		for (let i = 0; i < numberOfImages; i++) {
			imgInfo = getInfo(parsedJson, i);	
			$("#imagesgohere").prepend('<figure><img id="theImg" src=' + imgInfo["URL"] + ' /><figcaption>' + imgInfo["Caption"] + '</figcaption></figure>');
		}
	}
}


$(document).ready(function () {
	var userMode = "random";
	var timenow = new Date;
	date = timenow.getFullYear() + "-" + (timenow.getMonth() + 1) + "-" + timenow.getDate() + "-" + timenow.getHours() + "-" + timenow.getMinutes() + "-" + timenow.getSeconds();
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://humanclock.com/index.php?l=" + date
	}).done(function (parsedJson) {
		var numImages = Object.keys(parsedJson["rd"]["data"][0]["images"]["imgData"]).length
		chrome.storage.sync.get(['user_mode'], function (result) {
		if (result.user_mode !== undefined)
			userMode = result.user_mode;
		console.log(userMode);
		if (userMode == "random")
			displayImg(parsedJson, Math.floor(Math.random() * numImages))
		else if (userMode == "first")
			displayImg(parsedJson, 0)
		else if (userMode == "grid")	
			displayImg(parsedJson, idx = -1, numberOfImages = numImages)
		
		});

	//$("#loader").css("display", "none");
	//$("#content").css("display", "block");
		
	})
});