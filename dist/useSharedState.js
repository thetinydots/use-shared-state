Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var PubSub = require('pubsub-js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var PubSub__namespace = /*#__PURE__*/_interopNamespace(PubSub);

var valuesStore = {};
/**
 * non-hook function
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
var getOrSetSharedValue = function (key, value) {
    if (key in valuesStore) {
        return valuesStore[key];
    }
    if (typeof value !== "undefined")
        valuesStore[key] = value;
    return value;
};
/**
 * @param key string
 * @return change state function
 */
function useSharedStateChange(key) {
    var changeValue = react.useCallback(function (newValue) {
        PubSub__namespace.publish(key, newValue);
    }, [key]);
    return changeValue;
}
/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value
 */
function useSharedStateValue(key, initialValue) {
    var _a = react.useState(getOrSetSharedValue(key, initialValue)), value = _a[0], setValue = _a[1];
    react.useEffect(function () {
        var id = PubSub__namespace.subscribe(key, function (_, data) {
            valuesStore[key] = data;
            setValue(data);
        });
        return function () { return PubSub__namespace.unsubscribe(id); };
    }, [key, setValue]);
    return value;
}
/**
 * @param key string
 * @param initialValue (optional) initial value
 * @return shared state value and change state function
 */
function useSharedState(key, initialValue) {
    var _a = react.useState(getOrSetSharedValue(key, initialValue)), value = _a[0], setValue = _a[1];
    var changeValue = useSharedStateChange(key);
    react.useEffect(function () {
        var id = PubSub__namespace.subscribe(key, function (_, data) {
            // console.log("got new value", key, data);
            valuesStore[key] = data;
            setValue(data);
        });
        return function () { return PubSub__namespace.unsubscribe(id); };
    }, [key, setValue]);
    return [value, changeValue];
}

exports.default = useSharedState;
exports.useSharedStateChange = useSharedStateChange;
exports.useSharedStateValue = useSharedStateValue;
//# sourceMappingURL=useSharedState.js.map
