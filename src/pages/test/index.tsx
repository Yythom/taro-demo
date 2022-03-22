import { View } from '@tarojs/components'
import useRequest from '@/src/hooks/useRequest'
import { shop_account_list_interface } from '@/src/services/login/interface'
import LoginService from '@/src/services/login/login'
import './index.scss'

const Index = () => {
  const [shop_account_list] = useRequest<shop_account_list_interface>(LoginService.domainApi, { initParams: {} });

  console.log(shop_account_list, 'shop_account_list');

  return <View>
    test
  </View>
}

export default Index;