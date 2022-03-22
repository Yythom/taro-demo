/* eslint-disable react/jsx-indent-props */
import { useMemo, useState, Fragment } from 'react';
import { View, Text, } from '@tarojs/components';
import './skew.scss'

const SkewText = ({
    text = [], // '会员价格', , '¥200'
}) => {
    return (
        <View className='flex'>
            {
                text.map((e, i) => {
                    return (
                        <View className='skew' key={e}>
                            <View className='bg' style={i == 1 && { background: '#fff', border: '#00D0BF 2rpx solid' }} />
                            <Text className='tx' style={i == 1 && { color: '#00D0BF' }}>
                                {e}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
export default SkewText;

