import Icon from '../Icon';
import { Text } from '../Text';
import Button from '../Button';

export type DataUploadedStatus = {
	employeeData: boolean;
	compensationData: boolean;
};

export type OrganizationZeroStatusProps = {
	dataUploadedStatus: DataUploadedStatus;
};

const OrganizationZeroStatus = (props: OrganizationZeroStatusProps) => {
	const { dataUploadedStatus } = props;

	const renderTextByStatus = (status: DataUploadedStatus) => {
		const { employeeData, compensationData } = status;
		let renderElement = null;

		if (!employeeData && !compensationData) {
			renderElement = (
				<Text as='p' size={18} className='text-gray-700 text-center'>
					Please upload empoyee and compensation data by following <br />
					the instructions in Data Upload Section
				</Text>
			);
		} else if (employeeData && !compensationData) {
			renderElement = (
				<Text as='p' size={18} className='text-gray-700 text-center'>
					Please upload compensation data by following <br />
					the instructions in Data Upload Section
				</Text>
			);
		}
		return renderElement;
	};

	return (
		<div className='flex items-center justify-center flex-col mt-36'>
			<Icon icon='organization-zero-status' width={188} height={140} />
			<div className='mt-9'>{renderTextByStatus(dataUploadedStatus)}</div>
			<Button
				as='link'
				linkProps={{
					to: '/upload',
				}}
				className='mt-9'
				variant='primary'
			>
				<Text as='span' size={16} className='text-white'>
					Go to Data Uplaod Section
				</Text>
			</Button>
		</div>
	);
};

export default OrganizationZeroStatus;
