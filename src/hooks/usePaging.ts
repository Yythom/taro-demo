/* eslint-disable react-hooks/exhaustive-deps */

// import { hideLoading, showLoading } from '@/utils/Toast';
// import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'

// const [result, no_more] = usePaging( {}, HomeService.getHomeApi, '', (res) => {
//     // 请求成功回调
//     console.log(res);
// })

function usePaging<T, LISTITEM>(
    params: any,
    http: (params: any) => Promise<T | undefined>,
    is_bottom: any, // scrollview触底 i++
    callback = Function.prototype, // 请求成功回调
    isPag = true, // 是否开启分页
    isWindow = true, // 是否开启窗口触底 默认窗口触底
):
    [
        T | undefined,
        LISTITEM[],
        boolean,
        boolean,
        () => void,
    ] {
    const [page, setPage] = useState(1);
    const [no_more, setno_more] = useState<boolean>(false);
    const [result, setResult] = useState<T>();
    const [list, setList] = useState<LISTITEM[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const initFn = () => {
        setPage(1);
        setList([]);
        paging(1, true);
    }
    useEffect(() => {
        if (params) {
            initFn();
        }
    }, [params])

    useEffect(() => {
        if (is_bottom) {
            if (no_more && !isWindow) return
            console.log('scrollview到底---' + no_more, isWindow);
            paging();
        }
    }, [is_bottom]);

    const paging = useCallback(async (_page?, is_init?) => {
        if (!http || !params) return
        setLoading(true);
        const _params = { ...params };
        if (isPag) _params.page = _page || page + 1;
        const res: any = await http(_params);
        if (res) {
            setResult(res);
            if (res?.list) {
                if (res?.total === (_page ? res?.list?.length : [...list, ...res?.list]?.length)) {
                    setno_more(true);
                } else {
                    setno_more(false);
                }
                res?.list[0] && setPage(_page || page + 1);
                const newList = res?.list
                setList(
                    _page
                        ? newList
                        : [...list, ...newList]
                )
            }
            callback(res);
        }
        setLoading(false);
    }, [params, page, no_more, loading, list,]);

    return [
        result, list, no_more, loading, initFn
    ];
}


export default usePaging;