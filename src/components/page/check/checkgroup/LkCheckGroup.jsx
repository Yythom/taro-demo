/* eslint-disable react/jsx-indent-props */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RadioGroup, Radio, View, Checkbox, Text } from '@tarojs/components';
import '../radio.scss'

const LkCheckGroup = ({
    list = [
        {
            value: '2',
            text: '2',
            checked: true
        },
        {
            value: '1',
            text: '1',
            // checked: false
        },
    ],
    title = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus magnam explicabo, voluptatum exercitationem delectus alias hic corporis magni voluptate officia laudantium in, excepturi mollitia illo ipsa accusantium adipisci architecto?',
    onChange = Function.prototype,
    render,
}) => {
    const [_list, setList] = useState([]);

    useEffect(() => {
        if (list[0]) setList(list)
    }, [])

    return (
        <View className='test_box  fd'>
            <View className='title'>{title}</View>

            <View className='radio_box w-100'>
                {
                    _list.map((e, i) => {
                        return (
                            <View
                                style={{ justifyContent: 'space-between' }}
                                className='test_item flex w-100'
                                key={i + 'ck'}
                                onClick={(eve) => {
                                    eve.stopPropagation();
                                    let autoList = JSON.parse(JSON.stringify(_list));
                                    autoList[i].checked = !autoList[i].checked;
                                    setList(autoList)
                                    if (typeof onChange === 'function') {
                                        let filter = JSON.parse(JSON.stringify(autoList)).filter(item => {
                                            return item.checked
                                        })
                                        filter.forEach((element, index) => {
                                            filter[index] = element.value
                                            // delete element.checked
                                        });
                                        /**
                                         * @param {*} filter 选中的数组
                                         * @param {boolean}  boolean 是否全部选择传入的list
                                         */
                                        onChange(filter, autoList, filter.length === list.length);
                                    }
                                }}
                            >
                                <View className={(e.checked && 'checked') + ' right content'}>
                                    {render ? render(e) : null}
                                </View>
                                <View className='left'>
                                    <Checkbox className='checkbox-list__checkbox' checked={e.checked} />
                                </View>
                                <View className={e.checked ? 'hide color' : 'hide'} />
                            </View>
                        )
                    })
                }
            </View>
        </View>

    )
}
export default LkCheckGroup;
