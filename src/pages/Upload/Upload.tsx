import React, { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

import { DropZone } from '../../components/DropZone';
import { Page } from '../../components/Page';
import { Text } from '../../components';
import { StepIntroduction } from '../../components/StepIntroduction';
import Icon from '../../components/Icon';
import { Spinner } from '../../components/Spinner';

import { UploadingStatus, serverUrl } from '../../constants';
import { useGetUploadStatusQuery } from '../../store/slices/upload';

export type UploadCardProps = {
	titleIcon: ReactNode;
	title: string;
	isEmployeeData?: boolean;
	isEmployeeDataUploaded?: boolean;
	type: UploadDataType;
	templateUrl: string;
};

const Upload = () => {
	const { data, isFetching } = useGetUploadStatusQuery();

	const [fileName, setFileName] = useState({
		employee: '',
		compensation: '',
		compensationBands: '',
		equity: '',
		performanceRating: '',
	});

	const [records, setRecords] = useState({
		employee: 0,
		compensation: 0,
		compensationBands: 0,
		equity: 0,
		performanceRating: 0,
	});

	const [uploadedDate, setUploadedDate] = useState({
		employee: new Date(),
		compensation: new Date(),
		compensationBands: new Date(),
		equity: new Date(),
		performanceRating: new Date(),
	});

	const [percent, setPercent] = useState(0);
	const [errors, setErrors] = useState<{
		headerErrors: HeaderValidationError[];
		rowErrors: DataValidationError;
	}>({
		headerErrors: [],
		rowErrors: {},
	});

	const [status, setStatus] = useState({
		employee: UploadingStatus.IDLE,
		compensation: UploadingStatus.IDLE,
		equity: UploadingStatus.IDLE,
		compensationBands: UploadingStatus.IDLE,
		performanceRating: UploadingStatus.IDLE,
	});

	useEffect(() => {
		if (data?.result) {
			const { result } = data;
			const employeeStatus = result.employeeData?.isUploaded;
			const compensationStatus = result.compensationData?.isUploaded;
			const equityStatus = result.equity?.isUploaded;
			const compensationBandsStatus = result.compensationBands?.isUploaded;
			const performanceRatingsStatus = result.performanceRating?.isUploaded;
			const employeeFileName = result.employeeData?.fileName;
			const compensationFileName = result.compensationData?.fileName;
			const equityFileName = result.equity?.fileName;
			const compensationBandsFileName = result.compensationBands?.fileName;
			const performanceRatingFileName = result.performanceRating?.fileName;
			const employeeUploadedDate = result.employeeData?.dateUpload;
			const compensationUploadedDate = result.compensationData?.dateUpload;
			const equityUploadedDate = result.equity?.dateUpload;
			const compensationBandsUploadedDate =
				result.compensationBands?.dateUpload;
			const performanceRatingUploadedDate =
				result.performanceRating?.dateUpload;
			const employeeTotalRecords = result.employeeData?.rowCount;
			const compensationTotalRecords = result.compensationData?.rowCount;
			const equityTotalRecords = result.equity?.rowCount;
			const compensationBandsTotalRecords = result.compensationBands?.rowCount;
			const performanceRatingTotalRecords = result.performanceRating?.rowCount;

			setStatus({
				employee: employeeStatus
					? UploadingStatus.UPLOADED
					: UploadingStatus.IDLE,
				compensation: compensationStatus
					? UploadingStatus.UPLOADED
					: UploadingStatus.IDLE,
				equity: equityStatus ? UploadingStatus.UPLOADED : UploadingStatus.IDLE,
				compensationBands: compensationBandsStatus
					? UploadingStatus.UPLOADED
					: UploadingStatus.IDLE,
				performanceRating: performanceRatingsStatus
					? UploadingStatus.UPLOADED
					: UploadingStatus.IDLE,
			});
			setFileName({
				...fileName,
				employee: employeeFileName,
				compensation: compensationFileName,
				equity: equityFileName,
				compensationBands: compensationBandsFileName,
				performanceRating: performanceRatingFileName,
			});
			setUploadedDate({
				...uploadedDate,
				employee: employeeUploadedDate,
				compensation: compensationUploadedDate,
				equity: equityUploadedDate,
				compensationBands: compensationBandsUploadedDate,
				performanceRating: performanceRatingUploadedDate,
			});
			setRecords({
				...records,
				employee: employeeTotalRecords,
				compensation: compensationTotalRecords,
				equity: equityTotalRecords,
				compensationBands: compensationBandsTotalRecords,
				performanceRating: performanceRatingTotalRecords,
			});
		}
	}, [data]);

	if (!data || isFetching) return <Spinner loading={isFetching} />;

	const handleChangeRecords = (type: UploadDataType, newRecords: number) => {
		setRecords({
			...records,
			[type]: newRecords,
		});
	};

	const handleChangeFileName = (type: UploadDataType, name: string) => {
		setFileName({
			...fileName,
			[type]: name,
		});
	};

	const handleChangePercent = (value: number) => {
		setPercent(value);
	};

	const handleChangeErrors = (
		validationErrors: HeaderValidationError[] | DataValidationError
	) => {
		if (validationErrors instanceof Array) {
			setErrors({
				...errors,
				headerErrors: validationErrors,
			});
		} else {
			setErrors({
				...errors,
				rowErrors: validationErrors,
			});
		}
	};

	const handleChangeStatus = (
		type: UploadDataType,
		uploadedStatus: UploadDataCurrentStatus
	) => {
		setStatus({
			...status,
			[type]: uploadedStatus,
		});
	};

	const handleUploadedDate = (type: UploadDataType, date: Date) => {
		setUploadedDate({
			...uploadedDate,
			[type]: date,
		});
	};

	const UploadCard: React.FC<UploadCardProps> = ({
		titleIcon,
		title,
		isEmployeeData = false,
		type,
		templateUrl,
	}) => {
		const currentEmployeeUploadingStatus =
			status.employee === UploadingStatus.UPLOADED;
		const isEmployeeDataOrEmployeeDataUploaded =
			isEmployeeData || currentEmployeeUploadingStatus;
		return (
			<div className='bg-[#f8f9fb] p-6 rounded-lg'>
				<div className='flex justify-between'>
					<div className='flex flex-row items-center'>
						{titleIcon}
						<Text
							as='span'
							size={20}
							className={clsx('ml-3 font-medium', {
								'text-gray-900': isEmployeeDataOrEmployeeDataUploaded,
								'text-gray-400': !isEmployeeDataOrEmployeeDataUploaded,
							})}
						>
							{title}
						</Text>
					</div>
					<div className='flex flex-row items-center justify-center'>
						<Icon
							icon='download01'
							width={18}
							height={18}
							className={clsx('mr-2', {
								'text-primary-500': isEmployeeDataOrEmployeeDataUploaded,
								'text-gray-400': !isEmployeeDataOrEmployeeDataUploaded,
							})}
						/>
						<a
							download
							className={clsx('font-medium', {
								'text-primary-500': isEmployeeDataOrEmployeeDataUploaded,
								'text-gray-400': !isEmployeeDataOrEmployeeDataUploaded,
							})}
							href={templateUrl}
						>
							Download Template
						</a>
					</div>
				</div>
				<DropZone
					isEmployeeData={isEmployeeData}
					type={type}
					employeeUploadingStatus={currentEmployeeUploadingStatus}
					onChangeRecords={handleChangeRecords}
					onChangeStatus={handleChangeStatus}
					onChangePercent={handleChangePercent}
					onChangeErrors={handleChangeErrors}
					onChangeUploadedDate={handleUploadedDate}
					onChangeFileName={handleChangeFileName}
					fileName={fileName[type]}
					records={records[type]}
					percent={percent}
					overallStatus={status}
					status={status[type]}
					errors={errors}
					uploadedDate={uploadedDate[type]}
				/>
			</div>
		);
	};

	return (
		<Page withTitle>
			<div className='p-[32px]'>
				<StepIntroduction />
				<div className='grid grid-cols-2 gap-8'>
					<UploadCard
						titleIcon={
							<Icon width={20} height={18} icon='users' color='text-gray-400' />
						}
						title='Employee Data'
						isEmployeeData
						type='employee'
						templateUrl={`${serverUrl}/template/employeeData`}
					/>
					<UploadCard
						titleIcon={
							<Icon
								width={20}
								height={20}
								icon='currency-dollar-circle'
								color='text-gray-400'
							/>
						}
						title='Compensation Data'
						type='compensation'
						templateUrl={`${serverUrl}/template/compensationData`}
					/>
					<UploadCard
						titleIcon={
							<Icon
								width={20}
								height={18}
								icon='coins-stacked'
								color='text-gray-400'
							/>
						}
						title='Equity'
						type='equity'
						templateUrl={`${serverUrl}/template/equity`}
					/>
					<UploadCard
						titleIcon={
							<Icon
								width={20}
								height={18}
								icon='credit-card-refresh'
								color='text-gray-400'
							/>
						}
						title='Compensation Bands'
						type='compensationBands'
						templateUrl={`${serverUrl}/template/compensationBands`}
					/>
					<UploadCard
						titleIcon={
							<Icon width={20} height={20} icon='star' color='text-gray-400' />
						}
						title='Performance Ratings'
						type='performanceRating'
						templateUrl={`${serverUrl}/template/performanceRating`}
					/>
				</div>
			</div>
		</Page>
	);
};

export default Upload;
