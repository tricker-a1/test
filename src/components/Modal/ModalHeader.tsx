import type { ComponentProps, FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import { Text } from '../Text';

export type ModalHeaderProps = PropsWithChildren<ComponentProps<'div'>>;

export const ModalHeader: FC<ModalHeaderProps> = ({
	children,
	className,
	...props
}): JSX.Element => {
	return (
		<div
			className={clsx(
				'flex items-start justify-between p-4 border-b rounded-t',
				className
			)}
			{...props}
		>
			<Text as='h3'>{children}</Text>
		</div>
	);
};
