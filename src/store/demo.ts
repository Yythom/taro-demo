/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'

/**
 * 初始化数据
 */
const initialState = {
    // test: 0,
}
/**
 * reducers
 */
const reducers = {
}

// // 登入
// const testAsync: AsyncThunk<{}, void, {}> = createAsyncThunk(
//     'user/testAsync',
//     async (data, thunkAPI) => { // data 微信获取到的信息
//         console.log(data, '异步接收到的data');
//         let result = {}
//         let res = await get_table_data({});
//         console.log(res);
//         if (res) {
//             result = res
//         }
//         return result
//     }
// )

/**
 * @param {*} builder 
 * 监听异步完成处理state
 */
// const extraReducers = {  // 两种写法
//     [`${testAsync.fulfilled}`](state, action) {
//         console.log(action.payload, 'state接受到的payload');
//         state.userInfo = action.payload
//     },
// }

// const extraReducers = (builder: any) => {
//     builder.addCase(testAsync.fulfilled, (state:any, action:any) => {

//         state.userInfo = action.payload
//     });
// }

const Slice = createSlice({
    name: 'global_slice',
    initialState,
    reducers,
    // extraReducers,
})


export const actions = {
    ...Slice.actions,
    // testAsync,
};
export default Slice.reducer;