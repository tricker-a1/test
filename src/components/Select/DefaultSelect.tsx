// modules
import clsx from 'clsx';
import { FC, useCallback } from 'react';
import ReactSelect, { SingleValue, MultiValue } from 'react-select';
import { CustomClearIndicator } from './CustomClearIndicator';
// components
import { CustomDropdownIndicator } from './CustomDropdownIndicator';
import { CustomValueContainer } from './CustomValueContainer';
// types
import {
	DefaultSelectProps,
	MultipleSelectProps,
	SelectOptionType,
} from './types';
import { formatOptionLabel } from './utils/formatOptionLabel';

export const DefaultSelect: FC<DefaultSelectProps | MultipleSelectProps> = (
	props
) => {
	const { className, icon, isError, onChange, ...rest } = props;

	const handleChange = useCallback(
		(
			newValue: MultiValue<SelectOptionType> | SingleValue<SelectOptionType>
		) => {
			onChange(newValue as SelectOptionType & MultiValue<SelectOptionType>);
		},
		[onChange]
	);

	return (
		<ReactSelect
			placeholder='Search specific employee'
			{...rest}
			onChange={handleChange}
			components={{
				IndicatorSeparator: null,
				DropdownIndicator: CustomDropdownIndicator,
				ClearIndicator: CustomClearIndicator,
				ValueContainer: (props) => (
					<CustomValueContainer innerProps={props} icon={icon} />
				),
			}}
			formatOptionLabel={formatOptionLabel}
			classNamePrefix='react-select'
			className={clsx(
				'select',
				isError && 'select--error',
				'min-w-[320px]',
				className
			)}
		/>
	);
};
