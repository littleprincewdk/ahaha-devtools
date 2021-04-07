import requestManager from './requestManager';

Component({
  properties: {},

  data: {
    filterInput: '',
    requests: [],
    selectedIndex: -1,
  },

  created() {
    this.onRequest = this.onRequest.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  },

  attached() {
    this.ejectData();

    requestManager.onRequest(this.onRequest);
    requestManager.onStatusChange(this.onStatusChange);
  },

  detached() {
    requestManager.offRequest(this.onRequest);
    requestManager.offStatusChange(this.onStatusChange);
  },

  methods: {
    ejectData() {
      const requests = requestManager.getRequests();
      const data = {};
      requests.forEach((request, index) => {
        Object.assign(data, this.extractRequest(request, index));
      });
      this.setData(data);
    },

    onRequest() {
      const requests = requestManager.getRequests();
      const index = requests.length - 1;
      const request = requests[requests.length - 1];
      this.setData(this.extractRequest(request, index));
    },

    onStatusChange(request, index) {
      const data = {
        [`requests[${index}].status`]: request.status,
      };
      if (request.response) {
        data[`requests[${index}].response.statusCode`] = request.response.statusCode;
      }
      this.setData(data);
    },

    /** 数据按需setData */
    extractRequest(request, index) {
      const data = {
        [`requests[${index}]`]: {
          status: request.status,
          options: {
            url: request.options.url,
          },
        },
      };

      if (request.response) {
        data[`requests[${index}].response.statusCode`] = request.response.statusCode;
      }

      return data;
    },

    handleClear() {
      requestManager.clearRequests();
      this.setData({
        requests: [],
      });
    },

    handleFilterChange(e) {
      const { value } = e.detail;
      this.setData({
        filterInput: value,
      });
    },

    handleSelect(e) {
      const { index = -1 } = e.currentTarget.dataset;
      this.setData({
        selectedIndex: index,
      });
    },
  },
});
