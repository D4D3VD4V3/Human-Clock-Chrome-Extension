$(document).ready(function () {
	chrome.storage.sync.get(['user_mode'], function (result) {
		if (result.user_mode !== undefined)
			document.forms["form1"]["user_mode"].value = result.user_mode;
		else
			document.forms["form1"]["user_mode"].value = "Random";
	});
	
	$('#save').click(function () {
		var usermode = document.forms["form1"]["user_mode"].value;
		
		chrome.storage.sync.set({
			user_mode: usermode
		}, function () {
			console.log('User mode is set to ' + usermode);
		});
		$('#save').value = "Saved!";
	});
});