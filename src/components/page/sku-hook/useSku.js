import { hideLoading } from "@tarojs/taro";
import { useEffect, useMemo, useState } from "react";
import {
    combInFlags,
    getActionSpecList,
    getSelectObj,
    skuOptionAttrResult,
    transPrice,
    checkSpecAttrDisabled,
} from "./sku-utils/utils";

/**
 * @param {*} data { skuList:[], skuSpec:[] }
 * @returns 
 */
let specListData = [];
let skuResult = [];
let specList = [];
const useSku = (data, show, default_sku = []) => {
    // const [skuResult, setskuResult] = useState(null); // 所有sku组合数组
    // const [specList, setspecList] = useState([]); // 页面渲染列表
    const [filterStr, setFilterStr] = useState(''); // 剩余选择的描述文字
    // const [specListData, setSpecListData] = useState([]); // 选中的规格属性数据对象
    const [sku, setSku] = useState({
        sku: false,
        desc: {
            str: data?.skuSpec.map(e => e.specName).join(' ')
        }
    })
    const [load, setload] = useState(false);

    useEffect(() => {
        if (data) {
            setload(false)
            console.log('重新初始化');
            option.init(data);
            setSku({
                sku: false,
                desc: {
                    str: data?.skuSpec.map(e => e.specName).join(' ')
                }
            })
        }
    }, [data]);

    useEffect(() => {
        if (load) {
            if (default_sku[0]) {
                // 默认选中
                default_sku.forEach((item, index) => {
                    option.handleSpecAttr(item, index);
                })
            }
            // else {
            //     if (Object.keys(data?.skuList || {}).length == 1) {
            //         let item = {
            //             id: data.skuSpec[0]?.specAttrList[0]?.id,
            //             name: data.skuSpec[0]?.specAttrList[0]?.name
            //         }
            //         option.handleSpecAttr(item, 0);
            //     }
            // }
            console.log('挂载完成');
        }
    }, [load])

    const option = useMemo(() => {
        const init = ({ skuList, skuSpec }) => {
            // setskuResult(null);
            skuResult = null
            // setspecList([]);
            specList = [];
            specListData = [];
            skuResult = [];
            // setSpecListData([]);
            // setload(false);
            const newskuResult = {}
            const skuKeys = Object.keys(skuList);
            skuKeys.forEach(skuKey => {
                const _sku = skuList[skuKey];
                const skuKeyAttrs = skuKey.split(";");
                const combArr = combInFlags(skuKeyAttrs);
                combArr.forEach(item => {
                    // 给每个可选属性组合设置对应的sku数据
                    skuOptionAttrResult(item, _sku, newskuResult);
                })
                // 将原始库存组合也加到结果集里面
                // this.skuResult[skuKey] = sku;
            });
            // setskuResult(newskuResult);
            skuResult = newskuResult;
            // setspecList(skuSpec);
            specList = skuSpec;
            setFilterStr(skuSpec.map(e => e.specName).join(' '));
            setTimeout(() => {
                setload(true);
            }, 200);
        }

        function handleSpecAttr(item, index) { // sku选择
            // clearInterval(timmer);
            const list = getActionSpecList(specListData, item, index);
            // console.log(specListData, 'specListData');

            let str = filterStr;
            str.split(' ').forEach(el => {
                list.forEach(e => {
                    if (el && e) {
                        if (e.parent_name == el) {
                            str = str.replace(el, '')
                        }
                    }
                })
            });
            // list && setSpecListData(list);
            specListData = list;
            const _sku = getSelectObj(skuResult, list, specList);
            const { price, desc, member_price, discount_price } = transPrice(skuResult, list);
            setSku({
                sku: _sku,
                desc: {
                    str: _sku ? desc : (str.trim().length > 0 ? str : filterStr), // 主页面展示 描述
                    filterStr: desc,
                    price: price,
                    member_price,
                    discount_price,
                },
            })
            // console.log(list, index, '_sku');
        }

        return {
            init,
            handleSpecAttr,
            checkSpecAttrDisabled: (id, index) => checkSpecAttrDisabled(specListData, id, index, skuResult),
        }
    }, [skuResult, specList]);

    return [option, load, sku, specList, specListData];
}

export default useSku;
