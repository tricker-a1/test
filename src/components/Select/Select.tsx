// modules
import React from 'react';
// components
import { DefaultSelect } from './DefaultSelect';
import { AsyncSelect } from './AsyncSelect';
//  types
import {
	AsyncMultiSelectProps,
	AsyncSelectProps,
	DefaultSelectProps,
	MultipleSelectProps,
	SelectProps,
} from './types';
// styles
import './styles.css';

const Select: React.FC<SelectProps> = (props) => {
	const { type = 'default' } = props;

	switch (type) {
		case 'async':
			return <AsyncSelect {...(props as AsyncSelectProps)} />;
		case 'async-multiple':
			return <AsyncSelect {...(props as AsyncMultiSelectProps)} isMulti />;
		case 'multiple':
			return <DefaultSelect {...(props as MultipleSelectProps)} isMulti />;
		case 'default':
			return <DefaultSelect {...(props as DefaultSelectProps)} />;
		default:
			return null;
	}
};

export default React.memo(Select);
