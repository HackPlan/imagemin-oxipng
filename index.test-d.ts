import * as fs from 'fs';
import * as path from 'path';
import {expectType} from 'tsd';
import imageminOxipng from '.';

const buffer = fs.readFileSync(path.join(__dirname, 'fixture.png'));

(async () => {
	expectType<Buffer>(await imageminOxipng()(buffer));
	expectType<Buffer>(await imageminOxipng({
		quality: 2,
	})(buffer));
})();
