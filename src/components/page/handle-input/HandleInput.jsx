/* eslint-disable react/jsx-indent-props */
import { useCallback } from 'react'
import { View, Text, Input } from '@tarojs/components';
import { debounce, throttle } from '@/common/utils';

const HandleInput = ({
    list,
    num,
    onChange = Function.prototype,
}) => {

    // const _onChange = useCallback(debounce((number) => {
    //     onChange(number);
    // }), [list]);
    // const _onChange = useCallback(throttle((number) => {
    //     onChange(number);
    // }), [list]);
    const _onChange = (number) => {
        onChange(number);
    };

    return (
        <View className='handle_input' onClick={(e) => {
            e.stopPropagation();
        }} >
            <View
                className='minus btn'
                onClick={(e) => {
                    e.stopPropagation();
                    if (num > 1) _onChange(num - 1)
                    else _onChange(1)
                }}
            >
                -
            </View>
            <Input type='number' className={`num ${window && 'fc'}`} placeholderStyle='color:#333'
                value={num}
                onInput={(e) => {
                    e.stopPropagation();
                    if (e.detail.value < 0) {
                        _onChange(1);
                        return
                    }
                    _onChange(e.detail.value)
                }}
            />
            <View
                className='add btn'
                onClick={(e) => {
                    e.stopPropagation();
                    _onChange(Number(num) + 1)
                }}
            >
                +
            </View>
        </View>
    )
}

export default HandleInput;