var sdk = require('require-sdk')('https://www.youtube.com/iframe_api', 'YT');
var loaded = sdk.trigger();

window.onYouTubeIframeAPIReady = function() {
	loaded();
	delete window.onYouTubeIframeAPIReady;
};

module.exports = function(url, options, callback) {
	sdk(function (error, youtube) {
		var id = options.id || 'yt-player';
		options.el.innerHTML = '<div id="' + id + '"></div>';

		var defaults = {
			autoplay: 0,
			controls: 0,
			loop: 0,
			rel: (typeof options.relatedVideos !== 'undefined' && options.relatedVideos === false) ? 0 : 1
		};

		for (var property in options) {
			if (options.hasOwnProperty(property)) {
				if (options[property] === true || options[property] === 1) {
					options[property] = 1;
				} else if (options[property] === false || options[property] === 0) {
					options[property] = 0;
				}
			}
		}

		for (var key in defaults) {
			if (!options.hasOwnProperty(key)) {
				options[key] = defaults[key];
			}
		}

		var player = new youtube.Player(id, {
			videoId: url,
			height: options.height,
			width: options.width,
			playerVars: props
		});
		player.api = youtube;
		callback(undefined, player);
	});
};
