/* eslint-disable jsx-quotes */
import { Block, Editor, Text, View } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './editor.scss'

@withWeapp({
  properties: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    insertPicture: {
      type: Boolean,
      value: true
    },
    placeholder: {
      type: String,
      value: '输入文字...'
    }
  },
  data: {
    formats: {},
    readOnly: false,
    // editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false
  },
  ready() {
    const platform = Taro.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS
    })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    Taro.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        Taro.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)
    })
  },
  methods: {
    readOnlyChange() {
      this.setData({
        readOnly: !this.data.readOnly
      })
    },
    updatePosition(keyboardHeight) {
      const toolbarHeight = 100
      const { windowHeight, platform } = Taro.getSystemInfoSync()
      let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
      console.log(keyboardHeight);
      this.setData({
        // editorHeight,
        keyboardHeight
      })
    },
    calNavigationBarAndStatusBar() {
      const systemInfo = Taro.getSystemInfoSync()
      const { statusBarHeight, platform } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady(cb) {
      const that = this
      //组件使用createSelectorQuery加上in(this)
      Taro.createSelectorQuery().select('#editor').context((res) => {
        that.editorCtx = res.context
        cb(that)
      }).exec();
    },
    undo() {
      this.editorCtx.undo()
    },
    redo() {
      this.editorCtx.redo()
    },
    blur() {
      this.editorCtx.blur()
    },
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      if (name === 'backgroundColor' && value === '#ff0000') {
        //设置字体颜色为白色
        this.editorCtx.format('color', '#ffffff')
      }
      if (name === 'backgroundColor' && value === '#ffffff') {
        this.editorCtx.format('color', '#000000')
      }
      if (name === 'color') {
        //清除字体样式
        this.editorCtx.removeFormat()
      }
      this.editorCtx.format(name, value)
    },
    onStatusChange(e) {
      const formats = e.detail
      this.setData({
        formats
      })
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          console.log('clear success')
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    insertImage() {
      this.triggerEvent('insertImage', {
        insertSrc: this.insertSrc
      }) //触发父组件方法
    },
    insertSrc(src) {
      Taro.showLoading();
      let that = this
      //接受图片返回地址
      Taro.uploadFile({
        url: 'http://49.234.41.182:8701/upload', //仅为示例，非真实的接口地址
        filePath: src,
        name: 'file',
        // eslint-disable-next-line no-shadow
        success(res) {
          that.editorCtx.insertImage({
            src: Object.values(JSON.parse(res.data))[0].url,
            data: {
              id: 'abcd',
              role: 'god'
            },
            width: '80%',
            success: () => {
              Taro.hideLoading();
            },
            fail: err => {
              Taro.hideLoading();
              console.log(`图片插入失败：${err}`)
            },
          })
        }
      })
    },
    getContent(e) {
      //获得文本内容
      this.triggerEvent('Content', {
        content: e.detail
      })
    },
    setHtml(html) {
      //回显
      if (html) {
        this.createSelectorQuery()
          .select('#editor')
          .context(res => {
            this.editorCtx = res.context
            this.editorCtx.setContents({
              html,
              fail: err => {
                console.log(`内容回显失败：${err}`)
              }
            })
          })
          .exec()
      }
    }
  }
})
class EditorComponent extends React.Component {
  render() {
    const {
      placeholder,
      width,
      height,
      keyboardHeight,
      isIOS,
      onReady,
      formats,
      previewarginBottom,
      insertPicture
    } = this.data

    return (
      <Block>
        <Editor
          id="editor"
          className="ql-container"
          placeholder={placeholder}
          onStatuschange={this.onStatusChange}
          onReady={() => { this.onEditorReady(onReady); }}
          onInput={this.getContent}
          style={'width:' + width + ';height:' + height + ';'}
        ></Editor>
        <View
          className="toolbar"
          onTouchEnd={this.format}
          hidden={keyboardHeight > 0 ? false : true}
          style={'bottom: ' + (isIOS ? keyboardHeight : 0) + 'px'}
        >
          {/*  <Text class="iconfont icon-charutupian" catchtouchend="insertImage"></Text>                                                                                                                                                                                                                                                                                                                                                                                                  <Text class="iconfont icon-wuxupailie {{formats.list === 'bullet' ? 'ql-active' : ''}}" data-name="list" data-value="bullet"></Text>  */}
          <Text
            className={
              'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')
            }
            data-name="bold"
          ></Text>
          <Text
            className={
              'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')
            }
            data-name="italic"
          ></Text>
          <Text
            className={
              'iconfont icon-zitixiahuaxian ' +
              (formats.underline ? 'ql-active' : '')
            }
            data-name="underline"
          ></Text>
          <Text
            className={
              'iconfont icon-zitishanchuxian ' +
              (formats.strike ? 'ql-active' : '')
            }
            data-name="strike"
          ></Text>
          <Text
            className={
              'iconfont icon-zuoduiqi ' +
              (formats.align === 'left' ? 'ql-active' : '')
            }
            data-name="align"
            data-value="left"
          ></Text>
          <Text
            className={
              'iconfont icon-juzhongduiqi ' +
              (formats.align === 'center' ? 'ql-active' : '')
            }
            data-name="align"
            data-value="center"
          ></Text>
          <Text
            className={
              'iconfont icon-youduiqi ' +
              (formats.align === 'right' ? 'ql-active' : '')
            }
            data-name="align"
            data-value="right"
          ></Text>
          <Text
            className={
              'iconfont icon-zuoyouduiqi ' +
              (formats.align === 'justify' ? 'ql-active' : '')
            }
            data-name="align"
            data-value="justify"
          ></Text>
          <Text
            className={
              'iconfont icon-line-height ' +
              (formats.lineHeight ? 'ql-active' : '')
            }
            data-name="lineHeight"
            data-value="2"
          ></Text>
          <Text
            className={
              'iconfont icon-Character-Spacing ' +
              (formats.letterSpacing ? 'ql-active' : '')
            }
            data-name="letterSpacing"
            data-value="2em"
          ></Text>
          <Text
            className={
              'iconfont icon-722bianjiqi_duanqianju ' +
              (formats.marginTop ? 'ql-active' : '')
            }
            data-name="marginTop"
            data-value="20px"
          ></Text>
          <Text
            className={
              'iconfont icon-723bianjiqi_duanhouju ' +
              (formats.micon - previewarginBottom ? 'ql-active' : '')
            }
            data-name="marginBottom"
            data-value="20px"
          ></Text>
          <Text
            className="iconfont icon-clearedformat"
            onClick={this.removeFormat}
          ></Text>
          {/*  <Text class="iconfont icon-font {{formats.fontFamily ? 'ql-active' : ''}}" data-name="fontFamily" data-value="Pacifico"></Text>  */}
          <Text
            className={
              'iconfont icon-fontsize ' +
              (formats.fontSize === '24px' ? 'ql-active' : '')
            }
            data-name="fontSize"
            data-value="24px"
          ></Text>
          <Text
            className={
              'iconfont icon-text_color ' +
              (formats.color === '#ff0000' ? 'ql-active' : '')
            }
            data-name="color"
            data-value={formats.color === '#ff0000' ? '#000000' : '#ff0000'}
          ></Text>
          <Text
            className={
              'iconfont icon-fontbgcolor ' +
              (formats.backgroundColor === '#ff0000' ? 'ql-active' : '')
            }
            data-name="backgroundColor"
            data-value={formats.color === '#ff0000' ? '#ffffff' : '#ff0000'}
          ></Text>
          <Text className="iconfont icon-date" onClick={this.insertDate}></Text>
          <Text
            className="iconfont icon--checklist"
            data-name="list"
            data-value="check"
          ></Text>
          <Text
            className={
              'iconfont icon-youxupailie ' +
              (formats.list === 'ordered' ? 'ql-active' : '')
            }
            data-name="list"
            data-value="ordered"
          ></Text>
          <Text
            className={
              'iconfont icon-wuxupailie ' +
              (formats.list === 'bullet' ? 'ql-active' : '')
            }
            data-name="list"
            data-value="bullet"
          ></Text>
          <Text className="iconfont icon-undo" onClick={this.undo}></Text>
          <Text className="iconfont icon-redo" onClick={this.redo}></Text>
          <Text
            className="iconfont icon-outdent"
            data-name="indent"
            data-value="-1"
          ></Text>
          <Text
            className="iconfont icon-indent"
            data-name="indent"
            data-value="+1"
          ></Text>
          <Text
            className="iconfont icon-fengexian"
            onClick={this.insertDivider}
          ></Text>
          {insertPicture && (
            <Text
              className="iconfont icon-charutupian"
              onClick={this.insertImage}
            ></Text>
          )}
          <Text
            className={
              'iconfont icon-format-header-1 ' +
              (formats.header === 1 ? 'ql-active' : '')
            }
            data-name="header"
            data-value={1}
          ></Text>
          <Text
            className={
              'iconfont icon-format-header-2 ' +
              (formats.header === 2 ? 'ql-active' : '')
            }
            data-name="header"
            data-value={2}
          ></Text>
          <Text
            className={
              'iconfont icon-format-header-3 ' +
              (formats.header === 3 ? 'ql-active' : '')
            }
            data-name="header"
            data-value={3}
          ></Text>
          <Text
            className={
              'iconfont icon-zitixiabiao ' +
              (formats.script === 'sub' ? 'ql-active' : '')
            }
            data-name="script"
            data-value="sub"
          ></Text>
          <Text
            className={
              'iconfont icon-zitishangbiao ' +
              (formats.script === 'super' ? 'ql-active' : '')
            }
            data-name="script"
            data-value="super"
          ></Text>
          {/*  <Text class="iconfont icon-quanping"></Text>  */}
          <Text className="iconfont icon-shanchu" onClick={this.clear}></Text>
          <Text
            className={
              'iconfont icon-direction-rtl ' +
              (formats.direction === 'rtl' ? 'ql-active' : '')
            }
            data-name="direction"
            data-value="rtl"
          ></Text>
        </View>
      </Block>
    )
  }
}

export default EditorComponent
