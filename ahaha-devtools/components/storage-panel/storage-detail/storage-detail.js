const typeDefaultValue = {
  String: '',
  Number: 0,
  Boolean: false,
  Object: {},
};

Component({
  properties: {
    key: {
      type: String,
      observer: 'observeKey',
    },
    storageInfo: Object,
  },

  data: {
    types: Object.keys(typeDefaultValue),
    booleanValues: [true, false],
    keyInput: '',
    value: '',
    typeIndex: 0,
  },

  attached() {
    this.init();
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
            value: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value),
            typeIndex: this.data.types.map((type) => type.toLowerCase()).indexOf(typeof value),
          });
        },
      });
    },

    formatValue(value, type) {
      switch (type) {
        case 'Number':
          return Number(value);
        case 'Boolean':
          if (value === 'true') {
            return true;
          }
          return false;
        case 'Object': {
          return JSON.parse(value);
        }
        default:
          return value;
      }
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
          icon: 'none',
        });
        this.setData({
          keyInput: key,
        });
        return;
      }

      if (storageInfo.keys.includes(keyInput)) {
        wx.showToast({
          title: 'key已存在！',
          icon: 'none',
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
        },
      });
    },

    handleTypeChange(e) {
      const typeIndex = +e.detail.value;
      if (typeIndex === this.data.typeIndex) {
        return;
      }

      const type = this.data.types[typeIndex];
      const value = typeDefaultValue[type];
      this.setData({
        typeIndex,
        value: type === 'Object' ? JSON.stringify(value, null, 2) : String(value),
      });
      wx.setStorage({
        key: this.data.keyInput,
        data: value,
      });
    },

    handleValueInput(e) {
      const { value } = e.detail;
      this.setData({
        value,
      });
    },

    handleEditValue(e) {
      const { key, typeIndex, types } = this.data;
      let { value } = this.data;
      const type = types[typeIndex];
      if (type === 'Boolean') {
        value = this.data.booleanValues[e.detail.value].toString();
        console.log(value);
        this.setData({
          value,
        });
      }
      try {
        const formatedValue = this.formatValue(value, type);
        wx.setStorage({
          key,
          data: formatedValue,
          success: () => {
            this.triggerEvent('change');
          },
        });
      } catch (err) {
        wx.showToast({
          title: '值不合法！',
          icon: 'none',
        });
      }
    },
  },
});
