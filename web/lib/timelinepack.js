webpackJsonp([11], {
    230: function(t, e, n) {
        "use strict";

        function i(t) {
            this.id = t, this.enabled = !0, this.keyframes = [], this.lastTime = 0
        }
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            //! AT: could convert into a more general ArrayUtils.pluck and binary search but that creates extra arrays
            i.prototype._find = function(t, e) {
                var n = 0,
                    i = t.length - 1;
                if (e > t[t.length - 1].time) return i;
                for (; i - n > 1;) {
                    var a = Math.floor((i + n) / 2);
                    e > t[a].time ? n = a : i = a
                }
                return n
            }, i.prototype.sort = function() {
                return this.keyframes.sort(function(t, e) {
                    return t.time - e.time
                }), this.lastTime = this.keyframes[this.keyframes.length - 1].time, this
            }, e.default = i
    },
    452: function(t, e, n) {
        "use strict";

        function i(t) {
            r.default.call(this, t), this.oldTime = 0, this.callbackIndex = 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(230),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(a);
        i.prototype = Object.create(r.default.prototype), i.prototype.constructor = r.default, i.prototype.addCallback = function(t, e, n) {
            var i = {
                    id: t,
                    time: e,
                    callback: n
                },
                a = this.keyframes;
            if (e > this.lastTime) a.push(i), this.lastTime = e;
            else if (!a.length || e < a[0].time) a.unshift(i);
            else {
                var r = this._find(a, e) + 1;
                a.splice(r, 0, i)
            }
            return this
        }, i.prototype.update = function(t) {
            if (!this.enabled) return this;
            var e = this.keyframes;
            if (!e.length) return this;
            if (t < this.oldTime) {
                for (; this.callbackIndex < e.length;) e[this.callbackIndex].callback(), this.callbackIndex++;
                this.callbackIndex = 0
            }
            for (; this.callbackIndex < e.length && t >= e[this.callbackIndex].time && t !== this.oldTime;) e[this.callbackIndex].callback(), this.callbackIndex++;
            return this.oldTime = t, this
        }, i.prototype.setTime = function(t) {
            return this.enabled && this.keyframes.length ? (t <= this.keyframes[0].time ? this.callbackIndex = 0 : this.callbackIndex = this._find(this.keyframes, t) + 1, this.oldTime = t, this) : this
        }, e.default = i
    },
    453: function(t, e, n) {
        "use strict";

        function i() {
            r.default.apply(this, arguments), this.type = "TimelineComponent", this.channels = [], this.time = 0, this.duration = 0, this.loop = !1, this.playing = !0, this.autoStart = !0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(8),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(a);
        i.prototype = Object.create(r.default.prototype), i.prototype.constructor = i, i.prototype.addChannel = function(t) {
            return this.channels.push(t), this
        }, i.prototype.update = function(t) {
            if (this.playing) {
                var e = this.time + t;
                if (e > this.duration && (this.loop ? e %= this.duration : e = this.duration), e !== this.time) {
                    this.time = e;
                    for (var n = 0; n < this.channels.length; n++) {
                        this.channels[n].update(this.time)
                    }
                }
            }
        }, i.prototype.start = function() {
            this.playing = !0
        }, i.prototype.resume = i.prototype.start, i.prototype.pause = function() {
            this.playing = !1
        }, i.prototype.stop = function() {
            this.playing = !1, this.setTime(0)
        }, i.prototype.setTime = function(t) {
            this.time = t;
            for (var e = 0; e < this.channels.length; e++) {
                this.channels[e].setTime(this.time)
            }
            return this
        }, i.prototype.getValues = function() {
            for (var t = {}, e = 0; e < this.channels.length; e++) {
                var n = this.channels[e];
                void 0 !== n.value && n.keyframes.length && (t[n.id] = n.value)
            }
            return t
        }, e.default = i
    },
    454: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function a(t, e) {
            o.default.call(this, t), this.value = 0, e = e || {}, this.callbackUpdate = e.callbackUpdate, this.callbackEnd = e.callbackEnd
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(230),
            o = i(r),
            s = n(4),
            l = i(s);
        a.prototype = Object.create(o.default.prototype), a.prototype.constructor = a, a.prototype.addKeyframe = function(t, e, n, i) {
            var a = {
                id: t,
                time: e,
                value: n,
                easingFunction: i
            };
            if (e > this.lastTime) this.keyframes.push(a), this.lastTime = e;
            else if (!this.keyframes.length || e < this.keyframes[0].time) this.keyframes.unshift(a);
            else {
                var r = this._find(this.keyframes, e) + 1;
                this.keyframes.splice(r, 0, a)
            }
            return this
        }, a.prototype.update = function(t) {
            if (!this.enabled) return this.value;
            if (!this.keyframes.length) return this.value;
            var e = void 0,
                n = void 0;
            if (t <= this.keyframes[0].time) e = this.keyframes[0].value;
            else if (t >= this.keyframes[this.keyframes.length - 1].time) e = this.keyframes[this.keyframes.length - 1].value;
            else {
                n = this._find(this.keyframes, t);
                var i = this.keyframes[n],
                    a = this.keyframes[n + 1],
                    r = (t - i.time) / (a.time - i.time),
                    o = i.easingFunction(r);
                e = l.default.lerp(o, i.value, a.value)
            }
            //! AT: comparing floats with === is ok here
            //! AT: not sure if create people want this all the time or not
            return this.value = e, this.callbackUpdate(t, this.value, n), this
        }, a.prototype.setTime = a.prototype.update, a.getSimpleTransformTweener = function(t, e, n, i) {
            var a = void 0;
            return function(r, o) {
                a || (a = i(n)),
                    //! AT: this prevents the timeline from blowing up if the entity is absent
                    a && (a.transformComponent.transform[t][e] = o, a.transformComponent.setUpdated())
            }
        }, a.getRotationTweener = function(t, e, n, i) {
            var a = void 0,
                r = function i(r, o) {
                    //! AT: same here as above; a tmp fix
                    if (a || (a = n(e)), a) {
                        var s = i.rotation;
                        s[t] = o * l.default.DEG_TO_RAD, a.transformComponent.transform.rotation.fromAngles(s[0], s[1], s[2]), a.transformComponent.setUpdated()
                    }
                };
            return r.rotation = i, r
        }, e.default = a
    },
    806: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(230),
            r = i(a),
            o = n(452),
            s = i(o),
            l = n(453),
            u = i(l),
            f = n(807),
            c = i(f),
            d = n(808),
            p = i(d),
            h = n(454),
            m = i(h),
            y = {
                AbstractTimelineChannel: r.default,
                EventChannel: s.default,
                TimelineComponent: u.default,
                TimelineComponentHandler: c.default,
                TimelineSystem: p.default,
                ValueChannel: m.default
            };
        if ("undefined" != typeof window) {
            var v = Object.keys(y),
                b = !0,
                k = !1,
                g = void 0;
            try {
                for (var T, _ = v[Symbol.iterator](); !(b = (T = _.next()).done); b = !0) {
                    var w = T.value;
                    window.sumerian[w] = y[w]
                }
            } catch (t) {
                k = !0, g = t
            } finally {
                try {
                    !b && _.return && _.return()
                } finally {
                    if (k) throw g
                }
            }
        }
        e.default = y
    },
    807: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function a() {
            f.default.apply(this, arguments), this._type = "TimelineComponent"
        }

        function r(t) {
            if (!t) return C.default.Linear.None;
            var e = t.indexOf("."),
                n = t.substr(0, e),
                i = t.substr(e + 1);
            return C.default[n][i]
        }

        function o(t, e, n) {
            var i = !1,
                a = b.default.find(n.keyframes, function(t) {
                    return t.id === e
                }),
                o = r(t.easing);
            return a ? (a.time !== +t.time && (i = !0), a.time = +t.time, a.value = +t.value, a.easingFunction = o) : n.addKeyframe(e, t.time, t.value, o), {
                needsResorting: i
            }
        }

        function s(t, e, n, i) {
            var a = !1,
                r = b.default.find(n.keyframes, function(t) {
                    return t.id === e
                }),
                o = function() {
                    g.default.emit(i.eventName, t.value)
                };
            return r ? (r.time !== +t.time && (a = !0), r.time = +t.time, r.callback = o) : n.addCallback(e, t.time, o), {
                needsResorting: a
            }
        }

        function l(t, e, n, i, r) {
            var l = b.default.find(n.channels, function(t) {
                return t.id === e
            });
            if (l) {
                if (t.entityId && l.callbackUpdate && l.callbackUpdate.rotation) {
                    var u = r[t.entityId] = l.callbackUpdate.rotation;
                    u[0] = 0, u[1] = 0, u[2] = 0
                }
            } else {
                var f = t.propertyKey;
                if (f) {
                    var c = t.entityId;
                    c && !r[c] && (r[c] = [0, 0, 0]);
                    var d = a.tweenMap[f](c, i, r[c]);
                    l = new h.default(e, {
                        callbackUpdate: d
                    })
                } else l = new y.default(e);
                n.channels.push(l)
            }
            l.enabled = !1 !== t.enabled, l.keyframes = l.keyframes.filter(function(e) {
                return !!t.keyframes[e.id]
            });
            var p = !1,
                m = Object.keys(t.keyframes),
                v = t.propertyKey ? o : s,
                k = !0,
                g = !1,
                T = void 0;
            try {
                for (var _, w = m[Symbol.iterator](); !(k = (_ = w.next()).done); k = !0) {
                    var C = _.value,
                        M = t.keyframes[C],
                        S = v(M, C, l, t);
                    p = p || S.needsResorting
                }
            } catch (t) {
                g = !0, T = t
            } finally {
                try {
                    !k && w.return && w.return()
                } finally {
                    if (g) throw T
                }
            }
            p && l.sort()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var u = n(20),
            f = i(u),
            c = n(453),
            d = i(c),
            p = n(454),
            h = i(p),
            m = n(452),
            y = i(m),
            v = n(64),
            b = i(v),
            k = n(5),
            g = i(k),
            T = n(3),
            _ = i(T),
            w = n(51),
            C = i(w);
        a.prototype = Object.create(f.default.prototype), a.prototype.constructor = a, f.default._registerClass("timeline", a), a.prototype._prepare = function() {}, a.prototype._create = function() {
            return new d.default
        }, a.tweenMap = {
            translationX: h.default.getSimpleTransformTweener.bind(null, "translation", "x"),
            translationY: h.default.getSimpleTransformTweener.bind(null, "translation", "y"),
            translationZ: h.default.getSimpleTransformTweener.bind(null, "translation", "z"),
            scaleX: h.default.getSimpleTransformTweener.bind(null, "scale", "x"),
            scaleY: h.default.getSimpleTransformTweener.bind(null, "scale", "y"),
            scaleZ: h.default.getSimpleTransformTweener.bind(null, "scale", "z"),
            rotationX: h.default.getRotationTweener.bind(null, 0),
            rotationY: h.default.getRotationTweener.bind(null, 1),
            rotationZ: h.default.getRotationTweener.bind(null, 2)
        }, a.prototype.update = function(t, e, n) {
            var i = this;
            return f.default.prototype.update.call(this, t, e, n).then(function(t) {
                if (t) {
                    isNaN(e.duration) || (t.duration = +e.duration), t.loop = !0 === e.loop.enabled, t.autoStart = void 0 === e.autoStart || e.autoStart, t.autoStart ? t.start() : t.stop(), t.channels = t.channels.filter(function(t) {
                        return !!e.channels[t.id]
                    });
                    var n = function(t) {
                            return i.world.entityManager.getEntityById(t)
                        },
                        a = {};
                    return _.default.forEach(e.channels, function(e) {
                        l(e, e.id, t, n, a)
                    }, null, "sortValue"), t
                }
            })
        }, e.default = a
    },
    808: function(t, e, n) {
        "use strict";

        function i() {
            r.default.call(this, "TimelineSystem", ["TimelineComponent"])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(7),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(a);
        i.prototype = Object.create(r.default.prototype), i.prototype.constructor = i, i.prototype.process = function(t, e) {
            for (var n = 0; n < this._activeEntities.length; n++) {
                this._activeEntities[n].timelineComponent.update(e)
            }
        }, i.prototype.play = function() {
            this.passive = !1;
            for (var t = this._activeEntities, e = 0; e < t.length; e++) {
                var n = t[e].timelineComponent;
                n.autoStart && n.start()
            }
        }, i.prototype.pause = function() {
            this.passive = !0;
            for (var t = this._activeEntities, e = 0; e < t.length; e++) {
                t[e].timelineComponent.pause()
            }
        }, i.prototype.resume = i.prototype.play, i.prototype.stop = function() {
            this.passive = !0;
            for (var t = this._activeEntities, e = 0; e < t.length; e++) {
                t[e].timelineComponent.stop()
            }
        }, e.default = i
    }
}, [806]);