import { RefInfo, systemInfo } from '@/common/publicFunc';
import isWeapp from '@/utils/env';
import { View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import { memo, useEffect, useState } from 'react';
import './right.scss'

const Float = ({
    show,
    hide,
    width,
    setShow,
    className,
    bottom = 0,
    style,
    children
}) => {
    const hideFn = () => {
        if (show && typeof hide === 'function') {
            hide();
        }
    }
    const [right, setRight] = useState(-900);
    // useEffect(() => {
    //     setTop(initTop)
    // }, [])


    return (
        <>
            {/* { */}
            <View className='modal-mask' style={!show && { zIndex: '-999', opacity: 0, top: '-9999px' }} onClick={
                () => {
                    hideFn();
                    setShow(false);
                }
            } />
            {/* // } */}
            <View className={`float_bottom  ${className}`} style={{ ...style, width, bottom: 0, right: show ? 0 : `-${width}` }}>
                {children}
            </View>
        </>

    )
}
export default memo(Float);
