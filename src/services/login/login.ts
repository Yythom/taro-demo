
import { login_interface, shop_account_list_interface } from "./interface";
import http from "../request";

class LoginService {
    static login = async (data: login_interface) => {
        const result = await http.post('/cashier/login', data)
        return result;
    }

    static domainApi = async () => {
        const result = await http.post<shop_account_list_interface>('/cashier/domain')
        return result;
    }
}

export default LoginService