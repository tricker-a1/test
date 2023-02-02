// modules
import { useState } from 'react';
import clsx from 'clsx';
// components
import { Page } from './Page';
import Button, { ButtonDropdownProps, ButtonVariant } from './Button';
import Select, { SelectOptionType } from './Select';
import { Text } from './Text';
// utils
import { notify } from '../helpers';

const types: Array<ButtonVariant> = [
	'primary',
	'secondary',
	'link-primary',
	'link-grey',
	'tertiary-grey',
];

const renderDropdown = ({ className }: ButtonDropdownProps) => (
	<div className={clsx(className)}>test</div>
);

const renderButtons = (type: ButtonVariant) => (
	<div key={type}>
		<br />
		<span>xs</span>
		<Button variant={type} size='xs'>
			That&apos;s a button
		</Button>
		<br />
		<span>sm</span>
		<Button variant={type} size='sm'>
			That&apos;s a button
		</Button>
		<br />
		<span>md</span>
		<Button variant={type} size='md'>
			That&apos;s a button
		</Button>
		<br />
		<span>lg</span>
		<Button
			variant={type}
			size='lg'
			as='dropdown'
			renderDropdown={renderDropdown}
		>
			That&apos;s a button
		</Button>
		<br />
		<span>error</span>
		<Button error variant={type} size='lg'>
			That&apos;s a button
		</Button>
		<br />
		<span>disabled</span>
		<Button disabled variant={type} size='lg'>
			That&apos;s a button
		</Button>
		<br />
		<span>disabled error</span>
		<Button
			as='link'
			linkProps={{ to: '/' }}
			disabled
			error
			variant={type}
			size='lg'
		>
			That&apos;s a button link
		</Button>
	</div>
);

const options = [
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

const Demo = () => {
	const [value, setValue] = useState<SelectOptionType | null>(null);

	const loadOptions = (search: string) => {
		return new Promise<Array<SelectOptionType>>((resolve) => {
			setTimeout(() => {
				resolve(
					options.filter(({ label }) =>
						label.toLowerCase().includes(search.toLowerCase())
					)
				);
			}, 2000);
		});
	};

	return (
		<Page withLayout={false}>
			<Text as='h2'>Select Inputs</Text>
			<br />
			<Select
				type='async'
				loadOptions={loadOptions}
				className='mx-5'
				defaultOptions={[{ label: 'Recently viewed', options }]}
				value={value}
				icon='search'
				isClearable
				onChange={setValue}
			/>
			<br />
			<hr />
			<Text as='h2'>Notifications</Text>
			<div className='text-center'>
				<button
					className='p-[20px]'
					onClick={() =>
						notify({
							message: 'Hello Notification',
							position: 'bottom-right',
							type: 'success',
						})
					}
				>
					<Text as='span' size={20}>
						See Notification
					</Text>
				</button>
			</div>
			<hr />
			<Text as='h2'>Download Button (Link)</Text>
			<br />
			<Button
				as='link'
				linkProps={{
					to: '../mocks/csv_templates/equity_template.csv',
					target: '_blank',
					download: true,
				}}
			>
				Download template
			</Button>
			<br />
			<hr />
			<Text as='h2'>Buttons</Text>
			<div className='flex gap-8 mx-8'>
				{types.map((type) => renderButtons(type))}
			</div>
		</Page>
	);
};

export default Demo;
