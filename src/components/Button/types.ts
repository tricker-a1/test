export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'link-primary'
	| 'link-grey'
	| 'tertiary-grey';

export interface ButtonDropdownProps {
	onClose: () => void;
	className: string;
}
