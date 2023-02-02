import React, { FC, useEffect } from 'react';
import {
	Column,
	ColumnDef,
	ColumnOrderState,
	flexRender,
	getCoreRowModel,
	Header,
	Table,
	useReactTable,
} from '@tanstack/react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { employee, useEmployee } from '../../store/slices/employee';

export type DataTableProps = {
	defaultColumns: ColumnDef<EmployeeTableColumn, any>[];
	tableRows: EmployeeTableColumn[];
};

export type CustomCoumnDef = {
	accessorkey: string;
	id: string;
	title: string;
	subtitle?: string;
	align: 'center' | 'right' | 'left';
};

const reorderColumn = (
	draggedColumnId: string,
	targetColumnId: string,
	columnOrder: string[]
): ColumnOrderState => {
	const newColumnOrder = [...columnOrder];
	newColumnOrder.splice(
		newColumnOrder.indexOf(targetColumnId),
		0,
		newColumnOrder.splice(
			newColumnOrder.indexOf(draggedColumnId),
			1
		)[0] as string
	);
	return [...newColumnOrder];
};

const DraggableColumnHeader: FC<{
	header: Header<EmployeeTableColumn, any>;
	table: Table<EmployeeTableColumn>;
}> = ({ header }) => {
	const dispatch = useDispatch();
	const { orderedColumns } = useEmployee();
	const { setOrderedColumns } = employee.actions;

	const { column } = header;
	const align = (header.column.columnDef as CustomCoumnDef).align;

	const [, dropRef] = useDrop({
		accept: 'column',
		drop: (draggedColumn: Column<Employee>) => {
			HTML5Backend;
			const newColumnOrder = reorderColumn(
				draggedColumn.id,
				column.id,
				orderedColumns
			);
			dispatch(setOrderedColumns(newColumnOrder));
		},
	});

	const [{ isDragging }, dragRef, previewRef] = useDrag({
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		item: () => column,
		type: 'column',
	});

	return (
		<th
			ref={dropRef}
			colSpan={header.colSpan}
			style={{
				opacity: isDragging ? 0.5 : 1,
			}}
			className={clsx('p-2 whitespace-nowrap', {
				'text-left': align === 'left',
				'text-right': align === 'right',
				'text-center': align === 'center',
			})}
		>
			<button ref={dragRef}>
				<div ref={previewRef}>
					{header.isPlaceholder
						? null
						: flexRender(header.column.columnDef.header, header.getContext())}
				</div>
			</button>
		</th>
	);
};

const DataTable = (props: DataTableProps) => {
	const dispatch = useDispatch();
	const { defaultColumns, tableRows } = props;
	const [columns] = React.useState(() => [...defaultColumns]);
	const { setOrderedColumns } = employee.actions;
	const { orderedColumns } = useEmployee();

	const [data] = React.useState(tableRows);
	const [columnVisibility, setColumnVisibility] = React.useState({});

	useEffect(() => {
		// dispatch actions only when there are no ordered columns
		if (!orderedColumns.length) {
			dispatch(setOrderedColumns(columns.map((column) => column.id as string)));
		}
	}, []);

	if (!data) return null;

	const table = useReactTable({
		data,
		columns,
		state: {
			columnOrder: orderedColumns,
			columnVisibility,
		},
		onColumnOrderChange: setOrderedColumns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	return (
		<DndProvider backend={HTML5Backend}>
			<div>
				<div className='h-6' />
				<div className='rounded-md w-full relative overflow-auto'>
					<table className='table-auto border-solid border-[1px] border-gray-50 w-full'>
						<thead className='bg-[#f8f9fb]'>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<DraggableColumnHeader
											key={header.id}
											header={header}
											table={table}
										/>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className='border-b border-gray-50'>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className={clsx('p-2 whitespace-nowrap', {
												'text-center':
													(cell.column.columnDef as CustomCoumnDef).align ===
													'center',
												'text-left':
													(cell.column.columnDef as CustomCoumnDef).align ===
													'left',
												'text-right':
													(cell.column.columnDef as CustomCoumnDef).align ===
													'right',
											})}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</DndProvider>
	);
};

export default DataTable;
