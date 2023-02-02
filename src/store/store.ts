// modules
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// api
import { employeeApi } from './slices/employee';
import { teamApi } from './slices/team';
import { searchApi } from './slices/search';
import { uploadApi } from './slices/upload';

// slices
import { config } from './slices/config';
import { employee } from './slices/employee';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['employee'], // add any reducer you'd like to have in localStorage
};

const rootReducer = combineReducers({
	[teamApi.reducerPath]: teamApi.reducer,
	[employeeApi.reducerPath]: employeeApi.reducer,
	[searchApi.reducerPath]: searchApi.reducer,
	[uploadApi.reducerPath]: uploadApi.reducer,
	config: config.reducer,
	employee: employee.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (gDM) =>
		gDM().concat(
			teamApi.middleware,
			employeeApi.middleware,
			searchApi.middleware,
			uploadApi.middleware
		),
});

export const persistor = persistStore(store);
