import { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

export type SpinnerProps = {
	color?: string;
	loading: boolean;
	cssOverride?: CSSProperties;
	size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({
	color = '#4169e1',
	loading,
	cssOverride,
	size,
}) => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<ClipLoader
				color={color}
				loading={loading}
				size={size}
				cssOverride={cssOverride}
			/>
		</div>
	);
};

export default Spinner;
