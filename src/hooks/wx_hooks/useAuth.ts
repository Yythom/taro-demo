import useRequest from "@/src/hooks/useRequest";
import Taro from "@tarojs/taro";

const useAuth = (authKey = 'scope.userInfo') => {
	const [setting] = useRequest<Taro.getSetting.SuccessCallbackResult>(Taro.getSetting, {
		initParams: {}
	})
	return {
		auth: setting?.authSetting[authKey]
	}
}

export default useAuth;