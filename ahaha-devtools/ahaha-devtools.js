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
  },
});
