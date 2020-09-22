Component({
  properties: {
    data: {
      type: null,
      observer: 'observeData',
    },
  },

  data: {
    tree: [],
  },

  methods: {
    getType(value) {
      if (value === undefined) {
        return 'undefined';
      }
    
      if (value === null) {
        return 'null';
      }
    
      if (Array.isArray(value)) {
        return 'array';
      }
    
      return typeof value;
    },

    isCompositeType(value) {
      const type = this.getType(value);
    
      return type === 'array' || type === 'object';
    },

    observeData(data) {
      this.setData({
        tree: this.generateTree(undefined, data),
      });
    },

    generateTree(key, value) {
      const type = this.getType(value);
      const isCompositeType = this.isCompositeType(value);
      if (!isCompositeType) {
        let v = value;
        if (type === 'function') {
          v = value.name || key;
        }
        return {
          type,
          key,
          value: v,
          isCompositeType,
        };
      }

      const v = Object.keys(value).map(k => this.generateTree(k, value[k]));
      return {
        type,
        key,
        value: v,
        isCompositeType,
        empty: v.length === 0,
      };
    },
  },
});
