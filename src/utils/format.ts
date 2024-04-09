import dayjs from "dayjs";


export const formatMemorySize = (bytes: number = 0) => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	let index = 0;

	while (bytes >= 1024 && index < units.length - 1) {
		bytes /= 1024;
		index++;
	}
	const formattedBytes = bytes.toFixed(2);
	return `${formattedBytes} ${units[index]}`;
}

export const formatTime = (time: number|string|Date, format:string = 'YYYY-MM-DD-HH-mm-ss') => {
	return dayjs(time).format(format);
}


