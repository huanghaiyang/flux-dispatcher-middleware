'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DispatcherPack = function DispatcherPack(Dispatcher) {
    return function (_Dispatcher) {
        _inherits(_class, _Dispatcher);

        function _class(args) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, args));

            _this.events = {};
            return _this;
        }

        _createClass(_class, [{
            key: '_invokeCallback',
            value: function _invokeCallback(id) {
                var _this2 = this;

                _get(Object.getPrototypeOf(_class.prototype), '_invokeCallback', this).call(this, id);
                var after = this.events['afterDispatching'];
                if (after) {
                    after.forEach(function (handler) {
                        handler(_this2._pendingPayload);
                    });
                }
            }
        }, {
            key: 'on',
            value: function on(eventname, handler) {
                if (!this.events[eventname]) {
                    this.events[eventname] = [];
                }
                this.events[eventname].push(handler);
            }
        }, {
            key: 'unbind',
            value: function unbind(eventname, handler) {
                delete this.events[eventname];
            }
        }]);

        return _class;
    }(Dispatcher);
};

module.exports = DispatcherPack;
