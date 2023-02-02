import moment from 'moment';
import { UploadingStatus } from '../constants';
/**
 * @description Compares objects' keys provided in the keys argument
 */
export function areObjectsKeysEqual(
	obj1: Record<string, any>,
	obj2: Record<string, any>,
	keys: string[]
): boolean {
	return keys.reduce((acc, c) => {
		if (!acc) return acc;
		return obj1[c] === obj2[c];
	}, true);
}

const generateRandomColors = () => {
	const x = Math.floor(Math.random() * 100);
	const y = Math.floor(Math.random() * 100);
	const z = Math.floor(Math.random() * 100);
	const color = `rgb(${x}, ${y}, ${z})`;
	const bgColor = `rgb(${x + 155}, ${y + 155}, ${z + 155})`;
	return {
		bgColor,
		color,
	};
};

export const getRandomColorsForTypesBadge = (demoType: string[]) => {
	const randomColors = demoType.reduce(
		(colors, type) => ({
			...colors,
			[type]: generateRandomColors(),
		}),
		{}
	);

	return randomColors as Record<string, BadgeVariant>;
};

export const ucFirst = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getUploadedNameByType = (type: string) => {
	switch (type) {
		case 'compensation_bands':
			return 'compensation bands';
		case 'performance_ratings':
			return 'compensation ratings';
		case 'equity':
			return 'equity';
		default:
			return type;
	}
};

export const formatDateTime = (data: Date | number | undefined) =>
	moment(data).format('MMM DD, YYYY HH:mm');

export const formatDateForTable = (date: Date | undefined) =>
	moment(date).format('M/D/YYYY');

export const getErrorTypeByValidationError = (type: string) => {
	switch (type) {
		case 'HEADERS_VALIDATION_ERROR':
			return UploadingStatus.HEADERS_VALIDATION_ERROR;
		case 'DATA_VALIDATION_ERROR':
			return UploadingStatus.DATA_VALIDATION_ERROR;
		case 'FILE_VALIDATION_ERROR':
			return UploadingStatus.FILE_VALIDATION_ERROR;
		default:
			return UploadingStatus.ERROR;
	}
};
