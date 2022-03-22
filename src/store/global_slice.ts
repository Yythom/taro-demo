import { createSlice, } from '@reduxjs/toolkit'
import { getStorageSync } from '@tarojs/taro';

export interface GlobalStateInterface {
    bar_height: {
        name: string;
        url: string;
        icon: string;
        uptotal_desc_key: string
    }
}

const initialState = {
    bar_height: getStorageSync('bar-h') || 50,
    themeConfig: {

    },
}

const reducers = {
    setThemeConfig: (state, action) => {
        state.themeConfig = action.payload
    },
}

const Slice = createSlice({
    name: 'global_slice',
    initialState,
    reducers,
})

export const actions = {
    ...Slice.actions,
};
export default Slice.reducer;