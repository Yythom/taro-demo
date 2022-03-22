/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import useSearch from "./useSearch";

function useRequest<T, P = undefined>(
    promise: (data: any) => Promise<any>,
    option: {
        start_owner?: boolean, // 是否手动fetch
        callback?: (data: T) => void,
        failCallBack?: () => void,
        initParams?: Object,
        listen_params?: Object, // 监听模式需要控制变量useMemo
    }
): [
        T | undefined,
        () => Promise<void>,
        (key: string, v: any) => void,
        boolean,
        P | undefined
    ] {
    const [ret, setRet] = useState<T>();
    const [loading, setloading] = useState<boolean>(false);
    const [params, setParams] = useSearch<P>(option.initParams, {
        callback: (k: string, v: any) => {
            if (k === 'page' || k === 'pageSize') {
                fetch({ ...params, [k]: v })
            }
        }
    });
    const fetch = useCallback(async (_params?) => {
        !loading && setloading(true);
        const res = await promise(_params || params);
        setloading(false);
        if (res) {
            setRet(res);
            option.callback && option.callback(res);
        } else option.failCallBack && option.failCallBack();
    }, [params, option?.listen_params]);

    useEffect(() => {
        if (params && !option.start_owner && !option.listen_params) {
            console.log('fetch');

            fetch()
        }
    }, [params]);

    useEffect(() => {
        // 监听模式需要控制变量useMemo
        if (option?.listen_params) fetch(option?.listen_params)
    }, [option?.listen_params])

    return [
        ret,
        fetch,
        setParams,
        loading,
        params
    ]
}

export default useRequest;