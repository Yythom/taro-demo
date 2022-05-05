/* eslint-disable react/jsx-indent-props */
import { useState } from 'react';
import { View, } from '@tarojs/components';
import { chooseImage, getStorageSync, } from '@tarojs/taro'
import './index.scss'
import './html.scss'
import str_html from './str';
import EditorComponent from './editor/editor';

const Index = () => {

    const [html, setHtml] = useState('')

    const insertImage = (insertSrc) => {
        chooseImage({
            count: 1,
            success: function (res) {
                insertSrc(res.tempFilePaths[0],)
            }
        })
    }

    return (
        <View className='index-wrap' style={{ paddingBottom: `${getStorageSync('safeArea') * 2 + getStorageSync('bar_height') * 2}rpx` }} >
            <EditorComponent
                width='100%'
                height='600rpx'
                insertPicture
                placeholder='编写文章...'
                initHtml=''
                onContent={(e) => {
                    console.log(e.detail.content.html);
                    setHtml(e.detail.content.html)
                }}
                onReady={(ctx) => ctx.setHtml(str_html)}
                onInsertImage={(ctx) => {
                    insertImage(ctx.detail.insertSrc)
                    // insertImage
                }}
                id='hf_editor'
            />

            <mp-html
                preview-img
                pause-video
                loading-img
                // selectable={
                //     isIos ? false : true
                // }
                scroll-table
                container-style='list-style: none !important;'
                content={
                    html
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/< img/g, '<img')
                        .replace(/<table/g, '<table cellspacing="0" border="1"')
                }

            />

        </View>
    )
}
export default Index;
