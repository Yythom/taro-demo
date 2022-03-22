import { RefInfo, systemInfo } from '@/common/publicFunc';
import { View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import { memo, useEffect, useState } from 'react';
import './index.scss'

const Float = ({
    show,
    hide,
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
    const [top, setTop] = useState(-900);
    // useEffect(() => {
    //     setTop(initTop)
    // }, [])
    useEffect(() => {
        if (show) {
            // vibrateShort();
            setTop(-10 + Number(bottom))
        } else {
            // setTop(-(700));

            setTop(-(1600));
            setTimeout(() => {
                RefInfo(`${className}`).then(res => {
                    if (res) {
                        // alert(res.height)
                        setTop(-(res.height + 10))
                    } else {
                        // alert('Error')
                        setTop(-1600)
                    }
                })
            }, 100);

        }
    }, [show]);

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
            <View className={`float_bottom  ${className}`} style={{ ...style, bottom: top ? `${top}px` : '-3999rpx' }}>
                {children}
            </View>
        </>

    )
}
export default memo(Float);
