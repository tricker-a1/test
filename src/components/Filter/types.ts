export interface FilterItemProps {
	title?: string;
	id: number;
	renderIcon?: React.ReactNode;
	onClick: (id: number) => void;
	selectedOptions: number[];
}

export interface FilterSectionProps {
	title: string;
	onSearch?: (search: string) => void;
	items: Array<FilterItemProps>;
}
