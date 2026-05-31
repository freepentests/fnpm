export default class PackageJsonPersonBuilder {
	constructor() {
		this.name;
		this.email;
		this.url;
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setUrl(url) {
		this.url = url;
		return this;
	}

	setEmail(email) {
		this.email = email;
		return this;
	}
}

