class FlagOptionBuilder {
	constructor() {
		this.type;
		this.name;
		this.value;
	}

	setType(type) {
		this.type = type;
		return this;
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setValue(value) {
		this.value = value;
		return this;
	}
}

export default class FlagParser {
	constructor() {
		this.options = [];
		this.args = [];
	}

	get(name, type = 'DOUBLE_HYPHEN') {
		return this.options.filter(obj => obj.name === name && obj.type === type)[0];
	}

	parse(argv) {
		argv.forEach((arg) => {
			const equalSignIndex = arg.indexOf('=');
			const optionValue = equalSignIndex < 0 ? undefined : arg.slice(equalSignIndex + 1);

			if (arg.startsWith('-') && !arg.startsWith('--')) {
				this.options.push(
					new FlagOptionBuilder()
						.setType('SINGLE_HYPHEN')
						.setName(arg.slice(1).split('=')[0])
						.setValue(optionValue)
				);

			} else if (arg.startsWith('--')) {
				this.options.push(
					new FlagOptionBuilder()
						.setType('DOUBLE_HYPHEN')
						.setName(arg.slice(2).split('=')[0])
						.setValue(optionValue)
				);
			} else {
				this.args.push(arg);
			}
		});

		return this;
	}
}

