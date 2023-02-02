import clsx from 'clsx';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export type ModalFooterProps = PropsWithChildren<ComponentProps<'div'>>;

export const ModalFooter: FC<ModalFooterProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(
				'flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};
