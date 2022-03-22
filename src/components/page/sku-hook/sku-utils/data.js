export const data = {
    skuList: {  // 所有可选列表
        // 4.7寸;16G;红色
        "101;201;302": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 200,
            "stock": 10,
            'sku_id': '111',
            'sale_price': 999
        },
        // 4.7寸;16G;黄色
        "101;201;303": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',   // sku主图
            "price": 150, // 价格
            "stock": 6,// 库存
            'sku_id': '222',
            'sale_price': 200
        },
        // 5.5寸;16G;红色
        "102;201;302": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 101,
            "stock": 10,
            'sku_id': '333',
            'sale_price': 100
        },
        // 5.5寸;16G;黑色
        "102;201;301": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 200,
            "stock": 2,
            'sku_id': '444',
            'sale_price': 130
        },
        // 5.5寸;64G;黄色
        "102;203;303": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 110,
            "stock": 6,
            'sku_id': '555',
            'sale_price': 140
        },
        // 5.5寸;32G;黑色
        "201;202;301": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 300,
            "stock": 16,
            'sku_id': '666',
            'sale_price': 340
        },
        "103;202;301": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 300,
            "stock": 16,
            'sku_id': '777',
            'sale_price': 440
        },
    },
    skuSpec: [ // sku规范
        {
            "id": 262,
            "goodsId": 13,
            "specName": "尺寸",
            "specAttrList": [
                { id: 101, specId: 262, name: '4.7寸' },
                { id: 102, specId: 262, name: '5.5寸' },
                { id: 103, specId: 262, name: '6.0寸' },
            ]
        },
        {
            "id": 263,
            "goodsId": 13,
            "specName": "内存",
            "specAttrList": [
                { id: 201, specId: 263, name: '16G' },
                { id: 202, specId: 263, name: '32G' },
                { id: 203, specId: 263, name: '64G' },
            ]
        },
        {
            "id": 264,
            "goodsId": 13,
            "specName": "颜色",
            "specAttrList": [
                { id: 301, specId: 264, name: '黑色' },
                { id: 302, specId: 264, name: '红色' },
                { id: 303, specId: 264, name: '黄色' },
            ]
        }
    ]
}


export const onlineData = {
    "product_specs": [{
        "spec_name": "造型",
        "spec_id": "283038145040498688",
        "spec_values": [{
            "value_id": "101",
            "spec_id": "283038145040498688",
            "value": "原造型"
        }, {
            "value_id": "102",
            "spec_id": "283038145040498688",
            "value": "加雪花"
        }]
    }, {
        "spec_name": "尺寸",
        "spec_id": "283038145040498686",
        "spec_values": [{
            "value_id": "201",
            "spec_id": "283038145040498686",
            "value": "12"
        }, {
            "value_id": "202",
            "spec_id": "283038145040498686",
            "value": "32"
        }]
    }],
    "product_skus": {
        "101;201": {
            "sku_id": "001",
            "number": "000001",
            "cover": "https://fish-pay.oss-cn-chengdu.aliyuncs.com/product/covers/timehash.png",
            "market_price": 15900,
            "discount_price": 9900,
            "member_price": 8900,
            "stock": 50
        },
        "102;202": {
            "sku_id": "002",
            "number": "000002",
            "cover": "https://fish-pay.oss-cn-chengdu.aliyuncs.com/product/covers/timehash.png",
            "market_price": 16900,
            "discount_price": 10900,
            "member_price": 9900,
            "stock": 50
        }
    },
}

