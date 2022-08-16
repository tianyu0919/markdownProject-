/*
 * @Author: 归宿
 * @Date: 2022-08-15 18:01:26
 * @Description: 
 */
import { configureStore } from '@reduxjs/toolkit';
import { createLogger, ActionToString } from 'redux-logger';
import showMenu from './modules/showMenu';

const logger = createLogger({});

const store = configureStore({
  reducer: { showMenu },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(process.env.NODE_ENV !== 'production' ? [logger] : []),
  devTools: true,
});

export default store;