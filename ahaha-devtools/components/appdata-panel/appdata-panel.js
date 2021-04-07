Component({
  properties: {},

  data: {
    route: '',
    currentPageData: {},
    stringfiedCurrentPageData: '',
  },

  attached() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    this.setData({
      route: currentPage.route,
      currentPageData: currentPage.data,
      stringfiedCurrentPageData: JSON.stringify(currentPage.data, null, 4),
    });
  },

  methods: {},
});
