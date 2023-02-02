import { useMemo } from 'react';
import { Range } from 'react-range';

import { Text } from '../Text';

export type TooltipItemContentProps = {
	minValue: number;
	maxValue: number;
	value: number;
	handleRangeChange: (values: number[]) => void;
};

const CustomRangeTooltipContent = ({
	minValue,
	maxValue,
	value,
	handleRangeChange,
}: TooltipItemContentProps) => {
	const position = useMemo(() => {
		return ((value - minValue) / (maxValue - minValue)) * 100;
	}, [minValue, maxValue, value]);

	return (
		<div className='flex justify-center flex-col items-center relative mb-4'>
			<Text as='p' className='mb-10 text-gray-300' size={12}>
				Salary Band Details
			</Text>
			<Range
				step={10}
				min={minValue}
				max={maxValue}
				values={[value]}
				onChange={(values) => {
					handleRangeChange(values);
				}}
				renderTrack={({ props }) => (
					<div
						{...props}
						style={{
							...props.style,
						}}
						className='h-px w-full bg-gray-100 z-1 relative'
					>
						<div className='absolute flex flex-col bottom-px left-0'>
							<Text as='span' size={12} className='text-gray-900'>
								{`$${minValue}`}
							</Text>
							<span className='border-l-2 border-gray-100 h-2 translate-y-1/2'></span>
						</div>

						<div
							className='absolute flex flex-col bottom-px'
							style={{
								left: `${position}%`,
							}}
						>
							<Text
								as='span'
								size={12}
								className='relative top-7 right-4 text-gray-900'
							>
								{`$${value}`}
							</Text>
							<span className='border-l-2 border-gray-100 h-2 translate-y-1/2'></span>
						</div>
						<div className='absolute flex flex-col right-0 bottom-px'>
							<Text as='span' size={12} className='relative text-gray-900'>
								{`$${maxValue}`}
							</Text>
							<span className='border-r-2 border-gray-100 h-2 translate-y-1/2'></span>
						</div>
					</div>
				)}
				renderThumb={({ props }) => <div {...props} />}
			/>
		</div>
	);
};

export default CustomRangeTooltipContent;
