import { MouseEventHandler } from 'react';

export type IconType =
	| 'arrow'
	| 'circle-exchange'
	| 'check'
	| 'column'
	| 'data-flow'
	| 'dataflow-04'
	| 'double-arrow'
	| 'eu'
	| 'file'
	| 'file04'
	| 'file05'
	| 'filter'
	| 'file-check'
	| 'file-x'
	| 'grid'
	| 'icon-left'
	| 'money-exchange'
	| 'organization-zero-status'
	| 'settings'
	| 'upload'
	| 'circle-plus'
	| 'download'
	| 'users'
	| 'currency-dollar-circle'
	| 'coins-stacked'
	| 'credit-card-refresh'
	| 'star'
	| 'illustration'
	| 'illustration-gray'
	| 'left'
	| 'refresh-ccw'
	| 'rows-2'
	| 'search'
	| 'upload04'
	| 'us'
	| 'download01'
	| 'info-circle'
	| 'x-close'
	| 'vector';

export interface IconProps {
	icon: IconType;
	stroke?: string;
	fill?: string;
	width?: number;
	height?: number;
	className?: string;
	color?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	type?: string;
}
