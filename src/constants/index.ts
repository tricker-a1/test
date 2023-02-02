export const serverUrl =
	process.env.REACT_APP_ENVIRONMENT === 'local'
		? 'http://localhost:3001/api/v1'
		: 'https://dev-api.compiify.com/api/v1';

export const getUploadUrlByType = (type: UploadDataType) => {
	switch (type) {
		case 'equity':
			return `${serverUrl}/upload/${type}`;
		case 'compensationBands':
			return `${serverUrl}/upload/compensationBands`;
		case 'performanceRating':
			return `${serverUrl}/upload/performaceRating`;
		default:
			return `${serverUrl}/upload/${type}Data`;
	}
};

export enum UploadingStatus {
	IDLE = 'idle',
	UPLOADING = 'uploading',
	ERROR = 'error',
	UPLOADED = 'uploaded',
	UPLOADING_BEFORE_EMPLOYEE = 'uploading_before_employee',
	UPLOADING_OVERLAPPED = 'uploading_overlapped',
	HEADERS_VALIDATION_ERROR = 'headers_validation_error',
	DATA_VALIDATION_ERROR = 'data_validation_error',
	FILE_VALIDATION_ERROR = 'file_validation_error',
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// @Todo replace these when chart data from backend is ready
export const mockData = {
	department: {
		results: [
			{
				name: 'Sales',
				value: 29,
				count: 85,
			},
			{
				name: 'Design',
				value: 17,
				count: 50,
			},
			{
				name: 'Management',
				value: 8,
				count: 24,
			},
			{
				name: 'HR',
				value: 6,
				count: 19,
			},
			{
				name: 'Finance',
				value: 5,
				count: 15,
			},
			{
				name: 'Development',
				value: 5,
				count: 15,
			},
		],
		totalValue: 293,
	},
	location: {
		results: [
			{
				name: 'Canada',
				value: 27,
				count: 80,
			},
			{
				name: 'Australia',
				value: 10,
				count: 30,
			},
			{
				name: 'United Kingdom',
				value: 27,
				count: 80,
			},
			{
				name: 'India',
				value: 10,
				count: 30,
			},
			{
				name: 'USA',
				value: 10,
				count: 30,
			},
			{
				name: 'Europe',
				value: 14,
				count: 43,
			},
		],
		totalValue: 293,
	},
	gender: {
		results: [
			{
				name: 'Male',
				value: 34,
				count: 100,
			},
			{
				name: 'Female',
				value: 51,
				count: 150,
			},
			{
				name: 'Others',
				value: 15,
				count: 43,
			},
		],
		totalValue: 293,
	},
	compensation: {
		labels: ['Male', 'Female', 'Others'],
		results: [{ value: 0.8 }, { value: 1.2 }, { value: 0.7 }],
	},
};

export const randomChartBgColors = [
	'#025494',
	'#0997DD',
	'#50C0F1',
	'#FD8EA6',
	'#EE46BC',
	'#890089',
];

export const barChartLables = ['Male', 'Female', 'Others'];

export const mockColumns: {
	accessorKey: string;
	id: string;
	title: string;
	align: 'center' | 'left' | 'right';
	subtitle?: string;
}[] = [
	{
		accessorKey: 'status',
		id: 'status',
		title: 'Status',
		align: 'center',
	},
	{
		accessorKey: 'full_name',
		id: 'full_name',
		title: 'Full Name',
		align: 'left',
	},
	{
		accessorKey: 'employee_id',
		id: 'employee_id',
		title: 'Employee Id',
		align: 'center',
	},
	{
		accessorKey: 'gender',
		id: 'gender',
		title: 'Gender',
		align: 'center',
	},
	{
		accessorKey: 'hire_date',
		id: 'hire_date',
		title: 'Hire Date',
		align: 'center',
	},
	{
		accessorKey: 'total_tenure',
		id: 'total_tenure',
		title: 'Total Tenure',
		align: 'left',
	},
	{
		accessorKey: 'race',
		id: 'race',
		title: 'Race',
		align: 'left',
	},
	{
		accessorKey: 'location',
		id: 'location',
		title: 'Location',
		align: 'left',
	},
	{
		accessorKey: 'job_title',
		id: 'job_title',
		title: 'Job Title',
		align: 'left',
	},
	{
		accessorKey: 'manager_name',
		id: 'manager_name',
		title: 'Reporting Manager',
		align: 'left',
	},
	{
		accessorKey: 'manager_id',
		id: 'manager_id',
		title: 'Reporting Manager',
		subtitle: 'Employee ID',
		align: 'center',
	},
	{
		accessorKey: 'department',
		id: 'department',
		title: 'Department',
		align: 'center',
	},
	{
		accessorKey: 'job_category',
		id: 'job_category',
		title: 'Job Category',
		align: 'center',
	},
	{
		accessorKey: 'job_level',
		id: 'job_level',
		title: 'Job Level',
		align: 'center',
	},
	{
		accessorKey: 'full_time',
		id: 'full_time',
		title: 'Full Time',
		align: 'center',
	},
	{
		accessorKey: 'compensation_ratio',
		id: 'compensation_ratio',
		title: 'Compensation',
		subtitle: 'Ratio',
		align: 'right',
	},
	{
		accessorKey: 'local_currency',
		id: 'local_currency',
		title: 'Local Currency',
		align: 'center',
	},
	{
		accessorKey: 'local_annual_salary',
		id: 'local_annual_salary',
		title: 'Annual Salary',
		subtitle: '(local currency)',
		align: 'right',
	},
	{
		accessorKey: 'usd_annual_salary',
		id: 'usd_annual_salary',
		title: 'Annual Salary',
		subtitle: '(US$)',
		align: 'right',
	},
	{
		accessorKey: 'local_min_mid_max',
		id: 'local_min_mid_max',
		title: 'Min - Mid -Max',
		subtitle: '(local currency)',
		align: 'center',
	},
	{
		accessorKey: 'usd_min_mid_max',
		id: 'usd_min_mid_max',
		title: 'Min - Mid - Max',
		subtitle: '(US$)',
		align: 'center',
	},
	{
		accessorKey: 'percent_variable_pay',
		id: 'percent_variable_pay',
		title: 'Variable Pay',
		subtitle: '(%)',
		align: 'center',
	},
	{
		accessorKey: 'local_variable_pay',
		id: 'local_variable_pay',
		title: 'Variable Pay',
		subtitle: '(local currency)',
		align: 'right',
	},
	{
		accessorKey: 'usd_variable_pay',
		id: 'usd_variable_pay',
		title: 'Variable Pay',
		subtitle: '(US$)',
		align: 'right',
	},
	{
		accessorKey: 'percent_equity_target',
		id: 'percent_equity_target',
		title: 'Equity Target',
		subtitle: '(%)',
		align: 'center',
	},
	{
		accessorKey: 'local_equity_target',
		id: 'local_equity_target',
		title: 'Equity Target',
		subtitle: '(local currency)',
		align: 'right',
	},
	{
		accessorKey: 'usd_equity_target',
		id: 'usd_equity_target',
		title: 'Equity Target',
		subtitle: '(US$)',
		align: 'right',
	},
	{
		accessorKey: 'local_current_equity',
		id: 'local_current_equity',
		title: 'Current Equity Holding',
		subtitle: 'Value (local currency)',
		align: 'right',
	},
	{
		accessorKey: 'usd_current_equity',
		id: 'usd_current_equity',
		title: 'Current Equity Holding',
		subtitle: 'Value (US$)',
		align: 'right',
	},
];

export const mockTableData = [
	{
		status: 'active',
		full_name: 'Markoyan Babardov',
		employee_id: 'U003',
		gender: 'male',
		hire_date: '2/1/2020',
		total_tenture: '2 years 10 months',
		race: 'Hispanic',
		location: 'us',
		job_title: 'Member of Techinical Staff1',
		manager_name: 'Christiano Ronaldo',
		manager_id: 'U004',
		department: 'engineering',
		job_category: 'ic',
		job_level: 1,
		full_time: true,
		compensation_ratio: '9%',
		local_currency: 'USD',
		local_annual_salary: 170000,
		usd_annual_salary: 180000,
		local_min_mid_max: 190000,
		usd_min_mid_max: 200000,
		percent_variable_pay: '12%',
		local_variable_pay: 24000,
		usd_variable_pay: 24000,
		percent_equity_target: '10%',
		local_equity_target: 11000,
		usd_equity_target: 13000,
		local_current_equity: 400000,
		usd_current_equity: 400000,
	},
	{
		status: 'active',
		full_name: 'Markoyan Babardov',
		employee_id: 'U003',
		gender: 'female',
		hire_date: '2/1/2020',
		total_tenture: '2 years 10 months',
		race: 'Hispanic',
		location: 'eu',
		job_title: 'Member of Techinical Staff1',
		manager_name: 'Christiano Ronaldo',
		manager_id: 'U004',
		department: 'engineering',
		job_category: 'mgr',
		job_level: 1,
		full_time: true,
		compensation_ratio: '9%',
		local_currency: 'USD',
		local_annual_salary: 170000,
		usd_annual_salary: 180000,
		local_min_mid_max: 190000,
		usd_min_mid_max: 200000,
		percent_variable_pay: '12%',
		local_variable_pay: 24000,
		usd_variable_pay: 24000,
		percent_equity_target: '10%',
		local_equity_target: 11000,
		usd_equity_target: 13000,
		local_current_equity: 400000,
		usd_current_equity: 400000,
	},
	{
		status: 'active',
		full_name: 'Markoyan Babardov',
		employee_id: 'U003',
		gender: 'male',
		hire_date: '2/1/2020',
		total_tenture: '2 years 10 months',
		race: 'Hispanic',
		location: 'eu',
		job_title: 'Member of Techinical Staff1',
		manager_name: 'Christiano Ronaldo',
		manager_id: 'U004',
		department: 'executive',
		job_category: 'vp',
		job_level: 1,
		full_time: true,
		compensation_ratio: '9%',
		local_currency: 'USD',
		local_annual_salary: 170000,
		usd_annual_salary: 180000,
		local_min_mid_max: 190000,
		usd_min_mid_max: 200000,
		percent_variable_pay: '12%',
		local_variable_pay: 24000,
		usd_variable_pay: 24000,
		percent_equity_target: '10%',
		local_equity_target: 11000,
		usd_equity_target: 13000,
		local_current_equity: 400000,
		usd_current_equity: 400000,
	},
	{
		status: 'active',
		full_name: 'Markoyan Babardov',
		employee_id: 'U003',
		gender: 'male',
		hire_date: '2/1/2020',
		total_tenture: '2 years 10 months',
		race: 'Hispanic',
		location: 'us',
		job_title: 'Member of Techinical Staff1',
		manager_name: 'Christiano Ronaldo',
		manager_id: 'U004',
		department: 'marketing',
		job_category: 'pm',
		job_level: 1,
		full_time: true,
		compensation_ratio: '9%',
		local_currency: 'USD',
		local_annual_salary: 170000,
		usd_annual_salary: 180000,
		local_min_mid_max: 190000,
		usd_min_mid_max: 200000,
		percent_variable_pay: '12%',
		local_variable_pay: 24000,
		usd_variable_pay: 24000,
		percent_equity_target: '10%',
		local_equity_target: 11000,
		usd_equity_target: 13000,
		local_current_equity: 400000,
		usd_current_equity: 400000,
	},
	{
		status: 'active',
		full_name: 'Markoyan Babardov',
		employee_id: 'U003',
		gender: 'others',
		hire_date: '2/1/2020',
		total_tenture: '2 years 10 months',
		race: 'Hispanic',
		location: 'us',
		job_title: 'Member of Techinical Staff1',
		manager_name: 'Christiano Ronaldo',
		manager_id: 'U004',
		department: 'engineering',
		job_category: 'vp',
		job_level: 1,
		full_time: true,
		compensation_ratio: '9%',
		local_currency: 'USD',
		local_annual_salary: 170000,
		usd_annual_salary: 180000,
		local_min_mid_max: 190000,
		usd_min_mid_max: 200000,
		percent_variable_pay: '12%',
		local_variable_pay: 24000,
		usd_variable_pay: 24000,
		percent_equity_target: '10%',
		local_equity_target: 11000,
		usd_equity_target: 13000,
		local_current_equity: 400000,
		usd_current_equity: 400000,
	},
	{
		status: 'active',
		full_name: 'Markoyan Babardov',
		employee_id: 'U003',
		gender: 'others',
		hire_date: '2/1/2020',
		total_tenture: '2 years 10 months',
		race: 'Hispanic',
		location: 'eu',
		job_title: 'Member of Techinical Staff1',
		manager_name: 'Christiano Ronaldo',
		manager_id: 'U004',
		department: 'executive',
		job_category: 'mgr',
		job_level: 1,
		full_time: true,
		compensation_ratio: '9%',
		local_currency: 'USD',
		local_annual_salary: 170000,
		usd_annual_salary: 180000,
		local_min_mid_max: 190000,
		usd_min_mid_max: 200000,
		percent_variable_pay: '12%',
		local_variable_pay: 24000,
		usd_variable_pay: 24000,
		percent_equity_target: '10%',
		local_equity_target: 11000,
		usd_equity_target: 13000,
		local_current_equity: 400000,
		usd_current_equity: 400000,
	},
];

export const mockFilterData: FilterOptions = {
	department: [
		{
			id: 1,
			title: 'Sales',
		},
		{
			id: 2,
			title: 'Engineering',
		},
		{
			id: 3,
			title: 'Marketing',
		},
		{
			id: 4,
			title: 'Product',
		},
	],
	gender: [
		{
			id: 5,
			title: 'Male',
		},
		{
			id: 6,
			title: 'Female',
		},
		{
			id: 7,
			title: 'Others',
		},
	],
	location: [
		{
			id: 8,
			title: 'US',
		},
		{
			id: 9,
			title: 'EU',
		},
	],
	manager: [
		{
			id: 10,
			image: '/avatar/avatar1.png',
			title: 'Christiano Ronaldo',
		},
		{
			id: 11,
			image: '/avatar/avatar1.png',
			title: 'Erling Haaland',
		},
		{
			id: 12,
			image: '/avatar/avatar1.png',
			title: 'Lionel Messi',
		},
	],
};

export const mockSelectOptions = [
	{
		value: '1',
		label: 'Leslie Alexander',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '2',
		label: 'Darlene Robertson',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '3',
		label: 'Jane Cooper',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '4',
		label: 'Albert Flores',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '5',
		label: 'Savannah Nguyen',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '6',
		label: 'Ralph Edwards',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '7',
		label: 'Saurabh Jain',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '8',
		label: 'Mark Klymovskyi',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '9',
		label: 'Asher Lee',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
	{
		value: '10',
		label: 'Anton Leusenko',
		img: 'https://www.w3schools.com/howto/img_avatar.png',
	},
];
