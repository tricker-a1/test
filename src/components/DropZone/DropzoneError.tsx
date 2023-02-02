import { useCallback, useState } from 'react';
import clsx from 'clsx';

import Icon from '../Icon';
import { Text } from '../Text';
import { Modal } from '../Modal';
import Button from '../Button';
import { UploadingStatus } from '../../constants';
import { formatDateTime } from '../../utils';

type ErrorModalProps = {
	isOpen: boolean;
	handleClose: () => void;
	headerErrors?: HeaderValidationError[];
	rowErrors?: DataValidationError;
};

type DropzoneErrorProps = {
	errors: {
		headerErrors: HeaderValidationError[];
		rowErrors: DataValidationError;
	};
	errorType: string;
	fileName?: string;
	type: UploadDataType;
	onChangeStatus: (
		type: UploadDataType,
		value: UploadDataCurrentStatus
	) => void;
};

const HeaderMissingErrorModal = ({
	isOpen,
	handleClose,
	headerErrors,
}: ErrorModalProps) => {
	return (
		<Modal show={isOpen} onClose={handleClose} width={450}>
			<Modal.Body>
				<div className='flex items-center flex-col'>
					<div className='rounded-full border-4 border-red-50 bg-red-100 w-10 h-10 flex items-center justify-center '>
						<Icon
							width={20}
							height={20}
							color='text-red-700'
							icon='info-circle'
						/>
					</div>
					<div className='mt-4 text-center'>
						<Text as='h4' className='fotn-normal'>
							Encountered Data Validation Error(s)
						</Text>
						<Text as='p' size={14} className='text-gray-500 mt-2'>
							It seems some headers doesn not match required format
						</Text>
					</div>
					<div className='mt-2'>
						<Text as='p' size={14} className='text-gray-700'>
							Please fix following colum entries:
						</Text>
					</div>
					<div className='mt-2 w-full'>
						<div className='overflow-x-auto relative'>
							<table className='w-full text-center text-gray-500'>
								<thead className='bg-gray-50'>
									<tr>
										<th scope='col' className='px-2'>
											<Text as='span' size={12} className='text-gray-500'>
												# of Column
											</Text>
										</th>
										<th scope='col' className='px-2'>
											<Text as='span' size={12} className='text-gray-500'>
												Column Name
											</Text>
										</th>
									</tr>
								</thead>
								<tbody>
									{headerErrors &&
										!!headerErrors.length &&
										headerErrors.map((error, index) => (
											<tr className='bg-white border-b' key={`error-${index}`}>
												<td scope='row' className='px-2 py-3 whitespace-nowrap'>
													<Text as='span' size={14} className='text-gray-900'>
														{error.columnNumber}
													</Text>
												</td>
												<td scope='row' className='px-2 py-3 whitespace-nowrap'>
													<Text as='span' size={14} className='text-gray-900'>
														{error.columnName}
													</Text>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='flex justify-end w-full'>
						<Button
							size='md'
							onClick={handleClose}
							className='mt-8 align-self-end text-gray-600 py-3 px-4'
							variant='secondary'
						>
							Okay
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const RowMissingErrorModal = ({
	isOpen,
	handleClose,
	rowErrors,
}: ErrorModalProps) => {
	return (
		<Modal show={isOpen} onClose={handleClose} width={450}>
			<Modal.Body>
				<div className='flex items-center flex-col'>
					<div className='rounded-full border-4 border-red-50 bg-red-100 w-10 h-10 flex items-center justify-center '>
						<Icon
							width={20}
							height={20}
							color='text-red-700'
							icon='info-circle'
						/>
					</div>
					<div className='mt-4 text-center'>
						<Text as='h4' className='fotn-normal'>
							Encountered Data Validation Error(s)
						</Text>
						<Text as='p' size={14} className='text-gray-500 mt-2'>
							It seems some headers doesn not match required format
						</Text>
					</div>
					<div className='mt-2'>
						<Text as='p' size={14} className='text-gray-700'>
							Please fix following colum entries:
						</Text>
					</div>
					<div className='mt-2 w-full'>
						<div className='overflow-x-auto relative'>
							<table className='w-full text-center text-gray-500'>
								<thead className='bg-gray-50'>
									<tr>
										<th scope='col' className='px-2 text-left'>
											<Text as='span' size={12} className='text-gray-500'>
												Column Name
											</Text>
										</th>
										<th scope='col' className='px-2 text-left'>
											<Text as='span' size={12} className='text-gray-500'>
												Rows
											</Text>
										</th>
									</tr>
								</thead>
								<tbody>
									{rowErrors &&
										!!Object.keys(rowErrors).length &&
										Object.keys(rowErrors).map((key, index) => (
											<tr
												className='bg-white border-b'
												key={`data-error-${index}`}
											>
												<td
													scope='row'
													className='px-2 py-3 whitespace-nowrap text-left'
												>
													<Text as='span' size={14} className='text-gray-900'>
														{key}
													</Text>
												</td>
												<td
													scope='row'
													className='px-2 py-3 whitespace-nowrap text-left'
												>
													<Text as='span' size={14} className='text-red-300'>
														{rowErrors[key].join(', ')}
													</Text>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='flex justify-end w-full'>
						<Button
							size='md'
							onClick={handleClose}
							className='mt-8 align-self-end text-gray-600 py-3 px-4'
							variant='secondary'
						>
							Okay
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const DropzoneError: React.FC<DropzoneErrorProps> = ({
	errors,
	errorType,
	fileName,
	onChangeStatus,
	type,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = useCallback(() => setIsOpen(false), []);

	return (
		<div className='container flex shadow-sm rounded-md mt-6 bg-[white] py-6 px-4 gap-6 items-center min-h-40'>
			<div>
				<div className='rounded-full border-8 border-red-50 bg-red-100 w-14 h-14 flex items-center justify-center '>
					<Icon width={21} height={26} color='text-red-700' icon='file-x' />
				</div>
			</div>
			<div className='grid flex-1'>
				<div className='flex justify-between text-red-700'>
					<Text size={14} className='text-red-700'>
						{fileName}
					</Text>
					<Text size={14} className='text-red-300'>
						{formatDateTime(Date.now())}
					</Text>
				</div>
				<div className='flex flex-col mt-2'>
					<Text size={14} className='text-red-300' align='left'>
						Encountered data validation errors(s)
					</Text>
					<Text size={14} className='text-red-300' align='left'>
						Data doesn&apos;t match required format
					</Text>
				</div>
				<div
					className={clsx('flex text-red-700 items-center', {
						'justify-end': errorType === UploadingStatus.FILE_VALIDATION_ERROR,
						'justify-between':
							errorType !== UploadingStatus.FILE_VALIDATION_ERROR,
					})}
				>
					{errorType !== UploadingStatus.FILE_VALIDATION_ERROR && (
						<a className='text-[14px]' onClick={() => setIsOpen(true)} href='#'>
							See Details
						</a>
					)}
					<div className='flex items-center'>
						<Icon width={18} height={18} icon='left' />
						<button
							className='ml-[10px]'
							onClick={() => onChangeStatus(type, UploadingStatus.IDLE)}
						>
							Try again
						</button>
					</div>
				</div>
				{errorType === UploadingStatus.HEADERS_VALIDATION_ERROR ? (
					<HeaderMissingErrorModal
						isOpen={isOpen}
						handleClose={handleClose}
						headerErrors={errors.headerErrors}
					/>
				) : (
					<RowMissingErrorModal
						isOpen={isOpen}
						handleClose={handleClose}
						rowErrors={errors.rowErrors}
					/>
				)}
			</div>
		</div>
	);
};

export default DropzoneError;
