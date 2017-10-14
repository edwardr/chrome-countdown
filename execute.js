(function() {
	'use strict';
	var storage, message, clock, targetDate, optionsURL, optionLink,
	close, closeModal, descSec;
	
	storage = chrome.storage.local;
	message = document.querySelector('#message');
	close = document.querySelector('.close');

	optionsURL = chrome.extension.getURL('options.html');
	optionLink = document.querySelector('.options-link').href = optionsURL;

	storage.get('countdown_info', function(obj) {
		clock = document.getElementById('countdown-holder');
		descSec = document.querySelector('.description-holder');

		if( obj.countdown_info == undefined ) {
			clock.innerHTML = 'Please visit the settings page to set your date.';
		} else {
			if( obj.countdown_info.date.length > 1 ) {
				targetDate = new Date(obj.countdown_info.date);
				clock.innerHTML = countdown(targetDate).toString();
				if( obj.countdown_info.desc.length > 1 ) {
					descSec.innerText = ' until ' + obj.countdown_info.desc;
				}
				setInterval(function() {
					clock.innerHTML = countdown(targetDate).toString();  
				}, 1000);
			} else {
				clock.innerHTML = 'Please visit the settings page to set your date.';
			}
		}

	});

	closeModal = function() {
		window.close();
	}

	close.addEventListener('click', closeModal);

})();