/* eslint-disable react/jsx-indent-props */
import { useLayoutEffect, useState } from 'react';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import './banner.scss'
import BlurImg from '@/components/blur-img/BlurImg';


const Banner = ({
    w,
    h,
    list = []/*  = [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Frms.zhubajie.com%2Fresource%2Fredirect%3Fkey%3Dtianpeng%2F2015-11%2F14%2Fproduct%2F5646e9d57392f.jpg&refer=http%3A%2F%2Frms.zhubajie.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627814294&t=e6cb81b058f3d72d7010bf9807454ca6',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0199a155c4790f32f8755e6604d4d5.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627814294&t=14fc2c22a65d51c914e0da8788a59445'
    ] */,
    className,
    style,
    custom,
    isDig,
    render = (url) => <BlurImg src={url} />,
}) => {
    const [index, setindex] = useState(0);


    useLayoutEffect(() => {
        if (!render()) {
            console.error('banner props render is not')
        }
    }, [])

    return (
        <View
            className={'banner_wrap ' + className}
            style={{ ...style, height: h, width: w }}
        >
            <Swiper
                className={'banner ' + className}
                indicatorColor='#999'
                indicatorActiveColor='rgb(226, 150, 63)'
                interval={5000}
                circular
                // indicatorDots
                // autoplay
                onChange={(e) => {
                    setindex(e.detail.current)
                }}
            >
                {
                    list.map((e, i) => {
                        return <SwiperItem key={`banner_${i}`} className='fc'>
                            {render(e)}
                        </SwiperItem>
                    })
                }
            </Swiper>
            {
                isDig && <View className='pag fc'>
                    <View className='pre'>{index + 1}</View>/
                    <View className='next'>{list.length}</View>
                </View>
            }
            {
                custom && <View className='dots_wrap'>
                    {
                        list.length > 0 && Array.from(new Array(list.length).keys()).map((e, i) => {
                            return (
                                <View className={(i == index && 'act_dots') + ' dots'} key={className + 'e'} style={{

                                }}
                                />

                            )
                        })
                    }

                </View>
            }
        </View>

    )
}
export default Banner;
