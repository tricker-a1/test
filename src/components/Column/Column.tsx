import Icon from '../Icon';
import { Text } from '../Text';

const Column = () => {
	return (
		<div className='flex items-center justify-center'>
			<Icon icon='column' width={16} height={16} />
			<Text as='span' size={14} className='text-gray-600 ml-2'>
				Column
			</Text>
		</div>
	);
};

export default Column;
