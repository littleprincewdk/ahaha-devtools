const INIT_RIGHT = 180; // rpx
const INIT_BOTTOM = 200; // rpx

const STORAGE_KEY = 'ahaha-devtools/switch';

Component({
  data: {
    top: undefined,
    left: undefined,
  },

  created() {
    this.rpxRatio = 2;
    this.lastX = 0;
    this.lastY = 0;
  },

  ready() {
    this.initPosition();
  },

  methods: {
    initPosition() {
      wx.getStorage({
        key: STORAGE_KEY,
        success: (res) => {
          const { left, top } = res.data;
          this.setData({
            top,
            left,
          });
        },
        fail: () => {
          wx.getSystemInfo({
            success: (res) => {
              const { windowWidth, windowHeight } = res;
              this.rpxRatio = 750 / windowWidth;
              this.setData({
                top: windowHeight * this.rpxRatio - INIT_BOTTOM,
                left: windowWidth * this.rpxRatio - INIT_RIGHT,
              });
            },
          });
        },
      });
    },

    handleTap() {
      this.triggerEvent('tap');
    },

    handleTouchStart(e) {
      const { clientX, clientY } = e.touches[0];
      this.lastX = clientX;
      this.lastY = clientY;
    },

    handleTouchMove(e) {
      const { clientX, clientY } = e.touches[0];
      this.setData({
        top: this.data.top + (clientY - this.lastY) * this.rpxRatio,
        left: this.data.left + (clientX - this.lastX) * this.rpxRatio,
      });
      this.lastX = clientX;
      this.lastY = clientY;
    },

    handleTouchEnd() {
      this.lastX = 0;
      this.lastY = 0;

      const { left, top } = this.data;

      wx.setStorage({
        key: STORAGE_KEY,
        data: {
          top,
          left,
        },
      });
    },
  },
});
