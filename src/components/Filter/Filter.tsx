/* eslint-disable @typescript-eslint/no-unused-vars */
// modules
import clsx from 'clsx';
import { FC, useState, useMemo, useCallback } from 'react';
// components
import Button, { ButtonDropdownProps } from '../Button';
import Icon, { IconType } from '../Icon';
import { Text } from '../Text';
import { FilterSection } from './FilterSection';
// types
import { FilterSectionProps } from './types';
import { mockFilterData } from '../../constants';
import { Avatar } from '../Avatar';
import { getRandomColorsForTypesBadge } from '../../utils';

interface FilterProps {
	onFilterOptionsChange: (values: number[]) => void;
}

export const Filter: FC<FilterProps> = ({ onFilterOptionsChange }) => {
	const [selectedFilterOptions, setSelectedFilterOptions] = useState<number[]>(
		[]
	);
	const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
	const [keywords, setKeyWords] = useState({
		department: '',
		location: '',
		manager: '',
	});

	const departmentColors = useMemo(
		() =>
			getRandomColorsForTypesBadge([
				'sales',
				'engineering',
				'marketing',
				'product',
			]),
		[mockFilterData]
	);

	const handleDepartmentSearch = (value: string) => {
		setKeyWords({
			...keywords,
			department: value,
		});
	};

	const handleLocationSearch = (value: string) => {
		setKeyWords({
			...keywords,
			location: value,
		});
	};

	const handleManagerSearch = (value: string) => {
		setKeyWords({
			...keywords,
			manager: value,
		});
	};

	const filteredFilterOptions = (options: FilterOption[], keyword: string) =>
		options.filter(
			(item) => !keyword || item.title.toLowerCase().includes(keyword)
		);

	const handleOptionClick = (id: number) => {
		if (selectedFilterOptions.includes(id)) {
			const newSelectedFilterOptions = selectedFilterOptions.filter(
				(option) => option !== id
			);
			setSelectedFilterOptions(newSelectedFilterOptions);
		} else {
			setSelectedFilterOptions([...selectedFilterOptions, id]);
		}
	};

	const handleClearAll = () => {
		setSelectedFilterOptions([]);
	};

	const handleApplyFilters = () => {
		onFilterOptionsChange(selectedFilterOptions);
	};

	const filters: Array<FilterSectionProps> = [
		{
			title: 'Department',
			onSearch: handleDepartmentSearch,
			items: filteredFilterOptions(
				mockFilterData.department,
				keywords.department
			).map((item) => {
				return {
					id: item.id,
					title: item.title,
					renderIcon: (
						<div
							className='w-2 h-2 rounded-full'
							style={{
								backgroundColor: `${
									departmentColors[item.title.toLowerCase()].bgColor
								}`,
							}}
						></div>
					),
					onClick: handleOptionClick,
					selectedOptions: selectedFilterOptions,
				};
			}),
		},
		{
			title: 'Gender',
			items: mockFilterData.gender.map((item) => {
				return {
					id: item.id,
					title: item.title,
					onClick: handleOptionClick,
					selectedOptions: selectedFilterOptions,
				};
			}),
		},
		{
			title: 'Location',
			onSearch: handleLocationSearch,
			items: filteredFilterOptions(
				mockFilterData.location,
				keywords.location
			).map((item) => {
				const location = item.title.toLowerCase();
				return {
					id: item.id,
					title: item.title,
					renderIcon: (
						<Icon
							width={24}
							height={24}
							icon={location as IconType}
							type='flag'
						/>
					),
					onClick: handleOptionClick,
					selectedOptions: selectedFilterOptions,
				};
			}),
		},
		{
			title: 'Manager',
			onSearch: handleManagerSearch,
			items: filteredFilterOptions(
				mockFilterData.manager,
				keywords.manager
			).map((item) => {
				return {
					id: item.id,
					title: item.title,
					renderIcon: <Avatar size='sm' />,
					onClick: handleOptionClick,
					selectedOptions: selectedFilterOptions,
				};
			}),
		},
	];

	const renderFilter = (item: FilterSectionProps) => (
		<FilterSection key={item.title} {...item} />
	);

	const renderFilterBody = ({ className }: ButtonDropdownProps) => (
		<div className={clsx(className)}>
			<div className='flex justify-between items-center'>
				<div className='flex justify-center mb-6'>
					<Text as='h4' className='font-bold'>
						Filters
					</Text>
					<Text
						as='span'
						size={12}
						className='text-gray-500 ml-2 font-normal self-end mb-0.5'
					>
						Showing all items
					</Text>
				</div>
				<div className='flex gap-4'>
					<Button variant='link-grey' onClick={handleClearAll}>
						Clear All
					</Button>
					<Button variant='secondary' onClick={handleApplyFilters}>
						Apply Filters
					</Button>
				</div>
			</div>
			<div className='flex gap-4'>{filters.map(renderFilter)}</div>
		</div>
	);

	return (
		<Button
			icon='filter'
			variant='primary'
			as='dropdown'
			radius='xs'
			renderDropdown={renderFilterBody}
			onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}
			selectedOptionsLength={selectedFilterOptions.length}
		>
			Filter
			{selectedFilterOptions.length > 0 && (
				<Text
					as='span'
					className='mb-0.5'
				>{` (${selectedFilterOptions.length})`}</Text>
			)}
		</Button>
	);
};
