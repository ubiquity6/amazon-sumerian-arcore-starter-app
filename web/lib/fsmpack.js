webpackJsonp([0], {
    2: function(t, e, n) {
        "use strict";

        function o(t, e) {
            this.id = t, this.configure(e || {})
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(47),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype.configure = function(t) {
            r.default.setParameters.call(this, t, this.constructor.external.parameters), r.default.setTransitions.call(this, t, this.constructor.external.transitions)
        }, o.prototype.enter = function() {}, o.prototype.update = function() {}, o.prototype.exit = function() {}, o.prototype.ready = function() {}, o.prototype.cleanup = function() {}, e.default = o
    },
    376: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(25),
            a = o(r),
            s = n(3),
            u = o(s),
            c = n(377),
            p = o(c),
            l = n(378),
            d = o(l),
            f = n(379),
            y = o(f),
            m = n(12),
            h = o(m),
            v = n(17),
            g = o(v),
            _ = n(76),
            b = o(_),
            k = h.default.Promise;
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, a.default._registerClass("machine", i), i.prototype._create = function() {
            return new d.default
        }, i.prototype._prepare = function(t) {
            u.default.defaults(t, {
                maxLoopDepth: 100,
                asyncMode: !0
            })
        }, i.prototype._update = function(t, e, n) {
            var o = this;
            return a.default.prototype._update.call(this, t, e, n).then(function(i) {
                if (i) {
                    i.id = t, i.name = e.name, i.maxLoopDepth = e.maxLoopDepth, i.asyncMode = e.asyncMode;
                    for (var r in i._states) e.states[r] || i.removeState(r);
                    var a = [];
                    for (var r in e.states) a.push(o._updateState(i, e.states[r], n));
                    return h.default.all(a).then(function() {
                        return i.setInitialState(e.initialState), i
                    })
                }
            })
        }, i.prototype._updateActions = function(t, e, n) {
            for (var o = this, i = 0; i < t._actions.length; i++) {
                var r = t._actions[i];
                e.actions && e.actions[r.id] || (t.removeAction(r), i--)
            }
            var a = u.default.map(e.actions, function(e) {
                return new k(function(i) {
                    var r = !0,
                        a = t.getAction(e.id);
                    if (a) a.configure(e.options);
                    else {
                        var s = y.default.actionForType(e.type);
                        a = new s(e.id, e.options), a.onCreate && a.onCreate(t.proxy)
                    }
                    if ("ExecuteScript" === e.type) {
                        var u = e.options && e.options.scriptInstance,
                            c = u && u.scriptRef;
                        a.script && a.script.id !== c && delete a.script, c && (a.script ? b.default.update(a.script, u, o.loadObject, n).then(function() {
                            return i(a)
                        }) : b.default.load(u, o.loadObject, n).then(function(t) {
                            a.script = t, b.default.update(t, u, o.loadObject, n).then(function() {
                                return i(a)
                            })
                        }), r = !1)
                    }
                    r && i(a)
                })
            }, null, "sortValue");
            return h.default.all(a).then(function(e) {
                t._actions = e
            })
        }, i.prototype._updateTransitions = function(t, e) {
            t._transitions = {};
            for (var n in e.transitions) {
                var o = e.transitions[n];
                t.setTransition(o.id, o.targetState)
            }
            return g.default.resolve()
        }, i.prototype._updateChildMachines = function(t, e) {
            for (var n = 0; n < t._machines; n++) {
                var o = t._machines[n];
                e.childMachines[o.id] || (t.removeMachine(o), n--)
            }
            var i = [];
            for (var r in e.childMachines) i.push(this._load(e.childMachines[r].machineRef, options));
            return h.default.all(i).then(function(e) {
                for (var n = 0; n < e; n++) t.addMachine(e[n])
            })
        }, i.prototype._updateState = function(t, e, n) {
            var o = void 0;
            t._states && t._states[e.id] ? o = t._states[e.id] : (o = new p.default(e.id), t.addState(o)), o.name = e.name;
            var i = [];
            return i.push(this._updateActions(o, e, n)), i.push(this._updateTransitions(o, e)), i.push(this._updateChildMachines(o, e)), h.default.all(i).then(function() {
                return o
            })
        }, e.default = i
    },
    377: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t) {
            this.uuid = t, this._fsm = null, this.parent = null, this._actions = [], this._machines = [], this._transitions = {}, this.vars = {}, this.depth = 0, this._scriptContext = null, this.proxy = {
                getInputState: function(t) {
                    return this._fsm.system.getInputState(t)
                }.bind(this),
                getTpf: function() {
                    return this._fsm.entity._world.tpf
                }.bind(this),
                getWorld: function() {
                    return this._fsm.entity._world
                }.bind(this),
                getTime: function() {
                    return this._fsm.system.time
                }.bind(this),
                getState: function() {
                    return this
                }.bind(this),
                getFsm: function() {
                    return this._fsm
                }.bind(this),
                getOwnerEntity: function() {
                    return this._fsm && this._fsm.entity
                }.bind(this),
                getEntityById: function(t) {
                    return this._fsm.entity._world.by.id(t).first()
                }.bind(this),
                send: function(t) {
                    t && "string" == typeof t && this._transitions[t] && this.requestTransition(this._transitions[t])
                }.bind(this),
                addListener: function(t, e) {
                    this._fsm._bus.addListener(t, e)
                }.bind(this),
                removeListener: function(t, e) {
                    this._fsm._bus.removeListener(t, e)
                }.bind(this),
                defineVariable: function(t, e) {
                    this.vars[t] = e
                }.bind(this),
                removeVariable: function(t) {
                    delete this.vars[t]
                }.bind(this),
                getVariable: function(t) {
                    return void 0 !== this.vars[t] ? this.vars[t] : this._fsm.getVariable(t)
                }.bind(this),
                applyOnVariable: function(t, e) {
                    void 0 !== this.vars[t] ? this.vars[t] = e(this.vars[t]) : this._fsm.applyOnVariable(t, e)
                }.bind(this),
                getEvalProxy: function() {
                    return this._fsm.system.evalProxy
                }.bind(this)
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(64),
            a = o(r),
            s = n(5),
            u = o(s);
        i.prototype.setRefs = function(t) {
            this._fsm = t;
            for (var e = 0; e < this._machines.length; e++) {
                this._machines[e].setRefs(t)
            }
        }, i.prototype.resetDepth = function() {
            this.depth = 0
        }, i.prototype.isCurrentState = function() {
            return this === this.parent.getCurrentState()
        }, i.prototype.requestTransition = function(t) {
            if (this.isCurrentState())
                if (this.parent.asyncMode) this.transitionTarget = t;
                else {
                    this.depth++;
                    var e = this._fsm;
                    if (this.depth > this.parent.maxLoopDepth) {
                        var n = {
                            entityId: e && e.entity ? e.entity.id : "",
                            entityName: e && e.entity ? e.entity.name : "",
                            machineName: this.parent ? this.parent.name : "",
                            stateId: this.uuid,
                            stateName: this.name
                        };
                        return n.error = "Exceeded max loop depth (" + this.parent.maxLoopDepth + ') in "' + [n.entityName, n.machineName, n.stateName].join('" / "') + '"', console.warn(n.error), void u.default.emit("sumerian.fsm.error", n)
                    }
                    t && this.parent.contains(t) && (this.parent.currentState.kill(), this.parent.setState(this.parent._states[t]))
                }
        }, i.prototype.setTransition = function(t, e) {
            this._transitions[t] = e
        }, i.prototype.clearTransition = function(t) {
            delete this._transitions[t]
        }, i.prototype.enter = function() {
            u.default.emit("sumerian.fsm.enter", {
                entityId: this._fsm && this._fsm.entity ? this._fsm.entity.id : "",
                machineName: this.parent ? this.parent.name : "",
                stateId: this.uuid,
                stateName: this.name
            });
            for (var t = this.depth, e = 0; e < this._actions.length; e++)
                if (this._actions[e].enter(this.proxy), this.depth > t) return;
            for (var e = 0; e < this._machines.length; e++) this._machines[e].enter()
        }, i.prototype.update = function() {
            var t = this.depth;
            if (this.parent.asyncMode) {
                for (var e = 0; e < this._actions.length; e++)
                    if (this._actions[e].update(this.proxy), this.transitionTarget) {
                        var n = this.transitionTarget;
                        return this.transitionTarget = null, n
                    }
                for (var o = void 0, e = 0; e < this._machines.length; e++) {
                    if (o = this._machines[e].update()) return o
                }
            } else {
                for (var e = 0; e < this._actions.length; e++)
                    if (this._actions[e].update(this.proxy), this.depth > t) return;
                for (var e = 0; e < this._machines.length; e++) this._machines[e].update()
            }
        }, i.prototype.kill = function() {
            u.default.emit("sumerian.fsm.exit", {
                entityId: this._fsm && this._fsm.entity ? this._fsm.entity.id : "",
                machineName: this.parent ? this.parent.name : "",
                stateId: this.uuid,
                stateName: this.name
            });
            for (var t = 0; t < this._machines.length; t++) this._machines[t].kill();
            for (var t = 0; t < this._actions.length; t++) this._actions[t].exit(this.proxy)
        }, i.prototype.reset = function() {
            for (var t = 0; t < this._machines.length; t++) this._machines[t].reset()
        }, i.prototype.ready = function() {
            for (var t = 0; t < this._machines.length; t++) this._machines[t].ready();
            for (var t = 0; t < this._actions.length; t++) this._actions[t].ready(this.proxy)
        }, i.prototype.cleanup = function() {
            for (var t = 0; t < this._machines.length; t++) this._machines[t].cleanup();
            for (var t = 0; t < this._actions.length; t++) this._actions[t].cleanup(this.proxy)
        }, i.prototype.getAction = function(t) {
            if (this._actions)
                for (var e = 0; e < this._actions.length; e++) {
                    var n = this._actions[e];
                    if (void 0 !== t && n.id === t) return n
                }
        }, i.prototype.addAction = function(t) {
            this._actions[t.id] || (t.onCreate && t.onCreate(this.proxy), this._actions.push(t))
        }, i.prototype.recursiveRemove = function() {
            this.removeAllActions();
            for (var t = 0; t < this._machines.length; t++) this._machines[t].recursiveRemove();
            this._machines = []
        }, i.prototype.removeAllActions = function() {
            for (var t = 0; t < this._actions.length; t++) {
                var e = this._actions[t];
                e.onDestroy && e.onDestroy(this.proxy)
            }
            this._actions = []
        }, i.prototype.removeAction = function(t) {
            t.onDestroy && t.onDestroy(this.proxy), a.default.remove(this._actions, t)
        }, i.prototype.addMachine = function(t) {
            -1 === this._machines.indexOf(t) && (t._fsm = this._fsm, t.parent = this, this._machines.push(t))
        }, i.prototype.removeMachine = function(t) {
            t.recursiveRemove(), a.default.remove(this._machines, t)
        }, i.prototype.getScriptContext = function() {
            return this._scriptContext || (this._scriptContext = {
                stateData: {}
            }), this._scriptContext
        }, e.default = i
    },
    378: function(t, e, n) {
        "use strict";

        function o(t, e) {
            this.id = t, this.name = e, this._states = {}, this._fsm = null, this.initialState = "entry", this.currentState = null, this.parent = null, this.maxLoopDepth = 100, this.asyncMode = !1, this._scriptContext = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), o.prototype.setRefs = function(t) {
            this._fsm = t;
            for (var e = Object.keys(this._states), n = 0; n < e.length; n++) {
                this._states[e[n]].setRefs(t)
            }
        }, o.prototype.contains = function(t) {
            return !!this._states[t]
        }, o.prototype.setState = function(t) {
            this.currentState = t, this.currentState.reset(), this.currentState.enter()
        }, o.prototype.reset = function() {
            this.currentState = this._states[this.initialState], this.currentState && this.currentState.reset()
        }, o.prototype.ready = function() {
            for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
                this._states[t[e]].ready()
            }
        }, o.prototype.cleanup = function() {
            for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
                this._states[t[e]].cleanup()
            }
        }, o.prototype.enter = function() {
            for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
                this._states[t[e]].resetDepth()
            }
            this.currentState && this.currentState.enter()
        }, o.prototype.update = function() {
            for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
                this._states[t[e]].resetDepth()
            }
            if (this.currentState) {
                if (this.asyncMode) {
                    var n = this.currentState.update();
                    return n && this.contains(n) && (this.currentState.kill(), this.setState(this._states[n])), n
                }
                this.currentState.update()
            }
        }, o.prototype.kill = function() {
            this.currentState && this.currentState.kill()
        }, o.prototype.getCurrentState = function() {
            return this.currentState
        }, o.prototype.addState = function(t) {
            0 === Object.keys(this._states).length && (this.initialState = t.uuid), t.parent = this, t._fsm = this._fsm, this._states[t.uuid] = t
        }, o.prototype.removeFromParent = function() {
            this.parent && this.parent.removeMachine(this)
        }, o.prototype.recursiveRemove = function() {
            for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
                this._states[t[e]].recursiveRemove()
            }
            this._states = {}
        }, o.prototype.removeState = function(t) {
            if (this._states[t]) {
                if (this.initialState === t) throw new Error("Cannot remove initial state");
                this.currentState === this._states[t] && this.reset(), delete this._states[t]
            }
        }, o.prototype.setInitialState = function(t) {
            this.initialState = t
        }, o.prototype.getScriptContext = function() {
            return this._scriptContext || (this._scriptContext = {
                behaviorData: {}
            }), this._scriptContext
        }, e.default = o
    },
    379: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(380),
            r = o(i),
            a = n(746),
            s = o(a),
            u = n(381),
            c = o(u),
            p = n(747),
            l = o(p),
            d = n(382),
            f = o(d),
            y = n(383),
            m = o(y),
            h = n(748),
            v = o(h),
            g = n(749),
            _ = o(g),
            b = n(384),
            k = o(b),
            O = n(386),
            w = o(O),
            S = n(387),
            C = o(S),
            T = n(388),
            E = o(T),
            M = n(389),
            x = o(M),
            A = n(390),
            P = o(A),
            L = n(750),
            j = o(L),
            R = n(391),
            F = o(R),
            I = n(392),
            D = o(I),
            B = n(751),
            V = o(B),
            U = n(393),
            q = o(U),
            X = n(394),
            Y = o(X),
            H = n(752),
            W = o(H),
            N = n(753),
            K = o(N),
            Z = n(395),
            Q = o(Z),
            z = n(396),
            G = o(z),
            J = n(397),
            $ = o(J),
            tt = n(398),
            et = o(tt),
            nt = n(399),
            ot = o(nt),
            it = n(400),
            rt = o(it),
            at = n(401),
            st = o(at),
            ut = n(402),
            ct = o(ut),
            pt = n(403),
            lt = o(pt),
            dt = n(404),
            ft = o(dt),
            yt = n(405),
            mt = o(yt),
            ht = n(754),
            vt = o(ht),
            gt = n(406),
            _t = o(gt),
            bt = n(407),
            kt = o(bt),
            Ot = n(755),
            wt = o(Ot),
            St = n(756),
            Ct = o(St),
            Tt = n(408),
            Et = o(Tt),
            Mt = n(757),
            xt = o(Mt),
            At = n(758),
            Pt = o(At),
            Lt = n(759),
            jt = o(Lt),
            Rt = n(409),
            Ft = o(Rt),
            It = n(410),
            Dt = o(It),
            Bt = n(760),
            Vt = o(Bt),
            Ut = n(761),
            qt = o(Ut),
            Xt = n(411),
            Yt = o(Xt),
            Ht = n(412),
            Wt = o(Ht),
            Nt = n(413),
            Kt = o(Nt),
            Zt = n(414),
            Qt = o(Zt),
            zt = n(415),
            Gt = o(zt),
            Jt = n(416),
            $t = o(Jt),
            te = n(417),
            ee = o(te),
            ne = n(418),
            oe = o(ne),
            ie = n(762),
            re = o(ie),
            ae = n(763),
            se = o(ae),
            ue = n(419),
            ce = o(ue),
            pe = n(764),
            le = o(pe),
            de = n(420),
            fe = o(de),
            ye = n(421),
            me = o(ye),
            he = n(765),
            ve = o(he),
            ge = n(766),
            _e = o(ge),
            be = n(767),
            ke = o(be),
            Oe = n(768),
            we = o(Oe),
            Se = n(422),
            Ce = o(Se),
            Te = n(769),
            Ee = o(Te),
            Me = n(770),
            xe = o(Me),
            Ae = n(771),
            Pe = o(Ae),
            Le = n(772),
            je = o(Le),
            Re = n(773),
            Fe = o(Re),
            Ie = n(774),
            De = o(Ie),
            Be = n(423),
            Ve = o(Be),
            Ue = n(424),
            qe = o(Ue),
            Xe = n(425),
            Ye = o(Xe),
            He = n(426),
            We = o(He),
            Ne = n(427),
            Ke = o(Ne),
            Ze = n(775),
            Qe = o(Ze),
            ze = n(776),
            Ge = o(ze),
            Je = n(777),
            $e = o(Je),
            tn = n(778),
            en = o(tn),
            nn = n(779),
            on = o(nn),
            rn = n(780),
            an = o(rn),
            sn = n(781),
            un = o(sn),
            cn = n(782),
            pn = o(cn),
            ln = n(428),
            dn = o(ln),
            fn = n(429),
            yn = o(fn),
            mn = n(783),
            hn = o(mn),
            vn = n(784),
            gn = o(vn),
            _n = n(785),
            bn = o(_n),
            kn = n(431),
            On = o(kn),
            wn = n(432),
            Sn = o(wn),
            Cn = n(433),
            Tn = o(Cn),
            En = n(434),
            Mn = o(En),
            xn = n(435),
            An = o(xn),
            Pn = n(436),
            Ln = o(Pn),
            jn = n(786),
            Rn = o(jn),
            Fn = n(437),
            In = o(Fn),
            Dn = n(438),
            Bn = o(Dn),
            Vn = n(439),
            Un = o(Vn),
            qn = n(440),
            Xn = o(qn),
            Yn = n(441),
            Hn = o(Yn),
            Wn = n(787),
            Nn = o(Wn),
            Kn = n(442),
            Zn = o(Kn),
            Qn = n(443),
            zn = o(Qn),
            Gn = {},
            Jn = function() {},
            $n = ["Eval", "HTMLPick", "Remove", "Collides", "Tag"];
        Jn.register = function(t, e) {
            Gn[t] = e
        }, Jn.actionForType = function(t) {
            return Gn[t]
        }, Jn.allActions = function() {
            for (var t = {}, e = Object.keys(Gn), n = 0; n < e.length; n++) {
                var o = e[n]; - 1 === $n.indexOf(o) && (t[o] = Gn[o])
            }
            return t
        }, Jn.allActionsArray = function() {
            for (var t = [], e = Jn.allActions(), n = Object.keys(e), o = 0; o < n.length; o++) {
                var i = n[o];
                t.push(e[i])
            }
            return t
        };
        var to = {
            AddLightAction: r.default,
            ApplyForceAction: s.default,
            ApplyImpulseAction: c.default,
            ApplyTorqueAction: l.default,
            ArrowsAction: f.default,
            AwsSdkReadyAction: m.default,
            ChangeSpeechVolumeAction: v.default,
            ClickAction: _.default,
            CollidesAction: k.default,
            CompareCounterAction: w.default,
            CompareCountersAction: C.default,
            CompareDistanceAction: E.default,
            CopyJointTransformAction: x.default,
            DollyZoomAction: P.default,
            DomEventAction: j.default,
            EmitAction: F.default,
            EvalAction: D.default,
            FireAction: q.default,
            FaceCurrentCameraAction: V.default,
            HideAction: Y.default,
            HoverEnterAction: W.default,
            HoverExitAction: K.default,
            HtmlAction: Q.default,
            InBoxAction: G.default,
            IncrementCounterAction: $.default,
            InFrustumAction: et.default,
            KeyDownAction: ot.default,
            KeyPressedAction: rt.default,
            KeyUpAction: st.default,
            LogMessageAction: ct.default,
            LookAtAction: lt.default,
            MouseDownAction: ft.default,
            MouseMoveAction: mt.default,
            MousePressedAction: vt.default,
            MouseUpAction: _t.default,
            MoveAction: kt.default,
            MuteAction: wt.default,
            NextFrameAction: Ct.default,
            PauseAnimationAction: Et.default,
            PauseParticleSystemAction: xt.default,
            PauseSoundAction: Pt.default,
            PauseTimelineAction: jt.default,
            PickAction: Ft.default,
            PickAndExitAction: Dt.default,
            PlayEmoteAction: Vt.default,
            PlaySoundAction: qt.default,
            RandomTransitionAction: Yt.default,
            RemoveAction: Wt.default,
            RemoveLightAction: Kt.default,
            RemoveParticlesAction: Qt.default,
            ResumeAnimationAction: Gt.default,
            RotateAction: $t.default,
            ScaleAction: ee.default,
            ScriptAction: oe.default,
            ScriptConditionAction: re.default,
            ScriptExpressionAction: se.default,
            SetAnimationAction: ce.default,
            SetAnimationOffsetAction: le.default,
            SetClearColorAction: fe.default,
            SetCounterAction: me.default,
            SetHtmlTextAction: ve.default,
            SetLightPropertiesAction: _e.default,
            SetMaterialColorAction: ke.default,
            SetPointOfInterestTargetAction: we.default,
            SetRenderTargetAction: Ce.default,
            SetRigidBodyAngularVelocityAction: Ee.default,
            SetRigidBodyPositionAction: xe.default,
            SetRigidBodyRotationAction: Pe.default,
            SetRigidBodyVelocityAction: je.default,
            SetTimelineTimeAction: Fe.default,
            SetTimeScaleAction: De.default,
            ShakeAction: Ve.default,
            ShowAction: qe.default,
            SmokeAction: Ye.default,
            SoundFadeInAction: We.default,
            SoundFadeOutAction: Ke.default,
            SpriteAnimationAction: Qe.default,
            StartParticleSystemAction: Ge.default,
            StartSpeechAction: $e.default,
            StartTimelineAction: en.default,
            StopParticleSystemAction: on.default,
            StopSoundAction: an.default,
            StopSpeechAction: un.default,
            StopTimelineAction: pn.default,
            SwitchCameraAction: dn.default,
            TagAction: yn.default,
            ToggleFullscreenAction: hn.default,
            ToggleMuteAction: gn.default,
            TogglePostFxAction: bn.default,
            TransitionAction: On.default,
            TransitionOnMessageAction: Sn.default,
            TriggerEnterAction: Tn.default,
            TriggerLeaveAction: Mn.default,
            TweenLightColorAction: An.default,
            TweenLookAtAction: Ln.default,
            TweenMaterialColorAction: Rn.default,
            TweenMoveAction: In.default,
            TweenOpacityAction: Bn.default,
            TweenRotationAction: Un.default,
            TweenScaleAction: Xn.default,
            TweenTextureOffsetAction: Hn.default,
            UnmuteAction: Nn.default,
            WaitAction: Zn.default,
            WasdAction: zn.default
        };
        for (var eo in to) {
            var no = to[eo];
            Jn.register(no.external.key, no)
        }
        e.default = Jn
    },
    380: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(123),
            u = o(s),
            c = n(110),
            p = o(c),
            l = n(81),
            d = o(l),
            f = n(93),
            y = o(f);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Add Light",
            name: "Add Light",
            description: "Adds a point light to the entity.",
            type: "light",
            parameters: [{
                name: "Color",
                key: "color",
                type: "vec3",
                control: "color",
                description: "Color of the light.",
                default: [1, 1, 1]
            }, {
                name: "Light type",
                key: "type",
                type: "string",
                control: "dropdown",
                description: "Light type.",
                default: "Point",
                options: ["Point", "Directional", "Spot"]
            }, {
                name: "Range",
                key: "range",
                type: "float",
                control: "slider",
                min: 0,
                max: 1e3,
                description: "Range of the light.",
                default: 200
            }, {
                name: "Cone Angle",
                key: "angle",
                type: "float",
                control: "slider",
                min: 1,
                max: 170,
                description: "Cone angle (applies only to spot lights).",
                default: 30
            }, {
                name: "Penumbra",
                key: "penumbra",
                type: "float",
                control: "slider",
                min: 0,
                max: 170,
                description: "Penumbra (applies only to spot lights).",
                default: 30
            }],
            transitions: []
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            if (e.lightComponent) return void(this._untouched = !0);
            var n = void 0;
            "Directional" === this.type ? n = new d.default : "Spot" === this.type ? (n = new y.default, n.range = +this.range, n.angle = +this.angle, n.penumbra = +this.penumbra) : (n = new p.default, n.range = +this.range), n.color.setDirect(this.color[0], this.color[1], this.color[2]), e.setComponent(new u.default(n))
        }, i.prototype.cleanup = function(t) {
            if (!this._untouched) {
                var e = t.getOwnerEntity();
                e && e.clearComponent("LightComponent")
            }
        }, e.default = i
    },
    381: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "ApplyImpulse",
            name: "Apply impulse on rigid body",
            type: "physics",
            description: "Apply an impulse to the attached rigid body.",
            canTransition: !1,
            parameters: [{
                name: "Impulse",
                key: "impulse",
                type: "position",
                description: "Impulse to apply to the body.",
                default: [0, 0, 0]
            }, {
                name: "Apply point",
                key: "point",
                type: "position",
                description: "Where on the body to apply the impulse, relative to the center of mass.",
                default: [0, 0, 0]
            }, {
                name: "Space",
                key: "space",
                type: "string",
                control: "dropdown",
                description: "The space where the impulse and apply point are defined.",
                default: "World",
                options: ["World", "Local"]
            }],
            transitions: []
        };
        var c = new u.default,
            p = new u.default;
        i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.rigidBodyComponent && (c.setArray(this.impulse), p.setArray(this.point), "World" === this.space ? e.rigidBodyComponent.applyImpulse(c, p) : e.rigidBodyComponent.applyImpulseLocal(c, p))
        }, e.default = i
    },
    382: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i),
            a = {
                38: "up",
                37: "left",
                40: "down",
                39: "right"
            };
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.prototype.configure = function(t) {
            this.targets = t.transitions
        }, o.external = {
            key: "Arrow Keys Listener",
            name: "Arrow Keys",
            type: "controls",
            description: "Transitions to other states when arrow keys are pressed (keydown).",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "up",
                description: "On key up pressed."
            }, {
                key: "left",
                description: "On key left pressed."
            }, {
                key: "down",
                description: "On key down pressed."
            }, {
                key: "right",
                description: "On key right pressed."
            }]
        };
        var s = {
            up: "On key UP",
            left: "On key LEFT",
            down: "On key DOWN",
            right: "On key RIGHT"
        };
        o.getTransitionLabel = function(t) {
            return s[t]
        }, o.prototype.enter = function(t) {
            this.eventListener = function(e) {
                var n = a[e.which],
                    o = this.targets[n];
                o && t.send(o)
            }.bind(this), document.addEventListener("keydown", this.eventListener)
        }, o.prototype.exit = function() {
            document.removeEventListener("keydown", this.eventListener)
        }, e.default = o
    },
    383: function(t, e, n) {
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
            u = n(2),
            c = o(u),
            p = n(5),
            l = o(p),
            d = n(212),
            f = o(d),
            y = function(t) {
                function e() {
                    return i(this, e), r(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return a(e, t), s(e, [{
                    key: "enter",
                    value: function(t) {
                        var e = this;
                        this._eventListener = function() {
                            return t.send(e.transitions.transition)
                        }, l.default.addListener(f.default.SDK_READY, this._eventListener, !0)
                    }
                }, {
                    key: "exit",
                    value: function(t) {
                        l.default.removeListener(f.default.SDK_READY, this._eventListener)
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t, e) {
                        return "On AWS SDK Ready"
                    }
                }]), e
            }(c.default);
        y.external = {
            key: "AwsSdkReady",
            type: "AWS",
            name: "AWS SDK Ready",
            description: "Performs a transition when the AWS SDK has been initialized and is ready for use.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "transition",
                description: "State to which to transition."
            }]
        }, e.default = y
    },
    384: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            u.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(63),
            a = o(r),
            s = n(2),
            u = o(s),
            c = n(385),
            p = o(c);
        i.prototype = Object.create(u.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Collides",
            name: "Collision (Bounding volume intersection)",
            type: "collision",
            description: "Checks for collisions or non-collisions with other entities. Collisions are based on the entities' bounding volumes. Before using collisions you first need to tag your entities.",
            canTransition: !0,
            parameters: [{
                name: "Tag",
                key: "tag",
                type: "string",
                description: "Checks for collisions with other objects having this tag.",
                default: "red"
            }],
            transitions: [{
                key: "collides",
                description: "State to transition to when a collision occurs."
            }, {
                key: "notCollides",
                description: "State to transition to when a collision is not occurring."
            }]
        };
        var l = {
            collides: "On bounds Overlap",
            notCollides: "On bounds Separate"
        };
        i.getTransitionLabel = function(t) {
            return l[t]
        }, i.prototype.ready = function(t) {
            var e = t.getOwnerEntity(),
                n = e._world;
            n.getSystem("ProximitySystem") || n.setSystem(new p.default)
        }, i.prototype.update = function(t) {
            var e = t.getOwnerEntity(),
                n = e._world,
                o = n.getSystem("ProximitySystem"),
                i = new a.default(o.getFor(this.tag)).and(n.by.tag(this.tag)).toArray(),
                r = !1;
            e.traverse(function(t) {
                if (!t.meshRendererComponent || t.particleComponent) return !1;
                for (var e = t.meshRendererComponent.worldBound, n = 0; n < i.length; n++)
                    if (i[n].traverse(function(t) {
                            if (!t.meshRendererComponent || t.particleComponent) return !0;
                            var n = t.meshRendererComponent.worldBound;
                            return n && e.intersects(n) ? (r = !0, !1) : void 0
                        }), r) return !1
            }), t.send(r ? this.transitions.collides : this.transitions.notCollides)
        }, e.default = i
    },
    385: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            s.default.call(this, "ProximitySystem", ["ProximityComponent"]), this.collections = {
                Red: {
                    name: "Red",
                    collection: []
                },
                Blue: {
                    name: "Blue",
                    collection: []
                },
                Green: {
                    name: "Green",
                    collection: []
                },
                Yellow: {
                    name: "Yellow",
                    collection: []
                }
            }
        }

        function r(t) {
            return l.default.capitalize(t)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(7),
            s = o(a),
            u = n(5),
            c = o(u),
            p = n(56),
            l = o(p);
        i.prototype = Object.create(s.default.prototype), i.prototype._collides = function(t, e) {
            for (var n = 0; n < t.collection.length; n++)
                for (var o = t.collection[n], i = 0; i < e.collection.length; i++) {
                    var r = e.collection[i];
                    o.meshRendererComponent.worldBound.intersects(r.meshRendererComponent.worldBound) && c.default.send("collides." + t.name + "." + e.name)
                }
        }, i.prototype.getFor = function(t) {
            return t = r(t), this.collections[t] ? this.collections[t].collection : []
        }, i.prototype.add = function(t, e) {
            e = r(e), this.collections[e] || (this.collections[e] = {
                name: e,
                collection: []
            }), this.collections[e].collection.push(t)
        }, i.prototype.remove = function(t, e) {
            e = r(e);
            var n = this.collections[e].collection,
                o = n.indexOf(t);
            n.splice(o, 1)
        }, i.prototype.process = function() {}, e.default = i
    },
    386: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Compare Counter",
            name: "Compare Counter",
            type: "transitions",
            description: "Compares a counter with a value.",
            canTransition: !0,
            parameters: [{
                name: "Name",
                key: "name",
                type: "string",
                description: "Counter name."
            }, {
                name: "Value",
                key: "value",
                type: "float",
                description: "Value to compare the counter with.",
                default: 0
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: [{
                key: "less",
                description: "State to transition to if the counter is smaller than the specified value."
            }, {
                key: "equal",
                description: "State to transition to if the counter is the same as the specified value."
            }, {
                key: "greater",
                description: "State to transition to if the counter is greater than the specified value."
            }]
        };
        var a = {
            less: " < X",
            equal: " == X",
            greater: " > X"
        };
        o.getTransitionLabel = function(t, e) {
            if (a[t]) return "On " + (e.options.name || "Counter") + a[t]
        }, o.prototype.compare = function(t) {
            var e = t.getFsm().getVariable(this.name),
                n = +this.value;
            e > n ? t.send(this.transitions.greater) : e === n ? t.send(this.transitions.equal) : t.send(this.transitions.less)
        }, o.prototype.enter = function(t) {
            this.everyFrame || this.compare(t)
        }, o.prototype.update = function(t) {
            this.everyFrame && this.compare(t)
        }, e.default = o
    },
    387: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Compare 2 Counters",
            name: "Compare 2 Counters",
            type: "transitions",
            description: "Compares the value of 2 counters.",
            canTransition: !0,
            parameters: [{
                name: "First counter",
                key: "name1",
                type: "string",
                description: "First counter name."
            }, {
                name: "Second counter",
                key: "name2",
                type: "string",
                description: "Second counter name."
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: [{
                key: "less",
                description: "State to transition to if the first counter is smaller than the second counter."
            }, {
                key: "equal",
                description: "State to transition to if the first counter is the same as the second counter."
            }, {
                key: "greater",
                description: "State to transition to if the first counter is greater than the second counter."
            }]
        };
        var a = {
            less: "<",
            equal: "==",
            greater: ">"
        };
        o.getTransitionLabel = function(t, e) {
            if (a[t]) return "On " + (e.options.name1 || "Counter1") + " " + a[t] + " " + (e.options.name2 || "counter2")
        }, o.prototype.compare = function(t) {
            var e = +t.getFsm().getVariable(this.name1),
                n = +t.getFsm().getVariable(this.name2);
            void 0 !== e && void 0 !== n && (e > n ? t.send(this.transitions.greater) : e === n ? t.send(this.transitions.equal) : t.send(this.transitions.less))
        }, o.prototype.enter = function(t) {
            this.everyFrame || this.compare(t)
        }, o.prototype.update = function(t) {
            this.everyFrame && this.compare(t)
        }, e.default = o
    },
    388: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(24),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Compare Distance",
            name: "Camera Distance",
            type: "collision",
            description: "Performs a transition based on the distance to the main camera or to a location.",
            canTransition: !0,
            parameters: [{
                name: "Current camera",
                key: "camera",
                type: "boolean",
                description: "Measure the distance to the current camera or to an arbitrary point.",
                default: !0
            }, {
                name: "Position",
                key: "position",
                type: "position",
                description: "Position to measure the distance to; Will be ignored if previous option is selected.",
                default: [0, 0, 0]
            }, {
                name: "Value",
                key: "value",
                type: "float",
                description: "Value to compare to.",
                default: 0
            }, {
                name: "Tolerance",
                key: "tolerance",
                type: "float",
                default: 0
            }, {
                name: "Type",
                key: "distanceType",
                type: "string",
                control: "dropdown",
                description: "The type of distance.",
                default: "Euclidean",
                options: ["Euclidean", "Manhattan"]
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: [{
                key: "less",
                description: "State to transition to if the measured distance is smaller than the specified value."
            }, {
                key: "equal",
                description: "State to transition to if the measured distance is about the same as the specified value."
            }, {
                key: "greater",
                description: "State to transition to if the measured distance is greater than the specified value."
            }]
        };
        var c = {
            less: "On camera distance < X",
            equal: "On camera distance == X",
            greater: "On camera distance > X"
        };
        i.getTransitionLabel = function(t) {
            return c[t]
        }, i.prototype.compare = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.sync().worldTransform.translation,
                o = void 0;
            o = this.camera ? n.clone().sub(u.default.mainCamera.translation) : n.clone().subDirect(this.position[0], this.position[1], this.position[2]);
            var i = void 0;
            i = "Euclidean" === this.type ? o.length() : Math.abs(o.x) + Math.abs(o.y) + Math.abs(o.z);
            var r = this.value - i;
            Math.abs(r) <= this.tolerance ? t.send(this.transitions.equal) : r > 0 ? t.send(this.transitions.less) : t.send(this.transitions.greater)
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.compare(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.compare(t)
        }, e.default = i
    },
    389: function(t, e, n) {
        "use strict";

        function o() {
            a.default.apply(this, arguments), this.everyFrame = !0
        }

        function i(t) {
            t.sync();
            var e = t.entity;
            e && e.meshDataComponent && e.meshRendererComponent && e.meshRendererComponent.updateBounds(e.meshDataComponent.modelBound, t.sync().worldTransform);
            for (var n = 0; n < t.children.length; n++) i(t.children[n])
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        o.prototype = Object.create(a.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Copy Joint Transform",
            name: "Copy Joint Transform",
            type: "animation",
            description: "Copies a joint's transform from another entity, and applies it to this entity. This entity must be a child of an entity with an animation component.",
            parameters: [{
                name: "Joint",
                key: "jointIndex",
                type: "int",
                control: "jointSelector",
                default: null,
                description: "Joint transform to copy."
            }],
            transitions: []
        }, o.prototype.update = function(t) {
            if (null !== this.jointIndex) {
                var e = t.getOwnerEntity(),
                    n = e.transformComponent.parent;
                if (n && (n = n.entity, n.animationComponent && n.animationComponent._skeletonPose)) {
                    var o = n.animationComponent._skeletonPose,
                        r = o._globalTransforms[this.jointIndex];
                    r && (e.transformComponent.transform.matrix.copy(r.matrix), r.matrix.getTranslation(e.transformComponent.transform.translation), r.matrix.getScale(e.transformComponent.transform.scale), r.matrix.getRotation(e.transformComponent.transform.rotation), i(e.transformComponent), e.transformComponent.setUpdated())
                }
            }
        }, e.default = o
    },
    390: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.from = new u.default, this.to = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(4),
            p = o(c),
            l = n(51),
            d = o(l);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Dolly Zoom",
            name: "Dolly Zoom",
            type: "camera",
            description: "Performs dolly zoom.",
            parameters: [{
                name: "Forward",
                key: "forward",
                type: "float",
                description: "Number of units to move towards the focus point. Enter negative values to move away.",
                default: 100
            }, {
                name: "Focus point",
                key: "lookAt",
                type: "position",
                description: "Point to focus on while transitioning.",
                default: [0, 0, 0]
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time.",
                default: 1e4
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the transition completes."
            }]
        }, i.getTransitionLabel = function() {
            return "On Dolly Zoom Complete"
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            if (this.completed = !1, e.cameraComponent && e.cameraComponent.camera) {
                var n = e.transformComponent,
                    o = n.transform.translation,
                    i = e.cameraComponent.camera;
                this.fromDistance = new u.default(this.lookAt).distance(i.translation), this.toDistance = this.fromDistance - this.forward, this.eyeTargetScale = Math.tan(i.fov * (Math.PI / 180) / 2) * this.fromDistance;
                var r = (new u.default).copy(o),
                    a = u.default.fromArray(this.lookAt).sub(r).normalize().scale(this.forward).add(r);
                this.from.set(r.x, r.y, r.z), this.to.setDirect(a.x, a.y, a.z), this.startTime = t.getTime()
            } else this.eyeTargetScale = null
        }, i.prototype.update = function(t) {
            if (!this.completed && this.eyeTargetScale) {
                var e = t.getOwnerEntity(),
                    n = e.transformComponent,
                    o = e.cameraComponent.camera,
                    i = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    r = d.default[this.easing1][this.easing2](i);
                n.transform.translation.set(this.from).lerp(this.to, r), n.setUpdated();
                var a = p.default.lerp(r, this.fromDistance, this.toDistance),
                    s = 180 / Math.PI * 2 * Math.atan(this.eyeTargetScale / a);
                o.setFrustumPerspective(s), i >= 1 && (t.send(this.transitions.complete), this.completed = !0)
            }
        }, e.default = i
    },
    391: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(5),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Emit message",
            name: "Emit Message",
            type: "transitions",
            description: "Emits a message (event) to a channel on the bus. Messages can be listened to by the Listen action, or by scripts using the SystemBus.addListener(channel, callback) function.",
            parameters: [{
                name: "Channel",
                key: "channel",
                type: "string",
                description: "Channel to transmit a message (event) on.",
                default: ""
            }],
            transitions: []
        }, i.prototype.enter = function() {
            u.default.emit(this.channel, this.data)
        }, e.default = i
    },
    392: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.expressionFunction = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Eval",
            name: "Eval",
            description: "Evaluates a JS expression.",
            parameters: [{
                name: "expression",
                key: "expression",
                type: "string",
                description: "JavaScript expression to evaluate.",
                default: ""
            }],
            transitions: []
        }, o.prototype.enter = function() {
            this.expressionFunction = new Function("sumerian", this.expression)
        }, o.prototype.update = function(t) {
            if (this.expressionFunction) try {
                this.expressionFunction(t.getEvalProxy())
            } catch (t) {
                console.warn("Eval code error: " + t.message)
            }
        }, e.default = o
    },
    393: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.fireEntity = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(9),
            u = o(s),
            c = n(15),
            p = o(c),
            l = n(157),
            d = o(l),
            f = n(112),
            y = o(f);
        i.material = null, i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Fire",
            name: "Fire FX",
            type: "fx",
            description: 'Makes the entity emit fire. To "extinguish" the fire use the "Remove Particles" action.',
            parameters: [{
                name: "Start Color",
                key: "startColor",
                type: "vec3",
                control: "color",
                description: "Flame color at source.",
                default: [1, 1, 0]
            }, {
                name: "End color",
                key: "endColor",
                type: "vec3",
                control: "color",
                description: "Color near the end of a flame's life.",
                default: [1, 0, 0]
            }],
            transitions: []
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            if (!this.fireEntity || -1 === e.transformComponent.children.indexOf(this.fireEntity.transformComponent)) {
                var n = e._world.sumerianRunner;
                if (!i.material) {
                    i.material = new u.default(p.default.particles);
                    var o = y.default.createFlareTexture();
                    o.generateMipmaps = !0, i.material.setTexture("DIFFUSE_MAP", o), i.material.blendState.blending = "AdditiveBlending", i.material.cullState.enabled = !1, i.material.depthState.write = !1, i.material.renderQueue = 2002
                }
                var r = e.transformComponent.sync().worldTransform.scale,
                    a = (r.x + r.y + r.z) / 3;
                this.fireEntity = y.default.createParticleSystemEntity(n.world, d.default.getFire({
                    scale: a,
                    startColor: this.startColor,
                    endColor: this.endColor
                }), i.material), this.fireEntity.meshRendererComponent.isPickable = !1, this.fireEntity.meshRendererComponent.castShadows = !1, this.fireEntity.meshRendererComponent.receiveShadows = !1, this.fireEntity.name = "_ParticleSystemFire", e.transformComponent.attachChild(this.fireEntity.transformComponent), this.fireEntity.addToWorld()
            }
        }, i.prototype.cleanup = function() {
            this.fireEntity && (this.fireEntity.removeFromWorld(), this.fireEntity = null)
        }, e.default = i
    },
    394: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Hide",
            name: "Hide",
            type: "display",
            description: "Hides an entity and its children.",
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            t.getOwnerEntity().hide()
        }, e.default = o
    },
    395: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "HTMLPick",
            name: "HTMLPick",
            type: "controls",
            description: "Listens for a picking event and performs a transition. Can only be used on HTML entities.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "pick",
                description: "State to transition to when the HTML entity is picked."
            }]
        }, o.getTransitionLabel = function() {
            return "On HTML Pick"
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.htmlComponent && (this.eventListener = function() {
                t.send(this.transitions.pick)
            }.bind(this), this.domElement = e.htmlComponent.domElement, this.domElement.addEventListener("click", this.eventListener))
        }, o.prototype.exit = function(t) {
            t.getOwnerEntity().htmlComponent && this.domElement && this.domElement.removeEventListener("click", this.eventListener)
        }, e.default = o
    },
    396: function(t, e, n) {
        "use strict";

        function o() {
            a.default.apply(this, arguments)
        }

        function i(t, e, n) {
            var o = !1,
                i = function(t, e, n) {
                    if (e > n) {
                        if (t < e && t > n) return !0
                    } else if (n > e) {
                        if (t < n && t > e) return !0
                    } else if (t === n) return !0;
                    return !1
                },
                r = i(t[0], e[0], n[0]),
                a = i(t[1], e[1], n[1]),
                s = i(t[2], e[2], n[2]);
            return r && a && s && (o = !0), o
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        o.prototype = Object.create(a.default.prototype), o.prototype.constructor = o, o.external = {
            key: "In Box",
            name: "In Box",
            type: "collision",
            description: "Performs a transition based on whether an entity is inside a user defined box volume or not. The volume is defined by setting two points which, when connected, form a diagonal through the box volume.",
            canTransition: !0,
            parameters: [{
                name: "Point1",
                key: "point1",
                type: "position",
                description: "First box point.",
                default: [-1, -1, -1]
            }, {
                name: "Point2",
                key: "point2",
                type: "position",
                description: "Second box point.",
                default: [1, 1, 1]
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: [{
                key: "inside",
                description: "State to transition to if the entity is inside the box."
            }, {
                key: "outside",
                description: "State to transition to if the entity is outside the box."
            }]
        };
        var s = {
            inside: "On Inside Box",
            outside: "On Outside Box"
        };
        o.getTransitionLabel = function(t) {
            return s[t]
        }, o.prototype.checkInside = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.sync().worldTransform.translation;
            i([n.x, n.y, n.z], this.point1, this.point2) ? t.send(this.transitions.inside) : t.send(this.transitions.outside)
        }, o.prototype.enter = function(t) {
            this.everyFrame || this.checkInside(t)
        }, o.prototype.update = function(t) {
            this.everyFrame && this.checkInside(t)
        }, e.default = o
    },
    397: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Increment Counter",
            name: "Increment Counter",
            type: "transitions",
            description: "Increments a counter with a value.",
            parameters: [{
                name: "Name",
                key: "name",
                type: "string",
                description: "Counter name."
            }, {
                name: "Increment",
                key: "increment",
                type: "float",
                description: "Value to increment the counter with.",
                default: 1
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, o.prototype.incrementCounter = function(t) {
            var e = +this.increment;
            if (void 0 === t.getFsm().vars[this.name]) return void t.getFsm().defineVariable(this.name, e);
            t.getFsm().applyOnVariable(this.name, function(t) {
                return t + e
            })
        }, o.prototype.enter = function(t) {
            this.everyFrame || this.incrementCounter(t)
        }, o.prototype.update = function(t) {
            this.everyFrame && this.incrementCounter(t)
        }, o.prototype.cleanup = function(t) {
            t.getFsm().removeVariable(this.name)
        }, e.default = o
    },
    398: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(30),
            u = o(s),
            c = n(65),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "In Frustum",
            name: "In View",
            type: "camera",
            description: "Performs a transition based on whether the entity is in a camera's frustum or not.",
            canTransition: !0,
            parameters: [{
                name: "Current camera",
                key: "current",
                type: "boolean",
                description: "Check this to always use the current camera.",
                default: !0
            }, {
                name: "Camera",
                key: "cameraEntityRef",
                type: "camera",
                description: "Other camera; Will be ignored if the previous option is checked.",
                default: null
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: [{
                key: "inside",
                description: "State to transition to if entity is in the frustum."
            }, {
                key: "outside",
                description: "State to transition to if entity is outside the frustum."
            }]
        };
        var l = {
            inside: "On Inside Frustum",
            outside: "On Outside Frustum"
        };
        i.getTransitionLabel = function(t) {
            return l[t]
        }, i.prototype.checkFrustum = function(t) {
            var e = t.getOwnerEntity();
            if (this.current) e.isVisible ? t.send(this.transitions.inside) : t.send(this.transitions.outside);
            else {
                var n = e.meshRendererComponent ? e.meshRendererComponent.worldBound : new p.default(e.transformComponent.sync().worldTransform.translation, .001);
                this.camera.contains(n) === u.default.Outside ? t.send(this.transitions.outside) : t.send(this.transitions.inside)
            }
        }, i.prototype.enter = function(t) {
            if (!this.current) {
                var e = t.getOwnerEntity()._world,
                    n = e.entityManager.getEntityById(this.cameraEntityRef);
                this.camera = n.cameraComponent.camera
            }
            this.everyFrame || this.checkFrustum(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.checkFrustum(t)
        }, e.default = i
    },
    399: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Key Down",
            name: "Key Down",
            type: "controls",
            description: "Listens for a key press and performs a transition.",
            canTransition: !0,
            parameters: [{
                name: "Key",
                key: "key",
                type: "string",
                control: "key",
                description: "Key to listen for.",
                default: "A"
            }],
            transitions: [{
                key: "keydown",
                description: "State to transition to when the key is pressed."
            }]
        }, i.getTransitionLabel = function(t, e) {
            return "On Key " + (e.options.key || "") + " down"
        }, i.prototype.configure = function(t) {
            this.key = t.key ? u.default.getKey(t.key) : null, this.transitions = {
                keydown: t.transitions.keydown
            }
        }, i.prototype.enter = function(t) {
            this.eventListener = function(e) {
                this.key && e.which === +this.key && t.send(this.transitions.keydown)
            }.bind(this), document.addEventListener("keydown", this.eventListener)
        }, i.prototype.exit = function() {
            document.removeEventListener("keydown", this.eventListener)
        }, e.default = i
    },
    400: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Key Pressed",
            name: "Key Pressed",
            type: "controls",
            description: "Listens for a key press event and performs a transition. Works over transition boundaries.",
            canTransition: !0,
            parameters: [{
                name: "Key",
                key: "key",
                type: "string",
                control: "key",
                description: "Key to listen for.",
                default: "A"
            }],
            transitions: [{
                key: "keydown",
                description: "State to transition to when the key is pressed."
            }]
        }, i.getTransitionLabel = function(t, e) {
            return "On Key " + (e.options.key || "") + " pressed"
        }, i.prototype.configure = function(t) {
            this.key = t.key ? u.default.getKey(t.key) : null, this.transitions = {
                keydown: t.transitions.keydown
            }
        }, i.prototype.enter = function(t) {
            t.getInputState(this.key) && t.send(this.transitions.keydown)
        }, i.prototype.update = function(t) {
            t.getInputState(this.key) && t.send(this.transitions.keydown)
        }, e.default = i
    },
    401: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Key Up",
            name: "Key Up",
            type: "controls",
            description: "Listens for a key release and performs a transition.",
            canTransition: !0,
            parameters: [{
                name: "Key",
                key: "key",
                type: "string",
                control: "key",
                description: "Key to listen for.",
                default: "A"
            }],
            transitions: [{
                key: "keyup",
                description: "State to transition to when the key is released."
            }]
        }, i.getTransitionLabel = function(t, e) {
            return "On Key " + (e.options.key || "") + " up"
        }, i.prototype.configure = function(t) {
            this.key = t.key ? u.default.getKey(t.key) : null, this.transitions = {
                keyup: t.transitions.keyup
            }
        }, i.prototype.enter = function(t) {
            this.eventListener = function(e) {
                this.key && e.which !== +this.key || t.send(this.transitions.keyup)
            }.bind(this), document.addEventListener("keyup", this.eventListener)
        }, i.prototype.exit = function() {
            document.removeEventListener("keyup", this.eventListener)
        }, e.default = i
    },
    402: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Log Message",
            name: "Log Message",
            description: "Prints a message in the debug console of your browser.",
            parameters: [{
                name: "Message",
                key: "message",
                type: "string",
                description: "Message to print.",
                default: "hello"
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !1
            }],
            transitions: []
        }, o.prototype.enter = function() {
            this.everyFrame || console.log(this.message)
        }, o.prototype.update = function() {
            this.everyFrame && console.log(this.message)
        }, e.default = o
    },
    403: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Look At",
            name: "Look At",
            type: "animation",
            description: "Reorients an entity so that it's facing a specific point.",
            parameters: [{
                name: "Look at",
                key: "lookAt",
                type: "position",
                description: "Position to look at.",
                default: [0, 0, 0]
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, i.prototype.doLookAt = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent;
            n.transform.lookAt(new u.default(this.lookAt), u.default.UNIT_Y), n.setUpdated()
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.doLookAt(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.doLookAt(t)
        }, e.default = i
    },
    404: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Mouse Down / Touch Start",
            name: "Mouse Down / Touch Start",
            type: "controls",
            description: "Listens for a mousedown event (or touchstart) on the canvas and performs a transition.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "mouseLeftDown",
                description: "State to transition to when the left mouse button is pressed."
            }, {
                key: "middleMouseDown",
                description: "State to transition to when the middle mouse button is pressed."
            }, {
                key: "rightMouseDown",
                description: "State to transition to when the right mouse button is pressed."
            }, {
                key: "touchDown",
                description: "State to transition to when the touch event begins."
            }]
        };
        var a = {
            mouseLeftDown: "On left mouse down",
            middleMouseDown: "On middle mouse down",
            rightMouseDown: "On right mouse down",
            touchDown: "On touch start"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function(t) {
            var e = function(e) {
                "touch" === e ? t.send(this.transitions.touchDown) : t.send([this.transitions.mouseLeftDown, this.transitions.middleMouseDown, this.transitions.rightMouseDown][e])
            }.bind(this);
            this.mouseEventListener = function(t) {
                e(t.button)
            }, this.touchEventListener = function() {
                e("touch")
            }, document.addEventListener("mousedown", this.mouseEventListener), document.addEventListener("touchstart", this.touchEventListener)
        }, o.prototype.exit = function() {
            document.removeEventListener("mousedown", this.mouseEventListener), document.removeEventListener("touchstart", this.touchEventListener)
        }, e.default = o
    },
    405: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Mouse / Touch Move",
            name: "Mouse / Touch Move",
            type: "controls",
            description: "Listens for mouse movement (mousemove) or touch movement (touchmove) on the canvas and performs a transition.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "mousemove",
                description: "State to transition to on mouse movement."
            }, {
                key: "touchmove",
                description: "State to transition to on touch movement."
            }]
        };
        var a = {
            mousemove: "On mouse move",
            touchmove: "On touch move"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function(t) {
            var e = function(e) {
                "mouse" === e ? t.send(this.transitions.mousemove) : t.send(this.transitions.touchmove)
            }.bind(this);
            this.mouseEventListener = function() {
                e("mouse")
            }, this.touchEventListener = function() {
                e("touch")
            }, document.addEventListener("mousemove", this.mouseEventListener), document.addEventListener("touchmove", this.touchEventListener)
        }, o.prototype.exit = function() {
            document.removeEventListener("mousemove", this.mouseEventListener), document.removeEventListener("touchmove", this.touchEventListener)
        }, e.default = o
    },
    406: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Mouse Up / Touch end",
            name: "Mouse Up / Touch end",
            type: "controls",
            description: "Listens for a mouseup event (or touchend) on the canvas and performs a transition.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "mouseLeftUp",
                description: "State to transition to when the left mouse button is released."
            }, {
                key: "middleMouseUp",
                description: "State to transition to when the middle mouse button is released."
            }, {
                key: "rightMouseUp",
                description: "State to transition to when the right mouse button is released."
            }, {
                key: "touchUp",
                description: "State to transition to when the touch event ends."
            }]
        };
        var a = {
            mouseLeftUp: "On left mouse up",
            middleMouseUp: "On middle mouse up",
            rightMouseUp: "On right mouse up",
            touchUp: "On touch end"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function(t) {
            var e = function(e) {
                "touch" === e ? t.send(this.transitions.touchUp) : t.send([this.transitions.mouseLeftUp, this.transitions.middleMouseUp, this.transitions.rightMouseUp][e])
            }.bind(this);
            this.mouseEventListener = function(t) {
                e(t.button)
            }, this.touchEventListener = function() {
                e("touch")
            }, document.addEventListener("mouseup", this.mouseEventListener), document.addEventListener("touchend", this.touchEventListener)
        }, o.prototype.exit = function() {
            document.removeEventListener("mouseup", this.mouseEventListener), document.removeEventListener("touchend", this.touchEventListener)
        }, e.default = o
    },
    407: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Move",
            name: "Move",
            type: "animation",
            description: "Moves the entity.",
            parameters: [{
                name: "Translation",
                key: "translation",
                type: "position",
                description: "Move.",
                default: [0, 0, 0]
            }, {
                name: "Oriented",
                key: "oriented",
                type: "boolean",
                description: "If true translate with rotation.",
                default: !0
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "If true add to current translation.",
                default: !0
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.sync().transform;
            this.forward = u.default.fromArray(this.translation);
            var o = n.rotation;
            this.forward.applyPost(o), this.everyFrame || this.applyMove(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.applyMove(t)
        }, i.prototype.applyMove = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.sync().transform,
                o = n.translation;
            if (this.oriented)
                if (this.relative) {
                    var i = u.default.fromArray(this.translation),
                        r = n.rotation;
                    i.applyPost(r), this.everyFrame ? (i.scale(t.getTpf()), o.add(i)) : o.add(i)
                } else o.set(this.forward);
            else if (this.relative)
                if (this.everyFrame) {
                    var a = t.getTpf();
                    o.addDirect(this.translation[0] * a, this.translation[1] * a, this.translation[2] * a)
                } else o.addDirect(this.translation[0], this.translation[1], this.translation[2]);
            else o.setDirect(this.translation[0], this.translation[1], this.translation[2]);
            e.transformComponent.setUpdated()
        }, e.default = i
    },
    408: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Pause Animation",
            name: "Pause Animation",
            type: "animation",
            description: "Pauses skeleton animations.",
            parameters: [{
                name: "On all entities",
                key: "onAll",
                type: "boolean",
                description: "Pause animation on all entities or just one.",
                default: !1
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            if (this.onAll) {
                t.getWorld().getSystem("AnimationSystem").pause()
            } else {
                var e = t.getOwnerEntity();
                e.animationComponent && e.animationComponent.pause()
            }
        }, e.default = o
    },
    409: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(5),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Pick",
            name: "Pick",
            type: "controls",
            description: "Listens for a picking event on the entity and performs a transition.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "pick",
                name: "Pick",
                description: "State to transition to when entity is picked."
            }]
        };
        var c = {
            pick: "On pick entity"
        };
        i.getTransitionLabel = function(t) {
            return c[t]
        }, i.prototype.enter = function(t) {
            this.ownerEntity = t.getOwnerEntity(), this.sumerian = this.ownerEntity._world.sumerianRunner;
            var e = this;
            this.eventListener = function(n) {
                var o = n.entity;
                if (!o) {
                    var i = void 0,
                        r = void 0,
                        a = e.sumerian.renderer.domElement;
                    if ("touchstart" === n.type || "touchend" === n.type || "touchmove" === n.type) i = n.changedTouches[0].pageX - a.getBoundingClientRect().left, r = n.changedTouches[0].pageY - a.getBoundingClientRect().top;
                    else {
                        var s = a.getBoundingClientRect();
                        i = n.clientX - s.left, r = n.clientY - s.top
                    }
                    var u = e.sumerian.pickSync(i, r);
                    if (!(o = e.sumerian.world.entityManager.getEntityByIndex(u.id))) return
                }
                o.traverseUp(function(n) {
                    if (n === e.ownerEntity) return t.send(e.transitions.pick), !1
                })
            }, document.addEventListener("click", this.eventListener), document.addEventListener("touchstart", this.eventListener), u.default.addListener("sumerian.trigger.click", this.eventListener), u.default.addListener("sumerian.trigger.touchstart", this.eventListener)
        }, i.prototype.exit = function() {
            document.removeEventListener("click", this.eventListener), document.removeEventListener("touchstart", this.eventListener), u.default.removeListener("sumerian.trigger.click", this.eventListener), u.default.removeListener("sumerian.trigger.touchstart", this.eventListener)
        }, e.default = i
    },
    410: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.eventListener = function(t) {
                t.stopPropagation(), t.preventDefault();
                var e = this.ownerEntity.getComponent("HtmlComponent");
                if (e && e.domElement.contains(t.target)) return void this.handleExit();
                if (t.target === this.canvasElement) {
                    var n = void 0,
                        o = void 0;
                    t.touches && t.touches.length ? (n = t.touches[0].clientX, o = t.touches[0].clientY) : t.changedTouches && t.changedTouches.length ? (n = t.changedTouches[0].pageX, o = t.changedTouches[0].pageY) : (n = t.offsetX, o = t.offsetY);
                    var i = this.sumerian.pickSync(n, o);
                    if (-1 !== i.id) {
                        var r = this.sumerian.world.entityManager.getEntityByIndex(i.id),
                            a = [];
                        this.ownerEntity.traverse(a.push.bind(a)), -1 !== a.indexOf(r) && this.handleExit()
                    }
                }
            }.bind(this)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Pick and Exit",
            name: "Pick and Exit",
            type: "controls",
            description: "Listens for a picking event on the entity and opens a new browser window.",
            canTransition: !0,
            parameters: [{
                name: "URL",
                key: "url",
                type: "string",
                description: "URL to open.",
                default: "/"
            }, {
                name: "Exit name",
                key: "exitName",
                type: "string",
                description: "Name of the exit, used to track this exit in Ads.",
                default: "clickEntityExit"
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            this.ownerEntity = t.getOwnerEntity(), this.sumerian = this.ownerEntity._world.sumerianRunner, this.canvasElement = this.sumerian.renderer.domElement, this.domElement = this.canvasElement.parentNode, this.domElement.addEventListener("click", this.eventListener, !1), this.domElement.addEventListener("touchend", this.eventListener, !1)
        }, o.prototype.handleExit = function() {
            (window.sumerianHandleExit || function(t) {
                window.open(t, "_blank")
            })(this.url, this.exitName)
        }, o.prototype.exit = function() {
            this.domElement && (this.domElement.removeEventListener("click", this.eventListener), this.domElement.removeEventListener("touchend", this.eventListener))
        }, e.default = o
    },
    411: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Random Transition",
            name: "Random Transition",
            type: "transitions",
            description: "Performs a random transition. Will choose one of the two transitions randomly and transition immediately.",
            canTransition: !0,
            parameters: [{
                name: "Probability A",
                key: "skewness",
                type: "float",
                control: "slider",
                min: 0,
                max: 1,
                description: "The probability that the first destination is chosen over the second.",
                default: .5
            }],
            transitions: [{
                key: "transition1",
                description: "First choice."
            }, {
                key: "transition2",
                description: "Second choice."
            }]
        };
        var a = {
            transition1: "On random outcome A",
            transition2: "On random outcome B"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function(t) {
            var e = this.transitions,
                n = e.transition1,
                o = e.transition2,
                i = Math.random() < this.skewness ? n : o;
            t.send(i)
        }, e.default = o
    },
    412: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Remove",
            name: "Remove",
            type: "display",
            description: "Removes the entity from the world.",
            parameters: [{
                name: "Recursive",
                key: "recursive",
                type: "boolean",
                description: "Remove children too.",
                default: !1
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            t.getOwnerEntity().removeFromWorld(this.recursive)
        }, e.default = o
    },
    413: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Remove Light",
            name: "Remove Light",
            type: "light",
            description: "Removes the light attached to the entity.",
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.hasComponent("LightComponent") && e.clearComponent("LightComponent")
        }, e.default = o
    },
    414: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Remove Particles",
            name: "Remove Particles",
            type: "fx",
            description: "Removes any particle emitter attached to the entity.",
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            t.getOwnerEntity().children().each(function(t) {
                -1 !== t.name.indexOf("_ParticleSystem") && t.hasComponent("ParticleComponent") && t.removeFromWorld()
            })
        }, e.default = o
    },
    415: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Resume Animation",
            name: "Resume Animation",
            type: "animation",
            description: "Continues playing a skeleton animation.",
            parameters: [{
                name: "On all entities",
                key: "onAll",
                type: "boolean",
                description: "Resume animation on all entities or just one.",
                default: !1
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            if (this.onAll) {
                t.getWorld().getSystem("AnimationSystem").resume()
            } else {
                var e = t.getOwnerEntity();
                e.animationComponent && e.animationComponent.resume()
            }
        }, e.default = o
    },
    416: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(4),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Rotate",
            name: "Rotate",
            type: "animation",
            description: "Rotates the entity with the set angles (in degrees).",
            parameters: [{
                name: "Rotation",
                key: "rotation",
                type: "rotation",
                description: "Rotatation.",
                default: [0, 0, 0]
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "If true add to current rotation.",
                default: !0
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        };
        var c = u.default.DEG_TO_RAD;
        i.prototype.applyRotation = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.sync().transform,
                o = this.rotation[0],
                i = this.rotation[1],
                r = this.rotation[2];
            if (this.relative) {
                var a = n.rotation;
                if (this.everyFrame) {
                    var s = t.getTpf();
                    a.rotateX(o * c * s), a.rotateY(i * c * s), a.rotateZ(r * c * s)
                } else a.rotateX(o * c), a.rotateY(i * c), a.rotateZ(r * c)
            } else if (this.everyFrame) {
                var s = t.getTpf();
                n.setRotationXYZ(o * c * s, i * c * s, r * c * s)
            } else n.setRotationXYZ(o * c, i * c, r * c);
            e.transformComponent.setUpdated()
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.applyRotation(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.applyRotation(t)
        }, e.default = i
    },
    417: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Scale",
            name: "Scale",
            type: "animation",
            description: "Scales the entity.",
            parameters: [{
                name: "Scale",
                key: "scale",
                type: "position",
                description: "Scale.",
                default: [0, 0, 0]
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "If true, add/multiply the current scaling.",
                default: !0
            }, {
                name: "Multiply",
                key: "multiply",
                type: "boolean",
                description: "If true multiply, otherwise add.",
                default: !1
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !1
            }],
            transitions: []
        }, o.prototype.applyScale = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.transform;
            if (this.relative)
                if (this.multiply)
                    if (this.everyFrame) {
                        var o = 10 * t.getTpf();
                        n.scale.x *= this.scale[0] * o, n.scale.y *= this.scale[1] * o, n.scale.z *= this.scale[2] * o
                    } else n.scale.mulDirect(this.scale[0], this.scale[1], this.scale[2]);
            else if (this.everyFrame) {
                var o = 10 * t.getTpf();
                n.scale.x += this.scale[0] * o, n.scale.y += this.scale[1] * o, n.scale.z += this.scale[2] * o
            } else n.scale.addDirect(this.scale[0], this.scale[1], this.scale[2]);
            else n.scale.setArray(this.scale);
            e.transformComponent.setUpdated()
        }, o.prototype.enter = function(t) {
            this.everyFrame || this.applyScale(t)
        }, o.prototype.update = function(t) {
            this.everyFrame && this.applyScale(t)
        }, e.default = o
    },
    418: function(t, e, n) {
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
            u = n(2),
            c = o(u),
            p = n(3),
            l = o(p),
            d = function(t) {
                function e() {
                    return i(this, e), r(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return a(e, t), s(e, [{
                    key: "enter",
                    value: function(t) {
                        this._scriptReady && (this.script.enabled = !0, this._scriptSystem.callScriptFunction(this.script, this.script.enter))
                    }
                }, {
                    key: "exit",
                    value: function(t) {
                        this._scriptReady && (this._scriptSystem.callScriptFunction(this.script, this.script.exit), this.script.enabled = !1)
                    }
                }, {
                    key: "ready",
                    value: function(t) {
                        var e = this;
                        if (this._scriptSystem = t.getWorld().getSystem("ScriptSystem"), this._scriptReady) {
                            var n = {
                                transitions: {
                                    success: function() {
                                        e.script.enabled && t.send(e.transitions.success)
                                    },
                                    failure: function() {
                                        e.script.enabled && t.send(e.transitions.failure)
                                    }
                                }
                            };
                            l.default.extend(n, t.getState().getScriptContext()), l.default.extend(n, t.getState().parent.getScriptContext()), this._scriptSystem.addScript(t.getOwnerEntity(), this.script, n)
                        }
                    }
                }, {
                    key: "cleanup",
                    value: function(t) {
                        this._scriptReady && this._scriptSystem.removeScript(this.script)
                    }
                }, {
                    key: "_scriptReady",
                    get: function() {
                        return this.script && this.script.parameters && this.script.parameters.enabled && this._scriptSystem || !1
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t, e) {
                        var n = e.options.scriptInstance && e.options.scriptInstance.name || "Script";
                        return n = n.replace(/^Instance of /, ""), "success" === t ? "On " + n + " Success" : "failure" === t ? "On " + n + " Failure" : void 0
                    }
                }]), e
            }(c.default);
        d.external = {
            key: "ExecuteScript",
            type: "Script",
            name: "Execute Script",
            description: "Executes a script on enter and exit.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "success",
                description: "State to transition to when the script signals a success."
            }, {
                key: "failure",
                description: "State to transition to when the script signals a failure."
            }]
        }, e.default = d
    },
    419: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this._transitioned = !1, this._currentState = null, this._previousLoop = 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Animation",
            name: "Set Animation",
            type: "animation",
            description: "Transitions to a selected animation.",
            parameters: [{
                name: "Animation",
                key: "animation",
                type: "animation"
            }, {
                name: "Loops",
                key: "loops",
                description: "How many times to loop before transitioning.",
                type: "int",
                min: 1,
                default: 1
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the target animation completes. If the animation loops forever, the transition will be done when the next loop starts."
            }]
        };
        var a = {
            complete: "On animation complete"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function() {
            this._transitioned = !1, this._currentState = null, this._previousLoop = 0
        }, o.prototype.update = function(t) {
            if (!this._transitioned) {
                var e = t.getOwnerEntity(),
                    n = this;
                this.animation && e.animationComponent && e.animationComponent.getStateById(this.animation) && (null === this._currentState ? (e.animationComponent.transitionTo(this.animation, !0), this._currentState = e.animationComponent.getStateById(this.animation)) : this._currentState.getCurrentLoop() + this._previousLoop === this.loops ? (t.send(n.transitions.complete), this._transitioned = !0) : e.animationComponent.getCurrentState() || (e.animationComponent.transitionTo(this.animation, !0), this._previousLoop += this._currentState.getCurrentLoop()))
            }
        }, o.prototype.exit = function() {
            this._transitioned = !1, this._currentState = null, this._previousLoop = 0
        }, e.default = o
    },
    420: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Clear Color",
            name: "Background Color",
            description: "Sets the clear color.",
            parameters: [{
                name: "Color",
                key: "color",
                type: "vec4",
                control: "color",
                description: "Color.",
                default: [1, 1, 1, 1]
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = this.color;
            e._world.sumerianRunner.renderer.setClearColor(n[0], n[1], n[2], n[3])
        }, e.default = o
    },
    421: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Counter",
            name: "Set Counter",
            type: "transitions",
            description: "Sets a counter to a value.",
            parameters: [{
                name: "Name",
                key: "name",
                type: "string",
                description: "Counter name."
            }, {
                name: "Value",
                key: "value",
                type: "float",
                description: "Value to set the counter to.",
                default: 0
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            t.getFsm().defineVariable(this.name, +this.value)
        }, o.prototype.cleanup = function(t) {
            t.getFsm().removeVariable(this.name)
        }, e.default = o
    },
    422: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(357),
            u = o(s),
            c = n(358),
            p = o(c),
            l = n(9),
            d = o(l),
            f = n(15),
            y = o(f);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Set Render Target",
            name: "Set Render Target",
            type: "texture",
            description: "Renders what a camera sees on the current entity's texture.",
            parameters: [{
                name: "Camera",
                key: "cameraEntityRef",
                type: "camera",
                description: "Camera to use as source.",
                default: null
            }],
            transitions: []
        }, i.prototype.ready = function(t) {
            var e = t.getOwnerEntity(),
                n = e._world;
            if (!n.getSystem("PortalSystem")) {
                var o = n.getSystem("RenderSystem"),
                    i = n.sumerianRunner.renderer;
                n.setSystem(new p.default(i, o))
            }
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e._world,
                o = n.entityManager.getEntityById(this.cameraEntityRef);
            if (o && o.cameraComponent && o.cameraComponent.camera) {
                var i = o.cameraComponent.camera,
                    r = new d.default(y.default.textured);
                if (e.meshRendererComponent) {
                    this.oldMaterials = e.meshRendererComponent.materials, e.meshRendererComponent.materials = [r];
                    var a = new u.default(i, 500, {
                        preciseRecursion: !0
                    });
                    e.setComponent(a)
                }
            }
        }, i.prototype.cleanup = function(t) {
            var e = t.getOwnerEntity();
            e && (this.oldMaterials && e.meshRendererComponent && (e.meshRendererComponent.materials = this.oldMaterials), e.clearComponent("portalComponent")), this.oldMaterials = null
        }, e.default = i
    },
    423: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.oldVal = new u.default, this.target = new u.default, this.vel = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(4),
            p = o(c),
            l = n(51),
            d = o(l);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Shake",
            name: "Shake",
            type: "animation",
            description: "Shakes the entity. Optionally performs a transition.",
            canTransition: !0,
            parameters: [{
                name: "Start level",
                key: "startLevel",
                type: "float",
                description: "Shake amount at start.",
                default: 0
            }, {
                name: "End level",
                key: "endLevel",
                type: "float",
                description: "Shake amount at the end.",
                default: 10
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Shake time amount.",
                default: 1e3
            }, {
                name: "Speed",
                key: "speed",
                type: "string",
                control: "dropdown",
                description: "Speed of shaking.",
                default: "Fast",
                options: ["Fast", "Medium", "Slow"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the shake completes."
            }]
        };
        var f = {
            complete: "On Shake Complete"
        };
        i.getTransitionLabel = function(t) {
            return f[t]
        }, i.prototype.configure = function(t) {
            this.startLevel = t.startLevel, this.endLevel = t.endLevel, this.time = t.time, this.speed = {
                Fast: 1,
                Medium: 2,
                Slow: 4
            }[t.speed], this.easing = d.default.Quadratic.InOut, this.eventToEmit = t.transitions.complete
        }, i.prototype.enter = function(t) {
            this.oldVal.set(u.default.ZERO), this.target.set(u.default.ZERO), this.vel.set(u.default.ZERO), this.iter = 0, this.startTime = t.getTime(), this.completed = !1
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                var e = t.getOwnerEntity(),
                    n = e.transformComponent,
                    o = n.transform.translation,
                    i = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    r = this.easing(i),
                    a = p.default.lerp(r, this.startLevel, this.endLevel);
                this.iter++, this.iter > this.speed && (this.iter = 0, this.target.setDirect(-this.oldVal.x + (Math.random() - .5) * a * 2, -this.oldVal.y + (Math.random() - .5) * a * 2, -this.oldVal.z + (Math.random() - .5) * a * 2)), this.vel.setDirect(.98 * this.vel.x + .1 * this.target.x, .98 * this.vel.y + .1 * this.target.y, .98 * this.vel.z + .1 * this.target.z), o.add(this.vel).sub(this.oldVal), this.oldVal.copy(this.vel), n.setUpdated(), i >= 1 && (o.sub(this.oldVal), n.setUpdated(), this.completed = !0, t.send(this.eventToEmit))
            }
        }, e.default = i
    },
    424: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Show",
            name: "Show",
            type: "display",
            description: "Makes an entity visible.",
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            t.getOwnerEntity().show()
        }, e.default = o
    },
    425: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.smokeEntity = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(9),
            u = o(s),
            c = n(15),
            p = o(c),
            l = n(157),
            d = o(l),
            f = n(112),
            y = o(f);
        i.material = null, i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Smoke",
            name: "Smoke FX",
            type: "fx",
            description: 'Makes the entity emit smoke. To cancel the smoke emitter use the "Remove Particles" action.',
            parameters: [{
                name: "Color",
                key: "color",
                type: "vec3",
                control: "color",
                description: "Smoke color.",
                default: [0, 0, 0]
            }],
            transitions: []
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            if (!this.smokeEntity || -1 === e.transformComponent.children.indexOf(this.smokeEntity.transformComponent)) {
                var n = e._world.sumerianRunner;
                if (!i.material) {
                    i.material = new u.default(p.default.particles);
                    var o = y.default.createFlareTexture();
                    o.generateMipmaps = !0, i.material.setTexture("DIFFUSE_MAP", o), i.material.blendState.blending = "TransparencyBlending", i.material.cullState.enabled = !1, i.material.depthState.write = !1, i.material.renderQueue = 2001
                }
                var r = e.transformComponent.sync().worldTransform.scale,
                    a = (r.x + r.y + r.z) / 3;
                this.smokeEntity = y.default.createParticleSystemEntity(n.world, d.default.getSmoke({
                    scale: a,
                    color: this.color
                }), i.material), this.smokeEntity.meshRendererComponent.isPickable = !1, this.smokeEntity.meshRendererComponent.castShadows = !1, this.smokeEntity.meshRendererComponent.receiveShadows = !1, this.smokeEntity.name = "_ParticleSystemSmoke", e.transformComponent.attachChild(this.smokeEntity.transformComponent), this.smokeEntity.addToWorld()
            }
        }, i.prototype.cleanup = function() {
            this.smokeEntity && (this.smokeEntity.removeFromWorld(), this.smokeEntity = null)
        }, e.default = i
    },
    426: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(124),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Sound Fade In",
            name: "Sound Fade In",
            type: "sound",
            description: "Fades in a sound. NOTE: On iOS devices, you need to play the first sound inside a touchend event (for example using the MouseUpAction).",
            canTransition: !0,
            parameters: [{
                name: "Sound",
                key: "sound",
                type: "sound",
                description: "Sound to fade."
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for the fading to complete.",
                default: 1e3
            }, {
                name: "On Sound End",
                key: "onSoundEnd",
                type: "boolean",
                description: "Whether to transition when the sound finishes playing, regardless of the specified transition time.",
                default: !1
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the time expires or when the sound finishes playing."
            }]
        };
        var c = {
            complete: "On Sound Fade In Complete"
        };
        i.getTransitionLabel = function(t) {
            return c[t]
        }, i.prototype.enter = function(t) {
            var e = this,
                n = t.getOwnerEntity();
            if (n.hasComponent("SoundComponent")) {
                var o = n.soundComponent.getSoundById(this.sound);
                if (o) {
                    var i = void 0;
                    try {
                        i = o.fadeIn(this.time / 1e3), this.onSoundEnd && (i = o.play())
                    } catch (t) {
                        console.warn("Could not play sound: " + t), i = u.default.resolve()
                    }
                    i.then(function() {
                        t.send(e.transitions.complete)
                    })
                }
            }
        }, e.default = i
    },
    427: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Sound Fade Out",
            name: "Sound Fade Out",
            type: "sound",
            description: "Fades out a sound and stops it.",
            canTransition: !0,
            parameters: [{
                name: "Sound",
                key: "sound",
                type: "sound",
                description: "Sound to fade out."
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for the fading to complete.",
                default: 1e3
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the sound fade completes."
            }]
        };
        var a = {
            complete: "On Sound Fade Out Complete"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function(t) {
            var e = this,
                n = t.getOwnerEntity();
            if (n.hasComponent("SoundComponent")) {
                var o = n.soundComponent.getSoundById(this.sound);
                o && o.fadeOut(this.time / 1e3).then(function() {
                    t.send(e.transitions.complete)
                })
            }
        }, e.default = o
    },
    428: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this._camera = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(5),
            u = o(s),
            c = n(24),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Switch Camera",
            name: "Switch Camera",
            type: "camera",
            description: "Switches to a selected camera.",
            parameters: [{
                name: "Camera",
                key: "cameraEntityRef",
                type: "camera",
                description: "Camera to switch to.",
                default: null
            }],
            transitions: []
        }, i.prototype.ready = function() {
            this._camera = p.default.mainCamera
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity()._world,
                n = e.entityManager.getEntityById(this.cameraEntityRef);
            n && n.cameraComponent && u.default.emit("sumerian.setCurrentCamera", {
                camera: n.cameraComponent.camera,
                entity: n
            })
        }, i.prototype.cleanup = function() {}, e.default = i
    },
    429: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(430),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tag",
            name: "Tag",
            type: "collision",
            description: "Sets a tag on the entity. Use tags to be able to capture collision events with the 'Collides' action.",
            parameters: [{
                name: "Tag",
                key: "tag",
                type: "string",
                control: "dropdown",
                description: "Checks for collisions with other objects having this tag.",
                default: "red",
                options: ["red", "blue", "green", "yellow"]
            }],
            transitions: []
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.proximityComponent ? e.proximityComponent.tag !== this.tag && (e.clearComponent("ProximityComponent"), e.setComponent(new u.default(this.tag))) : e.setComponent(new u.default(this.tag))
        }, i.prototype.cleanup = function(t) {
            var e = t.getOwnerEntity();
            e && e.clearComponent("ProximityComponent")
        }, e.default = i
    },
    430: function(t, e, n) {
        "use strict";

        function o(t) {
            r.default.apply(this, arguments), this.type = "ProximityComponent", Object.defineProperty(this, "tag", {
                value: t || "red",
                writable: !1
            })
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(8),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.prototype.attached = function(t) {
            var e = t._world;
            if (e) {
                var n = e.getSystem("ProximitySystem");
                n && n.add(t, this.tag)
            }
        }, o.prototype.detached = function(t) {
            var e = t._world;
            if (e) {
                var n = e.getSystem("ProximitySystem");
                n && n.remove(t, this.tag)
            }
        }, e.default = o
    },
    431: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Transition",
            name: "Transition",
            type: "transitions",
            description: "Transition to a selected state.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "transition",
                description: "State to transition to."
            }]
        };
        var a = {
            transition: "On Enter"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.enter = function(t) {
            t.send(this.transitions.transition)
        }, e.default = o
    },
    432: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(5),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Transition on Message",
            name: "Listen",
            type: "transitions",
            description: "Performs a transition on receiving a system bus message (event) on a specific channel.",
            canTransition: !0,
            parameters: [{
                name: "Message channel",
                key: "channel",
                type: "string",
                description: "Channel to listen to.",
                default: ""
            }],
            transitions: [{
                key: "transition",
                description: "State to transition to."
            }]
        }, i.getTransitionLabel = function(t, e) {
            var n = e.options.channel ? '"' + e.options.channel + '"' : "";
            return "transition" === t ? "On " + n + " event" : "On Message"
        }, i.prototype.enter = function(t) {
            this.eventListener = function() {
                t.send(this.transitions.transition)
            }.bind(this), u.default.addListener(this.channel, this.eventListener, !1)
        }, i.prototype.exit = function() {
            u.default.removeListener(this.channel, this.eventListener)
        }, e.default = i
    },
    433: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.entity = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(5),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "TriggerEnter",
            name: "TriggerEnter",
            type: "collision",
            description: "Transitions when the trigger collider is entered. This action only works if the entity has a Collider Component.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "enter",
                description: "State to transition to when enter occurs."
            }]
        }, i.getTransitionLabel = function(t) {
            return "enter" === t ? "On Trigger Enter" : void 0
        }, i.prototype.enter = function(t) {
            this.entity = t.getOwnerEntity();
            var e = this;
            this.listener = function(n) {
                (e.entity && n.entityA === e.entity || n.entityB === e.entity) && (e.entity = null, t.send(e.transitions.enter))
            }, u.default.addListener("sumerian.physics.triggerEnter", this.listener)
        }, i.prototype.exit = function() {
            u.default.removeListener("sumerian.physics.triggerEnter", this.listener), this.entity = null
        }, e.default = i
    },
    434: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.entity = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(5),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "TriggerLeave",
            name: "TriggerLeave",
            type: "collision",
            description: "Transitions when a collider is leaving the entity trigger collider. This action only works if the entity has a Collider Component.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "leave",
                description: "State to transition to when leave occurs."
            }]
        }, i.getTransitionLabel = function(t) {
            return "leave" === t ? "On Trigger Leave" : void 0
        }, i.prototype.enter = function(t) {
            this.entity = t.getOwnerEntity();
            var e = this;
            this.listener = function(n) {
                (e.entity && n.entityA === e.entity || n.entityB === e.entity) && (e.entity = null, t.send(e.transitions.leave))
            }, u.default.addListener("sumerian.physics.triggerExit", this.listener)
        }, i.prototype.exit = function() {
            u.default.removeListener("sumerian.physics.triggerExit", this.listener), this.entity = null
        }, e.default = i
    },
    435: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.fromCol = new u.default, this.toCol = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(51),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Light Color",
            name: "Tween Light",
            type: "light",
            description: "Tweens the color of the light.",
            parameters: [{
                name: "Color",
                key: "to",
                type: "vec3",
                control: "color",
                description: "Color of the light.",
                default: [1, 1, 1]
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for the transition to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the light tween was completed."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On Tween Light Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.lightComponent && (this.fromCol.set(e.lightComponent.light.color), this.toCol.setDirect(this.to[0], this.to[1], this.to[2]), this.startTime = t.getTime(), this.completed = !1)
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                var e = t.getOwnerEntity();
                if (e.lightComponent) {
                    var n = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                        o = p.default[this.easing1][this.easing2](n);
                    e.lightComponent.light.color.set(this.fromCol).lerp(this.toCol, o), n >= 1 && (t.send(this.transitions.complete), this.completed = !0)
                }
            }
        }, e.default = i
    },
    436: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.quatFrom = new p.default, this.quatTo = new p.default, this.quatFinal = new p.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(34),
            p = o(c),
            l = n(51),
            d = o(l);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Look At",
            name: "Tween Look At",
            type: "animation",
            description: "Transition the entity's rotation to face the set position.",
            canTransition: !0,
            parameters: [{
                name: "Position",
                key: "to",
                type: "position",
                description: "Look at point.",
                default: [0, 0, 0]
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for this movement to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the transition completes."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On Tween LookAt Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.transform;
            this.startTime = t.getTime(), this.quatFrom.fromRotationMatrix(n.rotation);
            var o = u.default.fromArray(this.to).sub(n.translation);
            this.rot = n.rotation.clone(), this.rot.lookAt(o, u.default.UNIT_Y), this.quatTo.fromRotationMatrix(this.rot), this.completed = !1
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                var e = t.getOwnerEntity(),
                    n = e.transformComponent.transform,
                    o = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    i = d.default[this.easing1][this.easing2](o);
                p.default.slerp(this.quatFrom, this.quatTo, i, this.quatFinal), this.quatFinal.toRotationMatrix(n.rotation), e.transformComponent.setUpdated(), o >= 1 && (t.send(this.transitions.complete), this.completed = !0)
            }
        }, e.default = i
    },
    437: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.fromPos = new u.default, this.toPos = new u.default, this.deltaPos = new u.default, this.oldPos = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(51),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Move",
            name: "Tween Move",
            type: "animation",
            description: "Transition to the set location.",
            canTransition: !0,
            parameters: [{
                name: "Translation",
                key: "to",
                type: "position",
                description: "Move.",
                default: [0, 0, 0]
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "If true add, otherwise set.",
                default: !0
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for this movement to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the movement completes."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On Tween Move Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity().transformComponent.sync();
            this.fromPos.set(e.transform.translation), this.toPos.setDirect(this.to[0], this.to[1], this.to[2]), this.relative && (this.oldPos.set(this.fromPos), this.toPos.add(this.fromPos)), this.startTime = t.getTime(), this.completed = !1
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                var e = t.getOwnerEntity().transformComponent.sync(),
                    n = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    o = p.default[this.easing1][this.easing2](n);
                this.relative ? (this.deltaPos.set(this.fromPos).lerp(this.toPos, o).sub(this.oldPos), e.transform.translation.add(this.deltaPos), this.oldPos.add(this.deltaPos)) : e.transform.translation.set(this.fromPos).lerp(this.toPos, o), e.setUpdated(), n >= 1 && (t.send(this.transitions.complete), this.completed = !0)
            }
        }, e.default = i
    },
    438: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(51),
            u = o(s),
            c = n(4),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Opacity",
            name: "Tween Material Opacity",
            type: "texture",
            description: "Tweens the opacity of a material.",
            parameters: [{
                name: "Opacity",
                key: "to",
                type: "float",
                control: "spinner",
                description: "Opacity.",
                default: 1
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                control: "spinner",
                description: "Time it takes for the transition to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the transition completes."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On Tween Opacity Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e.meshRendererComponent;
            n && (this.startTime = t.getTime(), this.material = n.materials[0], "NoBlending" === this.material.blendState.blending && (this.material.blendState.blending = "TransparencyBlending"), this.material.renderQueue < 2e3 && (this.material.renderQueue = 2e3), void 0 === this.material.uniforms.opacity && (this.material.uniforms.opacity = 1), this.uniforms = this.material.uniforms, this.from = this.uniforms.opacity, this.completed = !1)
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                if (t.getOwnerEntity().meshRendererComponent) {
                    var e = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                        n = u.default[this.easing1][this.easing2](e);
                    this.uniforms.opacity = p.default.lerp(n, this.from, this.to), e >= 1 && (t.send(this.transitions.complete), this.completed = !0)
                }
            }
        }, e.default = i
    },
    439: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.quatFrom = new u.default, this.quatTo = new u.default, this.quatFinal = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(34),
            u = o(s),
            c = n(31),
            p = o(c),
            l = n(4),
            d = o(l),
            f = n(51),
            y = o(f);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Rotation",
            name: "Tween Rotate",
            type: "animation",
            description: "Transition to the set rotation, in angles.",
            canTransition: !0,
            parameters: [{
                name: "Rotation",
                key: "to",
                type: "rotation",
                description: "Rotation.",
                default: [0, 0, 0]
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "If true add, otherwise set.",
                default: !0
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for this movement to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the rotation completes."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On Tween Rotation Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e.transformComponent.sync();
            this.startTime = t.getTime(), this.quatFrom.fromRotationMatrix(n.transform.rotation), this.quatTo.fromRotationMatrix((new p.default).fromAngles(this.to[0] * d.default.DEG_TO_RAD, this.to[1] * d.default.DEG_TO_RAD, this.to[2] * d.default.DEG_TO_RAD)), this.relative && this.quatTo.mul(this.quatFrom), this.completed = !1
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                var e = t.getOwnerEntity(),
                    n = e.transformComponent.sync().transform,
                    o = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    i = y.default[this.easing1][this.easing2](o);
                u.default.slerp(this.quatFrom, this.quatTo, i, this.quatFinal), this.quatFinal.toRotationMatrix(n.rotation), e.transformComponent.setUpdated(), o >= 1 && (t.send(this.transitions.complete), this.completed = !0)
            }
        }, e.default = i
    },
    440: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.fromScale = new u.default, this.toScale = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(51),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Scale",
            name: "Tween Scale",
            type: "animation",
            description: "Transition to the set scale.",
            canTransition: !0,
            parameters: [{
                name: "Scale",
                key: "to",
                type: "position",
                description: "Scale.",
                default: [0, 0, 0]
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "If true add, otherwise set.",
                default: !0
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for this movement to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the scaling completes."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On Tween Scale Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity().transformComponent;
            this.fromScale.set(e.transform.scale), this.toScale.setDirect(this.to[0], this.to[1], this.to[2]), this.relative && this.toScale.add(this.fromScale), this.startTime = t.getTime(), this.completed = !1
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                var e = t.getOwnerEntity().transformComponent,
                    n = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    o = p.default[this.easing1][this.easing2](n);
                e.transform.scale.set(this.fromScale).lerp(this.toScale, o), e.setUpdated(), n >= 1 && (t.send(this.transitions.complete), this.completed = !0)
            }
        }, e.default = i
    },
    441: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.fromOffset = new u.default, this.toOffset = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(37),
            u = o(s),
            c = n(51),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Texture Offset",
            name: "Tween Texture Offset",
            type: "texture",
            description: "Smoothly changes the texture offset of the entity.",
            canTransition: !0,
            parameters: [{
                name: "X Offset",
                key: "toX",
                type: "float",
                description: "X Offset.",
                default: 1
            }, {
                name: "Y Offset",
                key: "toY",
                type: "float",
                description: "Y Offset.",
                default: 1
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                description: "Time it takes for this transition to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the transition completes."
            }]
        }, i.getTransitionLabel = function(t) {
            return "complete" === t ? "On UV Tween Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e.meshRendererComponent;
            if (this.texture = null, n && 0 !== n.materials.length) {
                var o = n.materials[0];
                this.texture = o.getTexture("DIFFUSE_MAP"), this.texture && (this.fromOffset.set(this.texture.offset), this.toOffset.setDirect(this.toX, this.toY), this.relative && this.toOffset.add(this.fromOffset), this.startTime = t.getTime(), this.completed = !1)
            }
        }, i.prototype.update = function(t) {
            if (!this.completed && this.texture) {
                var e = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                    n = p.default[this.easing1][this.easing2](e);
                this.texture.offset.set(this.fromOffset).lerp(this.toOffset, n), e >= 1 && (t.send(this.transitions.complete), this.completed = !0)
            }
        }, e.default = i
    },
    442: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.currentTime = 0, this.totalWait = 0, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Wait",
            name: "Wait",
            type: "animation",
            description: "Performs a transition after a specified amount of time. A random time can be set, this will add between 0 and the set random time to the specified wait time.",
            canTransition: !0,
            parameters: [{
                name: "Time (ms)",
                key: "waitTime",
                type: "float",
                description: "Base time in milliseconds before transition fires.",
                default: 5e3
            }, {
                name: "Random (ms)",
                key: "randomTime",
                type: "float",
                description: "A random number of milliseconds (between 0 and this value) will be added to the base wait time.",
                default: 0
            }],
            transitions: [{
                key: "timeUp",
                description: "State to transition to when time up."
            }]
        }, o.getTransitionLabel = function(t) {
            return "timeUp" === t ? "On Wait End" : void 0
        }, o.prototype.enter = function() {
            this.completed = !1, this.currentTime = 0, this.totalWait = parseFloat(this.waitTime) + Math.random() * parseFloat(this.randomTime)
        }, o.prototype.update = function(t) {
            this.currentTime += 1e3 * t.getTpf(), this.currentTime >= this.totalWait && !this.completed && (this.completed = !0, t.send(this.transitions.timeUp))
        }, e.default = o
    },
    443: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.prototype.configure = function(t) {
            this.targets = t.transitions
        };
        var a = {
            87: "w",
            65: "a",
            83: "s",
            68: "d"
        };
        o.external = function() {
            var t = [];
            for (var e in a) {
                var n = a[e];
                t.push({
                    key: n,
                    name: "On key " + n.toUpperCase(),
                    description: "On key '" + n + "' pressed."
                })
            }
            return {
                key: "WASD Keys Listener",
                name: "WASD Keys",
                type: "controls",
                description: "Transitions to other states when the WASD keys are pressed.",
                canTransition: !0,
                parameters: [],
                transitions: t
            }
        }();
        var s = {
            w: "On Key W Pressed",
            a: "On Key A Pressed",
            s: "On Key S Pressed",
            d: "On Key D Pressed"
        };
        o.getTransitionLabel = function(t) {
            return s[t]
        }, o.prototype.enter = function(t) {
            this.eventListener = function(e) {
                var n = a[e.which];
                if (n) {
                    var o = this.targets[n];
                    "string" == typeof o && t.send(o)
                }
            }.bind(this), document.addEventListener("keydown", this.eventListener)
        }, o.prototype.exit = function() {
            document.removeEventListener("keydown", this.eventListener)
        }, e.default = o
    },
    444: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.type = "StateMachineComponent", this._machines = [], this._machinesById = {}, this.entity = null, this.vars = {}, this.system = null, this.time = 0, this.entered = !1, this.active = !0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(8),
            a = o(r),
            s = n(64),
            u = o(s),
            c = n(5),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.vars = {}, i.getVariable = function(t) {
            return i.vars[t]
        }, i.prototype.getVariable = function(t) {
            return void 0 !== this.vars[t] ? this.vars[t] : i.getVariable(t)
        }, i.applyOnVariable = function(t, e) {
            i.vars[t] = e(i.vars[t])
        }, i.prototype.applyOnVariable = function(t, e) {
            void 0 !== this.vars[t] ? this.vars[t] = e(this.vars[t]) : i.applyOnVariable(t, e)
        }, i.prototype.defineVariable = function(t, e) {
            this.vars[t] = e
        }, i.prototype.removeVariable = function(t) {
            delete this.vars[t]
        }, i.applyOnVariable = function(t, e) {
            this.vars[t] ? this.vars[t] = e(this.vars[t]) : i.vars[t] && i.applyOnVariable(t, e)
        }, i.prototype.addMachine = function(t) {
            t.parent = this, t.setRefs(this), this._machines.push(t), this._machinesById[t.id] = t
        }, i.prototype.removeMachine = function(t) {
            t.recursiveRemove(), u.default.remove(this._machines, t), delete this._machinesById[t.id]
        }, i.prototype.getMachineById = function(t) {
            return this._machinesById[t] || null
        }, i.prototype.init = function() {
            for (var t = 0; t < this._machines.length; t++) {
                var e = this._machines[t];
                e.setRefs(this), e.reset(), e.ready()
            }
        }, i.prototype.doEnter = function() {
            for (var t = 0; t < this._machines.length; t++) {
                this._machines[t].enter()
            }
        }, i.prototype.kill = function() {
            for (var t = 0; t < this._machines.length; t++) {
                this._machines[t].kill()
            }
        }, i.prototype.cleanup = function() {
            for (var t = 0; t < this._machines.length; t++) {
                this._machines[t].cleanup()
            }
        }, i.prototype.update = function() {
            if (this.active)
                for (var t = 0; t < this._machines.length; t++) {
                    var e = this._machines[t];
                    e.update()
                }
        }, i.prototype.pause = function() {
            this.active = !1, p.default.emit("sumerian.entity." + this.entity.name + ".fsm.pause")
        }, i.prototype.play = function() {
            this.active = !0, p.default.emit("sumerian.entity." + this.entity.name + ".fsm.play")
        }, e.default = i
    },
    445: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this._type = "StateMachineComponent"
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(20),
            a = o(r),
            s = n(444),
            u = o(s),
            c = n(12),
            p = o(c),
            l = n(3),
            d = o(l);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, a.default._registerClass("stateMachine", i), i.prototype._create = function() {
            return new u.default
        }, i.prototype._remove = function(t) {
            var e = t.stateMachineComponent;
            if (e) {
                for (var n = e._machines.length - 1; n >= 0; n--) {
                    var o = e._machines[n];
                    o.cleanup(), e.removeMachine(o)
                }
                e.cleanup()
            }
            t.clearComponent(this._type)
        }, i.prototype.update = function(t, e, n) {
            var o = this;
            return n = n || {}, n.reload = !0, a.default.prototype.update.call(this, t, e, n).then(function(t) {
                if (t) {
                    var i = [];
                    return d.default.forEach(e.machines, function(t) {
                        i.push(o._load(t.machineRef, n))
                    }, null, "sortValue"), p.default.all(i).then(function(e) {
                        for (var n = 0; n < e.length; n++) - 1 === t._machines.indexOf(e[n]) && t.addMachine(e[n]);
                        for (var n = t._machines.length - 1; n >= 0; n--) - 1 === e.indexOf(t._machines[n]) && t.removeMachine(t._machines[n]);
                        return t
                    })
                }
            })
        }, e.default = i
    },
    47: function(t, e, n) {
        "use strict";

        function o() {}
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), o.setParameters = function(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n],
                    i = o.key;
                void 0 !== t[i] ? this[i] = t[i] : this[i] = o.default
            }
        }, o.setTransitions = function(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n],
                    i = o.key;
                this.transitions = this.transitions || {}, this.transitions[i] = t.transitions[i]
            }
        }, o.getKey = function(t) {
            return o.keys[t] ? o.keys[t] : t.charCodeAt(0)
        }, o.keys = {
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            Shift: 16,
            Ctrl: 17,
            Alt: 18,
            Pause: 19,
            Capslock: 20,
            Esc: 27,
            Space: 32,
            Pageup: 33,
            Pagedown: 34,
            End: 35,
            Home: 36,
            Leftarrow: 37,
            Uparrow: 38,
            Rightarrow: 39,
            Downarrow: 40,
            Insert: 45,
            Delete: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            "0numpad": 96,
            "1numpad": 97,
            "2numpad": 98,
            "3numpad": 99,
            "4numpad": 100,
            "5numpad": 101,
            "6numpad": 102,
            "7numpad": 103,
            "8numpad": 104,
            "9numpad": 105,
            Multiply: 106,
            Plus: 107,
            Minus: 109,
            Dot: 110,
            Slash1: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            Equals: 187,
            Comma: 188,
            Slash: 191,
            Backslash: 220
        }, o.keyInverse = [], o.keyInverse = function(t) {
            for (var e = [], n = Object.keys(t), o = 0; o < n.length; o++) e[t[n[o]]] = n[o];
            return e
        }(o.keys), o.keyForCode = function(t) {
            return o.keyInverse[t] ? o.keyInverse[t] : "FsmUtils.keyForCode: key not found for code " + t
        };
        var i = function() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        };
        o.guid = function() {
            return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i()
        }, o.getValue = function(t, e) {
            return "number" == typeof t ? t : e.getVariable(t)
        }, e.default = o
    },
    745: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(376),
            r = o(i),
            a = n(430),
            s = o(a),
            u = n(385),
            c = o(u),
            p = n(2),
            l = o(p),
            d = n(379),
            f = o(d),
            y = n(380),
            m = o(y),
            h = n(788),
            v = o(h),
            g = n(789),
            _ = o(g),
            b = n(381),
            k = o(b),
            O = n(382),
            w = o(O),
            S = n(383),
            C = o(S),
            T = n(384),
            E = o(T),
            M = n(386),
            x = o(M),
            A = n(387),
            P = o(A),
            L = n(388),
            j = o(L),
            R = n(389),
            F = o(R),
            I = n(390),
            D = o(I),
            B = n(391),
            V = o(B),
            U = n(392),
            q = o(U),
            X = n(393),
            Y = o(X),
            H = n(790),
            W = o(H),
            N = n(394),
            K = o(N),
            Z = n(395),
            Q = o(Z),
            z = n(396),
            G = o(z),
            J = n(397),
            $ = o(J),
            tt = n(398),
            et = o(tt),
            nt = n(399),
            ot = o(nt),
            it = n(400),
            rt = o(it),
            at = n(401),
            st = o(at),
            ut = n(402),
            ct = o(ut),
            pt = n(403),
            lt = o(pt),
            dt = n(404),
            ft = o(dt),
            yt = n(405),
            mt = o(yt),
            ht = n(406),
            vt = o(ht),
            gt = n(407),
            _t = o(gt),
            bt = n(791),
            kt = o(bt),
            Ot = n(792),
            wt = o(Ot),
            St = n(408),
            Ct = o(St),
            Tt = n(409),
            Et = o(Tt),
            Mt = n(410),
            xt = o(Mt),
            At = n(411),
            Pt = o(At),
            Lt = n(412),
            jt = o(Lt),
            Rt = n(413),
            Ft = o(Rt),
            It = n(414),
            Dt = o(It),
            Bt = n(415),
            Vt = o(Bt),
            Ut = n(416),
            qt = o(Ut),
            Xt = n(417),
            Yt = o(Xt),
            Ht = n(418),
            Wt = o(Ht),
            Nt = n(419),
            Kt = o(Nt),
            Zt = n(420),
            Qt = o(Zt),
            zt = n(421),
            Gt = o(zt),
            Jt = n(793),
            $t = o(Jt),
            te = n(794),
            ee = o(te),
            ne = n(422),
            oe = o(ne),
            ie = n(795),
            re = o(ie),
            ae = n(796),
            se = o(ae),
            ue = n(423),
            ce = o(ue),
            pe = n(424),
            le = o(pe),
            de = n(425),
            fe = o(de),
            ye = n(426),
            me = o(ye),
            he = n(427),
            ve = o(he),
            ge = n(428),
            _e = o(ge),
            be = n(429),
            ke = o(be),
            Oe = n(431),
            we = o(Oe),
            Se = n(432),
            Ce = o(Se),
            Te = n(433),
            Ee = o(Te),
            Me = n(434),
            xe = o(Me),
            Ae = n(435),
            Pe = o(Ae),
            Le = n(436),
            je = o(Le),
            Re = n(437),
            Fe = o(Re),
            Ie = n(438),
            De = o(Ie),
            Be = n(439),
            Ve = o(Be),
            Ue = n(440),
            qe = o(Ue),
            Xe = n(441),
            Ye = o(Xe),
            He = n(442),
            We = o(He),
            Ne = n(443),
            Ke = o(Ne),
            Ze = n(797),
            Qe = o(Ze),
            ze = n(47),
            Ge = o(ze),
            Je = n(378),
            $e = o(Je),
            tn = n(377),
            en = o(tn),
            nn = n(444),
            on = o(nn),
            rn = n(798),
            an = o(rn),
            sn = n(445),
            un = o(sn),
            cn = n(799),
            pn = o(cn),
            ln = {
                MachineHandler: r.default,
                ProximityComponent: s.default,
                ProximitySystem: c.default,
                Action: l.default,
                Actions: f.default,
                AddLightAction: m.default,
                AddPositionAction: v.default,
                AddVariableAction: _.default,
                ApplyImpulseAction: k.default,
                ArrowsAction: w.default,
                AwsSdkReadyAction: C.default,
                CollidesAction: E.default,
                CompareCounterAction: x.default,
                CompareCountersAction: P.default,
                CompareDistanceAction: j.default,
                CopyJointTransformAction: F.default,
                DollyZoomAction: D.default,
                EmitAction: V.default,
                EvalAction: q.default,
                FireAction: Y.default,
                GetPositionAction: W.default,
                HideAction: K.default,
                HtmlAction: Q.default,
                InBoxAction: G.default,
                IncrementCounterAction: $.default,
                InFrustumAction: et.default,
                KeyDownAction: ot.default,
                KeyPressedAction: rt.default,
                KeyUpAction: st.default,
                LogMessageAction: ct.default,
                LookAtAction: lt.default,
                MouseDownAction: ft.default,
                MouseMoveAction: mt.default,
                MouseUpAction: vt.default,
                MoveAction: _t.default,
                MultiplyVariableAction: kt.default,
                NumberCompareAction: wt.default,
                PauseAnimationAction: Ct.default,
                PickAction: Et.default,
                PickAndExitAction: xt.default,
                RandomTransitionAction: Pt.default,
                RemoveAction: jt.default,
                RemoveLightAction: Ft.default,
                RemoveParticlesAction: Dt.default,
                ResumeAnimationAction: Vt.default,
                RotateAction: qt.default,
                ScaleAction: Yt.default,
                ScriptAction: Wt.default,
                SetAnimationAction: Kt.default,
                SetClearColorAction: Qt.default,
                SetCounterAction: Gt.default,
                SetLightRangeAction: $t.default,
                SetPositionAction: ee.default,
                SetRenderTargetAction: oe.default,
                SetRotationAction: re.default,
                SetVariableAction: se.default,
                ShakeAction: ce.default,
                ShowAction: le.default,
                SmokeAction: fe.default,
                SoundFadeInAction: me.default,
                SoundFadeOutAction: ve.default,
                SwitchCameraAction: _e.default,
                TagAction: ke.default,
                TransitionAction: we.default,
                TransitionOnMessageAction: Ce.default,
                TriggerEnterAction: Ee.default,
                TriggerLeaveAction: xe.default,
                TweenLightColorAction: Pe.default,
                TweenLookAtAction: je.default,
                TweenMoveAction: Fe.default,
                TweenOpacityAction: De.default,
                TweenRotationAction: Ve.default,
                TweenScaleAction: qe.default,
                TweenTextureOffsetAction: Ye.default,
                WaitAction: We.default,
                WasdAction: Ke.default,
                FSMUtil: Qe.default,
                FsmUtils: Ge.default,
                Machine: $e.default,
                State: en.default,
                StateMachineComponent: on.default,
                StateMachineSystem: an.default,
                StateMachineComponentHandler: un.default,
                StateMachineHandlers: pn.default
            };
        if ("undefined" != typeof window)
            for (var dn in ln) window.sumerian[dn] = ln[dn];
        e.default = ln
    },
    746: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(5),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "ApplyForce",
            name: "Apply force on rigid body",
            type: "physics",
            description: "Apply a force to the attached rigid body.",
            canTransition: !1,
            parameters: [{
                name: "Force",
                key: "force",
                type: "position",
                description: "Force to apply to the body.",
                default: [0, 0, 0]
            }, {
                name: "Apply point",
                key: "point",
                type: "position",
                description: "Where on the body to apply the force, relative to the center of mass.",
                default: [0, 0, 0]
            }, {
                name: "Space",
                key: "space",
                type: "string",
                control: "dropdown",
                description: "The space where the force and apply point are defined.",
                default: "World",
                options: ["World", "Local"]
            }],
            transitions: []
        };
        var l = new u.default,
            d = new u.default;
        i.prototype.enter = function(t) {
            p.default.addListener("sumerian.physics.substep", this.substepListener = function() {
                var e = t.getOwnerEntity();
                e && e.rigidBodyComponent && (l.setArray(this.force), d.setArray(this.point), "World" === this.space ? e.rigidBodyComponent.applyForce(l, d) : e.rigidBodyComponent.applyForceLocal(l, d))
            }.bind(this))
        }, i.prototype.exit = function() {
            p.default.removeListener("sumerian.physics.substep", this.substepListener)
        }, e.default = i
    },
    747: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(5),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "ApplyTorque",
            name: "Apply torque on rigid body",
            type: "physics",
            description: "Apply a torque to the attached rigid body.",
            canTransition: !1,
            parameters: [{
                name: "Torque",
                key: "torque",
                type: "position",
                description: "Torque to apply to the body.",
                default: [0, 0, 0]
            }, {
                name: "Space",
                key: "space",
                type: "string",
                control: "dropdown",
                description: "Whether to apply the torque in local or world space.",
                default: "World",
                options: ["World", "Local"]
            }],
            transitions: []
        };
        var l = new u.default;
        i.prototype.enter = function(t) {
            p.default.addListener("sumerian.physics.substep", this.substepListener = function() {
                var e = t.getOwnerEntity();
                e && e.rigidBodyComponent && (l.setArray(this.torque), "World" === this.space ? e.rigidBodyComponent.applyTorque(l) : e.rigidBodyComponent.applyTorqueLocal(l))
            }.bind(this))
        }, i.prototype.exit = function() {
            p.default.removeListener("sumerian.physics.substep", this.substepListener)
        }, e.default = i
    },
    748: function(t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function r(t, e) {
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
        var a = function() {
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
            s = n(2),
            u = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(s),
            c = function(t) {
                function e() {
                    return o(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return r(e, t), a(e, [{
                    key: "enter",
                    value: function(t) {
                        var e = this,
                            n = t.getOwnerEntity();
                        if (!n.hasComponent("SpeechComponent")) return void console.warn("[Sumerian] Entity does not have a SpeechComponent associated with it.");
                        var o = n.speechComponent.getSpeechById(this.speech);
                        return o ? o.setVolume(this.volume).then(function(n) {
                            return t.send(e.transitions.complete)
                        }) : void console.warn("[Sumerian] No matching speech was found.")
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t, e) {
                        return "On Volume Changed"
                    }
                }]), e
            }(u.default);
        c.external = {
            key: "ChangeSpeechVolume",
            type: "Speech",
            name: "Change Speech Volume",
            description: "Changes the volume of a speech file. This temporarily overrides the current volume for a speech file.",
            canTransition: !0,
            parameters: [{
                name: "Speech",
                key: "speech",
                type: "speech",
                description: "Speech to change the volume for."
            }, {
                name: "Volume",
                key: "volume",
                min: "0",
                max: "1",
                type: "float",
                control: "slider",
                description: "Sets the volume for the speech."
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the speech volume is changed."
            }]
        }, e.default = c
    },
    749: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.selected = !1, this.x = 0, this.y = 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Click/Tap",
            name: "Click/Tap on entity",
            type: "controls",
            description: "Listens for a click/tap event on the entity and performs a transition.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "click",
                description: "State to transition to when entity is clicked."
            }]
        }, o.getTransitionLabel = function() {
            return "On Click/Tap Entity"
        }, o.prototype.enter = function(t) {
            var e = this;
            this.downListener = function(t) {
                var n = void 0,
                    o = void 0,
                    i = e.sumerianRunner,
                    r = i.renderer.domElement;
                if ("touchstart" === t.type || "touchend" === t.type) n = t.changedTouches[0].pageX - r.getBoundingClientRect().left, o = t.changedTouches[0].pageY - r.getBoundingClientRect().top;
                else {
                    var a = r.getBoundingClientRect();
                    n = t.clientX - a.left, o = t.clientY - a.top
                }
                var s = i.pickSync(n, o),
                    u = i.world.entityManager.getEntityByIndex(s.id);
                u && u.traverseUp(function(t) {
                    if (t === e.ownerEntity) return e.x = n, e.y = o, e.selected = !0, !1
                })
            }, this.upListener = function(n) {
                if (e.selected) {
                    e.selected = !1;
                    var o = void 0,
                        i = void 0,
                        r = e.sumerianRunner,
                        a = r.renderer.domElement,
                        s = a.getBoundingClientRect();
                    "touchstart" === n.type || "touchend" === n.type ? (o = n.changedTouches[0].pageX - s.left, i = n.changedTouches[0].pageY - s.top) : (o = n.clientX - s.left, i = n.clientY - s.top);
                    var u = e.x - o,
                        c = e.y - i;
                    if (!(Math.abs(u) > 10 || Math.abs(c) > 10)) {
                        var p = r.pickSync(o, i),
                            l = r.world.entityManager.getEntityByIndex(p.id);
                        l && l.traverseUp(function(n) {
                            if (n === e.ownerEntity) return t.send(e.transitions.click), !1
                        })
                    }
                }
            }, this.ownerEntity = t.getOwnerEntity(), this.sumerianRunner = this.ownerEntity._world.sumerianRunner, document.addEventListener("mousedown", this.downListener), document.addEventListener("touchstart", this.downListener), document.addEventListener("mouseup", this.upListener), document.addEventListener("touchend", this.upListener), this.selected = !1
        }, o.prototype.exit = function() {
            document.removeEventListener("mousedown", this.downListener), document.removeEventListener("touchstart", this.downListener), document.removeEventListener("mouseup", this.upListener), document.removeEventListener("touchend", this.upListener)
        }, e.default = o
    },
    750: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.domElements = null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "domEvent",
            name: "DOM Event Listen",
            type: "misc",
            description: "Adds a DOM event listener on one or many elements (specified by a query selector), and performs a transition on a given event.",
            canTransition: !0,
            parameters: [{
                name: "Event name",
                key: "eventName",
                type: "string",
                description: 'DOM event to listen to, for example "click", "mousedown", "keydown", etc.',
                default: "click"
            }, {
                name: "Query Selector",
                key: "querySelector",
                type: "string",
                description: 'Query selector that matches your DOM element(s). For example, set "canvas" if you want to match all <canvas> elements, or ".myClass" to match all elements with your class.',
                default: "body"
            }, {
                name: "Use capture",
                key: "useCapture",
                type: "boolean",
                description: "",
                default: !0
            }, {
                name: "Stop propagation",
                key: "stopPropagation",
                type: "boolean",
                description: "",
                default: !0
            }, {
                name: "Prevent Default",
                key: "preventDefault",
                type: "boolean",
                description: "",
                default: !1
            }],
            transitions: [{
                key: "event",
                description: "State to transition to when the DOM event triggers."
            }]
        }, o.getTransitionLabel = function(t, e) {
            return "On " + e.options.eventName
        }, o.prototype.enter = function(t) {
            this.eventListener = function(e) {
                t.send(this.transitions.event), this.stopPropagation && e.stopPropagation(), this.preventDefault && e.preventDefault()
            }.bind(this);
            for (var e = this.domElements = document.querySelectorAll(this.querySelector), n = 0; n < e.length; n++) e[n].addEventListener(this.eventName, this.eventListener, !!this.useCapture)
        }, o.prototype.exit = function() {
            var t = this.domElements;
            if (t) {
                for (var e = 0; e < t.length; e++) t[e].removeEventListener(this.eventName, this.eventListener);
                this.domElements = null
            }
        }, e.default = o
    },
    751: function(t, e, n) {
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
            u = n(24),
            c = o(u),
            p = n(0),
            l = o(p),
            d = n(2),
            f = o(d),
            y = function(t) {
                function e(t, n) {
                    i(this, e);
                    var o = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                    return o._lastCameraLocation = new l.default, o._lastCameraUp = new l.default, o
                }
                return a(e, t), s(e, [{
                    key: "enter",
                    value: function(t) {
                        this.everyFrame || this._updateOrientation(t)
                    }
                }, {
                    key: "update",
                    value: function(t) {
                        this.everyFrame && this._updateOrientation(t)
                    }
                }, {
                    key: "_updateOrientation",
                    value: function(t) {
                        if (c.default.mainCamera) {
                            var e = t.getOwnerEntity();
                            this._lastCameraLocation.equals(c.default.mainCamera.translation) && this._lastCameraUp.equals(c.default.mainCamera._up) || (e.transformComponent.transform.lookAt(c.default.mainCamera.translation, c.default.mainCamera._up), e.transformComponent.setUpdated(), this._lastCameraLocation.copy(c.default.mainCamera.translation), this._lastCameraUp.copy(c.default.mainCamera._up))
                        }
                    }
                }]), e
            }(f.default);
        y.external = {
            key: "Face Current Camera",
            name: "Face Current Camera",
            type: "animation",
            description: "Rotates the entity so that it faces the current camera. The entity's up vector is matched to the current camera's up vector.",
            parameters: [{
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, e.default = y
    },
    752: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.first = !0, this.hit = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(195),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.types = {
            fast: "Bounding (Fast)",
            slow: "Per pixel (Slow)"
        }, i.external = {
            key: "Hover Enter",
            name: "Entity Hover Enter",
            type: "controls",
            description: "Listens for a hover enter event on the entity and performs a transition.",
            canTransition: !0,
            parameters: [{
                name: "Accuracy",
                key: "type",
                type: "string",
                control: "dropdown",
                description: "Hover accuracy/performance selection.",
                default: i.types.fast,
                options: [i.types.fast, i.types.slow]
            }],
            transitions: [{
                key: "enter",
                description: "State to transition to when entity is entered."
            }]
        }, i.getTransitionLabel = function() {
            return "On Entity Hover Enter"
        }, i.prototype.enter = function(t) {
            var e = this,
                n = function(t) {
                    if (!t) return !1;
                    var n = !1;
                    return t.traverseUp(function(t) {
                        if (t === e.ownerEntity) return n = !0, !1
                    }), n
                },
                o = function(o) {
                    var i = n(o);
                    !e.first && e.hit || !i || t.send(e.transitions.enter), e.first = !1, e.hit = i
                };
            this.moveListener = function(t) {
                var n = void 0,
                    r = void 0,
                    a = e.sumerian.renderer.domElement;
                if ("touchstart" === t.type || "touchend" === t.type || "touchmove" === t.type) {
                    var s = a.getBoundingClientRect();
                    n = t.changedTouches[0].pageX - s.left, r = t.changedTouches[0].pageY - s.top
                } else {
                    var s = a.getBoundingClientRect();
                    n = t.clientX - s.left, r = t.clientY - s.top
                }
                var c = e.sumerian.renderSystem.camera,
                    p = null;
                if (e.type === i.types.slow) {
                    var l = e.sumerian.pickSync(n, r);
                    p = e.sumerian.world.entityManager.getEntityByIndex(l.id)
                } else {
                    var d = u.default.pick(e.sumerian.world, c, n, r);
                    d.length > 0 && (p = d[0].entity)
                }
                o(p)
            }, this.ownerEntity = t.getOwnerEntity(), this.sumerian = this.ownerEntity._world.sumerianRunner, document.addEventListener("mousemove", this.moveListener), document.addEventListener("touchmove", this.moveListener), this.first = !0, this.hit = !1
        }, i.prototype.exit = function() {
            document.removeEventListener("mousemove", this.moveListener), document.removeEventListener("touchmove", this.moveListener)
        }, e.default = i
    },
    753: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.first = !0, this.hit = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(195),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.types = {
            fast: "Bounding (Fast)",
            slow: "Per pixel (Slow)"
        }, i.external = {
            key: "Hover Exit",
            name: "Entity Hover Exit",
            type: "controls",
            description: "Listens for a hover exit event on the entity and performs a transition.",
            canTransition: !0,
            parameters: [{
                name: "Accuracy",
                key: "type",
                type: "string",
                control: "dropdown",
                description: "Hover accuracy/performance selection.",
                default: i.types.fast,
                options: [i.types.fast, i.types.slow]
            }],
            transitions: [{
                key: "exit",
                description: "State to transition to when entity is exited."
            }]
        }, i.getTransitionLabel = function() {
            return "On Entity Hover Exit"
        }, i.prototype.enter = function(t) {
            var e = this,
                n = function(t) {
                    if (!t) return !1;
                    var n = !1;
                    return t.traverseUp(function(t) {
                        if (t === e.ownerEntity) return n = !0, !1
                    }), n
                },
                o = function(o) {
                    var i = n(o);
                    !e.first && !e.hit || i || t.send(e.transitions.exit), e.hit = i, e.first = !1
                };
            this.moveListener = function(t) {
                var n = void 0,
                    r = void 0,
                    a = e.sumerian.renderer.domElement;
                if ("touchstart" === t.type || "touchend" === t.type || "touchmove" === t.type) n = t.changedTouches[0].pageX - a.getBoundingClientRect().left, r = t.changedTouches[0].pageY - a.getBoundingClientRect().top;
                else {
                    var s = a.getBoundingClientRect();
                    n = t.clientX - s.left, r = t.clientY - s.top
                }
                var c = e.sumerian.renderSystem.camera,
                    p = null;
                if (e.type === i.types.slow) {
                    var l = e.sumerian.pickSync(n, r);
                    p = e.sumerian.world.entityManager.getEntityByIndex(l.id)
                } else {
                    var d = u.default.pick(e.sumerian.world, c, n, r);
                    d.length > 0 && (p = d[0].entity)
                }
                o(p)
            }, this.ownerEntity = t.getOwnerEntity(), this.sumerian = this.ownerEntity._world.sumerianRunner, document.addEventListener("mousemove", this.moveListener), document.addEventListener("touchmove", this.moveListener), this.first = !0, this.hit = !1
        }, i.prototype.exit = function() {
            document.removeEventListener("mousemove", this.moveListener), document.removeEventListener("touchmove", this.moveListener)
        }, e.default = i
    },
    754: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Mouse Button Pressed",
            name: "Mouse Button Pressed",
            type: "controls",
            description: "Listens for a mouse button press event and performs a transition. Works over transition boundaries..",
            canTransition: !0,
            parameters: [{
                name: "Button",
                key: "button",
                type: "string",
                control: "dropdown",
                description: "Mouse Button to listen for.",
                default: "Left",
                options: ["Left", "Middle", "Right"]
            }],
            transitions: [{
                key: "mousedown",
                description: "State to transition to when the mouse button is pressed."
            }]
        };
        var a = {
            mousedown: "Mouse Button Pressed"
        };
        o.getTransitionLabel = function(t, e) {
            if (a[t]) return "On " + e.options.button + " " + a[t]
        }, o.prototype.enter = function(t) {
            t.getInputState(this.button) && t.send(this.transitions.mousedown)
        }, o.prototype.update = function(t) {
            t.getInputState(this.button) && t.send(this.transitions.mousedown)
        }, e.default = o
    },
    755: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Mute sounds",
            name: "Mute sounds",
            type: "sound",
            description: "Mute all sounds globally.",
            canTransition: !1,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getWorld();
            if (e) {
                var n = e.getSystem("SoundSystem");
                n && n.mute()
            }
        }, e.default = o
    },
    756: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "transitionOnNextFrame",
            name: "Transition on next frame",
            type: "transitions",
            description: "Transition to a selected state on the next frame.",
            canTransition: !0,
            parameters: [],
            transitions: [{
                key: "transition",
                name: "On Next Frame",
                description: "State to transition to on next frame."
            }]
        };
        var a = {
            transition: "On Next Frame"
        };
        o.getTransitionLabel = function(t) {
            return a[t]
        }, o.prototype.update = function(t) {
            t.send(this.transitions.transition)
        }, e.default = o
    },
    757: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "pauseParticleSystem",
            name: "Pause Particle System",
            type: "misc",
            description: "Pauses the particle system on the entity.",
            canTransition: !1,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e && e.particleSystemComponent && e.particleSystemComponent.pause()
        }, e.default = o
    },
    758: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Pause Sound",
            name: "Pause Sound",
            type: "sound",
            description: "Pauses a sound.",
            canTransition: !1,
            parameters: [{
                name: "Sound",
                key: "sound",
                type: "sound",
                description: "Sound to pause."
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            if (e.hasComponent("SoundComponent")) {
                var n = e.soundComponent.getSoundById(this.sound);
                n && n.pause()
            }
        }, e.default = o
    },
    759: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Pause Timeline",
            name: "Pause Timeline",
            type: "timeline",
            description: "Pauses the timeline.",
            canTransition: !0,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.hasComponent("TimelineComponent") && e.timelineComponent.pause()
        }, e.default = o
    },
    760: function(t, e, n) {
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
            u = n(2),
            c = o(u),
            p = n(204),
            l = o(p),
            d = n(5),
            f = o(d),
            y = n(124),
            m = (o(y), function(t) {
                function e() {
                    return i(this, e), r(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return a(e, t), s(e, [{
                    key: "enter",
                    value: function(t) {
                        var e = this,
                            n = t.getOwnerEntity();
                        n.hasComponent("HostComponent") && (this._emoteStoppedEventListener = function() {
                            return t.send(e.transitions.complete)
                        }, f.default.addListener(l.default.getEmoteStoppedEventName(n.id), this._emoteStoppedEventListener), f.default.emit(l.default.getEmoteEventName(n.id), this.emote))
                    }
                }, {
                    key: "exit",
                    value: function(t) {
                        var e = t.getOwnerEntity();
                        f.default.removeListener(l.default.getEmoteStoppedEventName(e.id), this._emoteStoppedEventListener)
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t) {
                        return e.labels[t]
                    }
                }]), e
            }(c.default));
        Object.defineProperty(m, "labels", {
            value: {
                complete: "On Emote End"
            },
            writable: !1,
            enumerable: !0,
            configurable: !1
        }), m.external = {
            key: "Play Emote",
            name: "Play Emote",
            type: "host",
            description: "Plays a emote on a host, overriding gesture and posture animations.",
            canTransition: !0,
            parameters: [{
                name: "Emote",
                key: "emote",
                type: "emote",
                description: "Emote to play."
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the emote finishes playing."
            }]
        }, e.default = m
    },
    761: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(124),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Play Sound",
            name: "Play Sound",
            type: "sound",
            description: "Plays a sound. NOTE: On iOS devices, you need to play the first sound inside a touchend event (for example using the MouseUpAction).",
            canTransition: !0,
            parameters: [{
                name: "Sound",
                key: "sound",
                type: "sound",
                description: "Sound to play."
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the sound finishes playing."
            }]
        };
        var c = {
            complete: "On Sound End"
        };
        i.getTransitionLabel = function(t) {
            return c[t]
        }, i.prototype.enter = function(t) {
            var e = this,
                n = t.getOwnerEntity();
            if (n.hasComponent("SoundComponent")) {
                var o = n.soundComponent.getSoundById(this.sound);
                if (o) {
                    var i = void 0;
                    try {
                        i = o.play()
                    } catch (t) {
                        console.warn("Could not play sound: " + t), i = u.default.resolve()
                    }
                    i.then(function() {
                        t.send(e.transitions.complete)
                    })
                }
            }
        }, e.default = i
    },
    762: function(module, exports, __webpack_require__) {
        "use strict";

        function _interopRequireDefault(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function _classCallCheck(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function _possibleConstructorReturn(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function _inherits(t, e) {
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
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
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
            _get = function t(e, n, o) {
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
            _Action2 = __webpack_require__(2),
            _Action3 = _interopRequireDefault(_Action2),
            _ObjectUtils = __webpack_require__(3),
            _ObjectUtils2 = _interopRequireDefault(_ObjectUtils),
            _Script = __webpack_require__(76),
            _Script2 = _interopRequireDefault(_Script),
            ScriptConditionAction = function(_Action) {
                function ScriptConditionAction() {
                    return _classCallCheck(this, ScriptConditionAction), _possibleConstructorReturn(this, (ScriptConditionAction.__proto__ || Object.getPrototypeOf(ScriptConditionAction)).apply(this, arguments))
                }
                return _inherits(ScriptConditionAction, _Action), _createClass(ScriptConditionAction, [{
                    key: "configure",
                    value: function(t) {
                        _get(ScriptConditionAction.prototype.__proto__ || Object.getPrototypeOf(ScriptConditionAction.prototype), "configure", this).call(this, t), delete this._script
                    }
                }, {
                    key: "enter",
                    value: function(t) {
                        this._script && this._scriptSystem.callScriptFunction(this._script, this._script.enter)
                    }
                }, {
                    key: "ready",
                    value: function ready(fsm) {
                        if (this._scriptSystem = fsm.getWorld().getSystem("ScriptSystem"), !this._script && this.expression && this._scriptSystem) {
                            var that = this;
                            this._script = _Script2.default.create({
                                enter: function enter(args, ctx, sumerian) {
                                    eval(that.expression) ? fsm.send(that.transitions.true) : fsm.send(that.transitions.false)
                                }
                            }), this._script.enabled = !0;
                            var context = {};
                            _ObjectUtils2.default.extend(context, fsm.getState().getScriptContext()), _ObjectUtils2.default.extend(context, fsm.getState().parent.getScriptContext()), this._script.context = this._scriptSystem.makeScriptContext(fsm.getOwnerEntity(), context)
                        }
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t, e) {
                        var n = e.options.name || "Condition";
                        return "true" === t ? "On " + n + " True" : "false" === t ? "On " + n + " False" : void 0
                    }
                }]), ScriptConditionAction
            }(_Action3.default);
        ScriptConditionAction.external = {
            key: "ExecuteScriptCondition",
            type: "Script",
            name: "Execute Script Condition",
            description: "Executes a script expression on enter and signals a transition based on the result's truthy or falsey value.",
            canTransition: !0,
            parameters: [{
                key: "expression",
                name: "Expression",
                type: "string",
                description: "The expression to evaluate.",
                default: 'ctx.entityData.example === "hello"'
            }, {
                key: "name",
                name: "Name",
                type: "string",
                description: "The name of the condition.",
                default: "Condition"
            }],
            transitions: [{
                key: "true",
                description: "State to transition to when the condition is truthy."
            }, {
                key: "false",
                description: "State to transition to when the condition is falsey."
            }]
        }, exports.default = ScriptConditionAction
    },
    763: function(module, exports, __webpack_require__) {
        "use strict";

        function _interopRequireDefault(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function _classCallCheck(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function _possibleConstructorReturn(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function _inherits(t, e) {
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
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
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
            _get = function t(e, n, o) {
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
            _Action2 = __webpack_require__(2),
            _Action3 = _interopRequireDefault(_Action2),
            _ObjectUtils = __webpack_require__(3),
            _ObjectUtils2 = _interopRequireDefault(_ObjectUtils),
            _Script = __webpack_require__(76),
            _Script2 = _interopRequireDefault(_Script),
            ScriptExpressionAction = function(_Action) {
                function ScriptExpressionAction() {
                    return _classCallCheck(this, ScriptExpressionAction), _possibleConstructorReturn(this, (ScriptExpressionAction.__proto__ || Object.getPrototypeOf(ScriptExpressionAction)).apply(this, arguments))
                }
                return _inherits(ScriptExpressionAction, _Action), _createClass(ScriptExpressionAction, [{
                    key: "configure",
                    value: function(t) {
                        _get(ScriptExpressionAction.prototype.__proto__ || Object.getPrototypeOf(ScriptExpressionAction.prototype), "configure", this).call(this, t), delete this._script
                    }
                }, {
                    key: "enter",
                    value: function(t) {
                        this._script && this._scriptSystem.callScriptFunction(this._script, this._script.enter)
                    }
                }, {
                    key: "ready",
                    value: function ready(fsm) {
                        if (this._scriptSystem = fsm.getWorld().getSystem("ScriptSystem"), !this._script && this.expression && this._scriptSystem) {
                            var that = this;
                            this._script = _Script2.default.create({
                                enter: function enter(args, ctx, sumerian) {
                                    eval(that.expression)
                                }
                            }), this._script.enabled = !0;
                            var context = {};
                            _ObjectUtils2.default.extend(context, fsm.getState().getScriptContext()), _ObjectUtils2.default.extend(context, fsm.getState().parent.getScriptContext()), this._script.context = this._scriptSystem.makeScriptContext(fsm.getOwnerEntity(), context)
                        }
                    }
                }]), ScriptExpressionAction
            }(_Action3.default);
        ScriptExpressionAction.external = {
            key: "ExecuteScriptExpression",
            type: "Script",
            name: "Execute Script Expression",
            description: "Executes a script expression on enter.",
            canTransition: !1,
            parameters: [{
                key: "expression",
                name: "Expression",
                type: "string",
                description: "The expression to evaluate.",
                default: 'ctx.entityData.example = "hello"'
            }],
            transitions: []
        }, exports.default = ScriptExpressionAction
    },
    764: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Animation Offset",
            name: "Set Animation Offset",
            type: "animation",
            description: "Sets animation clip offset.",
            parameters: [{
                name: "Offset (sec)",
                key: "offset",
                type: "float",
                description: "Animation offset",
                default: 0
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.animationComponent && e.animationComponent.shiftClipTime(this.offset)
        }, e.default = o
    },
    765: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Html Text",
            name: "Set Html Text",
            type: "fx",
            description: "Sets the contents of an HTML element.",
            parameters: [{
                name: "Entity (optional)",
                key: "entity",
                type: "entity",
                description: "Entity that has an HTML component."
            }, {
                name: "Html element selector",
                key: "selector",
                type: "string",
                description: "Element selector to set text on.",
                default: "p"
            }, {
                name: "Content",
                key: "content",
                type: "string",
                description: "Content to set.",
                default: "Hello"
            }, {
                name: "Allow HTML",
                key: "html",
                type: "boolean",
                description: "Set to true if the content contains HTML. This will make the action use .innerHTML instead of .innerText.",
                default: !1
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity();
            if (e && e.htmlComponent && this.selector.length > 0)
                for (var n = e.htmlComponent.domElement.querySelectorAll(this.selector), o = 0; o < n.length; o++) {
                    var i = n[o];
                    this.html ? i.innerHTML = this.content : i.innerText = this.content
                }
        }, e.default = o
    },
    766: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Light Properties",
            name: "Set Light Properties",
            description: "Sets various properties of a light.",
            parameters: [{
                name: "Entity (optional)",
                key: "entity",
                type: "entity",
                description: "Entity that has a light."
            }, {
                name: "Color",
                key: "color",
                type: "vec3",
                control: "color",
                description: "Light color.",
                default: [1, 1, 1]
            }, {
                name: "Intensity",
                key: "intensity",
                type: "float",
                description: "Light intensity.",
                default: 1
            }, {
                name: "Specular Intensity",
                key: "specularIntensity",
                type: "float",
                description: "Specular light intensity.",
                default: 1
            }, {
                name: "Range",
                key: "range",
                type: "float",
                description: "Light range (for point/spot lights).",
                default: 100
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity();
            e && e.lightComponent && e.lightComponent.light && (e.lightComponent.light.color.setDirect(this.color[0], this.color[1], this.color[2]), e.lightComponent.light.intensity = this.intensity, e.lightComponent.light.specularIntensity = this.specularIntensity, e.lightComponent.light.range = this.range)
        }, e.default = o
    },
    767: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Material Color",
            name: "Set Material Color",
            type: "texture",
            description: "Sets the color of a material.",
            parameters: [{
                name: "Entity (optional)",
                key: "entity",
                type: "entity",
                description: "Entity that has a material."
            }, {
                name: "Color type",
                key: "type",
                type: "string",
                control: "dropdown",
                description: "Color type.",
                default: "Diffuse",
                options: ["Diffuse", "Emissive", "Specular", "Ambient"]
            }, {
                name: "Color",
                key: "color",
                type: "vec3",
                control: "color",
                description: "Color.",
                default: [1, 1, 1]
            }],
            transitions: []
        };
        var a = {
            Diffuse: "materialDiffuse",
            Emissive: "materialEmissive",
            Specular: "materialSpecular",
            Ambient: "materialAmbient"
        };
        o.prototype.enter = function(t) {
            var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity();
            if (e && e.meshRendererComponent) {
                var n = e.meshRendererComponent.materials[0],
                    o = a[this.type];
                n.uniforms[o] = n.uniforms[o] || [1, 1, 1, 1];
                var i = n.uniforms[o];
                i[0] = this.color[0], i[1] = this.color[1], i[2] = this.color[2]
            }
        }, e.default = o
    },
    768: function(t, e, n) {
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
            u = n(2),
            c = o(u),
            p = n(206),
            l = (o(p), n(5)),
            d = (o(l), function(t) {
                function e() {
                    return i(this, e), r(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return a(e, t), s(e, [{
                    key: "enter",
                    value: function(t) {
                        var e = t.getOwnerEntity(),
                            n = this.entity ? e._world.entityManager.getEntityById(this.entity.entityRef) : null,
                            o = e.hasComponent("HostComponent") && e.hostComponent._pointOfInterestTargeter && e.hostComponent._pointOfInterestTargeter.events && e.hostComponent._pointOfInterestTargeter.events.setLookAtTarget;
                        n && o && o.emit(n)
                    }
                }]), e
            }(c.default));
        d.external = {
            key: "Set Point of Interest Target",
            name: "Set Point of Interest Target",
            type: "host",
            description: "Sets the Point of Interest Target on a host component.",
            parameters: [{
                name: "Target",
                key: "entity",
                type: "entity",
                description: "Entity to switch the Host Component Point of Intest Target to.",
                default: null
            }],
            transitions: []
        }, e.default = d
    },
    769: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Set Rigid Body Angular Velocity",
            name: "Set Rigid Body Angular Velocity",
            type: "physics",
            description: "Set the angular velocity of the rigid body component.",
            canTransition: !1,
            parameters: [{
                name: "Angular velocity",
                key: "velocity",
                type: "position",
                description: "Angular velocity to set.",
                default: [0, 0, 0]
            }],
            transitions: []
        };
        var c = new u.default;
        i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e && e.rigidBodyComponent && (c.setArray(this.velocity), e.rigidBodyComponent.setAngularVelocity(c))
        }, e.default = i
    },
    770: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Set Rigid Body Position",
            name: "Set Rigid Body Position",
            type: "physics",
            description: "Set the position of the rigid body.",
            canTransition: !1,
            parameters: [{
                name: "Position",
                key: "position",
                type: "position",
                description: "Absolute world position to set.",
                default: [0, 0, 0]
            }],
            transitions: []
        };
        var c = new u.default;
        i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e && e.rigidBodyComponent && (c.setArray(this.position), e.rigidBodyComponent.setPosition(c))
        }, e.default = i
    },
    771: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(31),
            u = o(s),
            c = n(34),
            p = o(c),
            l = n(4),
            d = o(l);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "setRigidBodyRotation",
            name: "Set Rigid Body Rotation",
            type: "physics",
            canTransition: !1,
            parameters: [{
                name: "Rotation",
                key: "rotation",
                type: "vec3",
                description: "Absolute rotation to set.",
                default: [0, 0, 0]
            }, {
                name: "Relative",
                key: "relative",
                type: "boolean",
                description: "Relative to the current rotation or absolute.",
                default: !1
            }],
            transitions: []
        }, i.prototype.setRotation = function() {
            var t = new u.default,
                e = new u.default,
                n = new p.default,
                o = new p.default,
                i = d.default.DEG_TO_RAD;
            return function(r) {
                var a = r.getOwnerEntity();
                if (a && a.rigidBodyComponent) {
                    var s = this.rotation;
                    t.fromAngles(s[0] * i, s[1] * i, s[2] * i), this.relative && (a.rigidBodyComponent.getQuaternion(o), e.copyQuaternion(o), t.mul2(e, t)), n.fromRotationMatrix(t), a.rigidBodyComponent.setQuaternion(n)
                }
            }
        }(), i.prototype.enter = function(t) {
            this.setRotation(t)
        }, e.default = i
    },
    772: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Set Rigid Body Velocity",
            name: "Set Rigid Body Velocity",
            type: "physics",
            description: "Set the linear velocity of the rigid body component.",
            canTransition: !1,
            parameters: [{
                name: "Velocity",
                key: "velocity",
                type: "position",
                description: "Velocity to set.",
                default: [0, 0, 0]
            }],
            transitions: []
        };
        var c = new u.default;
        i.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e && e.rigidBodyComponent && (c.setArray(this.velocity), e.rigidBodyComponent.setVelocity(c))
        }, e.default = i
    },
    773: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Timeline Time",
            name: "Set Timeline Time",
            type: "timeline",
            description: "Sets the current time of the timeline.",
            canTransition: !0,
            parameters: [{
                name: "Time",
                key: "time",
                type: "float",
                description: "Timeline time to set.",
                default: 0
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.hasComponent("TimelineComponent") && e.timelineComponent.setTime(this.time)
        }, e.default = o
    },
    774: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.everyFrame = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Set Animation Time Scale",
            name: "Set Animation Time Scale",
            type: "animation",
            description: "Sets the time scale for the current animation.",
            parameters: [{
                name: "Scale",
                key: "scale",
                type: "float",
                description: "Scale factor for the animation timer.",
                default: 1
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.animationComponent && e.animationComponent.setTimeScale(this.scale)
        }, e.default = o
    },
    775: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments), this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "spriteAnimation",
            name: "Sprite Animation action",
            type: "texture",
            description: "Animates a texture spritesheet over time.",
            canTransition: !1,
            parameters: [{
                name: "Tiling",
                key: "tiling",
                type: "vec2",
                description: "The number of sprites in X and Y directions.",
                default: [8, 8]
            }, {
                name: "Start tile",
                key: "startTile",
                type: "int",
                description: "Initial tile for the animation. 0 is the first one and numTiles-1 is the last one.",
                default: 0
            }, {
                name: "End tile",
                key: "endTile",
                type: "int",
                description: "End tile for the animation. Set to -1 to indicate the last tile.",
                default: -1
            }, {
                name: "Animation time",
                key: "animationTime",
                type: "float",
                min: 1e-6,
                description: "The time it should take for the animation to cycle through all the tiles once.",
                default: 1
            }, {
                name: "Loops",
                key: "loops",
                type: "int",
                description: "The number times to loop through the tiles before the animation is complete. Set to -1 to animate indefinitely.",
                min: -1,
                default: -1
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the animation completes."
            }]
        }, o.getTransitionLabel = function() {
            return "Sprite Animation complete"
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity(),
                n = e.meshRendererComponent;
            if (this.texture = null, n && 0 !== n.materials.length) {
                var o = n.materials[0];
                this.texture = o.getTexture("DIFFUSE_MAP"), this.texture && (this.startTime = t.getTime(), this.completed = !1, this.texture.repeat.setDirect(1 / this.tiling[0], 1 / this.tiling[1]))
            }
        }, o.prototype.update = function(t) {
            var e = this.texture;
            if (e && !this.completed) {
                var n = this.tiling,
                    o = t.getTime() - this.startTime,
                    i = n[0] * n[1],
                    r = this.endTile; - 1 === r ? r = i : r++;
                var a = o / this.animationTime,
                    s = Math.floor(a);
                if (a %= 1, s >= this.loops && -1 !== this.loops) return this.completed = !0, void t.send(this.transitions.complete);
                var u = r - this.startTile,
                    c = this.startTile / i;
                a *= u / i, a += c;
                var p = Math.floor(i * a) % n[0],
                    l = Math.floor(n[1] * a % n[1]);
                e.offset.setDirect(p, l).mul(e.repeat), e.offset.y = -1 / n[1] - e.offset.y + 1
            }
        }, o.prototype.exit = function() {}, e.default = o
    },
    776: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "startParticleSystem",
            name: "Start Particle System",
            type: "misc",
            description: "Starts / plays the particle system on the entity.",
            canTransition: !1,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e && e.particleSystemComponent && e.particleSystemComponent.play()
        }, e.default = o
    },
    777: function(t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function r(t, e) {
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
        var a = function() {
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
            s = n(2),
            u = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(s),
            c = function(t) {
                function e() {
                    return o(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return r(e, t), a(e, [{
                    key: "enter",
                    value: function(t) {
                        var e = this,
                            n = t.getOwnerEntity();
                        if (!n.hasComponent("SpeechComponent")) return void console.warn("[Sumerian] Entity does not have a SpeechComponent associated with it.");
                        var o = n.speechComponent.getSpeechById(this.speech);
                        return o ? o.play().then(function(n) {
                            return t.send(e.transitions.complete)
                        }).catch(function(t) {
                            throw console.error("[Sumerian] Could not play speech: " + t), t
                        }) : void console.warn("[Sumerian] No matching speech was found.")
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t, e) {
                        return "On Speech End"
                    }
                }]), e
            }(u.default);
        c.external = {
            key: "StartSpeech",
            type: "Speech",
            name: "Start Speech",
            description: "Starts speech with a text or ssml file.",
            canTransition: !0,
            parameters: [{
                name: "Speech",
                key: "speech",
                type: "speech",
                description: "Speech to play."
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the speech stops playing."
            }]
        }, e.default = c
    },
    778: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Start Timeline",
            name: "Start Timeline",
            type: "timeline",
            description: "Starts or resumes the timeline.",
            canTransition: !0,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.hasComponent("TimelineComponent") && e.timelineComponent.start()
        }, e.default = o
    },
    779: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "stopParticleSystem",
            name: "Stop Particle System",
            type: "misc",
            description: "Stops the particle system on the entity.",
            canTransition: !1,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e && e.particleSystemComponent && e.particleSystemComponent.stop()
        }, e.default = o
    },
    780: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Stop Sound",
            name: "Stop Sound",
            type: "sound",
            description: "Stops a sound.",
            canTransition: !1,
            parameters: [{
                name: "Sound",
                key: "sound",
                type: "sound",
                description: "Sound to stop."
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            if (e.hasComponent("SoundComponent")) {
                var n = e.soundComponent.getSoundById(this.sound);
                n && n.stop()
            }
        }, e.default = o
    },
    781: function(t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function r(t, e) {
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
        var a = function() {
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
            s = n(2),
            u = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(s),
            c = function(t) {
                function e() {
                    return o(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
                }
                return r(e, t), a(e, [{
                    key: "enter",
                    value: function(t) {
                        var e = this,
                            n = t.getOwnerEntity();
                        if (!n.hasComponent("SpeechComponent")) return void console.warn("[Sumerian] Entity does not have a SpeechComponent associated with it.");
                        var o = n.speechComponent.getSpeechById(this.speech);
                        return o ? o.stop(this.resetSpeech).then(function(n) {
                            return t.send(e.transitions.complete)
                        }).catch(function(t) {
                            return console.error("[Sumerian] Could not stop speech: " + t)
                        }) : void console.warn("[Sumerian] No matching speech was found.")
                    }
                }], [{
                    key: "getTransitionLabel",
                    value: function(t, e) {
                        return "On Speech End"
                    }
                }]), e
            }(u.default);
        c.external = {
            key: "StopSpeech",
            type: "Speech",
            name: "Stop Speech",
            description: "Stops a playing speech file.",
            canTransition: !0,
            parameters: [{
                name: "Speech",
                key: "speech",
                type: "speech",
                description: "Speech to stop."
            }, {
                name: "Restart Speech",
                key: "resetSpeech",
                type: "boolean",
                description: "Resets speech to beginning if checked."
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the speech stops playing."
            }]
        }, e.default = c
    },
    782: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Stop Timeline",
            name: "Stop Timeline",
            type: "timeline",
            description: "Stops the timeline.",
            canTransition: !0,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getOwnerEntity();
            e.hasComponent("TimelineComponent") && e.timelineComponent.stop()
        }, e.default = o
    },
    783: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(159),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Toggle Fullscreen",
            name: "Toggle Fullscreen",
            type: "display",
            description: "Toggles fullscreen on/off. Note that in most browsers this must be initiated by a user gesture. For example, click or touch.",
            parameters: [],
            transitions: []
        }, i.prototype.enter = function() {
            u.default.toggleFullScreen()
        }, e.default = i
    },
    784: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Toggle mute sounds",
            name: "Toggle mute sounds",
            type: "sound",
            description: "Toggles mute of all sounds globally.",
            canTransition: !1,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getWorld();
            if (e) {
                var n = e.getSystem("SoundSystem");
                n && (n.muted ? n.unmute() : n.mute())
            }
        }, e.default = o
    },
    785: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Toggle Post FX",
            name: "Toggle Post FX",
            type: "fx",
            description: "Enabled/disables post fx globally.",
            parameters: [{
                name: "Set Post FX state",
                key: "enabled",
                type: "boolean",
                description: "Set Post FX on/off.",
                default: !0
            }],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getWorld().sumerianRunner.renderSystem;
            e && e.enableComposers(this.enabled)
        }, e.default = o
    },
    786: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments), this.fromColor = new u.default, this.toColor = new u.default, this.calc = new u.default, this.completed = !1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(0),
            u = o(s),
            c = n(51),
            p = o(c);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Tween Material Color",
            name: "Tween Material Color",
            type: "texture",
            description: "Tweens the color of a material.",
            parameters: [{
                name: "Entity (optional)",
                key: "entity",
                type: "entity",
                description: "Entity that has a material."
            }, {
                name: "Color type",
                key: "type",
                type: "string",
                control: "dropdown",
                description: "Color type.",
                default: "Diffuse",
                options: ["Diffuse", "Emissive", "Specular", "Ambient"]
            }, {
                name: "Color",
                key: "color",
                type: "vec3",
                control: "color",
                description: "Color.",
                default: [1, 1, 1]
            }, {
                name: "Time (ms)",
                key: "time",
                type: "float",
                control: "spinner",
                description: "Time it takes for the transition to complete.",
                default: 1e3
            }, {
                name: "Easing type",
                key: "easing1",
                type: "string",
                control: "dropdown",
                description: "Easing type.",
                default: "Linear",
                options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"]
            }, {
                name: "Direction",
                key: "easing2",
                type: "string",
                control: "dropdown",
                description: "Easing direction.",
                default: "In",
                options: ["In", "Out", "InOut"]
            }],
            transitions: [{
                key: "complete",
                description: "State to transition to when the transition completes."
            }]
        };
        var l = {
            Diffuse: "materialDiffuse",
            Emissive: "materialEmissive",
            Specular: "materialSpecular",
            Ambient: "materialAmbient"
        };
        i.getTransitionLabel = function(t, e) {
            return "complete" === t ? "On Tween " + (e.options.type || "Color") + " Complete" : void 0
        }, i.prototype.enter = function(t) {
            var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity(),
                n = e.meshRendererComponent;
            n && (this.startTime = t.getTime(), this.material = n.materials[0], this.typeName = l[this.type], this.materialColor = this.material.uniforms[this.typeName] = this.material.uniforms[this.typeName] || [1, 1, 1, 1], this.fromColor.setDirect(this.materialColor[0], this.materialColor[1], this.materialColor[2]), this.toColor.setDirect(this.color[0], this.color[1], this.color[2]), this.completed = !1)
        }, i.prototype.update = function(t) {
            if (!this.completed) {
                if ((this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity()).meshRendererComponent) {
                    var e = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
                        n = p.default[this.easing1][this.easing2](e);
                    this.calc.set(this.fromColor).lerp(this.toColor, n), this.materialColor[0] = this.calc.x, this.materialColor[1] = this.calc.y, this.materialColor[2] = this.calc.z, e >= 1 && (t.send(this.transitions.complete), this.completed = !0)
                }
            }
        }, e.default = i
    },
    787: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.external = {
            key: "Unmute sounds",
            name: "Unmute sounds",
            type: "sound",
            description: "Unmute all sounds globally.",
            canTransition: !1,
            parameters: [],
            transitions: []
        }, o.prototype.enter = function(t) {
            var e = t.getWorld();
            if (e) {
                var n = e.getSystem("SoundSystem");
                n && n.unmute()
            }
        }, e.default = o
    },
    788: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            parameters: [{
                name: "Entity",
                key: "entity",
                type: "entity",
                description: "Entity to move."
            }, {
                name: "Amount X",
                key: "amountX",
                type: "float",
                description: "Amount to move on the X axis.",
                default: 0
            }, {
                name: "Amount Y",
                key: "amountY",
                type: "float",
                description: "Amount to move on the Y axis.",
                default: 0
            }, {
                name: "Amount Z",
                key: "amountZ",
                type: "float",
                description: "Amount to move on the Z axis.",
                default: 0
            }, {
                name: "Speed",
                key: "speed",
                type: "float",
                description: "Speed to multiply.",
                default: 1
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, i.prototype.addPosition = function(t) {
            if (this.entity) {
                var e = t.getTpf(),
                    n = u.default.getValue(this.amountX, t),
                    o = u.default.getValue(this.amountY, t),
                    i = u.default.getValue(this.amountZ, t);
                this.entity.transformComponent.transform.translation.addDirect(n * this.speed * e, o * this.speed * e, i * this.speed * e), this.entity.transformComponent.setUpdated()
            }
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.addPosition(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.addPosition(t)
        }, e.default = i
    },
    789: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Add Variable",
            name: "Add Variable",
            type: "variables",
            description: "",
            parameters: [{
                name: "Variable",
                key: "variable",
                type: "identifier"
            }, {
                name: "Amount",
                key: "amount",
                type: "float"
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !1
            }],
            transitions: []
        }, i.prototype.add = function(t) {
            var e = this;
            t.applyOnVariable(this.variable, function(n) {
                return n + u.default.getValue(e.amount, t)
            })
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.add(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.add(t)
        }, e.default = i
    },
    790: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.prototype.configure = function(t) {
            this.everyFrame = !1 !== t.everyFrame, this.entity = t.entity || null, this.variableX = t.variableX || null, this.variableY = t.variableY || null, this.variableZ = t.variableZ || null
        }, o.external = {
            parameters: [{
                name: "VariableX",
                key: "variableX",
                type: "identifier"
            }, {
                name: "VariableY",
                key: "variableY",
                type: "identifier"
            }, {
                name: "VariableZ",
                key: "variableZ",
                type: "identifier"
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, o.prototype.update = function(t) {
            var e = this.entity.transformComponent.transform.translation;
            null !== this.entity && (this.variableX && t.applyOnVariable(this.variableX, function() {
                return e.x
            }), this.variableY && t.applyOnVariable(this.variableY, function() {
                return e.y
            }), this.variableZ && t.applyOnVariable(this.variableZ, function() {
                return e.z
            }))
        }, e.default = o
    },
    791: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Multiply Variable",
            name: "Multiply Variable",
            type: "variables",
            description: "",
            parameters: [{
                name: "Variable",
                key: "variable",
                type: "identifier"
            }, {
                name: "Amount",
                key: "amount",
                type: "float"
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame",
                default: !1
            }],
            transitions: []
        }, i.prototype.update = function(t) {
            var e = this;
            t.applyOnVariable(this.variable, function(n) {
                return n * u.default.getValue(e.amount, t)
            })
        }, e.default = i
    },
    792: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.prototype.configure = function(t) {
            this.everyFrame = !1 !== t.everyFrame, this.leftHand = t.leftHand || 0, this.rightHand = t.rightHand || 0, this.tolerance = t.tolerance || 1e-4, this.lessThanEvent = {
                channel: t.transitions.less
            }, this.equalEvent = {
                channel: t.transitions.equal
            }, this.greaterThanEvent = {
                channel: t.transitions.greater
            }
        }, i.external = {
            parameters: [{
                name: "Left hand value",
                key: "leftHand",
                type: "float"
            }, {
                name: "Right hand value",
                key: "rightHand",
                type: "float"
            }, {
                name: "Tolerance",
                key: "tolerance",
                type: "float",
                default: .001
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: [{
                key: "less",
                description: "Event fired if left hand argument is smaller than right hand argument."
            }, {
                key: "equal",
                description: "Event fired if both sides are approximately equal."
            }, {
                key: "greater",
                description: "Event fired if left hand argument is greater than right hand argument."
            }]
        };
        var c = {
            less: "On X < Y",
            equal: "On X == Y",
            greater: "On X > Y"
        };
        i.getTransitionLabel = function(t) {
            return c[t]
        }, i.prototype.compare = function(t) {
            var e = u.default.getValue(this.leftHand, t),
                n = u.default.getValue(this.rightHand, t),
                o = n - e;
            Math.abs(o) <= this.tolerance ? this.equalEvent.channel && t.send(this.equalEvent.channel) : o > 0 ? this.lessThanEvent.channel && t.send(this.lessThanEvent.channel) : this.greaterThanEvent.channel && t.send(this.greaterThanEvent.channel)
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.compare(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.compare(t)
        }, e.default = i
    },
    793: function(t, e, n) {
        "use strict";

        function o() {
            r.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(2),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.constructor = o, o.prototype.configure = function(t) {
            this.everyFrame = !!t.everyFrame, this.entity = t.entity || null, this.range = t.range || 100
        }, o.external = {
            key: "Set Light Range",
            name: "Set Light Range",
            description: "Sets the range of a light.",
            parameters: [{
                name: "Entity",
                key: "entity",
                type: "entity",
                description: "Light entity."
            }, {
                name: "Range",
                key: "range",
                type: "real",
                description: "Light range.",
                default: 100,
                min: 0
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, o.prototype.enter = function() {
            var t = this.entity;
            t && t.lightComponent && t.lightComponent.light && (t.lightComponent.light.range = this.range)
        }, e.default = o
    },
    794: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.prototype.configure = function(t) {
            this.everyFrame = !!t.everyFrame, this.entity = t.entity || null, this.amountX = t.amountX || 0, this.amountY = t.amountY || 0, this.amountZ = t.amountZ || 0
        }, i.external = {
            key: "Set Position",
            name: "Set Position",
            parameters: [{
                name: "Entity",
                key: "entity",
                type: "entity",
                description: "Entity to move."
            }, {
                name: "Amount X",
                key: "amountX",
                type: "float",
                description: "Position on the X axis.",
                default: 0
            }, {
                name: "Amount Y",
                key: "amountY",
                type: "float",
                description: "Position on the Y axis.",
                default: 0
            }, {
                name: "Amount Z",
                key: "amountZ",
                type: "float",
                description: "Position on the Z axis.",
                default: 0
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, i.prototype.update = function(t) {
            null !== this.entity && (this.entity.transformComponent.transform.translation.setDirect(u.default.getValue(this.amountX, t), u.default.getValue(this.amountY, t), u.default.getValue(this.amountZ, t)), this.entity.transformComponent.setUpdated())
        }, e.default = i
    },
    795: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.prototype.configure = function(t) {
            this.everyFrame = !!t.everyFrame, this.entity = t.entity || null, this.amountX = t.amountX || 0, this.amountY = t.amountY || 0, this.amountZ = t.amountZ || 0
        }, i.external = {
            name: "Set Rotation",
            key: "Set Rotation",
            parameters: [{
                name: "Entity",
                key: "entity",
                type: "entity",
                description: "Entity to move."
            }, {
                name: "Amount X",
                key: "amountX",
                type: "float",
                description: "Amount to rotate on the X axis.",
                default: 0
            }, {
                name: "Amount Y",
                key: "amountY",
                type: "float",
                description: "Amount to rotate on the Y axis.",
                default: 0
            }, {
                name: "Amount Z",
                key: "amountZ",
                type: "float",
                description: "Amount to rotate on the Z axis.",
                default: 0
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !0
            }],
            transitions: []
        }, i.prototype.setRotation = function(t) {
            null !== this.entity && (this.entity.transformComponent.transform.setRotationXYZ(u.default.getValue(this.amountX, t), u.default.getValue(this.amountY, t), u.default.getValue(this.amountZ, t)), this.entity.transformComponent.setUpdated())
        }, i.prototype.enter = function(t) {
            this.everyFrame || this.setRotation(t)
        }, i.prototype.update = function(t) {
            this.everyFrame && this.setRotation(t)
        }, e.default = i
    },
    796: function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            a.default.apply(this, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(2),
            a = o(r),
            s = n(47),
            u = o(s);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, i.external = {
            key: "Set Variable",
            name: "Set Variable",
            type: "variables",
            description: "",
            parameters: [{
                name: "Variable name",
                key: "variable",
                type: "identifier"
            }, {
                name: "Value",
                key: "amount",
                type: "float"
            }, {
                name: "On every frame",
                key: "everyFrame",
                type: "boolean",
                description: "Repeat this action every frame.",
                default: !1
            }],
            transitions: []
        }, i.prototype.enter = function(t) {
            var e = this;
            this.variable && t.applyOnVariable(this.variable, function() {
                return u.default.getValue(e.amount, t)
            })
        }, e.default = i
    },
    797: function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(47),
            i = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(o);
        e.default = i.default
    },
    798: function(t, e, n) {
        "use strict";

        function o(t) {
            r.default.call(this, "StateMachineSystem", ["StateMachineComponent"]), this.engine = t, this.passive = !1, this.paused = !1, this.time = 0, this.evalProxy = {
                test: function() {
                    console.log("test")
                }
            }, this.priority = 1e3;
            var e = ["Left", "Middle", "Right"];
            this._inputStates = new Set, this._listeners = {
                keydown: function(t) {
                    this._inputStates.add(t.which)
                }.bind(this),
                keyup: function(t) {
                    this._inputStates.delete(t.which)
                }.bind(this),
                mousedown: function(t) {
                    this._inputStates.add(e[t.button])
                }.bind(this),
                mouseup: function(t) {
                    this._inputStates.delete(e[t.button])
                }.bind(this)
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(7),
            r = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        o.prototype = Object.create(r.default.prototype), o.prototype.getInputState = function(t) {
            return this._inputStates.has(t)
        }, o.prototype.process = function(t, e) {
            this.time += e;
            for (var n = 0; n < t.length; n++) {
                var o = t[n].stateMachineComponent;
                o.entered || (o.doEnter(), o.entered = !0)
            }
            for (var n = 0; n < t.length; n++) {
                var o = t[n].stateMachineComponent;
                o.update(e)
            }
        }, o.prototype.inserted = function(t) {
            var e = t.stateMachineComponent;
            e.entity = t, e.system = this, e.init()
        }, o.prototype.play = function() {
            if (this.passive = !1, !this.paused) {
                for (var t = this._activeEntities, e = 0; e < t.length; e++) {
                    t[e].stateMachineComponent.entered = !1
                }
                for (var n in this._listeners) document.addEventListener(n, this._listeners[n]);
                this._inputStates.clear()
            }
            this.paused = !1
        }, o.prototype.pause = function() {
            this.passive = !0, this.paused = !0
        }, o.prototype.resume = o.prototype.play, o.prototype.stop = function() {
            this.passive = !0, this.paused = !1;
            for (var t = 0; t < this._activeEntities.length; t++) {
                var e = this._activeEntities[t].stateMachineComponent;
                e.kill(), e.cleanup()
            }
            this.time = 0;
            for (var n in this._listeners) document.removeEventListener(n, this._listeners[n])
        }, e.default = o
    },
    799: function(t, e, n) {
        "use strict";
        n(445), n(376)
    }
}, [745]);