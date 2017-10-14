(function() {
	'use strict';
	var storage, message, save, date, saveChanges, desc;
	
	storage = chrome.storage.local;
	message = document.querySelector('#message');

	save = document.querySelector('button.submit');
	date = document.querySelector('input[type="date"]');
	desc = document.querySelector('input.description');

	storage.get('countdown_info', function(obj) {
		if( obj.countdown_info.date.length > 1 ) {
			date.value = obj.countdown_info.date;
		}
		if( obj.countdown_info.desc.length > 1 ) {
			desc.value = obj.countdown_info.desc;
		}
	});

	saveChanges = function() {
		storage.set({'countdown_info': {'date': date.value, 'desc': desc.value }}, function() {
			message('<p>Saved</p>');
		});
	}

	message = function(msg) {
		var message = document.querySelector('.message');
		message.innerHTML = msg;
		setTimeout(function() {
			message.innerHTML = '';
		}, 1500);
	}

	save.addEventListener('click', saveChanges);

})();
