export interface Department {
	id: string | number;
	name: string;
	employeesCount: number;
}

export interface Location {
	id: string | number;
	name: string;
	code: string;
	employeesCount: number;
}

export interface Manager {
	id: string | number;
	name: string;
	img: string;
	employeesCount: number;
}

export interface Employee {
	id: string | number;
	name: string;
	role: string;
}

export type Team = Array<Employee>;

export type UploadDataStatusResponse = {
	isUploaded: boolean;
	fileName: string;
	rowCount: number;
	dateUpload: Date;
	isAvailable: boolean;
};

export type UploadDataResponse = {
	success: boolean;
	statusCode: number;
	result: {
		employeeData: UploadDataStatusResponse;
		compensationData: UploadDataStatusResponse;
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
