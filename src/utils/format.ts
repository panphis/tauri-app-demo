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
