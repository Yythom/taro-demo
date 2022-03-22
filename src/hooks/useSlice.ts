import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

function useSlice<T>(sliceKey = 'global_slice',): [
    T,
    Dispatch<any>,
] {
    const slice: T = useSelector((s: any) => s[sliceKey], shallowEqual)
    const dispatch = useDispatch();
    return [
        slice,
        dispatch,
    ]
}

export default useSlice;