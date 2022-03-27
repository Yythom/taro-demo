/* eslint-disable react/jsx-indent-props */
import React from 'react';
import { View, Text } from '@tarojs/components';
import { UserStateStateInterface } from '@/src/store/user_slice';
import useSlice from '@/src/hooks/useSlice';
import BlurImg from '../pro_image/pro_image';
import './avatar.scss';

const Avatar = ({ size, style }: {
    size?: string | number,
    style?: React.CSSProperties
}) => {
    const [userStore] = useSlice<UserStateStateInterface>('user_slice')
    const userInfo = userStore.user_info;

    return (
        <View className='avatar-wrap' style={{ width: size, height: size, ...style }}>
            {
                !userInfo && !userInfo?.avatar
                    ? <Text
                        className='iconfont icon-wode'
                        style={{ fontSize: size }}
                    />
                    : (userInfo &&
                        userInfo.avatar_url
                        &&
                        <BlurImg
                            className='img'
                            url={userInfo.avatar_url}
                        />
                    )
            }
        </View>
    )
}
export default Avatar;
