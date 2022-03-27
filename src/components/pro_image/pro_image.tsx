/* eslint-disable react/jsx-indent-props */
import { View, Image, } from '@tarojs/components';
import { memo } from '@tarojs/taro';
import './blur_img.scss';

const ProImage = memo(({
    url,
    className
}: {
    url: string;
    className: string;
}) => {
    return <View className={`blur_wrap ${className}`} >
        <Image
            className='image--not-loaded'
            src={url}
            mode='aspectFill'
        />
    </View>
})

export default ProImage