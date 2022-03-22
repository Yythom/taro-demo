export default (obj) => {
    let copy = JSON.parse(JSON.stringify(obj));
    if (!copy.skuSpec) {
        copy.skuSpec = copy.product_specs; // 大规格列表
        delete copy.product_specs
    }
    if (!copy.skuList) {
        copy.skuList = copy.product_skus; // 可选规格列表
        delete copy.product_skus
    }
    let str = '';
    copy.skuSpec.forEach(e => {
        if (!e.id) {
            e.id = e.spec_id; // 大规格id
            delete e.spec_id;
        }
        // if (!e.goodsId) {
        //     e.goodsId = e.product_id; // 商品id
        //     delete e.product_id;
        // }
        if (!e.specName) {
            e.specName = e.spec_name; // 大规格名字
            delete e.spec_name;
        }
        if (!e.specAttrList) {
            e.specAttrList = e.spec_values; // 大规格列表
            delete e.spec_values;
        }
        str += e.specName + ' '
        e.specAttrList.forEach(el => {
            if (!el.id) {
                el.id = el.value_id; // 用于匹配子规格的id
                delete el.value_id;
            }
            if (!el.specId) {
                el.specId = el.spec_id // 当前大规格id
                delete el.spec_id
            }
            if (!el.name) {
                el.name = el.value; // 每个子规格的名字
                delete el.value;
            }
            el.parent_name = e.specName
        })
    })
    if (copy.skuList) {

        Object.values(copy.skuList).forEach(e => {
            // if (!e.img) {
            //     e.img = e.image;
            //     delete e.image;
            // }
            if (!e.price) {
                e.price = e.market_price;
                delete e.market_price;
            }
        })
    }
    return { ...copy, str }
}