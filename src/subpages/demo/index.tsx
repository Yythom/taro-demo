/* eslint-disable @typescript-eslint/no-unused-vars */
import { View } from '@tarojs/components';
import { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import NavBar from '@/src/components/navbar/NavBar';
import LoginService from '@/src/services/login/login';
import useRequest from '@/src/hooks/useRequest';
import './index.scss'

const Index = () => {
    const [
        ret,
        fetch,
        setParams,
        loading,
        params
    ] = useRequest<any, any>(
        LoginService.login,
        {
            start_owner: true
        }
    )

    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    return (
        <View className='demo-wrap' style={{ paddingBottom: `${getStorageSync('safeArea') * 2 + getStorageSync('bar_height') * 2}rpx` }} >
            <NavBar back title='测试' />
            测试分包
        </View>
    )
}
export default Index;
