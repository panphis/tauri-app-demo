function hsvToRgb(h: number, s: number, v: number) {
	// 将HSV转换为RGB
	let r = 0,
		g = 0,
		b = 0;
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0:
			(r = v), (g = t), (b = p);
			break;
		case 1:
			(r = q), (g = v), (b = p);
			break;
		case 2:
			(r = p), (g = v), (b = t);
			break;
		case 3:
			(r = p), (g = q), (b = v);
			break;
		case 4:
			(r = t), (g = p), (b = v);
			break;
		case 5:
			(r = v), (g = p), (b = q);
			break;
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	};
}

/**
 * 生成基于色盘均匀分布的若干个颜色。
 * @param {number} numColors - 要生成的颜色数量。
 * @param {number} [saturation=0.8] - 颜色饱和度，默认为0.8。范围为0到1。
 * @param {number} [lightness=0.9] - 颜色亮度，默认为0.9。范围为0到1。
 * @returns {string[]} - 生成的CSS颜色字符串数组。
 */

export const generateUniformColors = (
	numColors: number,
	saturation: number = 0.8,
	lightness: number = 0.9
): string[] => {
	const colors = [];
	const maxHue = 360;
	const step = maxHue / numColors;

	let randomValue;
	if (window?.crypto?.getRandomValues) {
		const hueArray = new Uint16Array(1);
		window.crypto.getRandomValues(hueArray);
		randomValue = hueArray[0] % maxHue;
	} else {
		randomValue = Math.floor(Math.random() * maxHue);
	}

	for (let i = 0; i < numColors; i++) {
		const hue = (step * i + randomValue) % maxHue;
		const { r, g, b } = hsvToRgb(hue / 360, saturation, lightness);
		colors.push(`rgb(${r}, ${g}, ${b})`);
	}

	return colors;
};
