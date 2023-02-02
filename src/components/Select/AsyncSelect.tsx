// modules
import clsx from 'clsx';
import { FC, useCallback } from 'react';
import { SingleValue, MultiValue } from 'react-select';
import ReactSelectAsync from 'react-select/async';
// components
import { CustomClearIndicator } from './CustomClearIndicator';
import { CustomDropdownIndicator } from './CustomDropdownIndicator';
import { CustomValueContainer } from './CustomValueContainer';
// types
import {
	AsyncMultiSelectProps,
	AsyncSelectProps,
	SelectOptionType,
} from './types';
import { formatOptionLabel } from './utils/formatOptionLabel';

export const AsyncSelect: FC<AsyncSelectProps | AsyncMultiSelectProps> = (
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
		<ReactSelectAsync
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
				'min-w-[320px]',
				'mx-0',
				isError && 'select--error',
				className
			)}
		/>
	);
};
