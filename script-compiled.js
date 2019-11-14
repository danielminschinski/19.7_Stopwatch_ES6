'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            display: '',
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: 'resetTimer',
        value: function resetTimer() {
            this.reset();
            this.print();
        }
    }, {
        key: 'print',
        value: function print() {
            this.setState({
                display: this.format(this.state.times)
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(this.state.times.minutes) + ':\n            ' + this.pad0(this.state.times.seconds) + ':\n            ' + this.pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds,
                    miliseconds: this.state.times.miliseconds += 1
                }
            });

            if (this.state.times.miliseconds >= 100) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes,
                        seconds: this.state.times.seconds += 1,
                        miliseconds: 0
                    }
                });
            }

            if (this.state.times.seconds >= 60) {
                this.setState({
                    times: {
                        minutes: this.state.minutes += 1,
                        seconds: 0,
                        miliseconds: this.state.times.miliseconds
                    }
                });
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    null,
                    React.createElement(
                        'button',
                        { className: 'start', onClick: this.start.bind(this) },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { className: 'stop', onClick: this.stop.bind(this) },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { className: 'reset', onClick: this.resetTimer.bind(this) },
                        'Reset'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.state.display
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
