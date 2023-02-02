import clsx from 'clsx';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { ModalBody } from './ModalBody';
import { ModalContext } from './ModalContext';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

export interface ModalProps extends PropsWithChildren<ComponentProps<'div'>> {
	onClose?: () => void;
	show?: boolean;
	width?: number;
}

const ModalComponent: FC<ModalProps> = ({
	children,
	show,
	width,
	onClose,
	className,
	...props
}) => {
	return (
		<ModalContext.Provider value={{ onClose }}>
			<div
				aria-hidden={!show}
				className={clsx(
					'fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:inset-0 md:h-full bg-[#77777770]',
					show ? 'block' : 'hidden',
					className
				)}
				data-testid='modal'
				role='dialog'
				{...props}
			>
				<div className='relative w-full h-full max-w-2xl md:auto mx-auto top-[20%]'>
					<div
						className='relative bg-white rounded-lg shadow mx-auto'
						style={{ width: `${width}px` }}
					>
						{children}
					</div>
				</div>
			</div>
		</ModalContext.Provider>
	);
};

ModalComponent.displayName = 'Modal';
ModalHeader.displayName = 'Modal.Header';
ModalBody.displayName = 'Modal.Body';
ModalFooter.displayName = 'Modal.Footer';

export const Modal = Object.assign(ModalComponent, {
	Header: ModalHeader,
	Body: ModalBody,
	Footer: ModalFooter,
});
