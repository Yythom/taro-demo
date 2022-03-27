import { Radio, View } from '@tarojs/components'
import useRequest from '@/src/hooks/useRequest'
import { shop_account_list_interface } from '@/src/services/login/interface'
import LoginService from '@/src/services/login/login'
import WithUserVerify from '@/src/components/auth/UserVerify'
import useCheck from '@/src/hooks/useCheck'
import './index.scss'

const Index = () => {
  const [shop_account_list] = useRequest<shop_account_list_interface>(LoginService.domainApi, { initParams: {} });


  return <View>
    test
    <WithUserVerify >
      登入
    </WithUserVerify>

  </View>
}

export default Index;