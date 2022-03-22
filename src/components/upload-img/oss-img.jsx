/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, request, useDidShow } from '@tarojs/taro';
import { View, Canvas, Button, Image } from '@tarojs/components';

import './img.scss';

function OssImg(props) {
    const {
        style,
        className,
        btn_text, // 按钮文案
        canvas_style,
        onOk = Function.prototype,
        isShrink, // 是否开启压缩
        path = 'ryq/desc',
        url = 'https://ryq-mall-ml.oss-cn-chengdu.aliyuncs.com'
    } = props;

    const [img, setImage] = useState(false);

    function up_file(path) {
        let fileName = path.split('tmp/')[1];
        const key = Math.random().toString(16).slice(2);
        request({
            url: 'http://47.108.88.248:9700/api/v1/shop/upload/token',
            method: 'POST',
            data: {},
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res?.data?.data) {
                    let { accessid, host, policy, expire, signature, dir, success_action_status } = res?.data?.data;
                    let oss_token = res.data.data['x-oss-security-token'];
                    const formData = {
                        "key": `${path}/${key}.jpg`,
                        "OSSAccessKeyId": accessid,
                        "accessid": accessid,
                        "host": host,
                        "policy": policy,
                        "signature": signature,
                        "expire": expire,
                        "dir": dir,
                        'x-oss-security-token': oss_token,
                        "success_action_status": success_action_status,
                        // 'user': 'test'
                    }
                    console.log(formData, 'formData');
                    Taro.uploadFile({
                        url: host,
                        filePath: path,
                        name: 'file',
                        formData,
                        // eslint-disable-next-line no-shadow
                        success(res) {
                            onOk(`${host}/${path}/${key}.jpg`)
                        },
                        fail: () => {

                        }
                    })
                }

            }
        });

    }

    const selectImg = async () => {
        //压缩图片
        Taro.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // console.log('选择图片=>', res.tempFilePaths[0])
                up_file(res.tempFilePaths[0]);
            }
        })

    }

    useEffect(() => {

        // dispatch(actions.changeuserInfoActionAsync())
    }, [])

    return (
        <View className='up_img_wrap' >
            {/* {img && <Image className='img' src={img} alt='loading' mode='widthFix' ></Image>}
            <View className='hiddenCanvas' style={canvas_style || { position: 'fixed', top: '-99999px' }}>
                <Canvas className='canvas' canvasId='firstCanvas' />
            </View> */}
            <Button className={className + ' fc'} style={style} onClick={selectImg}>{btn_text || ''}</Button>
        </View>
    )
}
export default OssImg;