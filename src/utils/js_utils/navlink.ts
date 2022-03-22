
const navLinkToUrl = (
    url: string,
    query: { [key: string]: string }
) => {
    let search = '';
    if (Object.keys(query)[0]) {
        search = '?';
        Object.keys(query).forEach((e, i) => {
            search += `${i > 0 ? '&' : ''}${e}=${query[e]}`
        })
    }
    console.log(`/${url}${search}`);
    return { pathname: `/${url}${search}` }
}
export default navLinkToUrl;