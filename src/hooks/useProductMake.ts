import { useLayoutEffect } from "react";
import CreatePay from "../services/make_order/create_pay_params";
import MakeOrderParamsInterface from "../services/make_order/interface";
import { ProductDetailInterface } from "../services/product/interface";
import { state } from "../store/make_order_slice";
import useSlice from "./useSlice";

function useProductMake() {
    const [cart_slice]: any = useSlice('cart');
    const [make_order_slice] = useSlice<state>('make_order_slice');

    useLayoutEffect(() => {
        const make_params: MakeOrderParamsInterface | undefined = make_order_slice.make_params;
        const cart_product_list: ProductDetailInterface[] = cart_slice.products
        if (cart_product_list.length === 0) return
        CreatePay.init({
            product_list: cart_product_list,
            make_data: make_params,
            pay_method: make_params?.params.config?.pay_method || 0
        });
        if (!cart_product_list[0]) return;
    }, [make_order_slice.make_params, cart_slice?.products]);

    return {
        payControl: CreatePay,
        make_order_slice,
        cart_slice
    }
}

export default useProductMake;