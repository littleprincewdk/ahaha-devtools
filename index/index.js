import '../ahaha-devtools/init';

function bbb() {}

Page({
  data: {
    data1: 0,
    data2: 'www',
    data3: true,
    data4: false,
    data5: 12345,
    data6: null,
    data9: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    data10:
      '小程序提供了一个简单、高效的应用开发框架和丰富的组件及API，帮助开发者在微信中开发具有原生 APP 体验的服务。本章分主题的介绍了小程序的开发语言、框架、能力、调试等内容，帮助开发者快速全面的了解小程序开发的方方面面。',
    data11: {
      description: '项目配置文件',
      packOptions: {
        ignore: [1, 2, 3],
      },
      setting: {
        urlCheck: false,
        es6: true,
        enhance: false,
        postcss: true,
        preloadBackgroundData: false,
        minified: true,
        newFeature: false,
        coverView: true,
        nodeModules: false,
        autoAudits: false,
        showShadowRootInWxmlPanel: true,
        scopeDataCheck: false,
        uglifyFileName: false,
        checkInvalidKey: true,
        checkSiteMap: true,
        uploadWithSourceMap: true,
        compileHotReLoad: false,
        babelSetting: {
          ignore: [],
          disablePlugins: [],
          outputPath: '',
        },
        useIsolateContext: true,
        useCompilerModule: false,
        userConfirmedUseCompilerModuleSwitch: false,
      },
      compileType: 'miniprogram',
      libVersion: '2.12.2',
      appid: 'wx227c5bbf660e1cc8',
      projectname: 'ahaha-devtools',
      debugOptions: {
        hidedInDevtools: [],
      },
      scripts: {},
      simulatorType: 'wechat',
      simulatorPluginLibVersion: {},
      condition: {
        search: {
          current: -1,
          list: [],
        },
        conversation: {
          current: -1,
          list: [],
        },
        game: {
          current: -1,
          list: [],
        },
        plugin: {
          current: -1,
          list: [],
        },
        gamePlugin: {
          current: -1,
          list: [],
        },
        miniprogram: {
          current: -1,
          list: [],
        },
      },
    },
    func1: () => {},
    func2: bbb,
    customTabs: [{ title: 'User' }, { title: 'Trace' }, { title: 'Wxml' }],
    currentTab: {},
  },

  onLoad() {
    let counter = 0;
    setInterval(() => {
      const urls = [
        'http://postman-echo.com/get',
        'http://wechatfe.github.io',
        'http://wechatfe.github.io/vconsole/ajax.html',
      ];
      wx.request({
        url: urls[counter % 3],
        data: {
          a: 1,
          b: {
            c: 1,
          },
        },
        header: {
          header1: 1,
          header2: 2,
        },
      });
      counter += 1;
    }, 5000);
  },

  handleTabChange(e) {
    const { tab } = e.detail;
    this.setData({
      currentTab: tab,
    });
  },
});
