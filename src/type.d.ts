// We can define all the types here. There is no need to export types in components then.
type CSVParseError = {
	column: string;
	rows: number[];
};

// @Todo replace with reald data type from the backend
type Employee = {
	status: string;
	full_name: string;
	employee_id: string;
	gender: 'Male' | 'Female' | 'Others';
	hire_date: string;
	total_tenture: string;
	race: string;
	location: string;
	job_title: string;
	manager_name: string;
	manager_id: string;
	department: string;
	job_category: string;
	job_level: number;
	full_time: boolean;
	compensation_ratio: string;
	local_currency: string;
	local_annual_salary: number;
	usd_annual_salary: number;
	local_min_mid_max: number;
	usd_min_mid_max: number;
	percent_variable_pay: string;
	local_variable_pay: number;
	usd_variable_pay: number;
	percent_equity_target: string;
	local_equity_target: number;
	usd_equity_target: number;
	local_current_equity: number;
	usd_current_equity: number;
};

type BadgeVariant = {
	bgColor: string;
	color: string;
};

type RandomBadgeColors = Record<string, BadgeVariant>;

type UploadDataCurrentStatus =
	| 'idle'
	| 'uploaded'
	| 'uploading'
	| 'uploading_before_employee'
	| 'error'
	| 'uploading_overlapped'
	| 'headers_validation_error'
	| 'data_validation_error'
	| 'file_validation_error';

type UploadDataType =
	| 'employee'
	| 'compensation'
	| 'equity'
	| 'compensationBands'
	| 'performanceRating';

type FilterOption = {
	id: number;
	title: string;
	image?: string;
};

type FilterOptions = {
	department: FilterOption[];
	gender: FilterOption[];
	location: FilterOption[];
	manager: FilterOption[];
};

type FileUploadValidationError = {
	error: {
		message: 'string';
		code: 'string';
	};
	result?: {
		missingHeaders?: HeaderValidationError[];
		[key: string]: number[];
	};
};

type FileUploadSuccessResponse = {
	error: null;
	result: {
		dateUpload: Date;
		rowCount: number;
		success: boolean;
	};
};

type DataValidationError = {
	[key: string]: number[];
};

type HeaderValidationError = {
	columnNumber: number;
	columnName: string;
};

type UploadDataStatusResponse = {
	isUploaded: boolean;
	fileName: string;
	rowCount: number;
	dateUpload: Date;
	isAvailable: boolean;
};

type UploadDataResponse = {
	success: boolean;
	statusCode: number;
	result: {
		employeeData: UploadDataStatusResponse;
		compensationDate: UploadDataStatusResponse;
		equity: UploadDataStatusResponse;
		compensationBands: UploadDataStatusResponse;
		performanceRating: UploadDataStatusResponse;
		organization: UploadDataStatusResponse;
	};
	error: {
		message: string;
		code: string;
	};
};

type EmployeeData = {
	id: number;
	status: 'Active' | 'Not Active';
	firstName?: string;
	lastName?: string;
	legalName: string;
	employeeId: string;
	gender: 'Male' | 'Female' | 'Other';
	hireDate: Date;
	originalHireDate?: string;
	probationPeriodEndDate?: string;
	totalTenure: string;
	ethnicity: string;
	country: string;
	region?: string;
	jobTitle: string;
	managerId: string;
	managerName: string;
	department: string;
	jobCategory: string;
	jobLevel: number;
	employmentType: boolean;
	compensationRatio: string;
	currency: string;
	salaryLocal: number;
	salaryLocal: number;
	salaryBandLocal: number;
	salary: number;
	salaryBand: number;
	variablePayPercent: number;
	variablePayLocal: number;
	variablePay: number;
	equityTargetPercent: number;
	equityTargetLocal: number;
	equityTarget: number;
	equityTargetHoldingValueLocal: number;
	equityTargetHoldingValue: number;
	image: string;
};

type EmployeeTableColumn = {
	status: 'Active' | 'Not Active';
	full_name: string;
	employee_id: string;
	gender: 'Male' | 'Female' | 'Other';
	hire_date: Date;
	total_tenure: string;
	race: string;
	location: string;
	job_title: string;
	manager_name: string;
	manager_id: string;
	department: string;
	job_category: string;
	job_level: number;
	full_time: string;
	compensation_ratio: string;
	local_currency: string;
	local_annual_salary: number;
	local_min_mid_max: number;
	usd_min_mid_max: number;
	percent_variable_pay: string;
	local_variable_pay: number;
	usd_variable_pay: number;
	percent_equity_target: number;
	local_equity_target: number;
	usd_equity_target: number;
	local_current_equity: number;
	usd_current_equity: number;
};

type EmployeeDataResponse = {
	statusCode: number;
	success: boolean;
	result: {
		data: EmployeeData[];
	};
};
