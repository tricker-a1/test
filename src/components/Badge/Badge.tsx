import { Text } from '../Text';
import { ucFirst } from '../../utils';

export type BadgeProps = {
	value: string;
	variant: BadgeVariant;
	isCapitalize?: boolean;
};

const Badge = ({ value, variant, isCapitalize = false }: BadgeProps) => {
	const { bgColor, color } = variant;
	return (
		<div
			className='flex items-center justify-center rounded-xl'
			style={{
				backgroundColor: bgColor,
				color: color,
			}}
		>
			<Text as='span' size={12} className='px-3 py-1 font-medium'>
				{isCapitalize ? value.toUpperCase() : ucFirst(value)}
			</Text>
		</div>
	);
};

export default Badge;
