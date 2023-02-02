// modules
import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
// constants
import { ROUTES } from '../../router';

interface LogoProps {
	short?: boolean;
	className?: string;
	color?: string;
}

export const Logo: FC<LogoProps> = (props) => {
	const { short, className, color = 'text-primary' } = props;

	return (
		<Link
			to={ROUTES.dashboard.path}
			className={clsx(
				'select-none font-bold tracking-widest block transition-width duration-300 text-center mx-auto',
				short ? 'text-[24px] w-5 overflow-hidden' : 'text-[18px] w-30',
				color,
				className
			)}
		>
			COMPIIFY
		</Link>
	);
};
