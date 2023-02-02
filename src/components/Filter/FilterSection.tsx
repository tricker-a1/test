// modules
import { ChangeEventHandler, FC, useCallback } from 'react';
// components
import Input from '../Input';
import { Text } from '../Text';
import { FilterItem } from './FilterItem';
// types
import { FilterItemProps, FilterSectionProps } from './types';

export const FilterSection: FC<FilterSectionProps> = (props) => {
	const { title, items, onSearch } = props;

	const renderItem = (item: FilterItemProps) => (
		<FilterItem key={item.title} {...item} onClick={item.onClick} />
	);

	const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			onSearch?.(e.target.value);
		},
		[onSearch]
	);

	return (
		<div className='flex flex-col gap-2'>
			<Text
				className='whitespace-nowrap font-medium ml-3 text-gray-800'
				align='left'
				size={12}
			>
				{title}
			</Text>
			<div className='flex flex-col gap-1 max-h-44 relative overflow-y-scroll'>
				{onSearch && (
					<Input
						className='sticky top-0'
						placeholder='Type to search'
						onChange={handleSearch}
					/>
				)}
				{items?.map(renderItem)}
			</div>
		</div>
	);
};
