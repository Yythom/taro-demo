/* eslint-disable react/jsx-indent-props */
import { useMemo, useState, Fragment } from 'react';
import { View, Text, Map } from '@tarojs/components';
import './maps.scss'

const Maps = ({
    location = [], // 32.19523 - lat, 119.41134 -lng
    text,
}) => {
    const normalCallout = useMemo(() => {
        return [
            {
                id: 1,
                latitude: Number(location[0]),
                longitude: Number(location[1]),
                callout: {
                    content: text,
                    color: '#333',
                    fontSize: 12,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#999',
                    bgColor: '#fff',
                    padding: 5,
                    display: 'ALWAYS',
                    textAlign: 'center',
                }
            }
        ]
    }, [location, text])
    console.log(location, text, 'info');
    return (
        <Fragment >
            {
                (location[0] && text) && <Map
                    className='maps'
                    longitude={location[1]}
                    latitude={location[0]}
                    scale={16}
                    markers={normalCallout}
                // showCompass
                // showScale
                // onEnd={async (e) => {
                // const { centerLocation } = e.detail
                // setMarkers([centerLocation.latitude, centerLocation.longitude])
                // const res = await request({
                //     url: 'http://49.234.41.182:8701/getLocation', //仅为示例，并非真实的接口地址
                //     method: 'POST',
                //     data: {
                //         lat: `${centerLocation.latitude}`,
                //         lng: `${centerLocation.longitude}`,
                //     },
                //     header: {
                //         'content-type': 'application/json' // 默认值
                //     },
                // })
                // console.log(res, 'detail');
                // }}
                // onBegin={(e) => {
                // console.log(e.detail);
                // }}
                // onRegionChange={onRegionChange}
                ></Map>
            }
        </Fragment>
    )
}
export default Maps;

