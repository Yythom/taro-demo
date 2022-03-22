/* eslint-disable react/jsx-indent-props */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RadioGroup, Radio, View } from '@tarojs/components';
import '../radio.scss'

const LkRadioGroup = ({
    render,
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
                                className='test_item flex w-100'
                                style={{ justifyContent: 'space-between' }}
                                key={i + '_radio'}
                                onClick={() => {
                                    const newList = JSON.parse(JSON.stringify(_list));
                                    newList.forEach(element => {
                                        element.checked = false
                                    });
                                    newList[i].checked = true;
                                    setList(newList);
                                    let filter = JSON.parse(JSON.stringify(newList)).filter(item => {
                                        return item.checked
                                    })
                                    filter.forEach((element, index) => {
                                        filter[index] = element.value
                                        // delete element.checked
                                    });
                                    onChange(newList, filter);
                                }}
                            >
                                <View className={(e.checked && 'checked') + ' content'}>
                                    {render ? render(e) : e.text}
                                </View>
                                <Radio className='radio-list__radio' checked={e.checked} />
                                <View className={e.checked ? 'hide color' : 'hide'} />
                            </View>
                        )
                    })
                }
            </View>
        </View >

    )
}
export default LkRadioGroup;
