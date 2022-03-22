/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow } from '@tarojs/taro';
import { View, Canvas, Button, Image } from '@tarojs/components';

import './img.scss';

function Uploadimg(props) {
    const {
        style,
        className,
        btn_text, // 按钮文案
        canvas_style,
        onOk = Function.prototype,
        isShrink, // 是否开启压缩
    } = props;

    const [img, setImage] = useState(false);

    function up_file(path) {
        Taro.uploadFile({
            url: 'http://49.234.41.182:8701/upload', //仅为示例，非真实的接口地址
            filePath: path,
            name: 'file',
            formData: {
                // 'user': 'test'
            },
            // eslint-disable-next-line no-shadow
            success(res) {
                onOk(Object.values(JSON.parse(res.data))[0].url)
                console.log(res);
            }
        })
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
            <Button className={className} style={style} onClick={selectImg}>{btn_text || ''}</Button>
        </View>
    )
}
export default Uploadimg;