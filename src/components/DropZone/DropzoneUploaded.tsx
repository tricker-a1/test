import Icon from '../Icon';
import { Text } from '../Text';
import { getUploadedNameByType, formatDateTime } from '../../utils';
import { UploadingStatus } from '../../constants';

export type DropzoneUploadedProps = {
	fileName: string;
	records: number;
	type: UploadDataType;
	uploadedDate: Date | null;
	onChangeStatus: (
		type: UploadDataType,
		value: UploadDataCurrentStatus
	) => void;
};

const DropzoneUploaded = ({
	records,
	type,
	uploadedDate,
	fileName,
	onChangeStatus,
}: DropzoneUploadedProps) => (
	<div className='container flex shadow-sm rounded-md mt-6 bg-white py-6 px-4 gap-6 items-center min-h-40 justify-between'>
		<div>
			<div className='rounded-full bg-success-25 w-14 h-14 flex items-center justify-center '>
				<Icon width={21} height={26} color='text-success-500' icon='file04' />
			</div>
		</div>
		<div className='flex-1'>
			<div className='flex justify-between items-center'>
				<Text size={14} className='text-gray-700'>
					{fileName} uploaded
				</Text>
				<Text size={14} className='text-gray-500'>
					{uploadedDate && formatDateTime(uploadedDate)}
				</Text>
			</div>
			<Text size={14} className='text-gray-500 mt-2' align='left'>
				100% complete • {records}/{records} {getUploadedNameByType(type)}{' '}
				records uploaded
			</Text>
			<div className='flex items-center mt-1 text-green-400'>
				<Icon width={18} height={18} icon='left' />
				<button
					className='ml-[10px]'
					onClick={() => onChangeStatus(type, UploadingStatus.IDLE)}
				>
					Try again
				</button>
			</div>
		</div>
		<div className='flex items-center justify-center'>
			<div className='w-8 h-8 bg-success-500 flex items-center justify-center rounded-sm'>
				<Icon width={16} height={16} stroke='none' icon='vector' />
			</div>
		</div>
	</div>
);

export default DropzoneUploaded;
