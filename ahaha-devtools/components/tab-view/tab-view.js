function limitRange(number, [min, max]) {
  return Math.min(Math.max(number, min), max);
}

Component({
  options: {
    multipleSlots: true,
  },

  externalClasses: [
    'class',
  ],

  properties: {
    tabs: Array
  },

  data: {
    current: 0,
    scrollLeft: 0,
  },

  created() {
    this.rect = null;
    this.scrollLeft = 0;
    this.scrollWidth = 0;
  },

  ready() {
    this.getRect();
  },

  methods: {
    getRect() {
      this.createSelectorQuery()
        .select('.tab-header')
        .boundingClientRect(rect => {
          this.rect = rect;
        }).exec();
      this.createSelectorQuery()
        .select(`#tab-${this.data.tabs.length - 1}`)
        .boundingClientRect(rect => {
          this.scrollWidth = rect.right;
        }).exec();
    },

    onScroll(e) {
      const { scrollLeft } = e.detail;
      this.scrollLeft = scrollLeft;
    },

    handleChange(e) {
      const { index } = e.currentTarget.dataset;

      if (index === this.data.current) {
        return;
      }

      this.setData({
        current: index,
      });

      this.createSelectorQuery()
        .select(`#tab-${index}`)
        .boundingClientRect((rect) => {
          const scrollLeft = limitRange(
            this.scrollLeft - (this.rect.width / 2 - (rect.left + rect.width / 2)),
            [0, this.scrollWidth],
          );
          this.setData({
            scrollLeft,
          });
        })
        .exec();
    },
  },
});
