import Switch from 'react-switch';

import { Text } from '../Text';

export type EditorModeProps = {
	onChange: (checked: boolean) => void;
	mode: boolean;
};

const EditorMode = ({ onChange, mode }: EditorModeProps) => {
	return (
		<div className='flex items-center justify-center gap-4'>
			<Text as='span' size={14} className='text-gray-600'>
				Editor mode
			</Text>
			<Switch
				onChange={onChange}
				checked={mode}
				offColor='#eeeff4'
				uncheckedIcon={false}
				checkedIcon={false}
				onColor='#004eda'
				height={20}
				width={36}
			/>
		</div>
	);
};

export default EditorMode;
