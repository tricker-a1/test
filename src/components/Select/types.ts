import { OptionsOrGroups, GroupBase, MultiValue } from 'react-select';
import { IconType } from '../Icon';

export type SelectValueType = null | string | number | boolean;

export type SelectOptionType = {
	value: SelectValueType;
	label: string;
	img?: string;
};

interface BasicSelectProps {
	icon?: IconType;
	className?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	placeholder?: string;
}

export interface DefaultSelectProps extends BasicSelectProps {
	options: OptionsOrGroups<SelectOptionType, GroupBase<SelectOptionType>>;
	value: SelectOptionType | null;
	onChange: (value: SelectOptionType | null) => void;
	type: 'default';
	isMulti?: false;
}

export interface MultipleSelectProps extends BasicSelectProps {
	value: Array<SelectOptionType> | null;
	options: OptionsOrGroups<SelectOptionType, GroupBase<SelectOptionType>>;
	onChange: (value: MultiValue<SelectOptionType>) => void;
	type: 'multiple';
	isMulti?: true;
}

export interface AsyncSelectProps extends BasicSelectProps {
	value: SelectOptionType | null;
	onChange: (value: SelectOptionType | null) => void;
	loadOptions: (searchString: string) => Promise<Array<SelectOptionType>>;
	defaultOptions?: OptionsOrGroups<
		SelectOptionType,
		GroupBase<SelectOptionType>
	>;
	type: 'async';
	isMulti?: false;
}

export interface AsyncMultiSelectProps extends BasicSelectProps {
	value: Array<SelectOptionType> | null;
	onChange: (value: MultiValue<SelectOptionType>) => void;
	loadOptions: (searchString: string) => Promise<Array<SelectOptionType>>;
	defaultOptions?: OptionsOrGroups<
		SelectOptionType,
		GroupBase<SelectOptionType>
	>;
	type: 'async-multiple';
	isMulti?: true;
}

export type SelectProps =
	| DefaultSelectProps
	| MultipleSelectProps
	| AsyncSelectProps
	| AsyncMultiSelectProps;

export type SelectType = 'default' | 'multiple' | 'async' | 'async-multiple';
