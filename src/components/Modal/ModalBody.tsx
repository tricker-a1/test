import clsx from 'clsx';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export type ModalBodyProps = PropsWithChildren<ComponentProps<'div'>>;

export const ModalBody: FC<ModalBodyProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={clsx('p-6 space-y-6', className)} {...props}>
			{children}
		</div>
	);
};
