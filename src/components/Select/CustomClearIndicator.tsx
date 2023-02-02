// modules
import { ClearIndicatorProps } from 'react-select';
// components
import Icon from '../Icon';
// types
import { SelectOptionType } from './types';

export const CustomClearIndicator = (
	props: ClearIndicatorProps<SelectOptionType>
) => {
	return (
		<Icon
			icon='x-close'
			className='react-select__clear-indicator'
			{...props.innerProps}
		/>
	);
};
