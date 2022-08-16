/*
 * @Author: 归宿
 * @Date: 2022-08-15 18:24:35
 * @Description: 
 */
import { createSlice, createAction } from '@reduxjs/toolkit';

const toggle = createAction<boolean>('showMenu/toggle');

const showMenu = createSlice({
  name: 'showMenu',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(toggle, (state, { payload }): boolean => payload);
  }
})

export { toggle };
export default showMenu.reducer;