interface login_interface {
    account: string,
    password: string,
}

// interface shop_account_list__item_interface {
//     shop_name: string;
//     url: string;
// }
interface shop_account_list_interface {
    list: {
        shop_name: string;
        url: string;
    }[],
}

export type {
    login_interface,
    shop_account_list_interface
}