// modules
import { FC } from 'react';
import clsx from 'clsx';
// components
import { Text } from '../Text';
// types
import { FilterItemProps } from './types';

export const FilterItem: FC<FilterItemProps> = (props) => {
	const { title, renderIcon, onClick, id, selectedOptions } = props;
	const selected = selectedOptions.includes(id);
	return (
		<div
			className={clsx(
				'p-2 rounded-xs flex justify-between items-center h-8 flex-nowrap cursor-pointer',
				{
					'bg-primary-400 hover:bg-primary-300 text-primary-50': selected,
					'bg-gray-50  hover:bg-gray-100 text-gray-700': !selected,
				}
			)}
			onClick={() => onClick(id)}
		>
			<div className='flex gap-2 items-center'>
				{renderIcon}
				<Text className='whitespace-nowrap'>{title}</Text>
			</div>
		</div>
	);
};
