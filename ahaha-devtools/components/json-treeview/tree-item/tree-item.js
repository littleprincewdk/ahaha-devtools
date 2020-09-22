Component({
  properties: {
    type: String,
    key: String,
    value: null,
    isCompositeType: Boolean,
    empty: Boolean,
    /** 是否根节点 */
    isRoot: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    type: 'string',
    folded: true,
  },

  attached() {
    if (this.data.isRoot) {
      this.setData({
        folded: false,
      });
    }
  },

  methods: {
    toggle() {
      this.setData({
        folded: !this.data.folded,
      });
    }
  }
});
