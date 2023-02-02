// modules
import clsx from 'clsx';
import { ValueContainerProps } from 'react-select';
// components
import Icon, { IconType } from '../Icon';
// types
import { SelectOptionType } from './types';

interface CustomValueContainerProps {
	innerProps: ValueContainerProps<SelectOptionType>;
	icon?: IconType;
}

export const CustomValueContainer: React.FC<CustomValueContainerProps> = (
	props
) => {
	const { icon } = props;
	const { children, innerProps } = props.innerProps;

	return (
		<div
			className={clsx(
				'react-select__value-container',
				icon && 'react-select__value-container--has-icon'
			)}
			{...innerProps}
		>
			{icon && <Icon icon={icon} className='react-select__left-icon' />}
			{children}
		</div>
	);
};
