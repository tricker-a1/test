import Icon from '../Icon';

const TableShowMode = () => {
	return (
		<div className='flex justify-cener  border-solid border border-primary-400 items-center rounded-sm'>
			<div className='bg-[#f8f9fb] px-8 py-2 flex items-center justify-center rounded-l-sm'>
				<Icon icon='rows-2' width={12} height={12} />
			</div>
			<div className='px-8 py-2'>
				<Icon icon='dataflow-04' width={12} height={12} />
			</div>
		</div>
	);
};

export default TableShowMode;
