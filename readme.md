# OxiPNG plugin for Imagemin

## Usage

```js
const imagemin = require('imagemin');
const imageminOxipng = require('imagemin-oxipng');

(async () => {
	await imagemin(['images/*.png'], {
		destination: 'build/images',
		plugins: [
			imageminOxipng()
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminOxipng(options?)(input)

Returns `Promise<Buffer>`.

#### options

Type: `object`

##### quality

Type: `number`<br>
Default: `2`<br>
Values: `1` (faster) to `6` (better compression)

Optimization: -o 1 through -o 6, lower is faster, higher is better compression. The default (-o 2) is sufficiently fast on a modern CPU and provides 30-50% compression gains over an unoptimized PNG. -o 4 is 6 times slower than -o 2 but can provide 5-10% extra compression over -o 2. Using any setting higher than -o 4 is unlikely to give any extra compression gains and is not recommended.
