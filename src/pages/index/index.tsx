import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

function sceneDecode(scene: string) {
  if (scene === undefined)
    return {};
  let _scene = decodeURIComponent(scene),
    params = _scene.split(','),
    data = {};
  for (let i in params) {
    var val = params[i].split(':');
    val.length > 0 && val[0] && (data[val[0]] = val[1] || null)
  }
  return data;
}

function Index() {
  // scene=a%3A43%2Cluck_id%3A43%2Cperiod_id%3A43
  const scene = Taro.getCurrentInstance().router?.params?.scene
  console.log(sceneDecode(scene as string));

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

export default Index