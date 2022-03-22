import { createSlice, } from '@reduxjs/toolkit'
import { getStorageSync } from '@tarojs/taro'

export interface UserStateStateInterface {
    user_info: any
}

const initialState = {
    user_info: getStorageSync('info'),
}

const reducers = {
    setUserInfo: (state: UserStateStateInterface, action: any) => {
        state.user_info = action.payload
    },
}

const userSlice = createSlice({
    name: 'user_slice',
    initialState,
    reducers,
})


export const actions = {
    ...userSlice.actions,
};
export default userSlice.reducer;