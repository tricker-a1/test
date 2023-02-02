// modules
import clsx from 'clsx';
import { DropdownIndicatorProps } from 'react-select';
// components
import Icon from '../Icon';
// types
import { SelectOptionType } from './types';

export const CustomDropdownIndicator = (
	props: DropdownIndicatorProps<SelectOptionType>
) => {
	const { selectProps } = props;

	return (
		<Icon
			icon='arrow'
			className={clsx(
				'react-select__arrow-icon',
				selectProps.menuIsOpen && 'react-select__arrow-icon--menu-is-open'
			)}
		/>
	);
};
