// modules
import React, { Suspense } from 'react';
import clsx from 'clsx';
// utils
import { IconProps } from './types';

const Icon: React.FC<IconProps> = (props) => {
	const { icon, color, className, onClick, type, ...rest } = props;

	const Svg =
		type === 'flag'
			? React.lazy(
					async () => await import(`../../assets/svg/flag/${icon}.svg`)
			  )
			: React.lazy(async () => await import(`../../assets/svg/${icon}.svg`));

	return (
		<Suspense>
			<Svg {...rest} className={clsx(className, color)} onClick={onClick} />
		</Suspense>
	);
};

Icon.defaultProps = {
	fill: 'none',
	width: 24,
	height: 24,
};

export default React.memo(Icon);
