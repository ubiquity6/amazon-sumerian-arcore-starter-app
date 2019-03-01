webpackJsonp([13], {
    450: function(t, e, i) {
        "use strict";

        function o(t, e, i, o) {
            if (1 === arguments.length && arguments[0] instanceof Object) {
                var n = arguments[0];
                t = n.width, e = n.height, i = n.tileX, o = n.tileY
            }
            this.xExtent = void 0 !== t ? .5 * t : .5, this.yExtent = void 0 !== e ? .5 * e : .5, this.tileX = i || 1, this.tileY = o || 1;
            var r = a.default.defaultMap([a.default.POSITION, a.default.NORMAL, a.default.TEXCOORD0]);
            a.default.call(this, r, 8, 12), this.rebuild()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(6),
            a = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(n);
        o.prototype = Object.create(a.default.prototype), o.prototype.constructor = o, o.prototype.rebuild = function() {
            var t = this.xExtent,
                e = this.yExtent,
                i = this.tileX,
                o = this.tileY;
            return this.getAttributeBuffer(a.default.POSITION).set([-t, -e, 0, -t, e, 0, t, e, 0, t, -e, 0, -t, -e, 0, -t, e, 0, t, e, 0, t, -e, 0]), this.getAttributeBuffer(a.default.NORMAL).set([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]), this.getAttributeBuffer(a.default.TEXCOORD0).set([0, 0, 0, o, i, o, i, 0, 0, 0, 0, o, i, o, i, 0]), this.getIndexBuffer().set([0, 3, 1, 1, 3, 2, 7, 4, 5, 7, 5, 6]), this
        }, e.default = o
    },
    451: function(t, e, i) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function n(t, e) {
            r.default.apply(this, arguments), e = e || {};
            var i = {
                width: 1,
                height: 1,
                tileX: 1,
                tileY: 1,
                preserveAspectRatio: !0
            };
            g.default.defaults(e, i), //! AT: this will mutate settings which is BAD!!!
                this.type = "QuadComponent", this.width = e.width, this.oldWidth = 0, this.height = e.height, this.oldHeight = 0, this.tileX = e.tileX, this.oldTileX = 0, this.tileY = e.tileY, this.oldTileY = 0, this.preserveAspectRatio = e.preserveAspectRatio, this.meshRendererComponent = new p.default, this.material = new y.default(m.default.uber, "QuadComponent default material"), this.meshData = new h.default(e.width, e.height, e.tileX, e.tileY), this.meshDataComponent = new l.default(this.meshData);
            var o = this.material;
            if (o.blendState.blending = "TransparencyBlending", o.renderQueue = 2e3, o.uniforms.discardThreshold = .1, this.setMaterial(o), t) {
                var n = new w.default(t);
                n.anisotropy = 16, n.wrapS = "EdgeClamp", n.wrapT = "EdgeClamp", o.setTexture("DIFFUSE_MAP", n)
            }
            this.rebuildMeshData()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = i(8),
            r = o(a),
            s = i(450),
            h = o(s),
            d = i(70),
            l = o(d),
            u = i(96),
            p = o(u),
            f = i(15),
            m = o(f),
            c = i(9),
            y = o(c),
            C = i(3),
            g = o(C),
            v = i(45),
            w = o(v);
        n.prototype = Object.create(r.default.prototype), n.prototype.constructor = n, n.prototype.attached = function(t) {
            t.setComponent(t.quadComponent.meshRendererComponent), t.setComponent(t.quadComponent.meshDataComponent)
        }, n.prototype.detached = function(t) {
            t.clearComponent("meshRendererComponent"), t.clearComponent("meshDataComponent")
        }, n.prototype.destroy = function(t) {
            this.meshData.destroy(t)
        }, n.prototype.setMaterial = function(t) {
            this.material = t, this.meshRendererComponent.materials = [t]
        }, n.prototype.rebuildMeshData = function() {
            var t = this.material,
                e = t.getTexture("DIFFUSE_MAP");
            if (e) {
                var i = e.image;
                if (i) {
                    if (this.preserveAspectRatio && i) {
                        var o = i.originalWidth || i.svgWidth || i.width,
                            n = i.originalHeight || i.svgHeight || i.height;
                        this.width = o / 100, this.height = n / 100
                    }
                    if (this.width !== this.oldWidth || this.height !== this.oldHeight || this.tileX !== this.oldTileX || this.tileY !== this.oldTileY) {
                        this.oldWidth = this.width, this.oldHeight = this.height, this.oldTileX = this.tileX, this.oldTileY = this.tileY;
                        var a = this.meshData;
                        a.xExtent = .5 * this.width, a.yExtent = .5 * this.height, a.tileX = this.tileX, a.tileY = this.tileY, a.rebuild(), a.setVertexDataUpdated()
                    }
                }
            }
        }, e.default = n
    },
    804: function(t, e, i) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(450),
            a = o(n),
            r = i(451),
            s = o(r),
            h = i(805),
            d = o(h),
            l = {
                DoubleQuad: a.default,
                QuadComponent: s.default,
                QuadComponentHandler: d.default
            };
        if ("undefined" != typeof window)
            for (var u in l) window.sumerian[u] = l[u];
        e.default = l
    },
    805: function(t, e, i) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function n() {
            r.default.apply(this, arguments), this._type = "QuadComponent"
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = i(20),
            r = o(a),
            s = i(451),
            h = o(s);
        n.prototype = Object.create(r.default.prototype), n.prototype.constructor = n, r.default._registerClass("quad", n), n.prototype._create = function() {
            return new h.default
        }, n.prototype._remove = function(t) {
            this.world && this.world.sumerianRunner && t.quadComponent.destroy(this.world.sumerianRunner.renderer.context), t.clearComponent("quadComponent")
        }, n.prototype.update = function(t, e, i) {
            var o = this;
            return r.default.prototype.update.call(this, t, e, i).then(function(n) {
                if (n) return o._load(e.materialRef, i).then(function(e) {
                    return e.cullState.enabled = !0, t.meshRendererComponent !== n.meshRendererComponent && t.setComponent(n.meshRendererComponent), t.meshDataComponent !== n.meshDataComponent && t.setComponent(n.meshDataComponent), n.setMaterial(e), n.rebuildMeshData(), n.meshDataComponent.modelBoundDirty = !0, n
                })
            })
        }, e.default = n
    }
}, [804]);