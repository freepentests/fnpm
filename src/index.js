import FlagParser from './Modules/FlagParser.js';
import InitCommand from './Init.js';

const args = new FlagParser().parse(process.argv);
const command = args.args[2];

switch (command) {
	case 'init':
		new InitCommand().execute();
		break;

	default:
		console.log('Invalid command.');
		break;
}

