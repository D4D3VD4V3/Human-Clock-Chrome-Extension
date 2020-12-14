$(document).ready(function () {
	chrome.storage.sync.get(['user_mode', 'caption', 'dark'], function (result) {
		if (result.user_mode !== undefined)
			document.forms["form1"]["user_mode"].value = result.user_mode;
		else
			document.forms["form1"]["user_mode"].value = "Random";
		if (result.caption !== undefined)
			$('#caption').prop('checked', result.caption);
		else
			$('#caption').prop('checked', true);
		if (result.dark !== undefined)
			$('#dark').prop('checked', result.dark);
		else
			$('#dark').prop('checked', true);
	});
	
	
	$('#save').click(function () {
		var usermode = document.forms["form1"]["user_mode"].value;
		
		chrome.storage.sync.set({
			user_mode: usermode,
			caption: $('#caption').is(":checked"),
			dark: $('#dark').is(":checked")
		}, function () {
			console.log('User mode is set to ' + usermode);
		});
		
		
		$('#save').value = "Saved!";
	});
});