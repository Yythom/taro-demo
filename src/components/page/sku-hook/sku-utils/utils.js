function filterValidArr(arr) {
    return arr.filter(item => item).map(item => item.id);
}
function getCombFlags(m, n) {
    let flagArrs = [];
    let flagArr = [];
    let isEnd = false;
    for (let i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0;
    }
    flagArrs.push(flagArr.concat());
    // 当n不等于0并且m大于n的时候进入
    if (n && m > n) {
        while (!isEnd) {
            let leftCnt = 0;
            for (let i = 0; i < m - 1; i++) {
                if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
                    for (let j = 0; j < i; j++) {
                        flagArr[j] = j < leftCnt ? 1 : 0;
                    }
                    flagArr[i] = 0;
                    flagArr[i + 1] = 1;
                    let aTmp = flagArr.concat();
                    flagArrs.push(aTmp);
                    if (aTmp.slice(-n).join('').indexOf('0') === -1) {
                        isEnd = true;
                    }
                    break;
                }
                flagArr[i] === 1 && leftCnt++;
            }
        }
    }
    return flagArrs;
}

function combInFlags(skuKeyAttrs) {
    if (!skuKeyAttrs || skuKeyAttrs.length <= 0) return [];
    const len = skuKeyAttrs.length;
    const result = [];
    for (let n = 1; n <= len; n++) {
        const flags = getCombFlags(len, n);
        flags.forEach(flag => {
            let comb = [];
            flag.forEach((item, index) => {
                if (item === 1) {
                    comb.push(skuKeyAttrs[index])
                }
            })
            result.push(comb);
        })
    }
    return result;
}

function skuOptionAttrResult(combArrItem, sku, skuResult) {
    // let skuResult = JSON.parse(JSON.stringify(_skuResult));
    const key = combArrItem.join(';');
    if (skuResult[key]) {
        const prevPrice = skuResult[key].price
        const curPrice = [sku.price];
        const discount_price = [sku.discount_price];
        const member_price = [sku.member_price];

        skuResult[key] = {
            ...sku,
            price: prevPrice.concat(curPrice).sort(), // 上一个价格合并当前的，算出区间价格
            discount_price: prevPrice.concat(discount_price).sort(), // 上一个价格合并当前的，算出区间价格
            member_price: prevPrice.concat(member_price).sort(), // 上一个价格合并当前的，算出区间价格
            stock: skuResult[key].stock
            // + sku.stock, // 相同可选属性组合的库存累计
        }
    } else {
        skuResult[key] = {
            ...sku,
            price: [sku.price],
            discount_price: [sku.discount_price],
            member_price: [sku.member_price],
        };
    }
}

/**
 * 获取点击规格属性后返回当前已选择的规格数组
 * @param {Array} selectSpecList 当前选择的data
 * @param {Object} item sku对象
 * @param {Number} index 当前sku对象所在规格列表的 index
 */
function getActionSpecList(selectSpecList, item, index) {
    // 选中及反选
    if (selectSpecList[index] && selectSpecList[index].id == item.id) {
        selectSpecList[index] = null
    } else {
        selectSpecList[index] = item
    }
    if (selectSpecList.length) {
        return selectSpecList.slice()
    } else {
        return [];
    }
}

function getSelectObj(skuResult, selectSpecList, sku_list) {
    if (!selectSpecList || !sku_list) return false
    const skukey = filterValidArr(selectSpecList);
    if (skukey.length === sku_list.length) {
        const hitSpecObj = skuResult[skukey.join(';')]
        return hitSpecObj
    } else {
        return false
    }
}

// function priceFn(selectSpecList, skuResult, priceArr) {
//     const skukey = filterValidArr(selectSpecList).join(';');
//     const hitSpecObj = skuResult[skukey]
//     if (!hitSpecObj) return null;
//     const maxPrice = Math.max.apply(Math, priceArr);
//     const minPrice = Math.min.apply(Math, priceArr);
//     return {
//         minPrice,
//         maxPrice
//     }
// }

function getPrice(skuResult, selectSpecList) {
    const skukey = filterValidArr(selectSpecList).join(';');
    const hitSpecObj = skuResult[skukey]
    if (!hitSpecObj) return null;
    const priceArr = hitSpecObj.price;
    const maxPrice = Math.max.apply(Math, priceArr);
    const minPrice = Math.min.apply(Math, priceArr);
    return {
        minPrice,
        maxPrice
    }
}

function getDiscountPrice(skuResult, selectSpecList) {
    const skukey = filterValidArr(selectSpecList).join(';');
    const hitSpecObj = skuResult[skukey]
    if (!hitSpecObj) return null;
    const priceArr = hitSpecObj.discount_price;
    const maxPrice = Math.max.apply(Math, priceArr);
    const minPrice = Math.min.apply(Math, priceArr);
    return {
        minPrice,
        maxPrice
    }
}

function getMemberPrice(skuResult, selectSpecList) {
    const skukey = filterValidArr(selectSpecList).join(';');
    const hitSpecObj = skuResult[skukey]
    if (!hitSpecObj) return null;
    const priceArr = hitSpecObj.member_price;
    const maxPrice = Math.max.apply(Math, priceArr);
    const minPrice = Math.min.apply(Math, priceArr);
    return {
        minPrice,
        maxPrice
    }
}


function transPrice(skuResult, specListData) {
    let price = getPrice(skuResult, specListData);
    let discount_price = getDiscountPrice(skuResult, specListData);
    let member_price = getMemberPrice(skuResult, specListData);
    return {
        price: price?.maxPrice === price?.minPrice ? price?.maxPrice : price?.minPrice + '-' + price?.maxPrice,
        desc: specListData.filter(item => item).map(item => item.name).join(' '),
        discount_price: discount_price?.maxPrice === discount_price?.minPrice ? discount_price?.maxPrice : discount_price?.minPrice + '-' + discount_price?.maxPrice,
        member_price: member_price?.maxPrice === member_price?.minPrice ? member_price?.maxPrice : member_price?.minPrice + '-' + member_price?.maxPrice,
    }
}


function checkSpecAttrDisabled(selectSpecList, id, index, skuResult) {
    let disabled = false;
    // 初始化筛选出不可选的规格属性
    if (!skuResult[id]) disabled = true;
    // 根据当前选中的规格数组，筛选出不可选的规格属性
    const newSelectList = selectSpecList.map(item => item);
    // 给每个数组元素初始化一个id属性
    newSelectList[index] = {
        id: '',
        ...newSelectList[index]
    }
    // *重点* 遍历规格属性，处理同级选择和跨级选择的组合后，去查处理后的数据集匹配是否存在
    if (newSelectList[index].id !== id) {
        newSelectList[index].id = id;
        // 筛选出已选中的数据属性 通过name去找数据集
        const hitAttrKey = filterValidArr(newSelectList).join(';');
        disabled = !skuResult[hitAttrKey];
    }
    return {
        disabled,
        active: filterValidArr(selectSpecList).indexOf(id) !== -1,
    }
}



export {
    getCombFlags,           // 重点算法 从 m 个不同元素中取出 n 个元素的组合数 （给所有可选属性组合数添加1，0标记）
    combInFlags,            // 返回所有可选的规格属性数组
    skuOptionAttrResult,    // 添加所有可选属性数据集合
    getActionSpecList,      // 返回当前已选择的规格数组
    getSelectObj,           // 获取选中的规格对象
    transPrice,             // 返回价格以及已选择描述文字
    checkSpecAttrDisabled,  // 获取不可选状态以及已选状态
}