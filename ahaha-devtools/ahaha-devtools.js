const defaultTabs = [
  { title: 'System' },
  { title: 'Network' },
  { title: 'AppData' },
  { title: 'Storage' },
];

Component({
  options: {
    multipleSlots: true,
  },
  
  properties: {
    extendedTabs: {
      type: Array,
      observer: 'observeExtendedTabs',
    },
  },

  data: {
    tabs: defaultTabs,
    currentTab: defaultTabs[0],
  },

  methods: {
    observeExtendedTabs(extendedTabs) {
      this.setData({
        tabs: [
          ...defaultTabs,
          ...extendedTabs,
        ],
      });
    },

    handleTabChange(e) {
      const { tab, index } = e.detail;
      this.setData({
        currentTab: tab,
      });

      this.triggerEvent('tabchange', { tab, index });
    },
  },
});
