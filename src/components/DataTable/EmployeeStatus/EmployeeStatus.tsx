import clsx from 'clsx';

export type EmployeeStatusProps = {
	value: string;
};

const EmployeeStatus = ({ value }: EmployeeStatusProps) => {
	return (
		<div className='flex items-center justify-center'>
			<div
				className={clsx(
					'rounded-full w-3 h-3',
					value === 'Active' ? 'bg-success-500' : 'bg-red-500'
				)}
			></div>
		</div>
	);
};

export default EmployeeStatus;
