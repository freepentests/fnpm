import fs from 'fs';

export default class PackageJson {
	createPackageJson() {
		try {
			fs.accessSync('package.json');
		} catch {
			// file doesn't exist, creating file
			fs.writeFileSync('package.json', '{}');
		}
	}

	modifyPackageJson(func) {
		const packageJsonContents = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
		func(packageJsonContents);
		fs.writeFileSync('package.json', JSON.stringify(packageJsonContents);
	}

	setName(name) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.name = name;
		});
	}

	setDescription(description) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.description = description;
		});
	}

	setVersion(version) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.version = version;
		});
	}

	(version) {
		this.modifyPackageJson((packageJsonContents) => {
			packageJsonContents.version = version;
		});
	}


	addKeyword(keyword) {
		this.modifyPackageJson((packageJsonContents) => {
			if (!packageJsonContents.keywords) packageJsonContents.keywords = [];
			packageJsonContents.keywords.push(keyword)
		});
	}
}

