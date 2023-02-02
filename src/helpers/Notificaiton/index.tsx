import { toast, ToastPosition } from 'react-toastify';

export type notificationProps = {
	message: string;
	position?: ToastPosition;
	type: 'success' | 'info' | 'error' | 'warn';
};

export const notify = ({ message, position, type }: notificationProps) => {
	toast[type](message, {
		position,
		autoClose: 3000,
	});
};
