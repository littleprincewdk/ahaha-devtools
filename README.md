# ahaha-devtools

<img src="./ahaha-devtools.gif" title="ahaha-devtools.gif">

移动端开发者工具, 目前支持微信小程序端，比 vConsole 更强大

微信小程序自带的 vConsole 过于保守，不支持常用的`Network`, `Storage`等面板

功能完善中..

## 功能
1. `Network`面板, 查看请求状态，`Headers`, `Payload`, `Response`
2. `Storage`面板，支持增删改查
3. `System`面板, 查看系统信息，网络类型
4. `AppData`面板, 查看当前页面`data`
5. 支持自定义tab

## 使用方式

TODO：通过npm构建引入，在需要展示的页面展示
```javascript
Page({
  data: {
    customTabs: [
      { title: 'User' },
      { title: 'Trace' },
      { title: 'Wxml' },
    ],
  },
});
```
```html
<ahaha-devtools extended-tabs="{{customTabs}}">
  <text slot="tab-content-User" style="display:block; padding: 0 10px;">
    mid: 12321
    token: abcd
  </text>
  <text slot="tab-content-Trace">
    Trace
  </text>
  <text slot="tab-content-Wxml">
    Wxml
  </text>
</ahaha-devtools>
```
