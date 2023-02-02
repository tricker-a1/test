import React from 'react';

import { Text } from '../Text';
import Icon from '../Icon/Icon';
import { IconType } from '../Icon';

type StepProps = {
	icon: IconType;
	iconWidth?: number;
	iconHeight?: number;
	description: string;
	isFirst?: boolean;
	isLast?: boolean;
};

const Step: React.FC<StepProps> = ({
	icon,
	iconWidth,
	iconHeight,
	description,
	isFirst,
	isLast,
}) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='w-[40px] h-[40px] bg-success-400 rounded-full flex justify-center items-center'>
				<Icon
					icon={icon}
					width={iconWidth}
					height={iconHeight}
					color='text-white'
				/>
			</div>
			<div
				className={`mt-[-2px] w-full ${isFirst && 'pl-[50%]'} ${
					isLast && 'pr-[50%]'
				}`}
			>
				<div className='w-full h-[2px] bg-success-400 '></div>
			</div>
			<div className='mt-[14px] mb-[60px]'>
				<Text as='span' size={16} className='font-medium text-black'>
					{description}
				</Text>
			</div>
		</div>
	);
};

const StepIntroduction = () => {
	return (
		<div className='my-[32px] w-full grid grid-cols-5'>
			<Step icon='download' description='Download Template' isFirst />
			<Step icon='file05' iconWidth={20} description='Fill the Template' />
			<Step icon='file-check' iconWidth={20} description='Check for Accuracy' />
			<Step icon='upload04' description='Upload your File' />
			<Step icon='refresh-ccw' description='Re-upload if necessary' isLast />
		</div>
	);
};

export default StepIntroduction;
