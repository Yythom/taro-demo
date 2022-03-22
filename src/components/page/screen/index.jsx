/* eslint-disable react/jsx-indent-props */

// const changeSearch = async (key, value) => {
//     let newSearch = { ...search };
//     newSearch[key] = value;
//     setSearch(newSearch);
// };

/** 示例
 * const list = [
    {
        key: 'price',
        name: '价格排序',
        keep: true
    },
    {
        key: 'dis',
        name: '距离排序',
        more: true,
        child: [
            {
                text: '全部',
                value: ''
            },
        ]
    }
]
 */
/**
 list: [{
         key: '',     // 搜索key值
         name: '',    // 搜索名称
         more: false, // 是否展开搜索
         keep:false,  // 维持状态
         child: [],   // 展开列表
        }]
 * child: [{ text: '全部',  value: ''},

 * sort: 1, -1, 0;正序/倒序/
 * index: 当前排序字段index
 */
import { memo, Fragment, useCallback, useEffect, useState } from 'react';
import { View, Navigator, Text, Input } from '@tarojs/components';
import './style.scss'

const Screen = memo(({ list, onClick }) => {
    const [index, setIndex] = useState('');
    const [act, setAct] = useState({});  // sort的对象 { key:{} }
    const [sortContent, setSortContent] = useState([])

    const init = () => {
        let obj = {}
        list.forEach((e, i) => {
            obj[list[i].key] = ''
        });
        console.log(obj,);
        return obj
    }

    useEffect(() => {
        setAct(init())
    }, [])

    useEffect(() => {
        if (list[index]?.more) {
            setSortContent(list[index].child);
        } else {
            setSortContent([]);
        }
    }, [index])

    const handleScreenClick = (cate, i) => {
        console.log('点了', i);
        if (!cate.more) { // b不需要展开项直接赋值
            setSortContent([])
            // const newObj = { ...act, };
            const newObj = JSON.parse(JSON.stringify(act));
            Object.keys(newObj).forEach((item, i) => {
                if (item !== cate.key && !list[i].keep) newObj[item] = ''
            });
            if (newObj[cate.key]) {
                newObj[cate.key] = ''
            } else {
                newObj[cate.key] = 'desc'
            }
            setAct(newObj);
            onClick(newObj);
        }
        setIndex(i);

        if (i === index) {
            setIndex('');
        }
    }

    return (
        <View className='fb screen'>
            {
                list.map((cate, i) => (
                    <Text
                        key={cate.key} className={['item', act[list[i].key] ? 'item-active' : ''].join(' ')}
                        onClick={() => {
                            // setSort
                            handleScreenClick(cate, i)
                        }}
                    >
                        {act[list[i].key]?.text || cate.name}
                        {
                            act[list[i].key]
                                ?
                                <Text className='iconfont icon-fold' />
                                : <Text className='iconfont icon-unfold' />
                        }

                    </Text>
                ))
            }
            {
                (typeof index === 'number' && sortContent[0]) && <Fragment>
                    <View className='sort-content' >
                        {
                            sortContent.map((e, i) => {
                                return (
                                    <View
                                        className='item_sort'
                                        key={e.text + e.value}
                                        style={act[list[index].key]?.value == e.value && { color: '#00D0BF' }}
                                        onClick={() => {
                                            const actObj = {}
                                            const key = list[index].key
                                            actObj[key] = e; // 值
                                            const newObj = { ...act, ...actObj };
                                            Object.keys(newObj).forEach((item) => {
                                                if (item !== key && !list[i].keep) newObj[item] = ''
                                            });
                                            console.log(newObj, 'newObj');
                                            setAct(newObj);
                                            onClick(newObj);
                                            setIndex('');
                                        }}
                                    >
                                        {e.text}
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className='modal-mask' onClick={() => {
                        setIndex('')
                    }} />
                </Fragment>
            }

        </View>
    )
})

export default Screen;