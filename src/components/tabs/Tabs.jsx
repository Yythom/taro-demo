/* eslint-disable react/jsx-indent-props */
import { useState, useEffect, memo } from 'react';
import { View, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import { createSelectorQuery, getStorageSync, showToast } from '@tarojs/taro'
import paging, { initing } from '../../utils/paging';
import './tabs.scss'

const Index = (props) => { // 不能有padding父元素
    const {
        // tab相关设置
        className, // wrap class // 2个以上tabs必传
        onChange, // change函数
        tag_list, // list=[{title}]  分类列表
        padding = 16, // nav-line缩小
        renderCenter, // 中间可展开筛选区域
        defaultIndex, // 默认选中的index

        // 是否tab头部置顶
        isSticy,
        top,

        // 监听并初始化tabs
        initTabs,
        maxHeight,
        minHeight,
        initHeight, // 监听是否重新设置view高度 notChildScroll设置

        // 防止页面多tabs获取元素信息污染
        parentClass = 'nav-parent', // 是 并且不能为 nav
        childrenClass = 'children-class', // 是 并且不能为 nav-item-act nav-item 

        // scroll-view相关设置
        notChildScroll, // 是否开启scroll—view // maxHeight不可使用
        isRefresh, // 是否开启scrollView下拉刷新

        // 请求相关
        request,
        onScrollBottom = Function.prototype,
        init = Function.prototype,

    } = props;

    const query = createSelectorQuery();
    const [swiperIndex, setSwiperIndex] = useState(''); // tab index
    const [navInfos, setNavInfos] = useState([]);  // 所有子元素的信息
    const [navItemWidth, setNavItemWidth] = useState('');  // 选中下划线的宽度
    const [navItemLeft, setNavItemLeft] = useState([]);   // 选中下划线的显示位置
    const [parentLeft, setParentLeft] = useState('');   // 选中下划线的显示位置
    const [componentWidth, setComponentWidth] = useState('');   // 选中下划线的显示位置
    const [scrollLeft, setScrollLeft] = useState('');   // tab scrollLeft:number
    const [height, setHeight] = useState('');

    const [page, setPage] = useState(1);
    const [refresh_status, setRefresh_status] = useState(false);
    const [tabIndex, settabIndex] = useState('');

    function initTabsFn() {
        setTimeout(() => {
            query.select(`.${parentClass}`).fields({ rect: true, size: true }, res => {
                if (res) {
                    setParentLeft(res.left);
                    setComponentWidth(res.width);
                }
            });
            query.selectAll(`.${childrenClass}`).fields({ rect: true, size: true }, data => {
                if (data[0]) {
                    let navInfosArr = [];
                    data.forEach((item, index) => {
                        if (index == 0) {
                            setNavItemLeft(item.left);
                            setNavItemWidth(item.width);
                        }

                        navInfosArr.push({ width: item.width, left: item.left });
                    });
                    setNavInfos(navInfosArr)
                }
            });
            query.exec();
            initContentHeight(defaultIndex);
        }, 400);
    }

    function initContentHeight(current) {
        setTimeout(() => {
            createSelectorQuery().selectAll(`.autoHeight${className}`).boundingClientRect(function (rect) {
                // console.log(rect[current], 'rectrectrect');
                if (rect[current]) {

                    // console.log(rect[current].height);
                    setHeight(rect[current].height)
                }
            }).exec()
        }, 300);
    }


    const [flag, setFlag] = useState(false); // 
    const [loading, setLoading] = useState(false); // 
    function showInto() {
        setTimeout(() => {
            showToast({ title: '没有更多了', icon: 'none' })
        }, 300);
    }
    // swiper到底事件
    const onLower = () => {
        // setPage(page + 1)
        console.log('到底了');
        if (flag || loading) return showInto()
        setLoading(true)
        paging(request, page, (newList) => {
            if (newList) {
                setLoading(false)
                if (newList.list[0]) {
                    onScrollBottom(newList);
                    setPage(page + 1)
                    initContentHeight(tabIndex)
                } else {
                    showInto()
                    setFlag(true);
                }
            }
            setRefresh_status(false)
        });
    }

    // 下拉刷新事件
    const refresh = () => {
        // console.log('刷新');
        if (refresh_status) return
        console.log('刷新');
        console.log(request, 'request -- -- -- --');
        setRefresh_status(true);
        initing(request, (newList) => {
            console.log(newList, 'init--list------');
            if (newList) {
                setPage(1);
                if (newList.list[0]) {
                    init(newList);
                }
            }
            setRefresh_status(false);
        })
    }

    // 点击tab切换函数
    function taggleNav(i) {
        setSwiperIndex(i);
        scrollMoveDom(i);
    }

    // 滑动swiper切换
    function swiperChange(e) {
        let current = e.detail.current;
        taggleNav(current);
        onChange(current);
        settabIndex(e)
        initContentHeight(current);
        setPage(1)
    }

    function scrollMoveDom(index) {
        // 滚动tabs以及移动下划线
        let info = navInfos[index];
        let offsetLeft = info.left - parentLeft;
        let scrollLefts = offsetLeft - (componentWidth - info.width) / 2;
        let scrollToLeft = scrollLefts < 0 ? 0 : scrollLefts;
        setScrollLeft(scrollToLeft);
        setNavItemLeft(info.left);
        setTimeout(() => {
            setNavItemWidth(info.width);
            !notChildScroll && setFlag(false)
        }, 50);
    }

    useEffect(() => {
        initTabsFn();
        console.log('tag_list 改变 tab重载入');
    }, [tag_list]);

    useEffect(() => {
        console.log('列表高度改变 ');
        initContentHeight(swiperIndex);
    }, [initHeight])

    useEffect(() => {
        if (navInfos[0] && tag_list[0]) {
            if (defaultIndex) {
                taggleNav(defaultIndex, navInfos);
                initContentHeight(defaultIndex);
                setPage(1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultIndex, initTabs, navInfos])

    return (
        <>
            {
                (tag_list[0] || props.children)
                && <View className={`tab-wrap  ${className}`}>
                    <View>
                        <View className='sticy'
                            style={isSticy && { position: 'sticky', top: top ? top : getStorageSync('navHeight') + 'px', zIndex: 2 }}
                        >
                            {
                                tag_list[0]
                                &&
                                <ScrollView className='nav-scroll' enableFlex scrollWithAnimation scrollX scrollLeft={scrollLeft}>
                                    <View className={`nav ${parentClass}`} >
                                        {
                                            tag_list && tag_list.map((item, index) => {
                                                return (
                                                    <View key={item} className={swiperIndex == index ? 'nav-item-act nav-item ' + childrenClass : 'nav-item ' + childrenClass} onClick={() => { typeof item.show === 'boolean' ? (item.show ? taggleNav(index) : '') : taggleNav(index) }}>
                                                        {item.title}
                                                    </View>
                                                )
                                            })
                                        }
                                        <View className='nav-line' style={{ width: navItemWidth ? `calc(${navItemWidth}px - ${padding}rpx)` : '0px', left: `calc(${(navItemLeft - 1)}px + ${padding / 2}rpx)` }} ></View>
                                    </View>

                                </ScrollView>
                            }
                            {
                                renderCenter
                                && <View className='tab_center'>
                                    {renderCenter}
                                </View>
                            }
                        </View>
                        {  // 内容区域
                            props.children
                            &&
                            <View className='swiper'
                                style={{
                                    height: height + Number(notChildScroll ? getStorageSync('safeArea') : 0) + 'px',
                                    maxHeight: maxHeight,
                                    minHeight: minHeight
                                }}
                            >
                                <Swiper
                                    current={swiperIndex}
                                    duration={300}
                                    className='swiper_ex'
                                    easingFunction='linear'
                                    onChange={swiperChange}
                                    circular
                                >
                                    {
                                        tag_list
                                        && tag_list[0]
                                        && tag_list.map((item, index) => {
                                            return (
                                                typeof item.show === 'boolean' // 是否开启下一个swiper
                                                    ? (
                                                        item.show && <SwiperItem key={index} className='swiper_item'>
                                                            {
                                                                !notChildScroll ? <ScrollView
                                                                    className='swiper-scroll'
                                                                    scrollY
                                                                    lowerThreshold={30}
                                                                    refresherTriggered={refresh_status}
                                                                    onRefresherRefresh={refresh}
                                                                    onScrollToLower={onLower}
                                                                    refresherEnabled={isRefresh}
                                                                >
                                                                    <View className={'autoHeight' + className}>
                                                                        {swiperIndex == index ? props.children : null}
                                                                    </View>
                                                                </ScrollView>
                                                                    : <View className={'autoHeight' + className}>
                                                                        {swiperIndex == index ? props.children : null}
                                                                    </View>
                                                            }
                                                        </SwiperItem>
                                                    )
                                                    : <SwiperItem key={index} className='swiper_item'>
                                                        {
                                                            !notChildScroll ? <ScrollView
                                                                className='swiper-scroll'
                                                                scrollY
                                                                lowerThreshold={30}
                                                                refresherTriggered={refresh_status}
                                                                onRefresherRefresh={refresh}
                                                                onScrollToLower={onLower}
                                                                refresherEnabled={isRefresh}
                                                            >
                                                                <View className={'autoHeight' + className}>
                                                                    {swiperIndex == index ? props.children : null}
                                                                </View>
                                                            </ScrollView> :
                                                                <View className={'autoHeight' + className}>
                                                                    {swiperIndex == index ? props.children : null}
                                                                </View>

                                                        }
                                                    </SwiperItem>

                                            )
                                        })
                                    }
                                </Swiper>
                            </View>
                        }
                    </View >
                </View >
            }
        </>
    )
}

export default memo(Index);
