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
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
