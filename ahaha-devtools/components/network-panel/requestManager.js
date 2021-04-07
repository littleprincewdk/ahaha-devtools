const originalRequest = wx.request;
let requests = [];
let onRequestListeners = [];
let onStatusChangeListeners = [];

function request(options) {
  const index = requests.length;
  const req = {
    status: 'pending',
  };
  requests.push(req);

  req.options = options;

  onRequestListeners.forEach((listener) => {
    listener(options);
  });

  return originalRequest({
    ...options,
    success: (res) => {
      if (options.success) {
        options.success(res);
      }

      if (req._expired) {
        return;
      }

      req.response = res;

      if (res.statusCode >= 200 && res.statusCode < 300) {
        req.status = 'success';
      } else {
        req.status = 'fail';
      }
      onStatusChangeListeners.forEach((listener) => {
        listener(req, index);
      });
    },
    fail: (error) => {
      if (options.fail) {
        options.fail(error);
      }

      if (req._expired) {
        return;
      }

      req.status = 'fail';
      onStatusChangeListeners.forEach((listener) => {
        listener(req, index);
      });
    },
    complete: (res) => {
      if (options.complete) {
        options.complete(res);
      }
    },
  });
}

function proxyRequest() {
  Object.defineProperty(wx, 'request', {
    value: request,
  });
}

function getRequests() {
  return requests;
}

function clearRequests() {
  requests.forEach((req) => {
    req._expired = true;
  }); // 回调不再处理
  requests = [];
}

function onRequest(listener) {
  onRequestListeners.push(listener);
}

function offRequest(listener) {
  onRequestListeners = onRequestListeners.filter((item) => item !== listener);
}

function onStatusChange(listener) {
  onStatusChangeListeners.push(listener);
}

function offStatusChange(listener) {
  onStatusChangeListeners = onStatusChangeListeners.filter((item) => item !== listener);
}

export default {
  proxyRequest,
  getRequests,
  clearRequests,
  onRequest,
  offRequest,
  onStatusChange,
  offStatusChange,
};
