var Ajax = {
	get: function(url, callback) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					callback(xhr.responseText);
				}
			}
		}

		xhr.open('get', url, true);
		xhr.send();
	},
	post: function(url, data, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('post', url, true);
	    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {
	        if(xhr.readyState == 4) {
	            if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
	            	callback(xhr.responseText);
	            }
	        }
	    }

		var param = "";
		for(var i in data) {
		    if(param != "") {
		        param += '&';
		    }
		    param += i + '=' + data[i];
		}

	    xhr.send(param);
	}
}