import BigNumber from 'bignumber.js';
import np from 'number-precision';

class NumberUtils {
    static BigNumberToFixed(value: any) {
        return new BigNumber(value).toFixed()
    }

    static numToDivide = (num: string, decimals: number) => {
        const result = this.BigNumberToFixed(np.divide(num || 0, this.BigNumberToFixed(Math.pow(10, decimals))))
        return result
    }

    static numToTimes = (num: string, decimals: number) => {
        const result = this.BigNumberToFixed(np.times(num || 0, this.BigNumberToFixed(Math.pow(10, decimals))))
        return result
    }

    static getDecimals = (decimals: any) => {
        return this.BigNumberToFixed(Math.pow(10, decimals))
    }

    static numToMPa = (num: any) => {
        const result = Number(this.numToDivide(num, 6)) < 1 ?
            `${Number(this.numToDivide(num, 3)).toFixed(2)} K`
            : `${Number(this.numToDivide(num, 6)).toFixed(2)} M`
        return result;
    }
    static numToFixed = (num: any, length = 6) => {
        const number = this.BigNumberToFixed(num)
        if (number.indexOf('.') === -1) {
            return number
        } else {
            const floatlength = (number.split('.')[1] || '').length
            const result = floatlength > 0
                ? (
                    floatlength > length
                        ? this.BigNumberToFixed(Number(number).toFixed(length))
                        : number
                )
                : ''
            return result;
        }
    }
}

export default NumberUtils;