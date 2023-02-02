import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import clsx from 'clsx';
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from 'axios';

import { Text } from '../Text';
import DropzoneWarning from './DropzoneWarning';
import DropzoneUploaded from './DropzoneUploaded';
import DropzoneError from './DropzoneError';
import DropzoneUploading from './DropzoneUploading';
import Icon from '../Icon';

import { notify } from '../../helpers';
import { getUploadUrlByType, UploadingStatus } from '../../constants';
import { getErrorTypeByValidationError } from '../../utils';

export type DropzoneProps = {
	isEmployeeData: boolean;
	overallStatus: {
		employee: UploadingStatus;
		compensation: UploadingStatus;
		equity: UploadingStatus;
		compensationBands: UploadingStatus;
		performanceRating: UploadingStatus;
	};
	employeeUploadingStatus: boolean;
	uploadDetails?: {
		uploaded_date?: string;
		totalRows?: number;
		filname?: string;
	};
	uploadedDate: Date | null;
	type: UploadDataType;
	records: number;
	status: UploadDataCurrentStatus;
	percent: number;
	errors: {
		headerErrors: HeaderValidationError[];
		rowErrors: DataValidationError;
	};
	fileName: string;
	onChangeRecords: (type: UploadDataType, records: number) => void;
	onChangeStatus: (
		type: UploadDataType,
		value: UploadDataCurrentStatus
	) => void;
	onChangePercent: (value: number) => void;
	onChangeErrors: (
		errors: HeaderValidationError[] | DataValidationError
	) => void;
	onChangeUploadedDate: (type: UploadDataType, date: Date) => void;
	onChangeFileName: (type: UploadDataType, name: string) => void;
};

const Dropzone = ({
	onChangeStatus,
	onChangeRecords,
	onChangePercent,
	onChangeErrors,
	onChangeUploadedDate,
	onChangeFileName,
	uploadedDate,
	isEmployeeData,
	type,
	status,
	employeeUploadingStatus,
	overallStatus,
	fileName,
	records,
	percent,
	errors,
}: DropzoneProps) => {
	const isAnyDataUploading = (data: {
		employee: UploadingStatus;
		compensation: UploadingStatus;
		equity: UploadingStatus;
		compensationBands: UploadingStatus;
		performanceRating: UploadingStatus;
	}) => {
		return Object.values(data).some(
			(value) => value === UploadingStatus.UPLOADING
		);
	};

	const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
		const currentPercent = Math.round(
			(progressEvent.loaded * 100) / (progressEvent.total as number)
		);
		onChangePercent(currentPercent);
	};

	const handleError = (error: FileUploadValidationError) => {
		const validationErrors = error.result?.missingHeaders
			? error.result?.missingHeaders
			: error.result;
		const errorType = getErrorTypeByValidationError(error.error.code);
		onChangeStatus(type, errorType);
		validationErrors && onChangeErrors(validationErrors);
	};

	const handleResponse = (data: FileUploadSuccessResponse) => {
		onChangeStatus(type, UploadingStatus.UPLOADED);
		onChangeUploadedDate(type, data.result?.dateUpload);
	};

	const onDropAccepted = useCallback((acceptedFiles: File[]) => {
		// @TODO: remove console and add real implementation
		// eslint-disable-next-line no-console
		if (acceptedFiles.length) {
			// check if the employee data is uploaded or any data is uploading
			if (!employeeUploadingStatus && type !== 'employee') {
				onChangeStatus(type, UploadingStatus.UPLOADING_BEFORE_EMPLOYEE);
				return;
			} else if (isAnyDataUploading(overallStatus)) {
				onChangeStatus(type, UploadingStatus.UPLOADING_OVERLAPPED);
				return;
			}
			onChangeFileName(type, acceptedFiles[0].name);
			const uploadUrl = getUploadUrlByType(type);
			const formData = new FormData();
			formData.append('file', acceptedFiles[0]);
			Papa.parse(acceptedFiles[0], {
				header: true,
				complete: (results) => {
					onChangeRecords(type, results.data.length - 1);
					onChangeStatus(type, UploadingStatus.UPLOADING);
					axios
						.post(uploadUrl, formData, {
							headers: {
								'Content-Type': 'multipart/form-data',
							},
							onUploadProgress: handleUploadProgress,
						})
						.then((res: AxiosResponse<FileUploadSuccessResponse>) => {
							res.data && handleResponse(res.data);
						})
						.catch((error: AxiosError<FileUploadValidationError>) => {
							error.response && handleError(error.response.data);
						});
				},
			});
		}
	}, []);

	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		// file size exceed notification
		if (rejectedFiles.length) {
			const message = rejectedFiles[0].errors[0]?.message;
			notify({
				message,
				position: 'bottom-right',
				type: 'error',
			});
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'text/csv': ['.csv'] },
		onDropAccepted,
		onDropRejected,
	});

	const renderIdleStatus = (
		isEmployeeData: boolean,
		isEmployeeDataUploaded: boolean
	) => {
		const isEmployeeDataOrEmployeeDataUploaded =
			isEmployeeData || isEmployeeDataUploaded;

		return (
			<div className='shadow-sm rounded-md mt-6 bg-white hover:cursor-pointer'>
				<div
					{...getRootProps({
						className: 'p-6 ml-6 flex justify-center items-center',
					})}
				>
					{isEmployeeDataOrEmployeeDataUploaded ? (
						<Icon width={56} height={56} stroke='none' icon='illustration' />
					) : (
						<Icon
							width={56}
							height={56}
							stroke='none'
							icon='illustration-gray'
						/>
					)}
					<input {...getInputProps({})} className='bg-white' />
					<div className='text-center ml-12'>
						<Text
							className={clsx('font-medium', {
								'text-primary-600': isEmployeeDataOrEmployeeDataUploaded,
								'text-gray-300': !isEmployeeDataOrEmployeeDataUploaded,
							})}
							as='span'
						>
							Click Upload
						</Text>
						<Text
							className={clsx({
								'text-gray-600': isEmployeeDataOrEmployeeDataUploaded,
								'text-gray-300': !isEmployeeDataOrEmployeeDataUploaded,
							})}
							as='span'
						>
							{' '}
							or drag and drop
						</Text>
						<Text
							as='p'
							className={clsx('text-center mt-2', {
								'text-gray-600': isEmployeeDataOrEmployeeDataUploaded,
								'text-gray-300': !isEmployeeDataOrEmployeeDataUploaded,
							})}
						>
							CSV (max. 5mb)
						</Text>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			{status === UploadingStatus.IDLE &&
				renderIdleStatus(isEmployeeData, employeeUploadingStatus)}
			{status === UploadingStatus.UPLOADING && (
				<DropzoneUploading
					fileName={fileName}
					records={records}
					percent={percent}
					type={type}
				/>
			)}
			{(status === UploadingStatus.ERROR ||
				status === UploadingStatus.HEADERS_VALIDATION_ERROR ||
				status === UploadingStatus.DATA_VALIDATION_ERROR ||
				status === UploadingStatus.FILE_VALIDATION_ERROR) && (
				<DropzoneError
					errors={errors}
					errorType={status}
					fileName={fileName}
					onChangeStatus={onChangeStatus}
					type={type}
				/>
			)}
			{status === UploadingStatus.UPLOADED && (
				<DropzoneUploaded
					onChangeStatus={onChangeStatus}
					fileName={fileName}
					records={records}
					type={type}
					uploadedDate={uploadedDate}
				/>
			)}
			{status === UploadingStatus.UPLOADING_BEFORE_EMPLOYEE && (
				<DropzoneWarning warningType='preloading' />
			)}
			{status === UploadingStatus.UPLOADING_OVERLAPPED && (
				<DropzoneWarning warningType='overlapping' />
			)}
		</div>
	);
};

export default Dropzone;
