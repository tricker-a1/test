// modules
import { FormatOptionLabelMeta } from 'react-select';
// components
import Icon from '../../Icon';
import { Text } from '../../Text';
// types
import { SelectOptionType } from '../types';

export const formatOptionLabel = (
	option: SelectOptionType,
	{ context, selectValue }: FormatOptionLabelMeta<SelectOptionType>
) => {
	const isSelected = selectValue.find(({ value }) => value === option.value);
	const isOption = context === 'menu';

	return (
		<div className='flex items-center gap-2'>
			{option.img && (
				<img
					src={option.img}
					alt={option.label}
					className='rounded-full w-6 h-6'
				/>
			)}
			{option.label && !option.value ? (
				<Text as='span' className='text-gray-400' size={12}>
					{option.label}
				</Text>
			) : (
				<Text as='span' className='text-gray-700' size={16}>
					{option.label}
				</Text>
			)}
			{isSelected && isOption && (
				<Icon className='react-select__option-icon' icon='check' />
			)}
		</div>
	);
};
