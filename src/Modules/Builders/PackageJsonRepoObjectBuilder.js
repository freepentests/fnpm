export default class PackageJsonRepoObjectBuilder {
	constructor() {
		this.type;
		this.url;
	}

	setType(type) {
		this.type = type; // i don't know why anyone would use any VCS other than git
		return this;
	}

	setUrl(url) {
		this.url = url;
		return this;
	}
}

