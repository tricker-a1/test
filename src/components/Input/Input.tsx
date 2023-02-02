// modules
import { FC } from 'react';
import clsx from 'clsx';
// types
import { InputProps } from './types';

export const Input: FC<InputProps> = (props) => {
	const { className, ...rest } = props;

	return (
		<input
			className={clsx(
				'h-8 rounded-xs border text-sm border-gray-100 py-2 px-3',
				className
			)}
			{...rest}
		/>
	);
};
