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

  externalClasses: ['container-class'],

  properties: {
    extendedTabs: {
      type: Array,
      observer: 'observeExtendedTabs',
    },
  },

  data: {
    tabs: defaultTabs,
    currentTab: defaultTabs[0],
    show: false,
  },

  methods: {
    observeExtendedTabs(extendedTabs) {
      this.setData({
        tabs: [...defaultTabs, ...extendedTabs],
      });
    },

    handleTabChange(e) {
      const { tab, index } = e.detail;
      this.setData({
        currentTab: tab,
      });

      this.triggerEvent('tabchange', { tab, index });
    },

    handleSwitchTap() {
      this.setData({
        show: !this.data.show,
        currentTab: defaultTabs[0],
      });
    },
  },
});
