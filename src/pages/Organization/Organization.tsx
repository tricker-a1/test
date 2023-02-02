// modules
import React, { useState, useMemo, useEffect } from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
// components
import { Page } from '../../components/Page';
import { ChartCard } from '../../components/ChartdCard';
import { DataTable } from '../../components/DataTable';
import { Text } from '../../components';
import { OrganizationZeroStatus } from '../../components/OrganizationZeroStatus';
import { EmployeeStatus } from '../../components/DataTable/EmployeeStatus';
import { Avatar } from '../../components/Avatar';
import Badge from '../../components/Badge/Badge';
import { CustomRange } from '../../components/CustomRange';
import Icon from '../../components/Icon';
import Filter from '../../components/Filter';
import Select, { SelectOptionType } from '../../components/Select';
import Column from '../../components/Column/Column';
import { EditorMode } from '../../components/EditorMode';
import Button from '../../components/Button';
import { TableShowMode } from '../../components/TableShowMode';

// utils
import { mockData, mockSelectOptions } from '../../constants';
import { randomChartBgColors } from '../../constants';
import { barChartLables } from '../../constants';
import { mockColumns } from '../../constants';
import { formatDateForTable, getRandomColorsForTypesBadge } from '../../utils';
import { useGetUploadStatusQuery } from '../../store/slices/upload';
import { Spinner } from '../../components/Spinner';
import { useGetEmployeeQuery } from '../../store/slices/employee';

const rednerDataTableCell = (
	info: CellContext<EmployeeTableColumn, any>,
	genderBadgeColors: RandomBadgeColors,
	departmentBadgeColors: RandomBadgeColors,
	jobCategoryBadgeColors: RandomBadgeColors
) => {
	const value = info.getValue();
	const id = info.column.id;

	switch (id) {
		case 'department': {
			const variant = departmentBadgeColors[value];
			return <Badge value={value} variant={variant} />;
		}
		case 'full_name':
			return (
				<div className='flex items-center justify-start'>
					<Avatar size='sm' />
					<Text as='span' size={14} className='ml-3 font-medium text-gray-700'>
						{value}
					</Text>
				</div>
			);
		case 'gender': {
			const variant = genderBadgeColors[value];
			return <Badge value={value} variant={variant} />;
		}
		case 'job_category': {
			const variant = jobCategoryBadgeColors[value];
			return <Badge value={value} variant={variant} isCapitalize={true} />;
		}
		case 'hire_date': {
			return (
				<Text as='span' className='text-gray-700'>
					{formatDateForTable(value)}
				</Text>
			);
		}
		case 'local_min_mid_max':
			return (
				<CustomRange
					minValue={12000}
					value={16000}
					maxValue={24000}
					disabled={true}
					buttonVariant='linear-gradient(90deg, #B6A1FA -13.54%, #9679FA 75.64%, #593BF5 155.99%)'
				/>
			);
		case 'location':
			return (
				<div className='flex items-center justify-center'>
					{value === 'US' ? (
						<Icon icon='us' type='flag' />
					) : (
						<Icon icon='eu' type='flag' />
					)}
					<Text as='span' size={14} className='ml-2'>
						{value.toUpperCase()}
					</Text>
				</div>
			);
		case 'manager_name':
			return (
				<div className='flex items-center justify-start'>
					<Avatar size='sm' />
					<Text as='span' size={14} className='ml-3 font-medium text-gray-700'>
						{value}
					</Text>
				</div>
			);
		case 'status':
			return <EmployeeStatus value={value} />;
		case 'usd_min_mid_max':
			return (
				<CustomRange
					minValue={14000}
					value={18000}
					maxValue={20000}
					disabled={true}
					buttonVariant='linear-gradient(90deg, #9ADBB4 -13.54%, #48C280 75.64%, #05A85F 155.99%)'
				/>
			);
		default:
			return (
				<Text as='span' className='text-gray-700'>
					{value}
				</Text>
			);
	}
};

const Organization: React.FC = () => {
	const {
		data: statusData,
		isFetching: isUploadStatusFetching,
		refetch,
	} = useGetUploadStatusQuery();
	const { data: employeeData, isFetching: isEmployeeDataFetching } =
		useGetEmployeeQuery();

	const [searchSelectKey, setSearchSelectKey] =
		useState<SelectOptionType | null>(null);

	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		refetch();
	}, []);

	const filterOptions = useMemo(() => {
		const initialOptions = [...mockSelectOptions];
		initialOptions.unshift({
			label: 'RECENTLY SEARCHED',
			img: '',
			value: '',
		});
		return initialOptions;
	}, [mockSelectOptions]);

	if (
		!statusData ||
		isUploadStatusFetching ||
		isEmployeeDataFetching ||
		!employeeData
	)
		return <Spinner loading={isUploadStatusFetching} />;

	const { result: statusResult } = statusData;
	const dataUploadedStatus = {
		employeeData: statusResult.employeeData.isUploaded,
		compensationData: statusResult.compensationData.isUploaded,
	};

	const { result: employeeResults } = employeeData;

	const employeeRows = employeeResults.data.map((employee) => ({
		id: employee.id,
		status: employee.status,
		full_name: employee.legalName,
		employee_id: employee.employeeId,
		gender: employee.gender,
		hire_date: employee.hireDate,
		total_tenure: employee.totalTenure,
		race: employee.ethnicity,
		location: employee.country,
		job_title: employee.jobTitle,
		manager_name: employee.managerName,
		manager_id: employee.managerId,
		department: employee.department,
		job_category: employee.jobCategory,
		job_level: employee.jobLevel,
		full_time: employee.employmentType ? 'Yes' : 'No',
		compensation_ratio: employee.compensationRatio
			? employee.compensationRatio
			: '9%',
		local_currency: employee.currency ? employee.currency : 'US$',
		local_annual_salary: employee.salaryLocal ? employee.salaryLocal : 12000,
		local_min_mid_max: 16000,
		usd_min_mid_max: 12000,
		percent_variable_pay: employee.variablePayPercent
			? employee.variablePayPercent + '%'
			: '15%',
		local_variable_pay: employee.variablePayLocal
			? employee.variablePayLocal
			: 17000,
		usd_variable_pay: employee.variablePay ? employee.variablePay : 17500,
		percent_equity_target: employee.equityTargetPercent,
		local_equity_target: employee.equityTargetLocal,
		usd_equity_target: employee.equityTarget,
		local_current_equity: employee.equityTargetHoldingValueLocal,
		usd_current_equity: employee.equityTargetHoldingValue,
	}));

	const isAllDataUploaded =
		dataUploadedStatus.employeeData && dataUploadedStatus.compensationData;

	const handleFilterOptionsChange = (options: number[]) => {
		// @Todo filter options that will be included in the api call
		console.error(options);
	};

	const genderBadgeColors = getRandomColorsForTypesBadge([
		'Male',
		'Female',
		'Other',
	]); //generate random colors for different types

	const departments: string[] = [];
	const jobCategories: string[] = [];

	employeeResults.data.map((employee) => {
		if (!departments.includes(employee.department)) {
			departments.push(employee.department);
		}
		return departments;
	});

	employeeResults.data.map((employee) => {
		if (!jobCategories.includes(employee.jobCategory)) {
			jobCategories.push(employee.jobCategory);
		}
		return jobCategories;
	});

	const departmentBadgeColors = getRandomColorsForTypesBadge(departments);
	const jobCategoryBadgeColors = getRandomColorsForTypesBadge(jobCategories);

	const defaultMockColumns: ColumnDef<EmployeeTableColumn, any>[] =
		mockColumns.map((column) => ({
			accessorKey: column.accessorKey,
			id: column.id,
			header: () => {
				return (
					<>
						<Text as='p' size={12} align={column.align} className='font-medium'>
							{column.title}
						</Text>
						{column.subtitle && (
							<Text
								as='p'
								size={12}
								align={column.align}
								className='mt-1 font-normal'
							>
								{column.subtitle}
							</Text>
						)}
					</>
				);
			},
			cell: (info) => {
				return rednerDataTableCell(
					info,
					genderBadgeColors,
					departmentBadgeColors,
					jobCategoryBadgeColors
				);
			},
			align: column.align,
		}));

	const handleSelectChange = (item: SelectOptionType | null) => {
		setSearchSelectKey(item);
	};

	const handleEditMode = (checked: boolean) => {
		setEditMode(checked);
	};

	const loadOptions = (search: string) => {
		return new Promise<Array<SelectOptionType>>((resolve) => {
			setTimeout(() => {
				resolve(
					mockSelectOptions.filter(({ label }) =>
						label.toLowerCase().includes(search.toLowerCase())
					)
				);
			}, 2000);
		});
	};

	const renderPageByStatus = (status: boolean) => {
		return status ? (
			<Page title='Big Stripe' subtitle='365 employees'>
				<div className='grid grid-cols-4 gap-8 mt-8'>
					<ChartCard
						data={mockData.department}
						bgColors={randomChartBgColors}
						cardTitle='By Department'
						labelSize={10}
						type='doughnut'
					/>
					<ChartCard
						data={mockData.location}
						bgColors={randomChartBgColors}
						cardTitle='By Location'
						type='doughnut'
					/>
					<ChartCard
						data={mockData.gender}
						bgColors={randomChartBgColors}
						cardTitle='By Gender'
						type='doughnut'
					/>
					<ChartCard
						data={mockData.compensation}
						bgColors={randomChartBgColors}
						cardTitle='Compensation Ratio'
						labels={barChartLables}
						type='bar'
					/>
				</div>
				<div className='flex justify-between items-center mt-8'>
					<div className='flex gap-8 items-center justify-center'>
						<Select
							type='async'
							loadOptions={loadOptions}
							className='mx-5'
							defaultOptions={filterOptions}
							value={searchSelectKey}
							icon='search'
							isClearable
							onChange={handleSelectChange}
						/>
						<Filter onFilterOptionsChange={handleFilterOptionsChange} />
						<Column />
					</div>
					<div className='flex gap-9 items-center'>
						<EditorMode onChange={handleEditMode} mode={editMode} />
						<Button icon='icon-left' variant='secondary'>
							<Text as='span' size={14} className='text-gray-600'>
								Export
							</Text>
						</Button>
						<TableShowMode />
					</div>
				</div>
				<DataTable
					defaultColumns={defaultMockColumns}
					tableRows={employeeRows}
				/>
			</Page>
		) : (
			<Page title='Big Stripe'>
				<OrganizationZeroStatus dataUploadedStatus={dataUploadedStatus} />
			</Page>
		);
	};
	return <div>{renderPageByStatus(isAllDataUploaded)}</div>;
};

export default Organization;
