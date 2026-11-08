// node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = /* @__PURE__ */ new Uint8Array(64);
var charToInt = /* @__PURE__ */ new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
	const c = chars.charCodeAt(i);
	intToChar[i] = c;
	charToInt[c] = i;
}
function encodeInteger(builder, num) {
	do {
		let clamped = num & 31;
		num >>>= 5;
		if (num > 0) clamped |= 32;
		builder.write(intToChar[clamped]);
	} while (num > 0);
}
function encodeSign(num) {
	return num < 0 ? -num << 1 | 1 : num << 1;
}
var bufLength = 16384;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? { decode(buf) {
	return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString();
} } : { decode(buf) {
	let out = "";
	for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
	return out;
} };
var StringWriter = class {
	constructor() {
		this.pos = 0;
		this.out = "";
		this.buffer = new Uint8Array(bufLength);
	}
	write(v) {
		const { buffer } = this;
		buffer[this.pos++] = v;
		if (this.pos === bufLength) {
			this.out += td.decode(buffer);
			this.pos = 0;
		}
	}
	flush() {
		const { buffer, out, pos } = this;
		return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
	}
};
function encode(decoded) {
	const writer = new StringWriter();
	let sourcesIndex = 0;
	let sourceLine = 0;
	let sourceColumn = 0;
	let namesIndex = 0;
	for (let i = 0; i < decoded.length; i++) {
		const line = decoded[i];
		if (i > 0) writer.write(semicolon);
		if (line.length === 0) continue;
		let genColumn = 0;
		for (let j = 0; j < line.length; j++) {
			const segment = line[j];
			if (j > 0) writer.write(comma);
			encodeInteger(writer, encodeSign(segment[0] - genColumn));
			genColumn = segment[0];
			if (segment.length === 1) continue;
			encodeInteger(writer, encodeSign(segment[1] - sourcesIndex));
			encodeInteger(writer, encodeSign(segment[2] - sourceLine));
			encodeInteger(writer, encodeSign(segment[3] - sourceColumn));
			sourcesIndex = segment[1];
			sourceLine = segment[2];
			sourceColumn = segment[3];
			if (segment.length === 4) continue;
			encodeInteger(writer, encodeSign(segment[4] - namesIndex));
			namesIndex = segment[4];
		}
	}
	return writer.flush();
}
export { encode };
