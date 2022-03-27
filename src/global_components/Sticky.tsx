import React from 'react';
import { View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';

const Sticky = ({ className, children }: {
    className?: string;
    children?: React.ReactNode
}) => { // 不支持flex布局
    return (
        <View className={className} style={{ position: 'sticky', top: getStorageSync('navHeight') + 'px' }}>
            {children}
        </View>
    )
}
export default Sticky;
