import { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import Icon from '../Icon';
import { Text } from '../Text';
import { getUploadedNameByType } from '../../utils';

type DropzoneUploadingProps = {
	fileName?: string;
	records: number;
	percent: number;
	type: UploadDataType;
};

const DropzoneUploading = ({
	fileName,
	records,
	percent,
	type,
}: DropzoneUploadingProps) => {
	if (!fileName) return null;
	const uploadingRecordstatus = useMemo(
		() =>
			`${Math.floor(
				(records * percent) / 100
			)}/${records} ${getUploadedNameByType(type)} records`,
		[records, percent, fileName]
	);

	return (
		<div className='container flex shadow-sm rounded-md mt-6 bg-white py-6 px-4 gap-6 items-center min-h-40 justify-between'>
			<div>
				<div className='rounded-full bg-success-25 w-14 h-14 flex items-center justify-center '>
					<Icon width={21} height={26} color='text-primary-500' icon='file04' />
				</div>
			</div>
			<div className='flex-1'>
				<div className='flex justify-between text-red-700'>
					<Text size={14} className='text-gray-700'>
						{fileName} is uploading
					</Text>
				</div>
				<Text size={14} className='text-gray-500' align='left'>
					{`${percent}% complete •  ${uploadingRecordstatus}`} uploaded
				</Text>
			</div>
			<div className='flex items-center justify-center w-10 h-10'>
				<CircularProgressbar
					value={percent}
					styles={buildStyles({
						pathColor: '#4169e1',
					})}
				/>
			</div>
		</div>
	);
};

export default DropzoneUploading;
