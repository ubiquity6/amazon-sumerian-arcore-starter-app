webpackJsonp([4], {
    463: function(t, e, n) {
        "use strict";

        function o(t) {
            this.matrixData = t, this.width = t.length - 1
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
        o.prototype.getMatrixData = function() {
            return this.matrixData
        }, o.prototype.getPointInMatrix = function(t, e) {
            return this.matrixData[t][e]
        }, o.prototype.getAt = function(t, e) {
            return t < 0 || t > this.width || e < 0 || e > this.width ? 0 : this.getPointInMatrix(t, e)
        }, o.prototype.getInterpolated = function(t, e) {
            var n = this.getAt(Math.ceil(t), Math.ceil(e)),
                o = this.getAt(Math.ceil(t), Math.floor(e)),
                i = this.getAt(Math.floor(t), Math.ceil(e)),
                r = this.getAt(Math.floor(t), Math.floor(e)),
                a = t - Math.floor(t),
                s = e - Math.floor(e);
            return (n * a + i * (1 - a)) * s + (o * a + r * (1 - a)) * (1 - s)
        }, o.prototype.getTriangleAt = function(t, e) {
            var n = Math.ceil(t),
                o = Math.floor(t),
                i = Math.ceil(e),
                r = Math.floor(e),
                a = t - o,
                s = e - r,
                u = {
                    x: o,
                    y: i,
                    z: this.getAt(o, i)
                },
                c = {
                    x: n,
                    y: r,
                    z: this.getAt(n, r)
                },
                l = void 0;
            return l = a < 1 - s ? {
                x: o,
                y: r,
                z: this.getAt(o, r)
            } : {
                x: n,
                y: i,
                z: this.getAt(n, i)
            }, [u, c, l]
        }, o.prototype.getPreciseHeight = function(t, e) {
            var n = this.getTriangleAt(t, e);
            return r.default.barycentricInterpolation(n[0], n[1], n[2], {
                x: t,
                y: e,
                z: 0
            }).z
        }, o.prototype.run = function(t) {
            var e = t.transformComponent.transform.translation;
            e.y = this.getInterpolated(e.z, e.x)
        }, e.default = o
    },
    464: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function r(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function t(e, n, o) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, n);
                if (void 0 === i) {
                    var r = Object.getPrototypeOf(e);
                    return null === r ? void 0 : t(r, n, o)
                }
                if ("value" in i) return i.value;
                var a = i.get;
                if (void 0 !== a) return a.call(o)
            },
            c = n(20),
            l = o(c),
            d = n(160),
            p = o(d),
            f = n(12),
            h = o(f),
            m = n(3),
            y = o(m),
            v = n(76),
            g = o(v),
            w = function(t) {
                function e() {
                    var t;
                    i(this, e);
                    for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
                    var s = r(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [this].concat(o)));
                    return s._type = "ScriptComponent", s
                }
                return a(e, t), s(e, [{
                    key: "_create",
                    value: function() {
                        return new p.default
                    }
                }, {
                    key: "update",
                    value: function(t, n, o) {
                        var i = this;
                        return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "update", this).call(this, t, n, o).then(function(t) {
                            if (t) {
                                var e = y.default.map(n.scripts, function(e) {
                                    return i._updateInstance(t, e, o)
                                }, null, "sortValue");
                                return h.default.all(e).then(function(e) {
                                    return t.scripts = e, t.wasSetup && t.setup(t.entity), t
                                })
                            }
                        })
                    }
                }, {
                    key: "_updateInstance",
                    value: function(t, e, n) {
                        var o = this;
                        return this._findOrCreateInstance(t, e, n).then(function(t) {
                            return g.default.update(t, e, o.loadObject, n), t
                        })
                    }
                }, {
                    key: "_findOrCreateInstance",
                    value: function(t, e, n) {
                        var o = this._findInstance(t, e.id);
                        return o && o.id !== e.scriptRef && (o = void 0), o ? f.Promise.resolve(o) : g.default.load(e, this.loadObject, n)
                    }
                }, {
                    key: "_findInstance",
                    value: function(t, e) {
                        return y.default.find(t.scripts, function(t) {
                            return t.instanceId === e
                        })
                    }
                }]), e
            }(l.default);
        l.default._registerClass("script", w), e.default = w
    },
    465: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function r(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function t(e, n, o) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, n);
                if (void 0 === i) {
                    var r = Object.getPrototypeOf(e);
                    return null === r ? void 0 : t(r, n, o)
                }
                if ("value" in i) return i.value;
                var a = i.get;
                if (void 0 !== a) return a.call(o)
            },
            c = n(25),
            l = o(c),
            d = n(12),
            p = (o(d), n(821)),
            f = o(p),
            h = n(466),
            m = o(h),
            y = function(t) {
                function e() {
                    var t;
                    i(this, e);
                    for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
                    var s = r(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [this].concat(o)));
                    return s._updateId = 0, s
                }
                return a(e, t), s(e, [{
                    key: "_create",
                    value: function() {
                        return new f.default
                    }
                }, {
                    key: "_remove",
                    value: function(t) {
                        var n = this._objects.get(t);
                        if (n && n.cleanup && n.context) try {
                            n.cleanup(n.parameters, n.context, window.sumerian)
                        } catch (t) {}
                        m.default.removeDependencies(n.id), u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_remove", this).call(this, t)
                    }
                }, {
                    key: "_update",
                    value: function(t, n, o) {
                        return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_update", this).call(this, t, n, o).then(function(t) {
                            if (t) return t.updateConfig(n, o).then(function() {
                                return t
                            })
                        })
                    }
                }]), e
            }(l.default);
        l.default._registerClass("script", y), e.default = y
    },
    466: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.ScriptDependencyManager = void 0;
        var r = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            a = n(64),
            s = o(a),
            u = n(3),
            c = o(u),
            l = n(12),
            d = e.ScriptDependencyManager = function() {
                function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.head || document.body;
                    i(this, t), this._parentElement = e, this._dependencyPromises = {}, this._scriptElementsByURL = new Map
                }
                return r(t, [{
                    key: "removeDependencies",
                    value: function(t) {
                        return this.updateDependencies(t, [])
                    }
                }, {
                    key: "updateDependencies",
                    value: function(t, e) {
                        var n = this,
                            o = [],
                            i = this._getReferringDependencies(t);
                        return c.default.forEach(e, function(e) {
                            var r = s.default.find(i, function(t) {
                                return t.src === e.url
                            });
                            r && s.default.remove(i, r), o.push(n._addDependency(t, e.url))
                        }, null, "sortValue"), c.default.forEach(i, function(e) {
                            n._removeReference(e, t)
                        }), c.default.forEach(e, function(t) {
                            var e = n._scriptElementsByURL.get(t.url);
                            e && n._parentElement.appendChild(e)
                        }, null, "sortValue"), l.Promise.all(o).then(function(t) {
                            return t.reduce(function(t, e) {
                                return e && (t[e.file] = e), t
                            }, {})
                        })
                    }
                }, {
                    key: "_addDependency",
                    value: function(t, e) {
                        var n = this,
                            o = document.querySelector('script[src="' + e + '"]');
                        if (o) return this._addReference(o, t), this._dependencyPromises[e] || l.Promise.resolve();
                        o = document.createElement("script"), o.src = e, o.isDependency = !0, o.async = !1, this._scriptElementsByURL.set(e, o), this._addReference(o, t);
                        var i = this._loadExternalScript(o).finally(function() {
                            delete n._dependencyPromises[e]
                        });
                        return this._dependencyPromises[e] = i, i
                    }
                }, {
                    key: "_loadExternalScript",
                    value: function(t) {
                        return new l.Promise(function(e) {
                            function n(n) {
                                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                                t.parentNode && t.parentNode.removeChild(t), r();
                                var i = t.src;
                                e({
                                    message: n,
                                    line: o,
                                    file: i
                                })
                            }

                            function o(e) {
                                var o = "An error occured when loading script dependency " + t.src + ".";
                                e.message && (o += " " + e.message), console.error("[Sumerian]", o, e), n(o, e.lineno)
                            }

                            function i(e) {
                                e.filename === t.src && o(e)
                            }

                            function r() {
                                clearTimeout(a), window.removeEventListener("error", i)
                            }
                            t.onload = function() {
                                r(), e(void 0)
                            };
                            var a = setTimeout(function() {
                                console.error("[Sumerian] A timeout occured when loading script dependency " + t.src + "."), n("Loading dependency " + t.src + " failed (time out)")
                            }, 6e3);
                            t.onerror = o, window.addEventListener("error", i)
                        })
                    }
                }, {
                    key: "_getReferringDependencies",
                    value: function(t) {
                        var e = [],
                            n = document.querySelectorAll("script"),
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, s = n[Symbol.iterator](); !(o = (a = s.next()).done); o = !0) {
                                var u = a.value;
                                this._hasReferenceTo(u, t) && e.push(u)
                            }
                        } catch (t) {
                            i = !0, r = t
                        } finally {
                            try {
                                !o && s.return && s.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return e
                    }
                }, {
                    key: "_hasReferenceTo",
                    value: function(t, e) {
                        return t.scriptRefs && t.scriptRefs.indexOf(e) > -1
                    }
                }, {
                    key: "_addReference",
                    value: function(t, e) {
                        if (t.scriptRefs) {
                            -1 === t.scriptRefs.indexOf(e) && t.scriptRefs.push(e)
                        } else t.scriptRefs = [e]
                    }
                }, {
                    key: "_removeReference",
                    value: function(t, e) {
                        t.scriptRefs && (s.default.remove(t.scriptRefs, e), !this._hasReferences(t) && t.parentNode && (t.parentNode.removeChild(t), delete this._scriptElementsByURL[t.src]))
                    }
                }, {
                    key: "_hasReferences",
                    value: function(t) {
                        return t.scriptRefs && t.scriptRefs.length > 0
                    }
                }]), t
            }(),
            p = new d;
        e.default = p
    },
    815: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(327),
            r = o(i),
            a = n(816),
            s = o(a),
            u = n(328),
            c = o(u),
            l = n(817),
            d = o(l),
            p = n(326),
            f = o(p),
            h = n(818),
            m = o(h),
            y = n(463),
            v = o(y),
            g = n(331),
            w = o(g),
            b = n(330),
            _ = o(b),
            S = n(221),
            x = o(S),
            E = n(218),
            C = o(E),
            k = n(219),
            M = o(k),
            O = n(329),
            P = o(O),
            D = n(819),
            j = o(D),
            R = n(820),
            A = o(R),
            N = n(76),
            V = o(N),
            T = n(464),
            L = o(T),
            z = n(465),
            U = o(z),
            I = n(822),
            B = o(I),
            H = n(325),
            X = o(H),
            Y = n(823),
            F = o(Y),
            Z = n(220),
            q = o(Z),
            G = n(824),
            K = o(G),
            W = {
                AxisAlignedCamControlScript: r.default,
                BasicControlScript: s.default,
                ButtonScript: c.default,
                CannonPickScript: d.default,
                FlyControlScript: f.default,
                GroundBoundMovementScript: m.default,
                HeightMapBoundingScript: v.default,
                HMDControlScript: w.default,
                LensFlareScript: _.default,
                MouseLookControlScript: x.default,
                OrbitNPanControlScript: C.default,
                PanCamScript: M.default,
                PickAndRotateScript: P.default,
                PolyBoundingScript: j.default,
                RotationScript: A.default,
                Script: V.default,
                ScriptComponentHandler: L.default,
                ScriptHandler: U.default,
                ScriptHandlers: B.default,
                ScriptRegister: X.default,
                SparseHeightMapBoundingScript: F.default,
                WasdControlScript: q.default,
                WorldFittedTerrainScript: K.default
            };
        if ("undefined" != typeof window) {
            var Q = Object.keys(W),
                J = !0,
                $ = !1,
                tt = void 0;
            try {
                for (var et, nt = Q[Symbol.iterator](); !(J = (et = nt.next()).done); J = !0) {
                    var ot = et.value;
                    window.sumerian[ot] = W[ot]
                }
            } catch (t) {
                $ = !0, tt = t
            } finally {
                try {
                    !J && nt.return && nt.return()
                } finally {
                    if ($) throw tt
                }
            }
        }
        e.default = W
    },
    816: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t) {
            t = t || {}, this.domElement = void 0 === t.domElement ? null : t.domElement.domElement || t.domElement, this.name = "BasicControlScript", this.movementSpeed = 10, this.rollSpeed = 2, this.movementSpeedMultiplier = 1, this.mouseStatus = 0, this.moveState = {
                up: 0,
                down: 0,
                left: 0,
                right: 0,
                forward: 0,
                back: 0,
                pitchUp: 0,
                pitchDown: 0,
                yawLeft: 0,
                yawRight: 0,
                rollLeft: 0,
                rollRight: 0
            }, this.moveVector = new a.default(0, 0, 0), this.rotationVector = new a.default(0, 0, 0), this.multiplier = new a.default(1, 1, 1), this.rotationMatrix = new u.default, this.tmpVec = new a.default, this.handleEvent = function(t) {
                "function" == typeof this[t.type] && this[t.type](t)
            }, this.keydown = function(t) {
                if (!t.altKey) {
                    switch (t.keyCode) {
                        case 16:
                            this.movementSpeedMultiplier = .1;
                            break;
                        case 87:
                            this.moveState.forward = 1;
                            break;
                        case 83:
                            this.moveState.back = 1;
                            break;
                        case 65:
                            this.moveState.left = 1;
                            break;
                        case 68:
                            this.moveState.right = 1;
                            break;
                        case 82:
                            this.moveState.up = 1;
                            break;
                        case 70:
                            this.moveState.down = 1;
                            break;
                        case 38:
                            this.moveState.pitchUp = 1;
                            break;
                        case 40:
                            this.moveState.pitchDown = 1;
                            break;
                        case 37:
                            this.moveState.yawLeft = 1;
                            break;
                        case 39:
                            this.moveState.yawRight = 1;
                            break;
                        case 81:
                            this.moveState.rollLeft = 1;
                            break;
                        case 69:
                            this.moveState.rollRight = 1
                    }
                    this.updateMovementVector(), this.updateRotationVector()
                }
            }, this.keyup = function(t) {
                switch (t.keyCode) {
                    case 16:
                        this.movementSpeedMultiplier = 1;
                        break;
                    case 87:
                        this.moveState.forward = 0;
                        break;
                    case 83:
                        this.moveState.back = 0;
                        break;
                    case 65:
                        this.moveState.left = 0;
                        break;
                    case 68:
                        this.moveState.right = 0;
                        break;
                    case 82:
                        this.moveState.up = 0;
                        break;
                    case 70:
                        this.moveState.down = 0;
                        break;
                    case 38:
                        this.moveState.pitchUp = 0;
                        break;
                    case 40:
                        this.moveState.pitchDown = 0;
                        break;
                    case 37:
                        this.moveState.yawLeft = 0;
                        break;
                    case 39:
                        this.moveState.yawRight = 0;
                        break;
                    case 81:
                        this.moveState.rollLeft = 0;
                        break;
                    case 69:
                        this.moveState.rollRight = 0
                }
                this.updateMovementVector(), this.updateRotationVector()
            }, this.mousedown = function(t) {
                this.domElement !== document && this.domElement.focus(), t.preventDefault(), t = t.touches && 1 === t.touches.length ? t.touches[0] : t, this.mouseDownX = t.pageX, this.mouseDownY = t.pageY, this.mouseStatus = 1, document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)
            }.bind(this), this.mousemove = function(t) {
                this.mouseStatus > 0 && (t = t.touches && 1 === t.touches.length ? t.touches[0] : t, this.moveState.yawLeft = t.pageX - this.mouseDownX, this.moveState.pitchDown = t.pageY - this.mouseDownY, this.updateRotationVector(), this.mouseDownX = t.pageX, this.mouseDownY = t.pageY)
            }.bind(this), this.mouseup = function(t) {
                this.mouseStatus && (t.preventDefault(), this.mouseStatus = 0, this.moveState.yawLeft = this.moveState.pitchDown = 0, this.updateRotationVector(), document.removeEventListener("mousemove", this.mousemove), document.removeEventListener("mouseup", this.mouseup), document.removeEventListener("touchmove", this.mousemove), document.removeEventListener("touchend", this.mouseup))
            }.bind(this), this.updateMovementVector = function() {
                var t = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
                this.moveVector.x = -this.moveState.left + this.moveState.right, this.moveVector.y = -this.moveState.down + this.moveState.up, this.moveVector.z = -t + this.moveState.back
            }, this.updateRotationVector = function() {
                this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp, this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft, this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
            }, this.getContainerDimensions = function() {
                return this.domElement !== document ? {
                    size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
                    offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
                } : {
                    size: [window.innerWidth, window.innerHeight],
                    offset: [0, 0]
                }
            }, this.domElement && this.setupMouseControls(), this.updateMovementVector(), this.updateRotationVector()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(0),
            a = o(r),
            s = n(31),
            u = o(s);
        i.prototype.setupMouseControls = function() {
                this.domElement.setAttribute("tabindex", -1), this.domElement.addEventListener("mousedown", this.mousedown, !1), this.domElement.addEventListener("touchstart", this.mousedown, !1), this.domElement.addEventListener("keydown", this.keydown.bind(this), !1), this.domElement.addEventListener("keyup", this.keyup.bind(this), !1)
            },
            //! AT: what is this?!?!
            i.prototype.externals = function() {
                return [{
                    variable: "movementSpeed",
                    type: "number"
                }, {
                    variable: "rollSpeed",
                    type: "number"
                }]
            }, i.prototype.run = function(t, e, n) {
                n && !this.domElement && n.domElement && (this.domElement = n.domElement, this.setupMouseControls());
                var o = t.transformComponent,
                    i = o.transform,
                    r = t._world.tpf,
                    s = r * this.movementSpeed * this.movementSpeedMultiplier,
                    u = r * this.rollSpeed * this.movementSpeedMultiplier;
                (!this.moveVector.equals(a.default.ZERO) || !this.rotationVector.equals(a.default.ZERO) || this.mouseStatus > 0) && (i.translation.x += this.moveVector.x * s, i.translation.y += this.moveVector.y * s, i.translation.z += this.moveVector.z * s, this.tmpVec.x += -this.rotationVector.x * u * this.multiplier.x, this.tmpVec.y += this.rotationVector.y * u * this.multiplier.y, this.tmpVec.z += this.rotationVector.z * u * this.multiplier.z, i.rotation.fromAngles(this.tmpVec.x, this.tmpVec.y, this.tmpVec.z), this.mouseStatus > 0 && (this.moveState.yawLeft = 0, this.moveState.pitchDown = 0, this.updateRotationVector()), o.setUpdated())
            }, e.default = i
    },
    817: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            function t(t) {
                var e = t[0].clientX,
                    n = t[0].clientY;
                return [(e + t[1].clientX) / 2, (n + t[1].clientY) / 2]
            }

            function e(t, e, n, o, i, r, s) {
                e.constrainedBody = r;
                var u = new CANNON.Vec3(n, o, i).vsub(e.constrainedBody.position),
                    c = e.constrainedBody.quaternion.inverse(),
                    l = c.vmult(u);
                e.jointBody.position.set(n, o, i), e.mouseConstraint = new CANNON.PointToPointConstraint(e.constrainedBody, l, e.jointBody, new CANNON.Vec3(0, 0, 0)), p.world.addConstraint(e.mouseConstraint);
                var d = new a.default(n, o, i);
                f.constant = d.dot(s), f.normal.set(s)
            }

            function n(t, e, n) {
                e.jointBody.position.set(n.x, n.y, n.z), e.mouseConstraint.update()
            }

            function o(t, e) {
                p.world.removeConstraint(e.mouseConstraint), e.mouseConstraint = !1
            }

            function i(e, n) {
                c = ["Any", "Left", "Middle", "Right"].indexOf(e.pickButton) - 1, c < -1 && (c = -1), p = n.world.getSystem("CannonSystem");
                var o = new CANNON.Sphere(.1),
                    i = n.jointBody = new CANNON.RigidBody(0, o);
                i.collisionFilterGroup = 2, i.collisionFilterMask = 2, p.world.add(i), d = {
                    x: 0,
                    y: 0,
                    ox: 0,
                    oy: 0,
                    dx: 0,
                    dy: 0,
                    down: !1
                };
                var r = n.listeners = {
                        mousedown: function(t) {
                            if (!e.whenUsed || n.entity === n.activeCameraEntity) {
                                var o = t.button;
                                0 === o && (t.altKey ? o = 2 : t.shiftKey && (o = 1)), o !== c && -1 !== c || (d.down = !0, d.ox = d.x = t.clientX, d.oy = d.y = t.clientY)
                            }
                        },
                        mouseup: function(t) {
                            var e = t.button;
                            0 === e && (t.altKey ? e = 2 : t.shiftKey && (e = 1)), e !== c && -1 !== c || (d.down = !1, d.dx = d.dy = 0)
                        },
                        mousemove: function(t) {
                            e.whenUsed && n.entity !== n.activeCameraEntity || d.down && (d.x = t.clientX, d.y = t.clientY, n.dirty = !0)
                        },
                        mouseleave: function() {
                            d.down = !1, d.ox = d.x, d.oy = d.y
                        },
                        touchstart: function(o) {
                            if (!e.whenUsed || n.entity === n.activeCameraEntity) {
                                if (d.down = 2 === o.targetTouches.length, !d.down) return;
                                var i = t(o.targetTouches);
                                d.ox = d.x = i[0], d.oy = d.y = i[1]
                            }
                        },
                        touchmove: function(o) {
                            if (!e.whenUsed || n.entity === n.activeCameraEntity) {
                                if (!d.down) return;
                                var i = t(o.targetTouches);
                                d.x = i[0], d.y = i[1]
                            }
                        },
                        touchend: function() {
                            d.down = !1, d.ox = d.x, d.oy = d.y
                        }
                    },
                    a = Object.keys(r),
                    s = !0,
                    u = !1,
                    l = void 0;
                try {
                    for (var f, h = a[Symbol.iterator](); !(s = (f = h.next()).done); s = !0) {
                        var m = f.value;
                        n.domElement.addEventListener(m, r[m])
                    }
                } catch (t) {
                    u = !0, l = t
                } finally {
                    try {
                        !s && h.return && h.return()
                    } finally {
                        if (u) throw l
                    }
                }
                n.dirty = !0
            }

            function r(t, i) {
                d.dx = d.x - d.ox, d.dy = d.y - d.oy, d.ox = d.x, d.oy = d.y;
                var r = u.default.mainCamera;
                if (r && d.down && !i.mouseConstraint) {
                    for (var s = [], c = i.world.by.system("CannonSystem").toArray(), l = 0; l < c.length; l++) {
                        var p = c[l].cannonRigidbodyComponent.body;
                        p && p.shape instanceof CANNON.Box && p.motionstate === CANNON.Body.DYNAMIC && s.push(p)
                    }
                    var h = r.getPickRay(d.x, d.y, window.innerWidth, window.innerHeight),
                        m = new CANNON.Vec3(h.origin.x, h.origin.y, h.origin.z),
                        y = new CANNON.Vec3(h.direction.x, h.direction.y, h.direction.z),
                        v = new CANNON.Ray(m, y),
                        g = v.intersectBodies(s);
                    if (g.length) {
                        var w = g[0].body,
                            b = g[0].point;
                        e(t, i, b.x, b.y, b.z, w, h.direction.scale(-1))
                    }
                } else if (r && d.down && i.mouseConstraint && (0 !== d.dx || 0 !== d.dy)) {
                    r = u.default.mainCamera;
                    var _ = r.getPickRay(d.x, d.y, window.innerWidth, window.innerHeight),
                        S = new a.default;
                    f.rayIntersect(_, S, !0), n(t, i, S)
                } else d.down || o(t, i)
            }

            function s(t, e) {
                var n = Object.keys(e.listeners),
                    o = !0,
                    i = !1,
                    r = void 0;
                try {
                    for (var a, s = n[Symbol.iterator](); !(o = (a = s.next()).done); o = !0) {
                        var u = a.value;
                        e.domElement.removeEventListener(u, e.listeners[u])
                    }
                } catch (t) {
                    i = !0, r = t
                } finally {
                    try {
                        !o && s.return && s.return()
                    } finally {
                        if (i) throw r
                    }
                }
            }
            var c = void 0,
                d = void 0,
                p = void 0,
                f = new l.default;
            return {
                setup: i,
                update: r,
                cleanup: s
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(0),
            a = o(r),
            s = n(24),
            u = o(s),
            c = n(107),
            l = o(c);
        i.externals = {
            key: "CannonPickScript",
            name: "Cannon.js Body Pick",
            description: "Enables the user to physically pick a Cannon.js physics body and drag it around.",
            parameters: [{
                key: "whenUsed",
                type: "boolean",
                default: !0
            }, {
                key: "pickButton",
                name: "Pan button",
                description: "Pick with this button",
                type: "string",
                control: "select",
                default: "Any",
                options: ["Any", "Left", "Middle", "Right"]
            }, {
                key: "useForceNormal",
                name: "Use force normal",
                type: "boolean",
                default: !1
            }, {
                key: "forceNormal",
                name: "Force normal",
                default: [0, 0, 1],
                type: "vec3"
            }]
        }, e.default = i
    },
    818: function(t, e, n) {
        "use strict";

        function o(t) {
            t = t || {};
            for (var e in s) "boolean" == typeof s[e] ? this[e] = void 0 !== t[e] ? !0 === t[e] : s[e] : isNaN(s[e]) ? s[e] instanceof r.default ? this[e] = t[e] ? new r.default(t[e]) : (new r.default).set(s[e]) : this[e] = t[e] || s[e] : this[e] = isNaN(t[e]) ? s[e] : t[e];
            this.groundContact = 1, this.targetVelocity = new r.default, this.targetHeading = new r.default, this.acceleration = new r.default, this.torque = new r.default, this.groundHeight = 0, this.groundNormal = new r.default, this.controlState = {
                run: 0,
                strafe: 0,
                jump: 0,
                yaw: 0,
                roll: 0,
                pitch: 0
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(0),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i),
            a = new r.default,
            s = {
                gravity: -9.81,
                worldFloor: -1 / 0,
                jumpImpulse: 95,
                accLerp: .1,
                rotLerp: .1,
                modForward: 1,
                modStrafe: .7,
                modBack: .4,
                modTurn: .3
            };
        o.prototype.setTerrainSystem = function(t) {
            this.terrainScript = t
        }, o.prototype.getTerrainSystem = function() {
            return this.terrainScript
        }, o.prototype.getTerrainHeight = function(t) {
            var e = this.getTerrainSystem().getTerrainHeightAt(t);
            return null === e && (e = this.worldFloor), e
        }, o.prototype.getTerrainNormal = function(t) {
            return this.getTerrainSystem().getTerrainNormalAt(t)
        }, o.prototype.applyForward = function(t) {
            this.controlState.run = t
        }, o.prototype.applyStrafe = function(t) {
            this.controlState.strafe = t
        }, o.prototype.applyJump = function(t) {
            this.controlState.jump = t
        }, o.prototype.applyTurn = function(t) {
            this.controlState.yaw = t
        }, o.prototype.applyJumpImpulse = function(t) {
            return this.groundContact && (this.controlState.jump ? (t = this.jumpImpulse, this.controlState.jump = 0) : t = 0), t
        }, o.prototype.applyDirectionalModulation = function(t, e, n) {
            t *= this.modStrafe, n *= n > 0 ? this.modForward : this.modBack, this.targetVelocity.setDirect(t, this.applyJumpImpulse(e), n)
        }, o.prototype.applyTorqueModulation = function(t, e, n) {
            this.targetHeading.setDirect(t, e * this.modTurn, n)
        }, o.prototype.applyGroundNormalInfluence = function() {
            var t = Math.abs(Math.cos(this.groundNormal.x)),
                e = Math.abs(Math.cos(this.groundNormal.z));
            this.targetVelocity.x *= t, this.targetVelocity.z *= e
        }, o.prototype.updateTargetVectors = function(t) {
            this.applyDirectionalModulation(this.controlState.strafe, this.gravity, this.controlState.run), this.targetVelocity.applyPost(t.rotation), this.applyGroundNormalInfluence(), this.applyTorqueModulation(this.controlState.pitch, this.controlState.yaw, this.controlState.roll)
        }, o.prototype.computeAcceleration = function(t, e, n) {
            return a.set(n), a.applyPost(t.transformComponent.transform.rotation), a.sub(e), a.lerp(n, this.accLerp), a.y = n.y, a
        }, o.prototype.computeTorque = function(t, e) {
            return a.set(e), a.sub(t), a.lerp(e, this.rotLerp), a
        }, o.prototype.updateVelocities = function(t) {
            var e = t.movementComponent.getVelocity(),
                n = t.movementComponent.getRotationVelocity();
            this.acceleration.set(this.computeAcceleration(t, e, this.targetVelocity)), this.torque.set(this.computeTorque(n, this.targetHeading))
        }, o.prototype.applyAccelerations = function(t) {
            t.movementComponent.addVelocity(this.acceleration), t.movementComponent.addRotationVelocity(this.torque)
        }, o.prototype.updateGroundNormal = function(t) {
            this.groundNormal.set(this.getTerrainNormal(t.translation))
        }, o.prototype.checkGroundContact = function(t, e) {
            this.groundHeight = this.getTerrainHeight(e.translation), e.translation.y <= this.groundHeight ? (this.groundContact = 1, this.updateGroundNormal(e)) : this.groundContact = 0
        }, o.prototype.applyGroundContact = function(t, e) {
            this.groundHeight >= e.translation.y && (e.translation.y = this.groundHeight, t.movementComponent.velocity.y < 0 && (t.movementComponent.velocity.y = 0))
        }, o.prototype.run = function(t) {
            var e = t.transformComponent.transform;
            this.checkGroundContact(t, e), this.updateTargetVectors(e), this.updateVelocities(t), this.applyAccelerations(t), this.applyGroundContact(t, e)
        }, e.default = o
    },
    819: function(t, e, n) {
        "use strict";

        function o(t) {
            this.collidables = t || []
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), o.prototype.addCollidable = function(t) {
            this.collidables.push(t)
        }, o.prototype.removeAllAt = function(t, e, n) {
            this.collidables = this.collidables.filter(function(o) {
                return o.bottom <= n && o.top >= n && !window.PolyK.ContainsPoint(o.poly, t, e)
            })
        }, o.prototype.inside = function(t, e, n) {
            for (var o = 0; o < this.collidables.length; o++) {
                var i = this.collidables[o];
                if (i.bottom <= e && i.top >= e && window.PolyK.ContainsPoint(i.poly, t, n)) return window.PolyK.ClosestEdge(i.poly, t, n)
            }
        }, o.prototype.run = function(t) {
            for (var e = t.transformComponent, n = e.transform.translation, o = 0; o < this.collidables.length; o++) {
                var i = this.collidables[o];
                if (i.bottom <= n.y && i.top >= n.y && window.PolyK.ContainsPoint(i.poly, n.x, n.z)) {
                    var r = window.PolyK.ClosestEdge(i.poly, n.x, n.z);
                    return n.x = r.point.x, n.z = r.point.y, void e.setUpdated()
                }
            }
        }, e.default = o
    },
    820: function(t, e, n) {
        "use strict";

        function o() {
            function t(t) {
                i.x = t.x, i.y = t.y
            }

            function e(e, n) {
                i = {
                    x: 0,
                    y: 0
                }, r = {
                    x: 0,
                    y: 0
                }, a = n.entity, document.addEventListener("mousemove", t)
            }

            function n(t) {
                r.x += (i.x - r.x) * t.fraction, r.y += (i.y - r.y) * t.fraction, a.setRotation(r.y / 200, r.x / 200, 0)
            }

            function o() {
                document.removeEventListener("mousemove", t)
            }
            var i = void 0,
                r = void 0,
                a = void 0;
            return {
                setup: e,
                update: n,
                cleanup: o
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), o.externals = {
            key: "RotationScript",
            name: "Mouse Rotation",
            description: "",
            parameters: [{
                key: "fraction",
                name: "Speed",
                default: .01,
                type: "float",
                control: "slider",
                min: .01,
                max: 1
            }]
        }, e.default = o
    },
    821: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            a = n(5),
            s = o(a),
            u = n(126),
            c = o(u),
            l = n(466),
            d = o(l),
            p = n(76),
            f = o(p),
            h = 1,
            m = function() {
                function t() {
                    i(this, t), this._body = null, this._dependencyErrors = {}, this._scriptErrors = []
                }
                return r(t, [{
                    key: "updateConfig",
                    value: function(t, e) {
                        var n = this;
                        return this.id = t.id, this.name = t.name, d.default.updateDependencies(t.id, t.dependencies).then(function(e) {
                            n._dependencyErrors = e, n._body !== t.body && (n._updateCustomScriptObject(t), n._body = t.body), s.default.emit("sumerian.scriptError", {
                                id: t.id,
                                dependencyErrors: n._dependencyErrors,
                                errors: n._scriptErrors
                            })
                        })
                    }
                }, {
                    key: "_updateCustomScriptObject",
                    value: function(t) {
                        this._clearScriptErrors(), this._clearScriptObject();
                        var e = this._getCustomScriptObject(t);
                        e && !this._areScriptErrors && this._validateParameters(e.externals.parameters), e && !this._areScriptErrors && this._setScriptObject(e)
                    }
                }, {
                    key: "_getCustomScriptObject",
                    value: function(e) {
                        function n() {
                            var n = document.getElementById(t.DOM_ID_PREFIX + e.id);
                            n.parentNode && n.parentNode.removeChild(n), delete window._sumerianScriptFactories[e.id]
                        }

                        function o(t) {
                            n(), a._addScriptException(t)
                        }
                        window._sumerianScriptFactories || (window._sumerianScriptFactories = {});
                        var i = "window._sumerianScriptFactories['" + e.id + "'] = function () {\n \n" + e.body + '\n\n var obj = {\n  externals: {}\n };\n if (typeof parameters !== "undefined") {\n  obj.externals.parameters = parameters;\n }\n if (typeof transitions !== "undefined") {\n  obj.externals.transitions = transitions;\n }\n if (typeof argsUpdated !== "undefined") {\n  obj.argsUpdated = argsUpdated;\n }\n if (typeof setup !== "undefined") {\n  obj.setup = setup;\n }\n if (typeof cleanup !== "undefined") {\n  obj.cleanup = cleanup;\n }\n if (typeof update !== "undefined") {\n  obj.update = update;\n }\n if (typeof fixedUpdate !== "undefined") {\n  obj.fixedUpdate = fixedUpdate;\n }\n if (typeof lateUpdate !== "undefined") {\n  obj.lateUpdate = lateUpdate;\n }\n if (typeof enter !== "undefined") {\n  obj.enter = enter;\n }\n if (typeof exit !== "undefined") {\n  obj.exit = exit;\n }\n return obj;\n};',
                            r = document.getElementById(t.DOM_ID_PREFIX + e.id);
                        if (r) {
                            r.innerHTML.replace(/^.*\n/m, "") !== i && (r.parentNode.removeChild(r), r = null)
                        }
                        var a = this;
                        window.addEventListener("error", o);
                        try {
                            if (!r) {
                                var s = document.createElement("script");
                                s.id = t.DOM_ID_PREFIX + e.id, s.innerHTML = "//# sourceURL=sumerian-custom-scripts/" + e.id + ".js?v=" + h++ + "\n" + i, s.async = !1;
                                (document.head || document.body).appendChild(s)
                            }
                            var u = window._sumerianScriptFactories[e.id];
                            if (u) return u()
                        } catch (t) {
                            n(), this._addScriptException(t)
                        } finally {
                            window.removeEventListener("error", o)
                        }
                    }
                }, {
                    key: "_clearScriptObject",
                    value: function() {
                        this.externals = {
                            parameters: [],
                            transitions: []
                        }, this.setup = null, this.fixedUpdate = null, this.lateUpdate = null, this.update = null, this.run = null, this.cleanup = null, this.enter = null, this.exit = null, this.argsUpdated = null
                    }
                }, {
                    key: "_setScriptObject",
                    value: function(t) {
                        try {
                            this.externals = t.externals, this.setup = t.setup, this.update = t.update, this.fixedUpdate = t.fixedUpdate, this.lateUpdate = t.lateUpdate, this.cleanup = t.cleanup, this.enter = t.enter, this.exit = t.exit, this.argsUpdated = t.argsUpdated
                        } catch (t) {
                            this._addScriptException(t), this._clearScriptObject()
                        }
                        c.default.fillParameterSpecDefaults(this.externals.parameters), s.default.emit("sumerian.scriptExternals", {
                            id: this.id,
                            externals: this.externals
                        })
                    }
                }, {
                    key: "_validateParameters",
                    value: function(t) {
                        if (t) {
                            if (!(t instanceof Array)) return void this._addScriptError("Script parameters must be an array");
                            var e = new Set,
                                n = !0,
                                o = !1,
                                i = void 0;
                            try {
                                for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                                    var s = r.value;
                                    this._validateParameter(s), e.has(s.key) && this._addScriptError('Duplicate parameter key: "' + s.key + '"'), e.add(s.key)
                                }
                            } catch (t) {
                                o = !0, i = t
                            } finally {
                                try {
                                    !n && a.return && a.return()
                                } finally {
                                    if (o) throw i
                                }
                            }
                        }
                    }
                }, {
                    key: "_validateParameter",
                    value: function(t) {
                        for (var e = 0; e < c.default.PROPERTY_TYPES.length; ++e) {
                            var n = c.default.PROPERTY_TYPES[e],
                                o = t[n.prop],
                                i = void 0 !== o,
                                r = 'Property "' + n.prop + '" must be ';
                            if (n.mustBeDefined || i) {
                                var a = c.default.TYPE_VALIDATORS[n.type],
                                    s = n.getAllowedValues ? n.getAllowedValues(t) : null;
                                i && n.minLength && o.length < n.minLength && this._addScriptError(r + "longer than " + (n.minLength - 1)), s && -1 === s.indexOf(o) && this._addScriptError(r + "one of: " + s.join(", ")), a(o) || this._addScriptError(r + "of type " + n.type)
                            }
                        }
                    }
                }, {
                    key: "_addScriptError",
                    value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                        console.error("[Sumerian] An error occured " + (e ? "at line " + e + " " : "") + 'when loading the "' + this.name + '" script. ' + t), this._scriptErrors.push({
                            message: t,
                            line: e
                        })
                    }
                }, {
                    key: "_addScriptException",
                    value: function(t) {
                        var e = f.default.makeScriptError(this, t);
                        console.error("[Sumerian] An error occured " + (e.line ? "at line " + e.line + " " : "") + 'when loading the "' + this.name + '" script. ' + e.message, t), this._scriptErrors.push(e)
                    }
                }, {
                    key: "_clearScriptErrors",
                    value: function() {
                        this._scriptErrors = []
                    }
                }, {
                    key: "_areScriptErrors",
                    get: function() {
                        return 0 != this._scriptErrors.length
                    }
                }, {
                    key: "errorLineNumberOffset",
                    get: function() {
                        return 3
                    }
                }]), t
            }();
        m.DOM_ID_PREFIX = "_script_", e.default = m
    },
    822: function(t, e, n) {
        "use strict";
        n(465), n(464)
    },
    823: function(t, e, n) {
        "use strict";

        function o(t) {
            this.elevationData = t
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), o.prototype.getClosest = function(t, e) {
            for (var n = Number.MAX_VALUE, o = -1, i = 0; i < this.elevationData.length; i += 3) {
                var r = Math.pow(this.elevationData[i + 0] - t, 2) + Math.pow(this.elevationData[i + 2] - e, 2);
                r < n && (n = r, o = i)
            }
            return this.elevationData[o + 1]
        }, o.prototype.run = function(t) {
            var e = t.transformComponent.transform.translation,
                n = this.getClosest(e.x, e.z),
                o = e.y - n;
            e.y -= .1 * o
        }, e.default = o
    },
    824: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            if (t.minX > t.maxX) throw new Error({
                name: "Terrain Exception",
                message: "minX is larger than maxX"
            });
            if (t.minY > t.maxY) throw new Error({
                name: "Terrain Exception",
                message: "minY is larger than maxY"
            });
            if (t.minZ > t.maxZ) throw new Error({
                name: "Terrain Exception",
                message: "minZ is larger than maxZ"
            });
            if (!e) throw new Error({
                name: "Terrain Exception",
                message: "No heightmap data specified"
            });
            if (e.length !== e[0].length) throw new Error({
                name: "Terrain Exception",
                message: "Heightmap data is not a square"
            });
            return !0
        }

        function r(t, e, n) {
            return e = e || f, i(e, t, n), {
                dimensions: e,
                sideQuadCount: t.length - 1,
                script: new u.default(t)
            }
        }

        function a() {
            this.heightMapData = [], this.yMargin = 1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = n(463),
            u = o(s),
            c = n(0),
            l = o(c),
            d = new l.default,
            p = new l.default,
            f = {
                minX: 0,
                maxX: 100,
                minY: 0,
                maxY: 50,
                minZ: 0,
                maxZ: 100
            };
        a.prototype.addHeightData = function(t, e) {
            var n = r(t, e, this.heightMapData);
            return this.heightMapData.push(n), n
        }, a.prototype.getHeightDataForPosition = function(t) {
            for (var e = 0; e < this.heightMapData.length; e++) {
                var n = this.heightMapData[e].dimensions;
                if (t.x <= n.maxX && t.x >= n.minX && t.y < n.maxY + this.yMargin && t.y > n.minY - this.yMargin && t.z <= n.maxZ && t.z >= n.minZ) return this.heightMapData[e]
            }
            return null
        }, a.prototype.displaceAxisDimensions = function(t, e, n, o) {
            return o * (t - e) / (n - e)
        }, a.prototype.returnToWorldDimensions = function(t, e, n, o) {
            return e + t * ((n - e) / o)
        }, a.prototype.getTerrainHeightAt = function(t) {
            var e = this.getHeightDataForPosition(t);
            if (null === e) return null;
            var n = e.dimensions,
                o = this.displaceAxisDimensions(t.x, n.minX, n.maxX, e.sideQuadCount),
                i = this.displaceAxisDimensions(t.z, n.minZ, n.maxZ, e.sideQuadCount);
            return e.script.getPreciseHeight(o, i) * (n.maxY - n.minY) + n.minY
        }, a.prototype.getTerrainNormalAt = function(t) {
            var e = this.getHeightDataForPosition(t);
            if (!e) return null;
            for (var n = e.dimensions, o = this.displaceAxisDimensions(t.x, n.minX, n.maxX, e.sideQuadCount), i = this.displaceAxisDimensions(t.z, n.minZ, n.maxZ, e.sideQuadCount), r = e.script.getTriangleAt(o, i), a = 0; a < r.length; a++) r[a].x = this.returnToWorldDimensions(r[a].x, n.minX, n.maxX, e.sideQuadCount), r[a].z = this.returnToWorldDimensions(r[a].z, n.minY, n.maxY, 1), r[a].y = this.returnToWorldDimensions(r[a].y, n.minZ, n.maxZ, e.sideQuadCount);
            return d.setDirect(r[1].x - r[0].x, r[1].z - r[0].z, r[1].y - r[0].y), p.setDirect(r[2].x - r[0].x, r[2].z - r[0].z, r[2].y - r[0].y), d.cross(p), d.y < 0 && d.scale(-1), d.normalize(), d
        }, e.default = a
    }
}, [815]);