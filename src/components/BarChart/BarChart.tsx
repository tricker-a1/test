import { Bar } from 'react-chartjs-2';

type BarDataItem = {
	value: number;
	name?: string;
	count?: number;
};

export type BarChartProps = {
	bgColors: string[];
	labels: string[];
	chartData: BarDataItem[];
};

const options = {
	responsive: true,
	plugins: {
		datalabels: {
			color: 'white',
		},
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			grid: {
				display: false,
				drawBorder: false,
			},
			ticks: {
				stepSize: 0.6,
			},
		},
		x: {
			grid: {
				display: false,
				drawBorder: false,
			},
			precision: 2,
		},
	},
};

const BarChart = (props: BarChartProps) => {
	const { labels, bgColors, chartData } = props;
	const barData = chartData.map((data) => data.value);

	const data = {
		labels,
		scaleFontColor: 'white',
		datasets: [
			{
				label: '',
				categoryPercentage: 0.9,
				barThickness: 20,
				data: barData,
				backgroundColor: bgColors,
				borderRadius: {
					topLeft: 4,
					topRight: 4,
				},
			},
		],
	};

	return (
		<div className='w-48 h-48 flex items-center justify-center'>
			<Bar options={options} data={data} />
		</div>
	);
};

export default BarChart;
