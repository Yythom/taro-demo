import { combineReducers } from '@reduxjs/toolkit'

import tarbar_slice from '@/src/custom-tab-bar/store/slice'
import user_slice from './user_slice'
import global_slice from './global_slice'

const reducers = {
    tarbar_slice,
    user_slice,
    global_slice,
}

const reducer = combineReducers(reducers)
export default reducer;