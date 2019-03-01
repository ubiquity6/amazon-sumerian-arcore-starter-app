webpackJsonp([7], {
    471: function(e, t, o) {
        "use strict";

        function r(e) {
            e = e || {}, this.friction = void 0 !== e.friction ? e.friction : .3, this.restitution = void 0 !== e.restitution ? e.restitution : 0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = r
    },
    472: function(e, t, o) {
        "use strict";

        function r() {
            var e = n.default.defaultMap([n.default.POSITION]);
            n.default.call(this, e, 24, 24), this.indexModes[0] = "Lines", this.rebuild()
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o(6),
            n = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(a);
        r.prototype = Object.create(n.default.prototype), r.prototype.constructor = r, r.prototype.buildWireframeData = function() {
            return new r
        }, r.prototype.rebuild = function() {
            var e = [],
                t = [];
            return e.push(-.5, -.5, -.5, -.5, -.5, .5, -.5, .5, .5, -.5, .5, -.5, .5, -.5, -.5, .5, -.5, .5, .5, .5, .5, .5, .5, -.5), t.push(0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7), this.getAttributeBuffer(n.default.POSITION).set(e), this.getIndexBuffer().set(t), this
        }, t.default = r
    },
    473: function(e, t, o) {
        "use strict";

        function r(e) {
            e = e || 32;
            var t = n.default.defaultMap([n.default.POSITION]);
            this.numSegments = e, n.default.call(this, t, 6 * e + 24, 4 * e + 16), this.indexModes[0] = "Lines", this.rebuild()
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o(6),
            n = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(a);
        r.prototype = Object.create(n.default.prototype), r.prototype.constructor = r, r.prototype.buildWireframeData = function() {
            return new r
        }, r.prototype.rebuild = function() {
            for (var e = [], t = [], o = this.numSegments, r = 0; r < o; r++) e.push(Math.cos(2 * Math.PI * r / o), Math.sin(2 * Math.PI * r / o), .5), t.push(r, (r + 1) % o);
            for (var r = 0; r < o; r++) e.push(Math.cos(2 * Math.PI * r / o), Math.sin(2 * Math.PI * r / o), -.5), t.push(o + r, o + (r + 1) % o);
            return e.push(Math.cos(1 * Math.PI / 2), Math.sin(1 * Math.PI / 2), -.5, Math.cos(1 * Math.PI / 2), Math.sin(1 * Math.PI / 2), .5, Math.cos(2 * Math.PI / 2), Math.sin(2 * Math.PI / 2), -.5, Math.cos(2 * Math.PI / 2), Math.sin(2 * Math.PI / 2), .5, Math.cos(3 * Math.PI / 2), Math.sin(3 * Math.PI / 2), -.5, Math.cos(3 * Math.PI / 2), Math.sin(3 * Math.PI / 2), .5, Math.cos(4 * Math.PI / 2), Math.sin(4 * Math.PI / 2), -.5, Math.cos(4 * Math.PI / 2), Math.sin(4 * Math.PI / 2), .5), t.push(2 * o + 0, 2 * o + 1, 2 * o + 2, 2 * o + 3, 2 * o + 4, 2 * o + 5, 2 * o + 6, 2 * o + 7), this.getAttributeBuffer(n.default.POSITION).set(e), this.getIndexBuffer().set(t), this
        }, t.default = r
    },
    474: function(e, t, o) {
        "use strict";

        function r() {
            var e = n.default.defaultMap([n.default.POSITION]);
            n.default.call(this, e, 10, 14), this.indexModes[0] = "Lines", this.rebuild()
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o(6),
            n = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(a);
        r.prototype = Object.create(n.default.prototype), r.prototype.constructor = r, r.prototype.buildWireframeData = function() {
            return new r
        }, r.prototype.rebuild = function() {
            var e = [],
                t = [];
            return e.push(-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0, -2, 0, 0, 2, 0, 0, 0, -2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1), t.push(0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 6, 7, 8, 9), this.getAttributeBuffer(n.default.POSITION).set(e), this.getIndexBuffer().set(t), this
        }, t.default = r
    },
    475: function(e, t, o) {
        "use strict";

        function r(e) {
            e = e || 32;
            var t = n.default.defaultMap([n.default.POSITION]);
            this.numSegments = e, n.default.call(this, t, 9 * e, 6 * e), this.indexModes[0] = "Lines", this.rebuild()
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o(6),
            n = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(a);
        r.prototype = Object.create(n.default.prototype), r.prototype.constructor = r, r.prototype.buildWireframeData = function() {
            return new r
        }, r.prototype.rebuild = function() {
            for (var e = [], t = [], o = this.numSegments, r = 0; r < o; r++) e.push(0, Math.cos(2 * Math.PI * r / o), Math.sin(2 * Math.PI * r / o)), t.push(r, (r + 1) % o);
            for (var r = 0; r < o; r++) e.push(Math.cos(2 * Math.PI * r / o), 0, Math.sin(2 * Math.PI * r / o)), t.push(o + r, o + (r + 1) % o);
            for (var r = 0; r < o; r++) e.push(Math.cos(2 * Math.PI * r / o), Math.sin(2 * Math.PI * r / o), 0), t.push(2 * o + r, 2 * o + (r + 1) % o);
            return this.getAttributeBuffer(n.default.POSITION).set(e), this.getIndexBuffer().set(t), this
        }, t.default = r
    },
    476: function(e, t, o) {
        "use strict";

        function r(e) {
            e = e || {}, this._objects = [], this._init = e.init || function() {}, this._create = e.create || function() {}, this._destroy = e.destroy || function() {}
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), r.prototype.resize = function(e) {
            for (var t = this._objects; t.length > e;) this._destroy(t.pop());
            for (; t.length < e;) t.push(this._create());
            return this
        }, r.prototype.get = function() {
            var e = this._objects,
                t = e.length ? e.pop() : this._create();
            return this._init.apply(t, arguments), t
        }, r.prototype.release = function(e) {
            return this._destroy(e), this._objects.push(e), this
        }, t.default = r
    },
    854: function(e, t, o) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = o(127),
            n = r(a),
            i = o(82),
            s = r(i),
            u = o(163),
            l = r(u),
            d = o(161),
            f = r(d),
            c = o(162),
            p = r(c),
            h = o(128),
            y = r(h),
            m = o(353),
            M = r(m),
            _ = o(350),
            P = r(_),
            g = o(226),
            b = r(g),
            I = o(224),
            C = r(I),
            O = o(855),
            v = r(O),
            w = o(856),
            D = r(w),
            S = o(351),
            T = r(S),
            R = o(352),
            j = r(R),
            E = o(225),
            B = r(E),
            x = o(471),
            z = r(x),
            N = o(222),
            A = r(N),
            Z = o(472),
            L = r(Z),
            W = o(473),
            F = r(W),
            X = o(474),
            Y = r(X),
            k = o(475),
            J = r(k),
            V = o(349),
            H = r(V),
            K = o(857),
            q = r(K),
            G = o(858),
            Q = r(G),
            U = o(348),
            $ = r(U),
            ee = o(476),
            te = r(ee),
            oe = {
                BoxCollider: n.default,
                Collider: s.default,
                CylinderCollider: l.default,
                MeshCollider: f.default,
                PlaneCollider: p.default,
                SphereCollider: y.default,
                AbstractColliderComponent: M.default,
                AbstractRigidBodyComponent: P.default,
                ColliderComponent: b.default,
                RigidBodyComponent: C.default,
                ColliderComponentHandler: v.default,
                RigidBodyComponentHandler: D.default,
                BallJoint: T.default,
                HingeJoint: j.default,
                PhysicsJoint: B.default,
                PhysicsMaterial: z.default,
                RaycastResult: A.default,
                PhysicsBoxDebugShape: L.default,
                PhysicsCylinderDebugShape: F.default,
                PhysicsPlaneDebugShape: Y.default,
                PhysicsSphereDebugShape: J.default,
                AbstractPhysicsSystem: H.default,
                ColliderSystem: q.default,
                PhysicsDebugRenderSystem: Q.default,
                PhysicsSystem: $.default,
                Pool: te.default
            };
        if ("undefined" != typeof window)
            for (var re in oe) window.sumerian[re] = oe[re];
        t.default = oe
    },
    855: function(e, t, o) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            i.default.apply(this, arguments), this._type = "ColliderComponent"
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = o(20),
            i = r(n),
            s = o(226),
            u = r(s),
            l = o(3),
            d = r(l),
            f = o(128),
            c = r(f),
            p = o(127),
            h = r(p),
            y = o(162),
            m = r(y),
            M = o(163),
            _ = r(M),
            P = o(471),
            g = r(P);
        a.prototype = Object.create(i.default.prototype), a.prototype.constructor = a, i.default._registerClass("collider", a), a.prototype._prepare = function(e) {
            return d.default.defaults(e, {
                shape: "Box",
                shapeOptions: {
                    halfExtents: [1, 1, 1],
                    radius: .5,
                    height: 1
                },
                isTrigger: !1,
                friction: .3,
                restitution: 0
            })
        }, a.prototype._create = function() {
            return new u.default({
                material: new g.default
            })
        }, a.prototype._remove = function(e) {
            e.clearComponent("ColliderComponent")
        }, a.prototype.update = function(e, t, o) {
            return i.default.prototype.update.call(this, e, t, o).then(function(e) {
                if (e) {
                    switch (t.shape) {
                        default:
                            case "Box":
                            e.collider = new h.default(t.shapeOptions),
                        e.worldCollider = new h.default;
                        break;
                        case "Sphere":
                                e.collider = new c.default(t.shapeOptions),
                            e.worldCollider = new c.default;
                            break;
                        case "Plane":
                                e.collider = new m.default,
                            e.worldCollider = new m.default;
                            break;
                        case "Cylinder":
                                e.collider = new _.default(t.shapeOptions),
                            e.worldCollider = new _.default
                    }
                    return e.material.friction = t.friction, e.material.restitution = t.restitution, e.isTrigger = t.isTrigger, e
                }
            })
        }, t.default = a
    },
    856: function(e, t, o) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            i.default.apply(this, arguments), this._type = "RigidBodyComponent"
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = o(20),
            i = r(n),
            s = o(224),
            u = r(s),
            l = o(3),
            d = r(l),
            f = o(0),
            c = r(f);
        a.prototype = Object.create(i.default.prototype), a.prototype.constructor = a, i.default._registerClass("rigidBody", a), a.prototype._prepare = function(e) {
            return d.default.defaults(e, {
                mass: 1,
                isKinematic: !1,
                velocity: [0, 0, 0],
                angularVelocity: [0, 0, 0],
                linearDrag: 0,
                angularDrag: 0,
                freezePositionX: !1,
                freezePositionY: !1,
                freezePositionZ: !1,
                freezeRotationX: !1,
                freezeRotationY: !1,
                freezeRotationZ: !1
            })
        }, a.prototype._create = function() {
            return new u.default
        }, a.prototype._remove = function(e) {
            e.clearComponent("RigidBodyComponent")
        }, a.prototype.update = function(e, t, o) {
            return i.default.prototype.update.call(this, e, t, o).then(function(e) {
                if (e) return e.mass = t.mass, e.isKinematic = t.isKinematic, e.setVelocity(new c.default(t.velocity)), e.setAngularVelocity(new c.default(t.angularVelocity)), e.linearDamping = t.linearDrag, e.angularDamping = t.angularDrag, e.constraints = (t.freezePositionX ? u.default.FREEZE_POSITION_X : 0) | (t.freezePositionY ? u.default.FREEZE_POSITION_Y : 0) | (t.freezePositionZ ? u.default.FREEZE_POSITION_Z : 0) | (t.freezeRotationX ? u.default.FREEZE_ROTATION_X : 0) | (t.freezeRotationY ? u.default.FREEZE_ROTATION_Y : 0) | (t.freezeRotationZ ? u.default.FREEZE_ROTATION_Z : 0), e
            })
        }, t.default = a
    },
    857: function(e, t, o) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            i.default.call(this, "ColliderSystem", ["ColliderComponent", "TransformComponent"]), this.priority = 1
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = o(7),
            i = r(n),
            s = o(5),
            u = r(s);
        a.prototype = Object.create(i.default.prototype), a.prototype.constructor = a, a.prototype.process = function(e) {
            e.forEach(function(e) {
                e.colliderComponent.cannonBody && e.colliderComponent.syncTransform()
            })
        }, a.prototype.inserted = function(e) {
            u.default.emit("sumerian.collider.inserted", {
                entity: e
            })
        }, a.prototype.deleted = function(e) {
            u.default.emit("sumerian.collider.deleted", {
                entity: e
            })
        }, a.prototype.removedComponent = function(e, t) {
            u.default.emit("sumerian.collider.deletedComponent", {
                entity: e,
                component: t
            })
        }, t.default = a
    },
    858: function(e, t, o) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function a() {
            var e = this;
            u.default.call(this, "PhysicsDebugRenderSystem", ["TransformComponent"]), this.priority = 3, this.renderList = [], this.camera = null, d.default.addListener("sumerian.setCurrentCamera", function(t) {
                e.camera = t.camera
            }), this.renderAll = !0, this.selection = new i.default, this.sphereMeshData = new m.default(32), this.boxMeshData = new _.default, this.cylinderMeshData = new h.default(32), this.planeMeshData = new c.default, this.material = new E.default(x.default.simpleColored), this.material.uniforms.color = [0, 1, 0], this.material.wireframe = !0, this.renderablePool = new N.default({
                create: function() {
                    return {
                        meshData: null,
                        transform: new R.default,
                        materials: []
                    }
                },
                init: function(e, t) {
                    this.meshData = e, this.materials[0] = t
                },
                destroy: function(e) {
                    e.meshData = null, e.materials.length = 0
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = o(63),
            i = r(n),
            s = o(7),
            u = r(s),
            l = o(5),
            d = r(l),
            f = o(474),
            c = r(f),
            p = o(473),
            h = r(p),
            y = o(475),
            m = r(y),
            M = o(472),
            _ = r(M),
            P = o(128),
            g = r(P),
            b = o(127),
            I = r(b),
            C = o(163),
            O = r(C),
            v = o(162),
            w = r(v),
            D = o(161),
            S = r(D),
            T = o(10),
            R = r(T),
            j = o(9),
            E = r(j),
            B = o(15),
            x = r(B),
            z = o(476),
            N = r(z);
        a.prototype = Object.create(u.default.prototype), a.prototype.constructor = a, a.prototype.process = function(e) {
            if (this.clear(), !this.passive)
                for (var t = 0, o = e.length; t !== o; t++) {
                    var r = e[t];
                    if ((this.renderAll || this.selection.contains(r)) && r.colliderComponent) {
                        r.colliderComponent.updateWorldCollider();
                        var a = r.colliderComponent.worldCollider,
                            n = this.getMeshData(a),
                            i = this.renderablePool.get(n, this.material);
                        this.getWorldTransform(r, a, i.transform), i.transform.update(), this.renderList.push(i)
                    }
                }
        }, a.prototype.getWorldTransform = function(e, t, o) {
            if (o.copy(e.transformComponent.sync().worldTransform), t instanceof g.default) {
                var r = t.radius;
                o.scale.set(r, r, r)
            } else t instanceof I.default ? o.scale.copy(t.halfExtents).scale(2) : t instanceof O.default ? o.scale.set(t.radius, t.radius, t.height) : t instanceof w.default ? o.scale.set(1, 1, 1) : t instanceof S.default && o.scale.set(t.scale)
        }, a.prototype.getMeshData = function(e) {
            var t = void 0;
            return e instanceof g.default ? t = this.sphereMeshData : e instanceof I.default ? t = this.boxMeshData : e instanceof O.default ? t = this.cylinderMeshData : e instanceof w.default ? t = this.planeMeshData : e instanceof S.default && (t = e.meshData), t
        }, a.prototype.render = function(e) {
            e.checkResize(this.camera), this.camera && e.render(this.renderList, null, this.camera, null, null, !1)
        }, a.prototype.clear = function() {
            for (var e = 0, t = this.renderList.length; e !== t; e++) this.renderablePool.release(this.renderList[e]);
            this.renderList.length = 0
        }, a.prototype.cleanup = function() {
            this.clear()
        }, t.default = a
    }
}, [854]);