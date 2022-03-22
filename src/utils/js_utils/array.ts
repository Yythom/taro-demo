const create_length_array = (lenght: number) => {
    const ret = Array.from(new Array(lenght)).map((e, i) => `${i}`)
    return {
        index: ret,
        array: Array.from(new Array(lenght))
    }
}

export {
    create_length_array
}