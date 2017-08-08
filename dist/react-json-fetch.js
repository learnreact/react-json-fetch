(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ReactJSONFetch = factory(global.React));
}(this, (function (React) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Fetch = function (_Component) {
  inherits(Fetch, _Component);

  function Fetch() {
    classCallCheck(this, Fetch);

    var _this = possibleConstructorReturn(this, (Fetch.__proto__ || Object.getPrototypeOf(Fetch)).call(this));

    _this.state = {};
    return _this;
  }

  createClass(Fetch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var status = {};

      fetch(this.props.url, this.props.init).then(function (response) {
        status = {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          url: response.url
        };

        return response;
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        return _this2.setState({ status: status, json: json });
      }).catch(function (error) {
        return _this2.setState({ status: status });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.Children.only(this.props.children(this.state));
    }
  }]);
  return Fetch;
}(React.Component);

Fetch.defaultProps = {
  url: "",
  init: {}
};

return Fetch;

})));
