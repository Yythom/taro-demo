/* eslint-disable no-unused-vars */
import { Image, Text, View } from "@tarojs/components";
import { makePhoneCall } from '@tarojs/taro';
// import star from '../assets/images/star.png';

// 倒计时转化Fn 时间戳
export function formatSeconds(value) {
    if (value === 0) return null;
    let theTime = parseInt(value);// 秒
    let theTime1 = 0;// 分
    let theTime2 = 0;// 小时
    let theTime3 = 0;// 天
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
        if (theTime2 > 24) {
            theTime3 = parseInt(theTime2 / 24);
        }
    }

    let result = `${parseInt(theTime)}`;
    if (result < 10) {
        result = `0${result}`;
    }
    if (theTime1 > 0) {
        result = `${parseInt(theTime1)}:${result}`;

        if (theTime1 < 10) {
            result = `0${result}`;
        }
    } else {
        result = `${result}`;
    }
    if (theTime2 > 0) { // 暂时用不到
        if (theTime2 > 24) {
            result = `${theTime3}天${parseInt(theTime2 % 24)}:${result}`;
        } else {
            result = `${parseInt(theTime2)}:${result}`;
        }
    }

    if (value < 60) { // 60秒以内操作
        result = `00:${result}`;
    } else if (value === 60) {
        result = '01:00';
    }
    return result;
}

/**
*判断访问终端
*/
// function browser() {
//     let browsers = {
//         versions: function () {
//             var u = navigator.userAgent, app = navigator.appVersion;
//             return {
//                 trident: u.indexOf('Trident') > -1, //IE内核
//                 presto: u.indexOf('Presto') > -1, //opera内核
//                 webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//                 gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
//                 mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//                 ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//                 android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
//                 iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//                 iPad: u.indexOf('iPad') > -1, //是否iPad
//                 webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
//                 weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
//                 qq: u.match(/\sQQ/i) == " qq" //是否QQ
//             };
//         }(),
//         language: (navigator.browserLanguage || navigator.language).toLowerCase()
//     }
//     return browsers
// }


/**
   * 手机号验证
   * @param tel
   */
export function isPhoneNumber(tel) {
    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    return reg.test(tel);
}

/**
   * 验证姓名
   * @param name
   */
// function getName(name) {
//     var nameReg = /^[\u4e00-\u9fa5]{1,}((·[\u4e00-\u9fa5]{1,}){0,1})$/;
//     return nameReg.test(name)
// }

/**
   * 身份证号码验证
   *
   * @param cardNo
   *            {String} 证件号码
   * @returns info {Object} 身份证信息.
   *
   */
// function getIdCardInfo(cardNo) {
//     /*
//         isTrue: false, // 身份证号是否有效。默认为 false
//         year: null,// 出生年。默认为null
//         month: null,// 出生月。默认为null
//         day: null,// 出生日。默认为null
//         isMale: false,// 是否为男性。默认false
//         isFemale: false // 是否为女性。默认false
//     */
//     let [isTrue, year, month, day, isMale, isFemale] = [false, null, null, null, false, false];
//     if (cardNo) {
//         const isEven = n => n % 2 === 0;
//         if (15 === cardNo.length) {
//             [year, month, day] = [1900 + +cardNo.substring(6, 8), +cardNo.substring(8, 10), +cardNo.substring(10, 12)]
//             const birthday = new Date(year, month - 1, day);
//             if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {
//                 isTrue = true;
//                 isEven(cardNo.substring(14, 15)) ? isFemale = true : isMale = true;
//             }
//         } else if (18 === cardNo.length) {
//             [year, month, day] = [+cardNo.substring(6, 10), +cardNo.substring(10, 12), +cardNo.substring(12, 14)];
//             const birthday = new Date(year, month - 1, day);
//             if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {
//                 const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
//                 const Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
//                 let _cardNo = Array.from(cardNo); // reset: let _cardNo = [...cardNo];
//                 if (_cardNo[17].toLowerCase() === 'x') {
//                     _cardNo[17] = 10;
//                 }
//                 let sum = 0; // 声明加权求和变量
//                 for (let i = 0; i < 17; i++) {
//                     sum += Wi[i] * _cardNo[i];// 加权求和
//                 }
//                 const i = sum % 11;// 得到验证码所位置
//                 if (+_cardNo[17] === Y[i]) {
//                     isTrue = true;
//                     isEven(+cardNo.substring(16, 17)) ? isFemale = true : isMale = true;
//                 }
//             }
//         }
//     }
//     if (!isTrue) [year, month, day, isMale, isFemale] = [];
//     return { isTrue, year, month, day, isMale, isFemale };
// }

//export function Star(number, size, highColor = '#7300FF', defaultColor = '#B6B6B6') {
//     const numberTen = number * 10 * size;
//     const firstNum = Math.floor(numberTen / 10 / size);
//     const lastNum = numberTen % (size * 10);
//     let starList = [];
//     for (let i = 0; i < firstNum; i++) {
//         starList.push(i)
//     }

//     let grayList = [];
//     let gratSize = lastNum ? size - firstNum - 1 : size - firstNum
//     for (let i = 0; i < gratSize; i++) {
//         grayList.push(i)
//     }
//     const startColorparams = { highColor, defaultColor };
//     return (
//         <View className='star-rate-box'>
//             {starList.map(one => {
//                 return <CheckStar number={100} {...startColorparams}></CheckStar>
//             })}
//             {lastNum ? <CheckStar number={lastNum} {...startColorparams}></CheckStar> : null}
//             {grayList.map(one => {
//                 return <CheckStar  {...startColorparams}></CheckStar>
//             })}
//             <Text>{number}</Text>
//         </View>
//     )
// }

// function CheckStar({ number, highColor, defaultColor }) {
//     const backStyle = number ? {
//         backgroundColor: highColor,
//         backgroundImage: `linear-gradient(90deg,${highColor} ${number}%,${defaultColor} 20%)`
//     } : { background: defaultColor }
//     return (
//         <View className='checked-star-box'>
//             <View className='star_img'> <Image src={star} /></View>
//             <View className='color-star' style={backStyle}></View>
//         </View>
//     )
// }

export const callPhone = (e, phone) => {
    e.stopPropagation();
    makePhoneCall({
        phoneNumber: phone,
    });
};

export function hideMobile(mobile) {
    if (mobile) return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
    else return ''
}
