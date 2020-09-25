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
  <text class="content" slot="tab-content-User">
    mid: 12321
    token: abcd
  </text>
  <text class="content" slot="tab-content-Trace">
    Trace
  </text>
  <text class="content" slot="tab-content-Wxml">
    Wxml
  </text>
</ahaha-devtools>
```

通过`slot`引入可能会有性能问题，因为即使当前不展示也会创建，如果自定义tab内容很多，有性能问题可通过控制传入的`slot`优化：

```html
<ahaha-devtools extended-tabs="{{customTabs}}" bindtabchange="handleTabChange">
  <text wx:if="{{currentTab.title === 'User'}}" class="content" slot="tab-content-User">
    mid: 12321
    token: abcd
  </text>
  <text wx:if="{{currentTab.title === 'Trace'}}" class="content" slot="tab-content-Trace">
    Trace
  </text>
  <text wx:if="{{currentTab.title === 'Wxml'}}" class="content" slot="tab-content-Wxml">
    Wxml
  </text>
</ahaha-devtools>
```

```javascript
/**
 * e.detail {
 *   tab, // 当前tab
 *   index, // 当前tab索引
 * }
 */
handleTabChange(e) {
  const { tab } = e.detail;
  this.setData({
    currentTab: tab,
  });
},
```
