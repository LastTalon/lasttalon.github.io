var get = {};

function buildTable(string, name, value) {
	get[decodeURIComponent(name.split("+").join(" "))] = decodeURIComponent(value.split("+").join(" "));
}

function inputUpdate() {
	if (this.tagName == "INPUT" && this.type == "checkbox") {
		if (this.checked == true) {
			get[this.id] = "true";
		} else {
			get[this.id] = "false";
		}
	} else {
		get[this.id] = this.value;
	}
	saveInput();
}

function saveInput() {
	let query = "?";
	for (let i in get) {
		if (get.hasOwnProperty(i)) {
			query += encodeURIComponent(i).split(" ").join("+") + "=" + encodeURIComponent(get[i]).split(" ").join("+") + "&";
		}
	}
	window.history.replaceState("", "", document.location.protocol + "//" + document.location.host + document.location.pathname + query);
	document.getElementById("permanent").href = document.location.pathname + query;
}

function loadInput() {
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, buildTable);
	for (let i in get) {
		if (get.hasOwnProperty(i)) {
			let element = document.getElementById(i);
			if (element != null) {
				if (element.tagName == "INPUT") {
					if (element.type == "checkbox") {
						element.checked = get[i].toLowerCase() == "true";
					} else {
						element.value = get[i];
					}
				} else if (element.tagName == "TEXTAREA") {
					element.value = get[i];
				}
			}
		}
	}
}

function addListeners() {
	let elements = document.getElementsByTagName("INPUT");
	for (let i in elements) {
		if (elements.hasOwnProperty(i)) {
			elements[i].addEventListener("change", inputUpdate);
		}
	}
	elements = document.getElementsByTagName("TEXTAREA");
	for (let i in elements) {
		if (elements.hasOwnProperty(i)) {
			elements[i].addEventListener("change", inputUpdate);
		}
	}
}

window.onload = function() {
	loadInput();
	addListeners();
}
