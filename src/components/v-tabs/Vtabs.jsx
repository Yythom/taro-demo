/* eslint-disable react/jsx-indent-props */
import { memo, useEffect, useState } from 'react';
import { View, Image, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import { createSelectorQuery } from '@tarojs/taro';
import './vtabs.scss'

const Vtabs = memo(({
    list, // 左侧列表
    children, // 右侧渲染的内容
    onChange, // change事件
    height, // vtab高度
    className,
    windowTabsLength, // 左侧列表显示的tabs数量
    // scrollTo = 0,
    isScroll,
}) => {
    const query = createSelectorQuery();
    const [swiperIndex, setSwiperIndex] = useState(0); // tab index
    const [navInfos, setNavInfos] = useState([]);  // 所有子元素的信息
    const [navItemHeight, setNavItemHeight] = useState([]);  // 选中下划线的高度
    const [navItemTop, setNavItemTop] = useState([]);   // tab item元素top信息
    const [parentTop, setParentTop] = useState('');   // tabs列表top信息
    const [parentWidth, setParentWidth] = useState('');   // tabs列表宽度
    const [scrollTop, setScrollTop] = useState('');   // 居中显示
    const [boxH, setBoxH] = useState(''); // 容器高度


    function init() {
        setTimeout(() => {
            query.select(`.parentClass`).fields({ rect: true, size: true }, res => {
                if (res) {
                    setParentTop(res.top);
                    setParentWidth(res.width);
                }
            });
            query.select(`.left_wrap`).fields({ rect: true, size: true }, res => {
                if (res) {
                    setBoxH(res.height)
                }
            });
            query.selectAll(`.childrenClass`).fields({ rect: true, size: true }, data => {
                if (data[0]) {
                    let navInfosArr = [];
                    data.forEach((item, index) => {
                        if (index == 0) {
                            setNavItemTop(item.top - parentTop);
                            setNavItemHeight(item.height);
                        }
                        navInfosArr.push({ height: item.height, top: item.top });
                    });
                    setNavInfos(navInfosArr)
                } else {
                    init();
                }
            });
            query.exec();
        }, 100);
    }

    useEffect(() => {
        if (list[0] && !navInfos[0]) {
            console.log(height);
            init();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);


    function move(i) {
        let info = navInfos[i];
        let offsetTop = info.top - parentTop;
        let _scrollTop = offsetTop - (boxH - info.height) / 2;
        let scrollToTop = _scrollTop < 0 ? 0 : _scrollTop;
        setNavItemTop(navInfos[i].top);
        setScrollTop(scrollToTop);
    }

    const _onChange = (i, is_btn) => {
        move(i);
        setSwiperIndex(i);
        !is_btn && onChange(i)
    }

    return (
        <View className={'vTabs-wrap ' + className} style={{ height }}>

            <ScrollView
                scrollWithAnimation
                scrollY
                className='left_wrap'
            // scrollIntoView={scrollTop}
            // scrollTop={scrollTop}
            >
                <View className='parentClass' style={{ position: 'relative', height: '100%' }}>
                    {
                        list[0] && list.map((e, i) => {
                            return (
                                <View
                                    onClick={() => { _onChange(i, true) }}
                                    className={`tabs_item childrenClass ${i == swiperIndex && 'tabs_act_item theme-color '}`}
                                    key={'tab' + i}
                                    style={{ height: (100 / windowTabsLength) + '%' }}>
                                    {e.category}
                                </View>
                            )
                        })
                    }
                    <View className='nav-line' style={{ height: navItemHeight + 'px', top: navItemTop - parentTop - 1 + 'px' }} ></View>
                </View>
            </ScrollView>

            <Swiper
                vertical
                current={swiperIndex}
                duration={300}
                className='swiper'
                onChange={(e) => { _onChange(e.detail.current) }}
                style={{
                    width: `calc(100% - ${parentWidth}px)`,
                    height: '100%',
                    background: '#fff',
                }}
            >
                {
                    list[0] && list.map((e, i) => {
                        return (
                            <SwiperItem className='item_content' key={i + 'item_content'}>
                                {
                                    isScroll ? <ScrollView
                                        scrollWithAnimation
                                        scrollY
                                        className='item_scroll'
                                        style={{ height: '98%', overflow: 'hidden' }}
                                    >

                                        <View className='item_box' style={{ height: '100%' }} >
                                            {i === swiperIndex && children}
                                        </View>
                                    </ScrollView> : <View
                                        className='item_scroll'
                                        style={{ height: '98%', overflow: 'hidden' }}
                                    >

                                        <View className='item_box' style={{ height: '100%' }} >
                                            {i === swiperIndex && children}
                                        </View>
                                    </View>
                                }

                            </SwiperItem>
                        )
                    })
                }
            </Swiper>
        </View>
    )
});

export default Vtabs;
