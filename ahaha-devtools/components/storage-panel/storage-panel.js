Component({
  properties: {

  },

  data: {
    storageInfo: {
      currentSize: 0,
      keys: [],
      limitSize: 10240
    },
    filterInput: '',
    keyActions: [
      { text: '删除', type: 'warn', data: { handler: 'handleRemove' } }
    ],
    addInput: '',
    selectedKey: '',
  },

  attached() {
    this.getStorageInfo();
  },

  methods: {
    getStorageInfo() {
      const storageInfo = wx.getStorageInfoSync();
      this.setData({
        storageInfo
      });
    },

    handleClear() {
      wx.showModal({
        title: '确定要清空吗？',
        content: '清空后无法恢复!',
        success: (res) => {
          if (res.confirm) {
            wx.clearStorage({
              success: () => {
                this.getStorageInfo();
              },
            });
          }
        }
      });
    },

    handleFilterChange(e) {
      const { value } = e.detail;
      this.setData({
        filterInput: value,
      });
    },

    handleKeyAction(e) {
      const { key } = e.currentTarget.dataset;
      const { data: { handler } } = e.detail;
      this[handler](key);
    },

    handleRemove(key) {
      wx.showModal({
        title: `确定移除"${key}"吗？`,
        content: '移除后无法恢复!',
        success: (res) => {
          if (res.confirm) {
            wx.removeStorage({
              key,
              success: () => {
                this.getStorageInfo();
              },
            });
          }
        }
      });
    },

    handleAddInput(e) {
      const { value } = e.detail;
      this.setData({
        addInput: value,
      });
    },

    handleAdd() {
      const { storageInfo, addInput } = this.data;

      if (!addInput) {
        return;
      }

      if (storageInfo.keys.includes(addInput)) {
         wx.showToast({
           title: 'key已存在',
           icon: 'none'
         });
         return;
      }
      
      wx.setStorage({
        key: addInput,
        data: '',
        success: () => {
          this.setData({
            addInput: ''
          });

          this.getStorageInfo()
        }
      })
    },

    handleSelect(e) {
      const { key = '' } = e.currentTarget.dataset;
      this.setData({
        selectedKey: key,
      });
    },
  }
})
