// modules
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	registerables,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// utils
import { router } from './router';

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	ChartDataLabels,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	...registerables
);

export const App: FC = () => {
	return (
		<>
			<ToastContainer />
			<RouterProvider router={router} />
		</>
	);
};
