/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Button } from '@tarojs/components';
import { lkGetUserInfo } from '@/src/utils/wx_utils/publicFunc';
import useSlice from '@/src/hooks/useSlice';
import { actions, UserStateStateInterface } from '@/src/store/user_slice';
import useAuth from '@/src/hooks/wx_hooks/useAuth';
import './withAuth.scss';

const WithUserVerify = ({
  className,
  onClick,
  style,
  children,
  isVerifyPhone,
}: {
  className?: string;
  onClick?: Function;
  style?: React.CSSProperties;
  children: React.ReactNode;
  isVerifyPhone?: boolean;
}) => {
  const [userStore, dispatch] = useSlice<UserStateStateInterface>('user_slice')
  const userInfo = userStore.user_info;
  const { auth } = useAuth();

  const handleClick = async (e?) => {
    e?.stopPropagation();
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  };

  const handleGetUserInfo = async () => {
    if (auth) {
      const userInfoRes = await lkGetUserInfo();
      console.log(userInfoRes, 'userInfoRes');
      if (userInfoRes && userInfoRes !== 'openSetting') {
        dispatch(actions.setUserInfo(userInfoRes));
        Taro.showToast({
          icon: 'none',
          title: '获取用户信息成功'
        })
        if (!isVerifyPhone) handleClick();
      } else {
        Taro.showToast({
          icon: 'none',
          title: '取消授权'
        })
      }
    }
  };


  const handleGetPhoneNumber = async (e) => {
    /**
     * detail.encryptedData 包括敏感数据在内的完整用户信息的加密数据
     * detail.iv 加密算法的初始向量
     */
    const { detail } = e;
    if (detail.iv) {

      // const res = await UserService.bindPhone(detail.iv, detail.encryptedData);
      // if (res) {
      //   // 更新本地的UserInfo
      // }
      Taro.showToast({
        icon: 'none',
        title: '绑定手机号成功'
      })

      handleClick();
    }
  };
  return (
    <>
      {
        !userInfo && !userInfo?.avatar ? (
          // eslint-disable-next-line no-undef
          !Taro.canIUse('getUserProfile') ?
            <Button style={style}
              openType={!auth ? 'openSetting' : 'getUserInfo'}
              onGetUserInfo={handleGetUserInfo}
              className={`with-button ${className}`}
            >
              {children}
            </Button>
            :
            <Button style={style}
              onClick={() => { handleGetUserInfo() }}
              className={`with-button ${className}`}
            >
              {children}
            </Button>
        )
          : !userInfo.phone && isVerifyPhone
            ? (
              <Button
                style={style}
                className={`with-button ${className}`}
                openType='getPhoneNumber'
                onGetPhoneNumber={handleGetPhoneNumber}
              >
                {children}
              </Button>
            )
            : (
              <View
                style={style}
                className={className}
                onClick={handleClick}
              >
                {children}
              </View>
            )
      }
    </>
  );
};

export default WithUserVerify;
