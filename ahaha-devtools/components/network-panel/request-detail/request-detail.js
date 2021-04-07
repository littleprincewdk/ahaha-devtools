import requestManager from '../requestManager';

Component({
  properties: {
    requestIndex: Number,
  },

  data: {
    tabs: [{ title: 'Headers' }, { title: 'Payload' }, { title: 'Response' }],
    tabIndex: 0,
    general: {},
    requestHeaders: {},
    responseHeaders: {},
    payload: {},
    response: null,
  },

  created() {
    this.onStatusChange = this.onStatusChange.bind(this);
  },

  attached() {
    this.init();
    requestManager.onStatusChange(this.onStatusChange);
  },

  detached() {
    requestManager.offStatusChange(this.onStatusChange);
  },

  methods: {
    init() {
      const { requestIndex } = this.data;
      const request = requestManager.getRequests()[requestIndex];
      const general = {
        'Request URL': request.options.url,
        'Request Method': request.options.method || 'GET',
      };
      const data = {
        general,
        requestHeaders: request.options.header || {},
        payload: request.options.data,
      };

      if (request.response) {
        general['Status Code'] = request.response.statusCode;
        data.responseHeaders = request.response.header;
        data.response = request.response.data; // arraybuffer?
      }

      this.setData(data);
    },

    onStatusChange(request, index) {
      if (index !== this.data.requestIndex) {
        return;
      }

      if (request.response) {
        const data = {
          // 没法这也样更新，会报错
          // [`general['Status Code']`]: request.response.statusCode,
          general: {
            ...this.data.general,
            'Status Code': request.response.statusCode,
          },
          response: request.response.data,
        };
        this.setData(data);
      }
    },

    handleBack() {
      this.triggerEvent('back');
    },

    handleSwitchTab(e) {
      const { index } = e.currentTarget.dataset;
      this.setData({
        tabIndex: index,
      });
    },
  },
});
