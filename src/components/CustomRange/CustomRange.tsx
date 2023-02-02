import { ElementType, useMemo } from 'react';
import { Range } from 'react-range';
import Tooltip from 'rc-tooltip';

import CustomRangeTooltipContent from './CustomRangeTooltipContent';

export type CustomRangeProps = {
	minValue: number;
	maxValue: number;
	value: number;
	handleChange?: (value: number) => void;
	CustomRangeTrack?: ElementType;
	CustomRangeThumb?: ElementType;
	disabled?: boolean;
	buttonVariant: string;
};

const CustomRange = ({
	value,
	minValue,
	maxValue,
	handleChange,
	CustomRangeTrack,
	CustomRangeThumb,
	disabled,
	buttonVariant,
}: CustomRangeProps) => {
	const position = useMemo(() => {
		return ((value - minValue) / (maxValue - minValue)) * 100;
	}, [minValue, maxValue, value]);

	const handleRangeChange = (values: number[]) => {
		handleChange && handleChange(values[0]);
	};

	return (
		<div className='relative'>
			<Tooltip
				placement='top'
				trigger={['click']}
				overlayInnerStyle={{
					borderRadius: '8px',
				}}
				overlay={
					<CustomRangeTooltipContent
						value={value}
						minValue={minValue}
						maxValue={maxValue}
						handleRangeChange={handleRangeChange}
					/>
				}
				align={{
					offset: [0, -10],
				}}
				showArrow
			>
				<div
					className='absolute w-2 h-2 rounded-full bg-[#f3f4fd] -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 cursor-pointer'
					style={{
						left: `${position}%`,
					}}
				/>
			</Tooltip>
			<div
				className='absolute border-l-2 border-success-100 h-4 -translate-x-1/2 z-2 cursor-pointer -bottom-2'
				style={{
					left: `${position}%`,
				}}
			/>
			<Range
				step={10}
				min={minValue}
				max={maxValue}
				values={[value]}
				onChange={(values) => handleRangeChange(values)}
				disabled={disabled}
				renderTrack={
					CustomRangeTrack
						? ({ props, children }) => (
								<CustomRangeTrack {...props}>{children}</CustomRangeTrack>
						  )
						: ({ props, children }) => (
								<div
									{...props}
									style={{
										...props.style,
									}}
									className='h-px w-full bg-gray-100 rounded-[2px] z-1'
								>
									{children}
								</div>
						  )
				}
				renderThumb={
					CustomRangeThumb
						? ({ props }) => <CustomRangeThumb {...props} />
						: ({ props }) => (
								<div
									{...props}
									style={{
										background: buttonVariant,
									}}
									className='h-3 w-11 rounded-lg cursor-pointer mt-2 outline-none z-6'
								/>
						  )
				}
			/>
		</div>
	);
};

export default CustomRange;
