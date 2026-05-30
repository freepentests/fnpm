export default class PackageJsonBugBuilder {
	constructor() {
		this.url;
		this.email;
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

