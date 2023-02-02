import { store } from './store';

export interface Config {
	sidebarOpen: boolean;
}

export interface OrderedColumns {
	orderedColumns: string[];
}

export type RootState = ReturnType<typeof store.getState>;
