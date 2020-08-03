export interface Options {
	/**
	Optimization: -o 1 through -o 6, lower is faster, higher is better compression. The default (-o 2) is sufficiently fast on a modern CPU and provides 30-50% compression gains over an unoptimized PNG. -o 4 is 6 times slower than -o 2 but can provide 5-10% extra compression over -o 2. Using any setting higher than -o 4 is unlikely to give any extra compression gains and is not recommended.

	Values: `1` (brute-force) to `6` (fastest)

	@default 2
	*/
	quality?: number;

	/**
	Remove optional metadata.
	*/
	strip?: 'safe' | 'all';
}

/**
Buffer or stream to optimize.
*/
export type Plugin = (input: Buffer | NodeJS.ReadableStream) => Promise<Buffer>;

/**
Imagemin plugin for Oxipng.

@returns An Imagemin plugin.
*/
export default function imageminOxipng(options?: Options): Plugin;
