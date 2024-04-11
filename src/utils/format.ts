import dayjs from "dayjs";

type FormatMemorySizeParams = number

interface FormatMemorySizeReturn {
	value: string;
	unit: string;
	string: string;
}


export const formatMemorySize = (bytes: FormatMemorySizeParams = 0): FormatMemorySizeReturn => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	let index = 0;

	while (bytes >= 1024 && index < units.length - 1) {
		bytes /= 1024;
		index++;
	}
	const formattedBytes = bytes.toFixed(2);
	return {
		string: `${formattedBytes} ${units[index]}`,
		value: formattedBytes,
		unit: units[index]
	};
}

export const formatTime = (time: number | string | Date, format: string = 'YYYY-MM-DD-HH-mm-ss') => {
	return dayjs(time).format(format);
}


