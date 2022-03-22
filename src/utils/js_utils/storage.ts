
class Storage {
    static getStorageSync(key: string) {
        const cache = localStorage.getItem(key)
        if (cache) {
            let temp = JSON.parse(cache)?.data
            return temp
        }
    }

    static setStorageSync(key: string, value: any) {
        let temp = JSON.stringify({ data: value });
        localStorage.setItem(key, temp);
    }
    static clear() {
        localStorage.clear();
    }
}

export default Storage;