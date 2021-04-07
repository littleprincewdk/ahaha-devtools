Component({
  properties: {},

  data: {
    systemInfo: {},
    networkType: 'none',
  },

  attached() {
    wx.getSystemInfo({
      success: (res) => {
        delete res.errMsg;
        res.safeArea = JSON.stringify(res.safeArea, null, 2);
        this.setData({
          systemInfo: res,
        });
      },
    });

    wx.getNetworkType({
      success: (res) => {
        this.setData({
          networkType: res.networkType,
        });
      },
    });
  },

  methods: {},
});
