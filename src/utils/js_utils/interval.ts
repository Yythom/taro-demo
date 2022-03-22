var timer: any = {};
const startInterval = (key: string, fn: Function, time: number, isOneRun = true) => {
    // console.log(time, 'time');
    isOneRun && fn();
    if (timer[key]) {
        clearInterval(timer[key]);
        timer[key] = ''
    }
    if (!timer[key]) timer[key] = setInterval(() => {
        // console.log(timer, '全局轮训器');
        // if()
        fn()
    }, time || 20000);
}
const stopInterval = () => {
    Object.values(timer).forEach((e: any) => {
        clearInterval(e);
    });
    timer = {}
}
const clearKeyTime = (key: string) => {
    if (!timer[key]) return
    clearInterval(timer[key]);
    delete timer[key]
}

export {
    startInterval,
    stopInterval,
    clearKeyTime,
}