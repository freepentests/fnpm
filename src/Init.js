import FlagParser from './Modules/FlagParser.js';

export default class InitCommand {
	execute() {
		const args = new FlagParser().parse(process.argv);

		const autoConfirm = Boolean(args.get('y', 'SINGLE_HYPHEN') || args.get('yes'));


	}
}

new InitCommand().execute();

