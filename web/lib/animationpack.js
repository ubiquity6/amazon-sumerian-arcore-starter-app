webpackJsonp([2], {
    164: function(t, e, n) {
        "use strict";

        function a(t, e, n) {
            this._blendType = n || a.BLENDTYPES.LINEAR, this._channelName = t, (e instanceof Array || e instanceof Float32Array) && e.length ? this._times = new Float32Array(e) : this._times = [], this._lastStartFrame = 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(4),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        a.BLENDTYPES = {}, a.BLENDTYPES.LINEAR = "Linear", a.BLENDTYPES.CUBIC = "SCurve3", a.BLENDTYPES.QUINTIC = "SCurve5", a.prototype.getSampleCount = function() {
            return this._times.length
        }, a.prototype.getMaxTime = function() {
            return this._times.length ? this._times[this._times.length - 1] : 0
        }, a.prototype.updateSample = function(t, e) {
            var n = this._times.length;
            if (n) {
                var i = n - 1;
                if (t < 0 || 1 === n) this.setCurrentSample(0, 0, e);
                else if (t >= this._times[i]) this.setCurrentSample(i, 0, e);
                else {
                    var s = 0;
                    if (t >= this._times[this._lastStartFrame]) {
                        s = this._lastStartFrame;
                        for (var o = this._lastStartFrame; o < n - 1 && !(this._times[o] >= t); o++) s = o
                    } else
                        for (var o = 0; o < this._lastStartFrame && !(this._times[o] >= t); o++) s = o;
                    var l = (t - this._times[s]) / (this._times[s + 1] - this._times[s]);
                    switch (this._blendType) {
                        case a.BLENDTYPES.CUBIC:
                            l = r.default.scurve3(l);
                            break;
                        case a.BLENDTYPES.QUINTIC:
                            l = r.default.scurve5(l)
                    }
                    this.setCurrentSample(s, l, e), this._lastStartFrame = s
                }
            }
        }, e.default = a
    },
    165: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t) {
            this._skeleton = t, this._localTransforms = [], this._globalTransforms = [], this._matrixPalette = [], this._poseListeners = [], this.allocateTransforms(), this.setToBindPose()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(10),
            s = a(r),
            o = n(99),
            l = a(o),
            u = n(38),
            c = a(u);
        i.prototype.allocateTransforms = function() {
            for (var t = this._skeleton._joints.length, e = 0; e < t; e++) this._localTransforms[e] = new s.default;
            for (var e = 0; e < t; e++) this._globalTransforms[e] = new s.default;
            for (var e = 0; e < t; e++) this._matrixPalette[e] = new c.default
        }, i.prototype.setToBindPose = function() {
            for (var t = 0; t < this._localTransforms.length; t++) {
                this._localTransforms[t].matrix.copy(this._skeleton._joints[t]._inverseBindPose.matrix).invert();
                var e = this._skeleton._joints[t]._parentIndex;
                e !== l.default.NO_PARENT && this._localTransforms[t].matrix.mul2(this._skeleton._joints[e]._inverseBindPose.matrix, this._localTransforms[t].matrix)
            }
            this.updateTransforms()
        }, i.prototype.updateTransforms = function() {
            for (var t = this._skeleton._joints, e = 0, n = t.length; e < n; e++) {
                var a = t[e]._parentIndex;
                a !== l.default.NO_PARENT ? this._globalTransforms[e].matrix.mul2(this._globalTransforms[a].matrix, this._localTransforms[e].matrix) : this._globalTransforms[e].matrix.copy(this._localTransforms[e].matrix), this._matrixPalette[e].mul2(this._globalTransforms[e].matrix, t[e]._inverseBindPose.matrix)
            }
            this.firePoseUpdated()
        }, i.prototype.firePoseUpdated = function() {
            for (var t = this._poseListeners.length - 1; t >= 0; t--) this._poseListeners[t].poseUpdated(this)
        }, i.prototype.clone = function() {
            return new i(this._skeleton)
        }, e.default = i
    },
    227: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e, n, a, i, r) {
            if (s.default.call(this, t, e, r), n.length / 4 !== e.length || a.length / 3 !== e.length || i.length / 3 !== e.length) throw new Error("All provided arrays must be the same length (accounting for type)! Channel: " + t);
            this._rotations = new Float32Array(n), this._translations = new Float32Array(a), this._scales = new Float32Array(i)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(164),
            s = a(r),
            o = n(111),
            l = a(o),
            u = n(34),
            c = a(u),
            f = new c.default,
            p = new c.default;
        i.prototype = Object.create(s.default.prototype), i.prototype.createStateDataObject = function() {
            return new l.default
        }, i.prototype.setCurrentSample = function(t, e, n) {
            var a = n,
                i = 4 * t,
                r = 3 * t,
                s = 4 * (t + 1),
                o = 3 * (t + 1);
            return 0 === e ? (a._rotation.x = this._rotations[i + 0], a._rotation.y = this._rotations[i + 1], a._rotation.z = this._rotations[i + 2], a._rotation.w = this._rotations[i + 3], a._translation.x = this._translations[r + 0], a._translation.y = this._translations[r + 1], a._translation.z = this._translations[r + 2], a._scale.x = this._scales[r + 0], a._scale.y = this._scales[r + 1], void(a._scale.z = this._scales[r + 2])) : 1 === e ? (a._rotation.x = this._rotations[s + 0], a._rotation.y = this._rotations[s + 1], a._rotation.z = this._rotations[s + 2], a._rotation.w = this._rotations[s + 3], a._translation.x = this._translations[o + 0], a._translation.y = this._translations[o + 1], a._translation.z = this._translations[o + 2], a._scale.x = this._scales[o + 0], a._scale.y = this._scales[o + 1], void(a._scale.z = this._scales[o + 2])) : (a._rotation.x = this._rotations[i + 0], a._rotation.y = this._rotations[i + 1], a._rotation.z = this._rotations[i + 2], a._rotation.w = this._rotations[i + 3], f.x = this._rotations[s + 0], f.y = this._rotations[s + 1], f.z = this._rotations[s + 2], f.w = this._rotations[s + 3], a._rotation.equals(f) || (c.default.slerp(a._rotation, f, e, p), a._rotation.set(p)), a._translation.setDirect((1 - e) * this._translations[r + 0] + e * this._translations[o + 0], (1 - e) * this._translations[r + 1] + e * this._translations[o + 1], (1 - e) * this._translations[r + 2] + e * this._translations[o + 2]), void a._scale.setDirect((1 - e) * this._scales[r + 0] + e * this._scales[o + 0], (1 - e) * this._scales[r + 1] + e * this._scales[o + 1], (1 - e) * this._scales[r + 2] + e * this._scales[o + 2]))
        }, i.prototype.getData = function(t, e) {
            var n = e || new l.default;
            return this.setCurrentSample(t, 0, n), n
        }, e.default = i
    },
    228: function(t, e, n) {
        "use strict";

        function a() {
            this._currentTriggers = [], this._currentIndex = -1, this.armed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), a.prototype.arm = function(t, e) {
            if (null === e || 0 === e.length) this._currentTriggers.length = 0, this.armed = !1;
            else if (t !== this._currentIndex) {
                this._currentTriggers.length = 0;
                for (var n = 0, a = e.length; n < a; n++) e[n] && "" !== e[n] && this._currentTriggers.push(e[n]);
                this.armed = !0
            }
            this._currentIndex = t
        }, e.default = a
    },
    362: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e, n) {
            c.default.call(this), this._clip = t, this._clipInstance = new l.default, this._filterChannels = {}, this._filter = null, this.setFilter(e, n), this._startTime = -1 / 0, this._endTime = 1 / 0, this.currentLoop = 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(4),
            s = a(r),
            o = n(363),
            l = a(o),
            u = n(122),
            c = a(u);
        i.prototype = Object.create(c.default.prototype), i.prototype.constructor = i, i.prototype.setFilter = function(t, e) {
            if (t && e) {
                this._filter = ["Exclude", "Include"].indexOf(t) > -1 ? t : null;
                for (var n = 0; n < e.length; n++) this._filterChannels[e[n]] = !0
            } else this._filter = null
        }, i.prototype.setStartTime = function(t) {
            this._startTime = t
        }, i.prototype.setTime = function(t) {
            var e = this._clipInstance;
            "number" != typeof e._startTime && (e._startTime = t);
            var n = void 0,
                a = void 0;
            if (e._active) {
                0 !== e._timeScale ? (e._prevUnscaledClockTime = t - e._startTime, n = e._timeScale * e._prevUnscaledClockTime, e._prevClockTime = n) : n = e._prevClockTime;
                var i = Math.min(this._clip._maxTime, this._endTime),
                    r = Math.max(this._startTime, 0);
                if (a = i - r, -1 === i) return !1;
                0 !== i && (this.currentLoop = Math.floor(n / a), -1 === e._loopCount ? (n < 0 ? (n *= -1, n %= a, n = a - n) : n %= a, n += r) : e._loopCount > 0 && a * e._loopCount >= Math.abs(n) && (n < 0 ? (n *= -1, n %= a, n = a - n) : n %= a, n += r), (n > i || n < r) && (n = s.default.clamp(n, r, i), e._active = !1)), this._clip.update(n, e)
            }
            return e._active
        }, i.prototype.resetClips = function(t) {
            this._clipInstance._startTime = void 0 !== t ? t : 0, this._clipInstance._active = !0
        }, i.prototype.shiftClipTime = function(t) {
            this._clipInstance._startTime += t, this._clipInstance._active = !0
        }, i.prototype.setTimeScale = function(t) {
            this._clipInstance.setTimeScale(t)
        }, i.prototype.isActive = function() {
            return this._clipInstance._active && -1 !== this._clip._maxTime
        }, i.prototype.getSourceData = function() {
            if (!this._filter || !this._filterChannels) return this._clipInstance._clipStateObjects;
            var t = this._clipInstance._clipStateObjects,
                e = {},
                n = "Include" === this._filter;
            for (var a in t) void 0 !== this._filterChannels[a] === n && (e[a] = t[a]);
            return e
        }, i.prototype.clone = function() {
            var t = new i(this._clip);
            t._clipInstance = this._clipInstance.clone(), t._filter = this._filter;
            for (var e in this._filterChannels) t._filterChannels[e] = this._filterChannels[e];
            return t.setStartTime(this._startTime), t._endTime = this._endTime, t
        }, e.default = i
    },
    363: function(t, e, n) {
        "use strict";

        function a() {
            this._active = !0, this._loopCount = 0, this._timeScale = 1, this._startTime = 0, this._prevClockTime = 0, this._prevUnscaledClockTime = 0, this._clipStateObjects = {}
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(80),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        a.prototype.setTimeScale = function(t, e) {
            if (e = void 0 !== e ? e : r.default.time, this._active && this._timeScale !== t)
                if (0 !== this._timeScale && 0 !== t) {
                    var n = e,
                        a = n - this._startTime;
                    a *= this._timeScale, a /= t, this._startTime = n - a
                } else if (0 === this._timeScale) {
                var n = e;
                this._startTime = n - this._prevUnscaledClockTime
            }
            this._timeScale = t
        }, a.prototype.getApplyTo = function(t) {
            var e = t._channelName,
                n = this._clipStateObjects[e];
            return n || (n = t.createStateDataObject(), this._clipStateObjects[e] = n), n
        }, a.prototype.clone = function() {
            var t = new a;
            return t._active = this._active, t._loopCount = this._loopCount, t._timeScale = this._timeScale, t
        }, e.default = a
    },
    364: function(t, e, n) {
        "use strict";

        function a(t, e) {
            r.default.call(this), this._source = t, this._time = e
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(122),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        a.prototype = Object.create(r.default.prototype), a.prototype.constructor = a, a.prototype.getSourceData = function() {
            return this._source.getSourceData()
        }, a.prototype.resetClips = function() {
            this._source.resetClips(0)
        }, a.prototype.setTime = function() {
            return this._source.setTime(this._time), !0
        }, a.prototype.clone = function() {
            return new a(this._source.clone(), this._time)
        }, e.default = a
    },
    365: function(t, e, n) {
        "use strict";

        function a(t, e) {
            this._name = t, this._channels = e || [], this._maxTime = -1, this.updateMaxTimeIndex()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), a.prototype.update = function(t, e) {
            for (var n = 0, a = this._channels.length; n < a; ++n) {
                var i = this._channels[n],
                    r = e.getApplyTo(i);
                i.updateSample(t, r)
            }
        }, a.prototype.addChannel = function(t) {
            this._channels.push(t), this.updateMaxTimeIndex()
        }, a.prototype.removeChannel = function(t) {
            var e = this._channels.indexOf(t);
            return e >= 0 && (this._channels.splice(e, 1), this.updateMaxTimeIndex(), !0)
        }, a.prototype.findChannelByName = function(t) {
            for (var e = 0, n = this._channels.length; e < n; ++e) {
                var a = this._channels[e];
                if (t === a._channelName) return a
            }
            return null
        }, a.prototype.updateMaxTimeIndex = function() {
            this._maxTime = -1;
            for (var t = void 0, e = 0; e < this._channels.length; e++) {
                t = this._channels[e].getMaxTime(), t > this._maxTime && (this._maxTime = t)
            }
        }, a.prototype.toString = function() {
            return this._name + ": " + this._channels.map(function(t) {
                return t._channelName
            })
        }, e.default = a
    },
    366: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e, n, a) {
            s.default.call(this, t, e, a), this._values = n ? n.slice(0) : null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(164),
            s = a(r),
            o = n(4),
            l = a(o);
        i.prototype = Object.create(s.default.prototype), i.prototype.createStateDataObject = function() {
            return [0]
        }, i.prototype.setCurrentSample = function(t, e, n) {
            n[0] = l.default.lerp(e, this._values[t], this._values[t + 1])
        }, i.prototype.getData = function(t, e) {
            var n = e || [];
            return n[0] = this._values[t], n
        }, e.default = i
    },
    367: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e, n, a, i, r, o) {
            s.default.call(this, e, n, a, i, r, o), this._jointName = e, this._jointIndex = t
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(227),
            s = a(r),
            o = n(156),
            l = a(o);
        i.prototype = Object.create(s.default.prototype), i.JOINT_CHANNEL_NAME = "_jnt", i.prototype.createStateDataObject = function() {
            return new l.default
        }, i.prototype.setCurrentSample = function(t, e, n) {
            s.default.prototype.setCurrentSample.call(this, t, e, n), n._jointIndex = this._jointIndex
        }, i.prototype.getData = function(t, e) {
            var n = e || new l.default;
            return s.default.prototype.getData.call(this, t, n), n._jointIndex = this._jointIndex, n
        }, e.default = i
    },
    368: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e, n, a) {
            s.default.call(this, t, e, a), this._keys = n ? n.slice(0) : null, this.guarantee = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(164),
            s = a(r),
            o = n(228),
            l = a(o);
        i.prototype = Object.create(s.default.prototype), i.prototype.createStateDataObject = function() {
            return new l.default
        }, i.prototype.setCurrentSample = function(t, e, n) {
            var a = n._currentIndex,
                i = 1 !== e ? t : t + 1;
            if (a !== i && this.guarantee) {
                var r = [];
                if (a > i) {
                    for (var s = a + 1; s < this._keys.length; s++) r.push(this._keys[s]);
                    a = -1
                }
                for (var s = a + 1; s <= i; s++) r.push(this._keys[s]);
                n.arm(i, r)
            } else n.arm(i, [this._keys[i]])
        }, e.default = i
    },
    369: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        //! AT: this should not exit
        function i(t) {
            s.default.apply(this, arguments), this.type = "AnimationComponent", this.layers = [], this.floats = {}, this._updateRate = 1 / 60, this._lastUpdate = 0, this._triggerCallbacks = {};
            var e = new c.default(c.default.BASE_LAYER_NAME);
            this.layers.push(e), this._skeletonPose = t, this.paused = !1, this.lastTimeOfPause = -1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(8),
            s = a(r),
            o = n(80),
            l = a(o),
            u = n(153),
            c = a(u),
            f = n(156),
            p = a(f),
            h = n(111),
            _ = a(h),
            d = n(228),
            m = a(d);
        i.type = "AnimationComponent", i.prototype = Object.create(s.default.prototype), i.prototype.constructor = i, i.prototype.transitionTo = function(t, e, n) {
            return !!this.layers[0].transitionTo(t, void 0, n) || !!e && this.layers[0].setCurrentStateById(t, !0, void 0, n)
        }, i.prototype.getStateById = function(t) {
            return this.layers[0].getStateById(t)
        }, i.prototype.getStates = function() {
            return this.layers[0].getStates()
        }, i.prototype.getCurrentState = function() {
            return this.layers[0].getCurrentState()
        }, i.prototype.getTransitions = function() {
            return this.layers[0].getTransitions()
        }, i.prototype.update = function(t) {
            if (!this.paused) {
                if (t = void 0 !== t ? t : l.default.time, 0 !== this._updateRate) {
                    if (t > this._lastUpdate && t - this._lastUpdate < this._updateRate) return;
                    this._lastUpdate = t - (t - this._lastUpdate) % this._updateRate
                }
                for (var e = 0, n = this.layers.length; e < n; e++) this.layers[e].update(t)
            }
        }, i.prototype.apply = function(t) {
            var e = this.getCurrentSourceData();
            if (e) {
                for (var n = this._skeletonPose, a = Object.keys(e), i = 0, r = a.length; i < r; i++) {
                    var s = a[i],
                        o = e[s];
                    if (o instanceof p.default) n && o._jointIndex >= 0 && o.applyTo(n._localTransforms[o._jointIndex]);
                    else if (o instanceof _.default) t && (t.sync(), o.applyTo(t.transform));
                    else if (o instanceof m.default) {
                        if (o.armed) {
                            for (var i = 0, l = o._currentTriggers.length; i < l; i++) {
                                var u = this._triggerCallbacks[o._currentTriggers[i]];
                                if (u && u.length)
                                    for (var c = 0, f = u.length; c < f; c++) u[c]()
                            }
                            o.armed = !1
                        }
                    } else o instanceof Array && (this.floats[s] = o[0])
                }
                n && n.updateTransforms()
            }
        }, i.prototype.postUpdate = function() {
            for (var t = 0, e = this.layers.length; t < e; t++) this.layers[t].postUpdate()
        }, i.prototype.getCurrentSourceData = function() {
            if (0 === this.layers.length) return [];
            var t = this.layers.length - 1;
            this.layers[0]._layerBlender = null;
            for (var e = 0; e < t; e++) this.layers[e + 1].updateLayerBlending(this.layers[e]);
            return this.layers[t].getCurrentSourceData()
        }, i.prototype.addLayer = function(t, e) {
            isNaN(e) ? this.layers.push(t) : this.layers.splice(e, 0, t)
        }, i.prototype.resetClips = function(t) {
            for (var e = 0; e < this.layers.length; e++) this.layers[e].resetClips(t)
        }, i.prototype.shiftClipTime = function(t) {
            for (var e = 0; e < this.layers.length; e++) this.layers[e].shiftClipTime(t)
        }, i.prototype.setTimeScale = function(t) {
            for (var e = 0; e < this.layers.length; e++) this.layers[e].setTimeScale(t)
        }, i.prototype.pause = function() {
            this.paused || (this.lastTimeOfPause = l.default.time, this.paused = !0)
        }, i.prototype.stop = function() {
            this._skeletonPose && this._skeletonPose.setToBindPose(), this.paused = !0, this.lastTimeOfPause = -1
        }, i.prototype.resume = function() {
            (this.paused || -1 === this.lastTimeOfPause) && (-1 === this.lastTimeOfPause ? this.resetClips(l.default.time) : this.shiftClipTime(l.default.time - this.lastTimeOfPause)), this.paused = !1
        }, i.prototype.clone = function() {
            var t = new i;
            return t.layers = this.layers.map(function(t) {
                return t.clone()
            }), t
        }, e.default = i
    },
    370: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(25),
            s = a(r),
            o = n(365),
            l = a(o),
            u = n(367),
            c = a(u),
            f = n(227),
            p = a(f),
            h = n(366),
            _ = a(h),
            d = n(368),
            m = a(d),
            y = n(64),
            v = a(y);
        i.prototype = Object.create(s.default.prototype), i.prototype.constructor = i, s.default._registerClass("clip", i), i.prototype._create = function() {
            return new l.default
        }, i.prototype._update = function(t, e, n) {
            var a = this;
            return s.default.prototype._update.call(this, t, e, n).then(function(t) {
                return t ? a.loadObject(e.binaryRef, n).then(function(n) {
                    if (!n) throw new Error("Binary clip data was empty");
                    return a._updateAnimationClip(e, n, t)
                }) : t
            })
        }, i.prototype._updateAnimationClip = function(t, e, n) {
            if (n._channels = [], t.channels)
                for (var a = Object.keys(t.channels), i = 0; i < a.length; i++) {
                    var r, s = t.channels[a[i]],
                        o = v.default.getTypedArray(e, s.times),
                        l = s.blendType,
                        u = s.type;
                    switch (u) {
                        case "Joint":
                        case "Transform":
                            var f, h, d;
                            f = v.default.getTypedArray(e, s.rotationSamples), h = v.default.getTypedArray(e, s.translationSamples), d = v.default.getTypedArray(e, s.scaleSamples), r = "Joint" === u ? new c.default(s.jointIndex, s.name, o, f, h, d, l) : new p.default(s.name, o, f, h, d, l);
                            break;
                        case "FloatLERP":
                            r = new _.default(s.name, o, s.values, l);
                            break;
                        case "Trigger":
                            r = new m.default(s.name, o, s.keys), r.guarantee = !!s.guarantee;
                            break;
                        default:
                            console.warn("Unhandled channel type: " + s.type);
                            continue
                    }
                    n.addChannel(r)
                }
            return n
        }, e.default = i
    },
    371: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.apply(this, arguments), this._type = "AnimationComponent"
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(20),
            s = a(r),
            o = n(369),
            l = a(o),
            u = n(12),
            c = a(u);
        i.prototype = Object.create(s.default.prototype), i.prototype.constructor = i, s.default._registerClass("animation", i), i.prototype._create = function() {
            return new l.default
        }, i.prototype.update = function(t, e, n) {
            function a(e, a) {
                return r.loadObject(e, n).then(function(e) {
                    a._skeletonPose = e.clone(), t.traverse(function(t) {
                        t.meshDataComponent && t.meshDataComponent.currentPose.id === e.id && (t.meshDataComponent.currentPose = a._skeletonPose)
                    })
                })
            }

            function i(t, e) {
                return r.loadObject(t, n).then(function(n) {
                    e.layers = n, e._layersId = t
                })
            }
            var r = this;
            return s.default.prototype.update.call(this, t, e, n).then(function(t) {
                if (t) {
                    var n = [];
                    return e.poseRef && n.push(a(e.poseRef, t)), e.layersRef && n.push(i(e.layersRef, t)), c.default.all(n).then(function() {
                        return t
                    })
                }
            })
        }, e.default = i
    },
    372: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(25),
            s = a(r),
            o = n(153),
            l = a(o),
            u = n(12),
            c = a(u),
            f = n(3),
            p = a(f);
        i.prototype = Object.create(s.default.prototype), i.prototype.constructor = i, s.default._registerClass("animation", i), i.prototype._create = function(t) {
            var e = [];
            return this._objects.set(t, e), e
        }, i.prototype._setInitialState = function(t, e) {
            if (e) {
                var n = t.getStateById(e);
                t._currentState !== n && t.setCurrentStateById(e, !0)
            } else t.setCurrentState()
        }, i.prototype._update = function(t, e, n) {
            var a = this;
            return s.default.prototype._update.call(this, t, e, n).then(function(t) {
                if (t) {
                    var i = [],
                        r = 0;
                    return p.default.forEach(e.layers, function(e) {
                        i.push(a._parseLayer(e, t[r++], n))
                    }, null, "sortValue"), c.default.all(i).then(function(e) {
                        t.length = e.length;
                        for (var n = 0; n < e.length; n++) t[n] = e[n];
                        return t
                    })
                }
            })
        }, i.prototype._parseLayer = function(t, e, n) {
            var a = this;
            e ? e._name = t.name : e = new l.default(t.name), e.id = t.id, e._transitions = p.default.deepClone(t.transitions), e._layerBlender && (void 0 !== t.blendWeight ? e._layerBlender._blendWeight = t.blendWeight : e._layerBlender._blendWeight = 1, e._layerType = t.layerType || l.default.DEFAULT_LAYER_TYPE);
            var i = [];
            return p.default.forEach(t.states, function(t) {
                i.push(a.loadObject(t.stateRef, n).then(function(t) {
                    e.setState(t.id, t)
                }))
            }, null, "sortValue"), c.default.all(i).then(function() {
                return a._setInitialState(e, t.initialStateRef), e
            })
        }, e.default = i
    },
    373: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(25),
            s = a(r),
            o = n(155),
            l = a(o),
            u = n(362),
            c = a(u),
            f = n(207),
            p = a(f),
            h = n(154),
            _ = a(h),
            d = n(364),
            m = a(d),
            y = n(12),
            v = a(y),
            T = n(17),
            g = a(T),
            S = n(3),
            C = a(S);
        i.prototype = Object.create(s.default.prototype), i.prototype.constructor = i, s.default._registerClass("animstate", i), i.prototype._create = function(t) {
            var e = new l.default;
            return this._objects.set(t, e), e
        }, i.prototype._update = function(t, e, n) {
            var a = this;
            return s.default.prototype._update.call(this, t, e, n).then(function(t) {
                if (t) return t._name = e.name, t.id = e.id, t._transitions = C.default.deepClone(e.transitions), a._parseClipSource(e.clipSource, t._sourceTree, n).then(function(e) {
                    return t._sourceTree = e, t
                })
            })
        }, i.prototype._parseClipSource = function(t, e, n) {
            switch (t.type) {
                case "Clip":
                    return this.loadObject(t.clipRef, n).then(function(n) {
                        e && e instanceof c.default ? (e._clip = n, e.setFilter(t.filter, t.channels)) : e = new c.default(n, t.filter, t.channels), void 0 !== t.loopCount && (e._clipInstance._loopCount = +t.loopCount), void 0 !== t.timeScale && (e._clipInstance._timeScale = t.timeScale), e._startTime = t.startTime || 0;
                        for (var a = 1 / 0, i = 0; i < n._channels.length; i++)
                            for (var r = n._channels[i], s = 0; s < r._times.length; s++) {
                                var o = r._times[s];
                                o < a && (a = o)
                            }
                        return e._startTime = Math.max(e._startTime, a), e
                    });
                case "Managed":
                    return e && e instanceof p.default || (e = new p.default), t.clipRef ? this.loadObject(t.clipRef, n).then(function(n) {
                        return e.initFromClip(n, t.filter, t.channels), e
                    }) : g.default.resolve(e);
                case "Lerp":
                    var a = [this._parseClipSource(t.clipSourceA, null, n), this._parseClipSource(t.clipSourceB, null, n)];
                    return v.default.all(a).then(function(n) {
                        return e = new _.default(n[0], n[1]), t.blendWeight && (e.blendWeight = t.blendWeight), e
                    });
                case "Frozen":
                    return this._parseClipSource(t.clipSource).then(function(n) {
                        return e && e instanceof m.default ? (e._source = n, e._time = t.frozenTime || 0) : e = new m.default(n, t.frozenTime || 0), e
                    });
                default:
                    return console.error("Unable to parse clip source"), g.default.resolve()
            }
        }, e.default = i
    },
    374: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(25),
            s = a(r),
            o = n(99),
            l = a(o),
            u = n(375),
            c = a(u),
            f = n(165),
            p = a(f),
            h = n(17),
            _ = a(h),
            d = n(3),
            m = a(d);
        i.prototype = Object.create(s.default.prototype), i.prototype.constructor = i, s.default._registerClass("skeleton", i), i.prototype._create = function() {
            var t = new c.default("", []);
            return new p.default(t)
        }, i.prototype._update = function(t, e, n) {
            return s.default.prototype._update.call(this, t, e, n).then(function(t) {
                if (!e) return _.default.resolve();
                var n = [];
                return m.default.forEach(e.joints, function(t) {
                    var e = new l.default(t.name);
                    e._index = t.index, e._parentIndex = t.parentIndex, e._inverseBindPose.matrix.data.set(t.inverseBindPose), n.push(e)
                }, null, "index"), t.id = e.id, t._skeleton._name = e.name, t._skeleton._joints = n, t.allocateTransforms(), t.setToBindPose(), _.default.resolve(t)
            })
        }, e.default = i
    },
    375: function(t, e, n) {
        "use strict";

        function a(t, e) {
            this.id = "", this._name = t, this._joints = e
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(99),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        a.prototype.clone = function() {
            for (var t = this._name, e = this._joints, n = [], i = 0, s = e.length; i < s; i++) {
                var o = e[i],
                    l = o._name,
                    u = new r.default(l);
                u._index = o._index, u._parentIndex = o._parentIndex, u._inverseBindPose.copy(o._inverseBindPose), u._inverseBindPose.update(), n[i] = u
            }
            return new a(t, n)
        }, e.default = a
    },
    742: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(122),
            r = a(i),
            s = n(154),
            o = a(s),
            l = n(362),
            u = a(l),
            c = n(364),
            f = a(c),
            p = n(207),
            h = a(p),
            _ = n(164),
            d = a(_),
            m = n(365),
            y = a(m),
            v = n(363),
            T = a(v),
            g = n(366),
            S = a(g),
            C = n(367),
            b = a(C),
            j = n(156),
            x = a(j),
            P = n(227),
            O = a(P),
            I = n(111),
            w = a(I),
            M = n(368),
            A = a(M),
            k = n(228),
            E = a(k),
            B = n(369),
            D = a(B),
            L = n(370),
            N = a(L),
            F = n(371),
            U = a(F),
            R = n(743),
            z = a(R),
            H = n(372),
            Y = a(H),
            J = n(373),
            W = a(J),
            Q = n(374),
            V = a(Q),
            q = n(99),
            G = a(q),
            K = n(153),
            X = a(K),
            Z = n(298),
            $ = a(Z),
            tt = n(375),
            et = a(tt),
            nt = n(165),
            at = a(nt),
            it = n(210),
            rt = a(it),
            st = n(209),
            ot = a(st),
            lt = n(208),
            ut = a(lt),
            ct = n(297),
            ft = a(ct),
            pt = n(155),
            ht = a(pt),
            _t = n(296),
            dt = a(_t),
            mt = n(744),
            yt = a(mt),
            vt = {
                Source: r.default,
                BinaryLerpSource: o.default,
                ClipSource: u.default,
                FrozenClipSource: f.default,
                ManagedTransformSource: h.default,
                AbstractAnimationChannel: d.default,
                AnimationClip: y.default,
                AnimationClipInstance: T.default,
                InterpolatedFloatChannel: S.default,
                JointChannel: b.default,
                JointData: x.default,
                TransformChannel: O.default,
                TransformData: w.default,
                TriggerChannel: A.default,
                TriggerData: E.default,
                AnimationComponent: D.default,
                AnimationClipHandler: N.default,
                AnimationComponentHandler: U.default,
                AnimationHandlers: z.default,
                AnimationLayersHandler: Y.default,
                AnimationStateHandler: W.default,
                SkeletonHandler: V.default,
                Joint: G.default,
                AnimationLayer: X.default,
                LayerLerpBlender: $.default,
                Skeleton: et.default,
                SkeletonPose: at.default,
                AbstractState: rt.default,
                AbstractTransitionState: ot.default,
                FadeTransitionState: ut.default,
                FrozenTransitionState: ft.default,
                SteadyState: ht.default,
                SyncFadeTransitionState: dt.default,
                AnimationSystem: yt.default
            };
        if ("undefined" != typeof window)
            for (var Tt in vt) window.sumerian[Tt] = vt[Tt];
        e.default = vt
    },
    743: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(370),
            r = a(i),
            s = n(371),
            o = a(s),
            l = n(372),
            u = a(l),
            c = n(373),
            f = a(c),
            p = n(374),
            h = a(p);
        e.default = {
            AnimationClipHandler: r.default,
            AnimationComponentHandler: o.default,
            AnimationLayersHandler: u.default,
            AnimationStateHandler: f.default,
            SkeletonHandler: h.default
        }
    },
    744: function(t, e, n) {
        "use strict";

        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.call(this, "AnimationSystem", ["AnimationComponent"])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(7),
            s = a(r),
            o = n(80),
            l = a(o);
        i.prototype = Object.create(s.default.prototype), i.prototype.process = function() {
            for (var t = 0; t < this._activeEntities.length; t++) {
                var e = this._activeEntities[t],
                    n = e.animationComponent;
                n.update(l.default.time), n.apply(e.transformComponent), n.postUpdate()
            }
        }, i.prototype.pause = function() {
            this.passive = !0;
            for (var t = 0; t < this._activeEntities.length; t++) this._activeEntities[t].animationComponent.pause()
        }, i.prototype.resume = function() {
            this.passive = !1;
            for (var t = 0; t < this._activeEntities.length; t++) {
                this._activeEntities[t].animationComponent.resume()
            }
        }, i.prototype.play = i.prototype.resume, i.prototype.stop = function() {
            this.passive = !0;
            for (var t = 0; t < this._activeEntities.length; t++) {
                this._activeEntities[t].animationComponent.stop()
            }
        }, e.default = i
    }
}, [742]);