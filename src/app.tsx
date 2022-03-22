/* eslint-disable react-hooks/exhaustive-deps */
import { Component, memo, useLayoutEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { setEnableDebug } from '@tarojs/taro';
import dayjs from 'dayjs';
import { actions } from './store/global_slice';
import store from './store';
import './app.scss';

dayjs.locale('zh-cn');
const InitStore = memo(() => {
  const dispatch = useDispatch();
  console.log('执行store');
  useLayoutEffect(() => {
    dispatch(actions.setThemeConfig({
      theme: '#333'
    }))
  }, [])
  return null
});

class App extends Component {

  componentWillMount() {

  }
  componentDidMount() {
    // init({ // 不可在异步执行
    //   silentConsole: false,
    //   // debug: true,
    //   maxBreadcrumbs: 30
    // });
    // initErrorNet(breadcrumb); 
    if (process.env.NODE_ENV === 'development') setEnableDebug({
      enableDebug: true
    })

  }
  componentDidShow() {

    // getLocal().then(res => { // 获取当前位置
    //     setStorageSync('location_address', res)
    // })
  }

  componentDidHide() { }


  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store} >
      <InitStore />
      {this.props.children}
    </Provider>
  }
}

export default App
