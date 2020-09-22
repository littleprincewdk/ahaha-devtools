Component({
  properties: {
    key: {
      type: String,
      observer: 'observeKey',
    },
    storageInfo: Object,
  },

  data: {
    keyInput: '',
    value: '',
    type: 'string',
  },

  attached() {
    this.init();
    console.log(wx.getStorageSync(this.data.key))
  },

  methods: {
    observeKey(key) {
      this.setData({
        keyInput: key,
      });
    },

    init() {
      const { key } = this.data;
      wx.getStorage({
        key,
        success: ({ data: value }) => {
          this.setData({
            value,
            type: typeof value,
          });
        },
      });
    },

    handleBack() {
      this.triggerEvent('back');
    },

    handleKeyInput(e) {
      const { value } = e.detail;
      this.setData({
        keyInput: value,
      });
    },

    handleEditKey() {
      const { storageInfo, key, keyInput } = this.data;

      if (keyInput === key) {
        return;
      }

      if (!keyInput) {
        wx.showToast({
          title: 'key不能为空！',
          icon: 'none'
        });
        this.setData({
          keyInput: key,
        });
        return;
      }

      if (storageInfo.keys.includes(keyInput)) {
         wx.showToast({
           title: 'key已存在！',
           icon: 'none'
         });
         return;
      }

      const value = wx.getStorageSync(key);
      
      wx.setStorage({
        key: keyInput,
        data: value,
        success: () => {
          wx.removeStorageSync(key);

          this.triggerEvent('change');
        }
      });
    },

    handleValueInput(e) {
      const { value } = e.detail;
      this.setData({
        value,
      });
    },

    handleEditValue() {
      const { key, value } = this.data;
      console.error(key, value,'wwwwwwwww')
      wx.setStorage({
        key,
        data: value,
        success: () => {
          this.triggerEvent('change');
        },
        fail() {
          console.log('aaaaaa')
        }
      });
    },
  },
});

