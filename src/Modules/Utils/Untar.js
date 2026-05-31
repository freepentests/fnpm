// extracts a gzip-compressed tar archive
import zlib from 'zlib'; // using the zlib library isn't skidding since it's built-in
import fs from 'fs';

export default class Untar {
	#untar(tarData) {
		const header = tarData.slice(0, 512);
		const decoder = new TextDecoder();

		const filename = decoder.decode(header.slice(0, 99));
		const fileSize = parseInt(decoder.decode(header.slice(124, 135)), 8);
		const typeFlag = header[156];
		const checksum = parseInt(decoder.decode(header.slice(148, 155)), 8);

		console.log(filename, fileSize, typeFlag, checksum);
	}

	extract(archive) {
		const fileData = fs.readFileSync(archive);
		const decompressedTarFile = zlib.gunzipSync(fileData); // "gun" zip? more like bomb zip
		this.#untar(decompressedTarFile);
	}
}

new Untar().extract('queueing-2.0.122.tgz');

