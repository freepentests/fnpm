// extracts a gzip-compressed tar archive
import zlib from 'zlib'; // using the zlib library isn't skidding since it's built-in
import fs from 'fs';

export default class Untar {
	//#untar(tarData) {
	//}

	extract(archive) {
		const fileData = fs.readFileSync(archive);
		const decompressedTarFile = zlib.gunzipSync(fileData); // "gun" zip? more like bomb zip
		console.log(decompressedTarFile);
	}
}

new Untar().extract('queueing-2.0.122.tgz');

