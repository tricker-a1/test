import { TooltipItem, TooltipModel } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Font } from 'chartjs-plugin-datalabels/types/options';

type ChartDataItem = {
	value?: number;
	name?: string;
	count?: number;
};

export type DoughnutChartProps = {
	chartData: ChartDataItem[];
	bgColors: string[];
	labelSize?: number;
};

const DoughnutChart = (props: DoughnutChartProps) => {
	const { chartData, bgColors, labelSize = 10 } = props;

	const labelPlugin = {
		id: 'labelplugin',
		datalabels: {
			color: 'white',
			font: {
				size: labelSize,
				weight: 'bold',
			} as _DeepPartialObject<Font>,
			formatter: (data: {
				value: number;
				name: string;
				label: string;
				count: number;
			}) => data.value + '%',
		},
		tooltip: {
			callbacks: {
				title: function (
					this: TooltipModel<'doughnut'>,
					data: TooltipItem<'doughnut'>[]
				): string | void | string[] {
					return (data[0].raw as ChartDataItem).name;
				},
				label: function (
					this: TooltipModel<'doughnut'>,
					data: TooltipItem<'doughnut'>
				): string | void | string[] {
					return (data.raw as ChartDataItem).value + '%';
				},
			},
		},
		legend: { display: true },
	};

	const data = {
		datasets: [
			{
				label: '',
				data: chartData,
				backgroundColor: bgColors,
				borderColor: bgColors,
				cutout: '45%',
			},
		],
		labels: [],
	};

	return (
		<div className='w-28 h-28'>
			<Doughnut data={data} options={{ plugins: labelPlugin }} />
		</div>
	);
};

export default DoughnutChart;
