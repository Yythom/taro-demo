export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/test/index'
  ],
  subpackages: [{
    root: "subpages/",
    pages: [
      "demo/index"
    ]
  }],
  // tabBar: {
  //   custom: true,
  //   color: '#C2C2C2',
  //   selectedColor: '#FF8106',
  //   list: [
  //     {
  //       pagePath: 'pages/test/index',
  //       text: '测试',
  //     },
  //     {
  //       pagePath: 'pages/index/index',
  //       text: '首页',
  //     },
  //   ],
  // },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
