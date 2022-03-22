function formatUrl() {
    if (window.location.search) {
        let iterator = new URLSearchParams(window.location.search).entries();
        let _obj = {}
        function Next(params) {
            let a = params.next()
            if (a.value) {
                _obj[a.value[0]] = a.value[1]
                Next(iterator)
            }
        }
        Next(iterator);
        return { ..._obj, str: window.location.search }
    }
    return {
        msg: 'no find search-url',
        str: window.location.search.replace('?', '')
    }
}

// 范围随机数
function randomFrom(lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}
/**
   * 手机号验证
   * @param tel
   */
const isMobile = (s) => /^1[3-9][0-9]{9}$/.test(s);

function debounce(func, threshold = 500, immediate = false) {
    if (typeof func !== "function") {
        throw new Error("First argument of debounce function should be a function");
    }
    let timer = null;
    return function debounced(...args) {
        const context = this;
        const callNow = immediate && !timer;
        const later = () => {
            timer = null;
            if (!immediate) func.apply(context, args);
        };
        ////console.log('please wait');
        clearTimeout(timer);
        timer = setTimeout(later, threshold);
        if (callNow) func.apply(context, args);
        // console.log(func);
    };
}

export {
    formatUrl,
    randomFrom,
    isMobile,
    debounce,
}