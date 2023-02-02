import clsx from 'clsx';

import { Text } from '../Text';
import { DoughnutChart } from '../DoughnutChart';
import { BarChart } from '../BarChart';

export type ChartCardProps = {
	bgColors: string[];
	data: {
		results: {
			name?: string;
			value: number;
			count?: number;
		}[];
		totalValue?: number;
	};
	labels?: string[];
	labelSize?: number;
	cardTitle: string;
	type: 'doughnut' | 'bar';
};

const ChartCard = (props: ChartCardProps) => {
	const { bgColors, data, cardTitle, labelSize, type, labels } = props;
	const { results } = data;
	const isDoughnut = type === 'doughnut';

	return (
		<div className='p-4 rounded-md shadow-xs border-gray-50 border'>
			<Text as='p' size={14} className='pl-4 text-gray-800'>
				{cardTitle}
			</Text>
			{isDoughnut ? (
				<div className='flex gap-6 items-center'>
					<DoughnutChart
						chartData={data.results}
						bgColors={bgColors}
						labelSize={labelSize}
					/>
					<ul className='w-full min-h-[160px] flex flex-col justify-center'>
						{!!results.length &&
							results.map((item, index) => (
								<li
									className={clsx('flex justify-between items-center mt-2', {
										'mb-2': index === results.length - 1,
									})}
									key={`chartcard-${index}`}
								>
									<div className='flex items-center'>
										<div
											className='rounded-full w-[10px] h-[10px]'
											style={{
												backgroundColor: bgColors[index],
											}}
										/>
										<Text as='span' className='text-gray-500 ml-2' size={10}>
											{item.name}
										</Text>
									</div>
									<div className='flex items-center'>
										<Text as='span' className='text-gray-900' size={10}>
											{item.count}
										</Text>
									</div>
								</li>
							))}
						<hr />
						<div className='flex justify-between mt-2 pl-2'>
							<Text as='span' size={12} className='text-gray-500'>
								Total
							</Text>
							<Text as='span' size={12} className='text-gray-900'>
								{data.totalValue}
							</Text>
						</div>
					</ul>
				</div>
			) : (
				<div className='flex gap-6 items-center justify-center'>
					{labels && (
						<BarChart chartData={results} bgColors={bgColors} labels={labels} />
					)}
					<ul className='flex flex-col mb-10'>
						{labels?.map((item, index) => (
							<li
								className={clsx('flex mt-2', {
									'mb-2': index === results.length - 1,
								})}
								key={`chartcard-${index}`}
							>
								<div className='flex items-center'>
									<div
										className={`rounded-full w-[10px] h-[10px]`}
										style={{
											backgroundColor: bgColors[index],
										}}
									/>
								</div>
								<div className='flex items-center ml-2'>
									<Text as='span' className='text-gray-900' size={10}>
										{item}
									</Text>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ChartCard;
