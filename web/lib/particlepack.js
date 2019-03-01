webpackJsonp([5], {
    100: function(t, e, i) {
        "use strict";

        function n(t) {
            t = t || {}, this.type = t.type || "float", this.timeOffset = t.timeOffset || 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n.numberToGLSL = function(t) {
            return -1 === ("" + t).indexOf(".") ? t + ".0" : "" + t
        }, n.prototype = {
            toGLSL: function() {
                return "0.0"
            },
            getValueAt: function() {
                return 0
            },
            getVec4ValueAt: function() {},
            getIntegralValueAt: function() {
                return 0
            },
            getVec4IntegralValueAt: function() {},
            clone: function() {
                return new this.constructor(this)
            }
        }, e.default = n
    },
    131: function(t, e, i) {
        "use strict";

        function n(t) {
            t = t || {}, o.default.call(this, t), this.value = void 0 !== t.value ? t.value : 1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(100),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        n.prototype = Object.create(o.default.prototype), n.prototype.constructor = n, n.prototype.toGLSL = function() {
            return o.default.numberToGLSL(this.value)
        }, n.prototype.integralToGLSL = function(t) {
            return "(" + o.default.numberToGLSL(this.value) + "*" + t + ")"
        }, n.prototype.getValueAt = function() {
            return this.value
        }, n.prototype.getIntegralValueAt = function(t) {
            return this.value * t
        }, e.default = n
    },
    482: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function r(t, e) {
            return (t % e + e) % e
        }

        function o(t) {
            t = t || {}, T.default.apply(this, arguments), this.type = "ParticleSystemComponent", this.material = new v.default({
                name: "particle",
                glslversion: 300,
                defines: V.default.clone(M),
                processors: [R.default.uber.fog],
                attributes: {
                    vertexPosition: m.default.POSITION,
                    timeInfo: "TIME_INFO",
                    startPos: "START_POS",
                    startDir: "START_DIR",
                    vertexUV0: m.default.TEXCOORD0
                },
                uniforms: {
                    viewMatrix: S.default.VIEW_MATRIX,
                    projectionMatrix: S.default.PROJECTION_MATRIX,
                    viewProjectionMatrix: S.default.VIEW_PROJECTION_MATRIX,
                    worldMatrix: S.default.WORLD_MATRIX,
                    cameraPosition: S.default.CAMERA,
                    textureTileInfo: [1, 1, 1, 0],
                    invWorldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                    worldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                    particleTexture: "PARTICLE_TEXTURE",
                    time: 0,
                    duration: 5,
                    gravity: [0, 0, 0],
                    discardThreshold: 0,
                    uColor: [1, 1, 1, 1],
                    uStartSize: 1,
                    uStartAngle: 1,
                    uRotationSpeed: 1,
                    fogSettings: [0, 1e4],
                    fogColor: [1, 1, 1]
                },
                vshader: "\n      #ifdef WEBGL_1\n        #define in attribute\n        #define out varying\n      #endif\n\n      in vec3 vertexPosition;\n      in vec2 vertexUV0;\n      in vec4 timeInfo;\n      in vec4 startPos;\n      in vec4 startDir;\n\n      uniform vec4 textureTileInfo;\n      uniform mat4 viewMatrix;\n      uniform mat4 projectionMatrix;\n      uniform mat4 viewProjectionMatrix;\n      uniform mat4 worldMatrix;\n      uniform mat3 invWorldRotation;\n      uniform mat3 worldRotation;\n      uniform vec3 cameraPosition;\n      uniform float time;\n      uniform float duration;\n      uniform vec3 gravity;\n\n      uniform vec4 uColor;\n      uniform float uStartSize;\n      uniform float uStartAngle;\n      uniform float uRotationSpeed;\n\n      #ifdef FOG\n        uniform vec2 fogSettings;\n        uniform vec3 fogColor;\n      #endif\n\n      out vec4 color;\n      out vec2 coords;\n\n      vec3 getVelocityCurveIntegral(float t, float emitRandom) {\n          return VELOCITY_CURVE_CODE;\n      }\n\n      vec3 getWorldVelocityCurveIntegral(float t, float emitRandom) {\n          return WORLD_VELOCITY_CURVE_CODE;\n      }\n\n      vec3 getPosition(mat3 invWorldRotation, mat3 worldRotation, float t, vec3 pos, vec3 vel, vec3 g, float emitRandom, float duration) {\n          return pos + vel * t + 0.5 * t * t * g + worldRotation * getVelocityCurveIntegral(t / duration, emitRandom) + invWorldRotation * getWorldVelocityCurveIntegral(t / duration, emitRandom);\n      }\n\n      float getScale(float t, float emitRandom) {\n          return SIZE_CURVE_CODE;\n      }\n\n      float getStartSize(float t, float emitRandom) {\n          return START_SIZE_CODE;\n      }\n\n      float getTextureFrame(float t, float emitRandom) {\n          return TEXTURE_FRAME_CODE;\n      }\n\n      float getAngle(float t, float emitRandom) {\n          return ROTATION_CURVE_CODE;\n      }\n\n      vec4 getColor(float t, float emitRandom) {\n          return COLOR_CURVE_CODE;\n      }\n\n      vec4 getStartColor(float t, float emitRandom) {\n          return START_COLOR_CODE;\n      }\n\n      float getStartAngle(float t, float emitRandom) {\n          return START_ROTATION_CURVE_CODE;\n      }\n\n      mat4 rotationMatrix(vec3 axis, float angle) {\n          axis = normalize(axis);\n          float s = sin(angle);\n          float c = cos(angle);\n          float x = axis.x;\n          float y = axis.y;\n          float z = axis.z;\n          float oc = 1.0 - c;\n          return mat4(oc * x * x + c, oc * x * y - z * s,  oc * z * x + y * s,  0.0,\n          oc * x * y + z * s, oc * y * y + c, oc * y * z - x * s, 0.0,\n          oc * z * x - y * s, oc * y * z + x * s,  oc * z * z + c, 0.0,\n          0.0, 0.0, 0.0, 1.0);\n      }\n\n      void main(void) {\n\n          float isActive = timeInfo.y;\n          float emitTime = timeInfo.w;\n          float age = time - emitTime;\n          float ageNoMod = age;\n          float loopAfter = startDir.w;\n\n          #ifdef LOOP\n          age = mod(age, loopAfter);\n          emitTime = mod(emitTime, loopAfter);\n          #endif\n\n          float unitEmitTime = mod(emitTime / duration, 1.0);\n          float emitRandom = timeInfo.z;\n          float startSize = uStartSize * getStartSize(unitEmitTime, emitRandom);\n          float lifeTime = timeInfo.x;\n          float startAngle = uStartAngle * getStartAngle(unitEmitTime, emitRandom);\n\n          float unitAge = age / lifeTime;\n          color = uColor * getStartColor(unitAge, emitRandom) * getColor(unitAge, emitRandom);\n\n          float textureAnimationCycles = textureTileInfo.z;\n          float tileX = floor(mod(textureTileInfo.x * textureTileInfo.y * getTextureFrame(unitAge, emitRandom) * textureAnimationCycles, textureTileInfo.x));\n          float tileY = floor(mod(-textureTileInfo.y * getTextureFrame(unitAge, emitRandom) * textureAnimationCycles, textureTileInfo.y));\n          vec2 texOffset = vec2(tileX, tileY) / textureTileInfo.xy;\n          coords = (vertexUV0 / textureTileInfo.xy + texOffset);\n\n          float rotation = uRotationSpeed * getAngle(unitAge, emitRandom) + startAngle;\n          float c = cos(rotation);\n          float s = sin(rotation);\n          mat3 spinMatrix = mat3(c, s, 0, -s, c, 0, 0, 0, 1);\n\n          // hide if age > lifeTime\n          isActive *= step(-lifeTime, -age);\n\n          // hide if age < 0\n          #ifdef HIDE_IF_EMITTED_BEFORE_ZERO\n            isActive *= step(0.0, ageNoMod) * step(0.0, age);\n          #endif\n\n          vec3 position = getPosition(invWorldRotation, worldRotation, age, startPos.xyz, startDir.xyz, gravity, emitRandom, duration);\n\n          #ifdef FOG\n            vec3 viewPosition = cameraPosition - (worldMatrix * vec4(position, 0.0)).xyz;\n            float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);\n            color.rgb = mix(color.rgb, fogColor, d);\n          #endif\n\n          #ifdef BILLBOARD\n            vec2 offset = ((spinMatrix * vertexPosition)).xy * startSize * getScale(unitAge, emitRandom) * isActive;\n            mat4 matPos = worldMatrix * mat4(vec4(0),vec4(0),vec4(0),vec4(position,0));\n            gl_Position = viewProjectionMatrix * (worldMatrix + matPos) * vec4(0, 0, 0, 1) + projectionMatrix * vec4(offset.xy, 0, 0);\n          #else\n            mat4 rot = rotationMatrix(normalize(vec3(sin(emitTime*5.0),cos(emitTime*1234.0),sin(emitTime))),rotation);\n            gl_Position = viewProjectionMatrix * worldMatrix * (rot * vec4(startSize * getScale(unitAge, emitRandom) * isActive * vertexPosition, 1.0) + vec4(position,0.0));\n          #endif\n      }",
                fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n    #endif\n\n      uniform sampler2D particleTexture;\n      uniform float discardThreshold;\n\n      in vec4 color;\n      in vec2 coords;\n      \n    #ifdef WEBGL_1\n      #undef in\n      #define fragColor gl_FragColor\n      #define texture texture2D\n    #else\n      out vec4 fragColor;\n    #endif\n\n      void main(void) {\n      #ifdef PARTICLE_TEXTURE\n          vec4 col = color * texture(particleTexture, coords);\n      #else\n          vec4 col = color;\n      #endif\n          if (col.a < discardThreshold) discard;\n          fragColor = col;\n      }"
            }), this.material.cullState.enabled = !1, this.material.uniforms.textureTileInfo = [1, 1, 1, 0], V.default.extend(this.material.uniforms, {
                textureTileInfo: [1, 1, 1, 0],
                invWorldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                worldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                gravity: [0, 0, 0],
                uColor: [1, 1, 1, 1]
            }), this._nextEmitParticleIndex = 0, this._localGravity = new f.default, this._lastTime = this.time, this._worldToLocalRotation = new l.default, this._localToWorldRotation = new l.default, this.entity = null, this.paused = void 0 !== t.paused && t.paused, this.autoPlay = void 0 === t.autoPlay || t.autoPlay, this.particles = [], this.particlesSorted = [], this.time = t.time || 0, this.gravity = t.gravity ? t.gravity.clone() : new f.default, this.boxExtents = t.boxExtents ? t.boxExtents.clone() : new f.default(1, 1, 1), this.startColorScale = t.startColorScale ? t.startColorScale.clone() : new d.default(1, 1, 1, 1), this.emissionRate = t.emissionRate ? t.emissionRate.clone() : new b.default({
                value: 10
            }), this.preWarm = void 0 !== t.preWarm && t.preWarm, this._initSeed = this._seed = this.seed = void 0 !== t.seed && t.seed > 0 ? t.seed : Math.floor(32768 * Math.random()), this.shapeType = t.shapeType || "cone", this.sphereRadius = void 0 !== t.sphereRadius ? t.sphereRadius : 1, this.sphereEmitFromShell = t.sphereEmitFromShell || !1, this.randomDirection = t.randomDirection || !1, this.coneEmitFrom = t.coneEmitFrom || "base", this.coneRadius = void 0 !== t.coneRadius ? t.coneRadius : 1, this.coneAngle = void 0 !== t.coneAngle ? t.coneAngle : Math.PI / 8, this.coneLength = void 0 !== t.coneLength ? t.coneLength : 1, this.startColor = t.startColor ? t.startColor.clone() : null, this.colorOverLifetime = t.colorOverLifetime ? t.colorOverLifetime.clone() : null, this.duration = void 0 !== t.duration ? t.duration : 5, this.localSpace = void 0 === t.localSpace || t.localSpace, this.startSpeed = t.startSpeed ? t.startSpeed.clone() : new b.default({
                value: 5
            }), this.localVelocityOverLifetime = t.localVelocityOverLifetime ? t.localVelocityOverLifetime.clone() : null, this.worldVelocityOverLifetime = t.worldVelocityOverLifetime ? t.worldVelocityOverLifetime.clone() : null, this._maxParticles = void 0 !== t.maxParticles ? t.maxParticles : 100, this.startLifetime = t.startLifetime ? t.startLifetime.clone() : new b.default({
                value: 5
            }), this.renderQueue = void 0 !== t.renderQueue ? t.renderQueue : 3010, this.discardThreshold = t.discardThreshold || 0, this.loop = void 0 === t.loop || t.loop, this.blending = t.blending || "NoBlending", this.depthWrite = void 0 === t.depthWrite || t.depthWrite, this.depthTest = void 0 === t.depthTest || t.depthTest, this.textureTilesX = void 0 !== t.textureTilesX ? t.textureTilesX : 1, this.textureTilesY = void 0 !== t.textureTilesY ? t.textureTilesY : 1, this.textureAnimationCycles = void 0 !== t.textureAnimationCycles ? t.textureAnimationCycles : 1, this.textureFrameOverLifetime = t.textureFrameOverLifetime ? t.textureFrameOverLifetime.clone() : null, this.startSize = t.startSize ? t.startSize.clone() : null, this.sortMode = void 0 !== t.sortMode ? t.sortMode : o.SORT_NONE, this.mesh = t.mesh ? t.mesh : new I.default, this.billboard = void 0 === t.billboard || t.billboard, this.sizeOverLifetime = t.sizeOverLifetime ? t.sizeOverLifetime.clone() : null, this.startAngle = t.startAngle ? t.startAngle.clone() : null, this.rotationSpeedOverLifetime = t.rotationSpeedOverLifetime ? t.rotationSpeedOverLifetime.clone() : null, this.texture = t.texture ? t.texture : null, this.boundsRadius = void 0 !== t.boundsRadius ? t.boundsRadius : Number.MAX_VALUE
        }

        function a(t, e) {
            t.rotation.copy(e.rotation), t.translation.copy(e.translation), t.update()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i(31),
            l = n(s),
            u = i(0),
            f = n(u),
            c = i(36),
            d = n(c),
            h = i(6),
            m = n(h),
            p = i(9),
            v = n(p),
            y = i(96),
            _ = n(y),
            g = i(8),
            T = n(g),
            x = i(29),
            S = n(x),
            O = i(67),
            R = n(O),
            E = i(483),
            L = n(E),
            C = i(24),
            A = n(C),
            D = i(59),
            I = n(D),
            P = i(131),
            b = n(P),
            w = i(3),
            V = n(w);
        Math.cbrt = Math.cbrt || function(t) {
            var e = Math.pow(Math.abs(t), 1 / 3);
            return t < 0 ? -e : e
        };
        var M = {
            START_LIFETIME_CODE: "5.0",
            START_SIZE_CODE: "1.0",
            START_ROTATION_CURVE_CODE: "0.0",
            START_COLOR_CODE: "vec4(1.0)",
            SIZE_CURVE_CODE: "1.0",
            ROTATION_CURVE_CODE: "0.0",
            COLOR_CURVE_CODE: "vec4(1.0)",
            VELOCITY_CURVE_CODE: "vec3(0.0)",
            WORLD_VELOCITY_CURVE_CODE: "vec3(0.0)",
            TEXTURE_FRAME_CODE: "t"
        };
        o.prototype = Object.create(T.default.prototype), o.prototype.constructor = o, o.type = "ParticleSystemComponent", o.SORT_NONE = 1, o.SORT_CAMERA_DISTANCE = 2, Object.defineProperties(o.prototype, {
            billboard: {
                get: function() {
                    return this.material.shader.hasDefine("BILLBOARD")
                },
                set: function(t) {
                    var e = this.material.shader;
                    t ? e.setDefine("BILLBOARD", !0) : e.removeDefine("BILLBOARD")
                }
            },
            blending: {
                get: function() {
                    return this.material.blendState.blending
                },
                set: function(t) {
                    this.material.blendState.blending = t
                }
            },
            colorOverLifetime: {
                get: function() {
                    return this._colorOverLifetime
                },
                set: function(t) {
                    this._colorOverLifetime = t, this.material.shader.setDefine("COLOR_CURVE_CODE", t ? t.toGLSL("t", "emitRandom") : M.COLOR_CURVE_CODE)
                }
            },
            coneAngle: {
                get: function() {
                    return this._coneAngle
                },
                set: function(t) {
                    this._coneAngle = t, this._vertexDataDirty = !0
                }
            },
            coneEmitFrom: {
                get: function() {
                    return this._coneEmitFrom
                },
                set: function(t) {
                    this._coneEmitFrom = t, this._vertexDataDirty = !0
                }
            },
            coneLength: {
                get: function() {
                    return this._coneLength
                },
                set: function(t) {
                    this._coneLength = t, this._vertexDataDirty = !0
                }
            },
            coneRadius: {
                get: function() {
                    return this._coneRadius
                },
                set: function(t) {
                    this._coneRadius = t, this._vertexDataDirty = !0
                }
            },
            depthTest: {
                get: function() {
                    return this.material.depthState.enabled
                },
                set: function(t) {
                    this.material.depthState.enabled = t
                }
            },
            depthWrite: {
                get: function() {
                    return this.material.depthState.write
                },
                set: function(t) {
                    this.material.depthState.write = t
                }
            },
            discardThreshold: {
                get: function() {
                    return this.material.uniforms.discardThreshold
                },
                set: function(t) {
                    this.material.uniforms.discardThreshold = t
                }
            },
            duration: {
                get: function() {
                    return this.material.uniforms.duration
                },
                set: function(t) {
                    this.material.uniforms.duration = t, this._vertexDataDirty = !0
                }
            },
            emissionRate: {
                get: function() {
                    return this._emissionRate
                },
                set: function(t) {
                    this._emissionRate = t, this._vertexDataDirty = !0
                }
            },
            localSpace: {
                get: function() {
                    return this._localSpace
                },
                set: function(t) {
                    if (this._localSpace = t, this.meshEntity) {
                        var e = this.meshEntity.transformComponent;
                        e.transform.setIdentity(), e.setUpdated()
                    }
                }
            },
            localVelocityOverLifetime: {
                get: function() {
                    return this._localVelocityOverLifetime
                },
                set: function(t) {
                    this._localVelocityOverLifetime = t, this.material.shader.setDefine("VELOCITY_CURVE_CODE", t ? t.integralToGLSL("t", "emitRandom") : M.VELOCITY_CURVE_CODE)
                }
            },
            loop: {
                get: function() {
                    return this._loop
                },
                set: function(t) {
                    this._loop = t, this._vertexDataDirty = !0
                }
            },
            maxParticles: {
                get: function() {
                    return this._maxParticles
                },
                set: function(t) {
                    this._maxParticles = t;
                    var e = this.mesh,
                        i = this.meshData;
                    t * e.vertexCount !== i.vertexCount && (i.vertexCount = t * e.vertexCount, i.indexCount = t * e.indexCount, i.rebuildData(i.vertexCount, i.indexCount), this._syncParticleDataArrays(), this._updateVertexData(), this._updateIndexBuffer(this.particles), this._vertexDataDirty = !0)
                }
            },
            mesh: {
                get: function() {
                    return this._mesh
                },
                set: function(t) {
                    this._mesh = t;
                    var e = this.meshData;
                    e && (e.vertexCount = this.maxParticles * t.vertexCount, e.indexCount = this.maxParticles * t.indexCount, e.rebuildData(e.vertexCount, e.indexCount), this._vertexDataDirty = !0)
                }
            },
            preWarm: {
                get: function() {
                    return this._preWarm
                },
                set: function(t) {
                    this._preWarm = t, this._vertexDataDirty = !0
                }
            },
            randomDirection: {
                get: function() {
                    return this._randomDirection
                },
                set: function(t) {
                    this._randomDirection = t, this._vertexDataDirty = !0
                }
            },
            renderQueue: {
                get: function() {
                    return this.material.renderQueue
                },
                set: function(t) {
                    this.material.renderQueue = t
                }
            },
            rotationSpeedOverLifetime: {
                get: function() {
                    return this._rotationSpeedOverLifetime
                },
                set: function(t) {
                    this._rotationSpeedOverLifetime = t, this.material.shader.setDefine("ROTATION_CURVE_CODE", t ? t.integralToGLSL("t", "emitRandom") : M.ROTATION_CURVE_CODE)
                }
            },
            rotationSpeedScale: {
                get: function() {
                    return this.material.uniforms.uRotationSpeed
                },
                set: function(t) {
                    this.material.uniforms.uRotationSpeed = t
                }
            },
            seed: {
                get: function() {
                    return this._initSeed
                },
                set: function(t) {
                    t !== this._initSeed && (this._initSeed = t, this._vertexDataDirty = !0)
                }
            },
            shapeType: {
                get: function() {
                    return this._shapeType
                },
                set: function(t) {
                    this._shapeType = t, this._vertexDataDirty = !0
                }
            },
            sizeOverLifetime: {
                get: function() {
                    return this._sizeOverLifetime
                },
                set: function(t) {
                    this._sizeOverLifetime = t, this.material.shader.setDefine("SIZE_CURVE_CODE", t ? t.toGLSL("t", "emitRandom") : M.SIZE_CURVE_CODE)
                }
            },
            sortMode: {
                get: function() {
                    return this._sortMode
                },
                set: function(t) {
                    this._sortMode = t;
                    var e = this.meshData,
                        i = this.mesh;
                    e && i && this._updateIndexBuffer(this.particles)
                }
            },
            sphereEmitFromShell: {
                get: function() {
                    return this._sphereEmitFromShell
                },
                set: function(t) {
                    this._sphereEmitFromShell = t, this._vertexDataDirty = !0
                }
            },
            startAngle: {
                get: function() {
                    return this._startAngle
                },
                set: function(t) {
                    this._startAngle = t, this.material.shader.setDefine("START_ROTATION_CURVE_CODE", t ? t.toGLSL("t", "emitRandom") : M.START_ROTATION_CURVE_CODE)
                }
            },
            startAngleScale: {
                get: function() {
                    return this.material.uniforms.uStartAngle
                },
                set: function(t) {
                    this.material.uniforms.uStartAngle = t
                }
            },
            startColor: {
                get: function() {
                    return this._startColor
                },
                set: function(t) {
                    this._startColor = t, this.material.shader.setDefine("START_COLOR_CODE", t ? t.toGLSL("t", "emitRandom") : M.START_COLOR_CODE)
                }
            },
            startLifetime: {
                get: function() {
                    return this._startLifetime
                },
                set: function(t) {
                    this._startLifetime = t, this.material.shader.setDefine("START_LIFETIME_CODE", t ? t.toGLSL("t", "emitRandom") : M.START_LIFETIME_CODE)
                }
            },
            startSize: {
                get: function() {
                    return this._startSize
                },
                set: function(t) {
                    this._startSize = t, this.material.shader.setDefine("START_SIZE_CODE", t ? t.toGLSL("t", "emitRandom") : M.START_SIZE_CODE)
                }
            },
            startSizeScale: {
                get: function() {
                    return this.material.uniforms.uStartSize
                },
                set: function(t) {
                    this.material.uniforms.uStartSize = t
                }
            },
            startSpeed: {
                get: function() {
                    return this._startSpeed
                },
                set: function(t) {
                    this._startSpeed = t, this._vertexDataDirty = !0
                }
            },
            texture: {
                get: function() {
                    return this.material.getTexture("PARTICLE_TEXTURE")
                },
                set: function(t) {
                    var e = this.material,
                        i = e.shader;
                    t ? (e.setTexture("PARTICLE_TEXTURE", t), i.setDefine("PARTICLE_TEXTURE", !0)) : (e.removeTexture("PARTICLE_TEXTURE"), i.removeDefine("PARTICLE_TEXTURE"))
                }
            },
            textureAnimationCycles: {
                get: function() {
                    return this.material.uniforms.textureTileInfo[2]
                },
                set: function(t) {
                    this.material.uniforms.textureTileInfo[2] = t
                }
            },
            textureFrameOverLifetime: {
                get: function() {
                    return this._textureFrameOverLifetime
                },
                set: function(t) {
                    this._textureFrameOverLifetime = t, this.material.shader.setDefine("TEXTURE_FRAME_CODE", t ? t.toGLSL("t", "emitRandom") : M.TEXTURE_FRAME_CODE)
                }
            },
            textureTilesX: {
                get: function() {
                    return this.material.uniforms.textureTileInfo[0]
                },
                set: function(t) {
                    this.material.uniforms.textureTileInfo[0] = t
                }
            },
            textureTilesY: {
                get: function() {
                    return this.material.uniforms.textureTileInfo[1]
                },
                set: function(t) {
                    this.material.uniforms.textureTileInfo[1] = t
                }
            },
            worldVelocityOverLifetime: {
                get: function() {
                    return this._worldVelocityOverLifetime
                },
                set: function(t) {
                    this._worldVelocityOverLifetime = t, this.material.shader.setDefine("WORLD_VELOCITY_CURVE_CODE", t ? t.integralToGLSL("t", "emitRandom") : M.WORLD_VELOCITY_CURVE_CODE)
                }
            }
        }), o.prototype.setBoxExtents = function(t) {
            this.boxExtents.copy(t), this._vertexDataDirty = !0
        }, o.prototype._random = function() {
            var t = 1e5 * Math.sin(this._seed++);
            return t - Math.floor(t)
        }, o.prototype._updateUniforms = function() {
            var t = this.material.uniforms,
                e = this._worldToLocalRotation,
                i = this._localToWorldRotation;
            this.localSpace ? (e.copy(this.meshEntity.transformComponent.sync().worldTransform.rotation).invert(), i.copy(l.default.IDENTITY)) : (e.copy(l.default.IDENTITY), i.copy(this.entity.transformComponent.sync().worldTransform.rotation));
            var n = this._localGravity;
            n.copy(this.gravity), n.applyPost(e);
            var r = t.gravity;
            r[0] = n.x, r[1] = n.y, r[2] = n.z;
            for (var o = 0; o < 9; o++) t.invWorldRotation[o] = e.data[o], t.worldRotation[o] = i.data[o];
            t.time = this.time;
            var a = t.uColor,
                s = this.startColorScale;
            a[0] = s.x, a[1] = s.y, a[2] = s.z, a[3] = s.w
        }, o.prototype._updateIndexBuffer = function(t) {
            var e = this.mesh,
                i = this.meshData,
                n = e.getIndexBuffer(),
                r = i.getIndexBuffer();
            i.getIndexData().setDataNeedsRefresh();
            for (var o = e.vertexCount, a = 0; a < t.length; a++)
                for (var s = 0; s < n.length; s++) r[a * n.length + s] = n[s] + t[a].index * o
        }, o.prototype.pause = function() {
            this.paused = !0
        }, o.prototype.resume = function() {
            this.play()
        }, o.prototype.play = function() {
            this.paused = !1
        }, o.prototype.stop = function() {
            this.pause(), this.time = 0, this._seed = this._initSeed, this._nextEmitParticleIndex = 0, this._syncParticleDataArrays(), this._updateVertexData();
            var t = this.meshData;
            t.rebuildData(t.vertexCount, t.indexCount), this._vertexDataDirty = !0, this._updateIndexBuffer(this.particles), this._updateUniforms()
        }, o.prototype._syncParticleDataArrays = function() {
            for (var t = this.particlesSorted, e = this.particles, i = this.maxParticles; t.length < i;) {
                var n = new L.default(this);
                n.index = t.length, n.loopAfter = this.duration, t.push(n), e.push(n)
            }
            for (; t.length > i;) {
                var n = e.pop();
                t.splice(t.indexOf(n), 1)
            }
        }, o.prototype._updateVertexData = function() {
            var t, e, i = this.meshData,
                n = this.maxParticles,
                o = this.particles,
                a = this.duration,
                s = this.material,
                l = i.getAttributeBuffer(m.default.TEXCOORD0),
                u = i.getAttributeBuffer(m.default.POSITION),
                f = i.getIndexBuffer(),
                c = this.mesh,
                d = c.getIndexBuffer(),
                h = c.getAttributeBuffer(m.default.POSITION),
                p = c.getAttributeBuffer(m.default.TEXCOORD0),
                v = c.vertexCount;
            for (t = 0; t < n; t++) {
                for (var e = 0; e < p.length; e++) l[t * p.length + e] = p[e];
                for (var e = 0; e < h.length; e++) u[t * h.length + e] = h[e];
                for (var e = 0; e < d.length; e++) f[t * d.length + e] = d[e] + t * v
            }
            i.setAttributeDataUpdated(m.default.TEXCOORD0), i.setAttributeDataUpdated(m.default.POSITION), this.localSpace && this._loop ? s.shader.setDefine("LOOP", !0) : s.shader.removeDefine("LOOP"), this.preWarm ? s.shader.removeDefine("HIDE_IF_EMITTED_BEFORE_ZERO") : s.shader.setDefine("HIDE_IF_EMITTED_BEFORE_ZERO", !0);
            var y = i.getAttributeBuffer("TIME_INFO"),
                _ = this.emissionRate;
            if (this.localSpace) {
                for (var g = Math.min(Math.ceil(60 * a), 1e5), T = 0, x = 0, S = _.getIntegralValueAt(1), t = 0; T < n && t < g; t++) {
                    var O = (Math.floor(t / g) * S + _.getIntegralValueAt(t / g % 1)) * a,
                        R = Math.floor(O - T);
                    for (T += R; x < T && x < n;) o[x++].emitTime = t / g * a;
                    if (x >= n) break
                }
                for (; x < n;) {
                    var E = o[x];
                    E.emitTime = 2 * a, E.active = 0, x++
                }
            }
            var L = this.preWarm,
                C = this.loop;
            for (t = 0; t < n; t++) {
                var E = o[t],
                    A = E.emitRandom = this._random(),
                    D = r(E.emitTime / a, 1);
                if (E.lifeTime = this.startLifetime.getValueAt(D, this._random()), this.localSpace) {
                    if (L && C && (E.emitTime -= a), C) {
                        var I = E.emitTime;
                        E.active = (!L && I >= 0 || L) && (I <= 0 && L || I <= a && !L) ? 1 : 0, E.loopAfter = Math.max(a, E.lifeTime)
                    }
                } else E.emitTime = -2 * E.lifeTime, E.active = 0;
                for (e = 0; e < v; e++) y[4 * v * t + 4 * e + 0] = E.lifeTime, y[4 * v * t + 4 * e + 1] = E.active, y[4 * v * t + 4 * e + 2] = A, y[4 * v * t + 4 * e + 3] = E.emitTime
            }
            i.setAttributeDataUpdated("TIME_INFO");
            var P = i.getAttributeBuffer("START_POS"),
                b = i.getAttributeBuffer("START_DIR");
            for (t = 0; t < n; t++) {
                var E = o[t],
                    u = E.startPosition,
                    w = E.startDirection,
                    D = E.emitTime / a % 1;
                for (this._generateLocalPositionAndDirection(u, w, D), e = 0; e < v; e++) P[4 * v * t + 4 * e + 0] = u.x, P[4 * v * t + 4 * e + 1] = u.y, P[4 * v * t + 4 * e + 2] = u.z, P[4 * v * t + 4 * e + 3] = 0, b[4 * v * t + 4 * e + 0] = w.x, b[4 * v * t + 4 * e + 1] = w.y, b[4 * v * t + 4 * e + 2] = w.z, b[4 * v * t + 4 * e + 3] = E.loopAfter
            }
            i.setAttributeDataUpdated("START_POS"), i.setAttributeDataUpdated("START_DIR")
        }, o.prototype._generateLocalPositionAndDirection = function(t, e, i) {
            var n = this.shapeType,
                r = Math.cos,
                o = Math.sin,
                a = Math.PI;
            if ("sphere" === n) {
                var s = Math.acos(2 * this._random() - 1),
                    l = 2 * a * this._random(),
                    u = this.sphereRadius;
                this.sphereEmitFromShell || (u *= Math.cbrt(this._random())), t.setDirect(u * r(l) * o(s), u * r(s), u * o(l) * o(s)), e.setDirect(r(l) * o(s), r(s), o(l) * o(s))
            } else if ("cone" === n) {
                var l = 2 * a * this._random();
                switch (this.coneEmitFrom) {
                    case "base":
                        var f = Math.sqrt(this._random()),
                            u = this.coneRadius * f;
                        t.setDirect(u * r(l), 0, u * o(l));
                        var c = (this.coneRadius + this.coneLength * Math.tan(this.coneAngle)) * f;
                        e.setDirect(c * r(l), this.coneLength, c * o(l)).sub(t);
                        break;
                    case "volume":
                        var f = Math.sqrt(this._random()),
                            u = this.coneRadius * f;
                        t.setDirect(u * r(l), 0, u * o(l));
                        var c = (this.coneRadius + this.coneLength * Math.tan(this.coneAngle)) * f;
                        e.setDirect(c * r(l), this.coneLength, c * o(l)).sub(t), e.setDirect(c * r(l), this.coneLength, c * o(l)), t.lerp(e, this._random()), e.sub(t);
                        break;
                    case "volumeshell":
                        var u = this.coneRadius;
                        t.setDirect(u * r(l), 0, u * o(l));
                        var c = this.coneRadius + this.coneLength * Math.tan(this.coneAngle);
                        e.setDirect(c * r(l), this.coneLength, c * o(l)), t.lerp(e, this._random()), e.sub(t)
                }
            } else t.setDirect(this._random() - .5, this._random() - .5, this._random() - .5).mul(this.boxExtents), e.setDirect(0, 1, 0);
            if (this.randomDirection) {
                var s = Math.acos(2 * this._random() - 1),
                    l = 2 * a * this._random();
                e.setDirect(r(l) * o(s), r(s), o(l) * o(s))
            }
            var d = this.startSpeed.getValueAt(i, this._random());
            e.normalize().scale(d)
        }, o.prototype.emitOne = function(t, e) {
            var i = this.meshData,
                n = i.getAttributeBuffer("START_POS"),
                r = i.getAttributeBuffer("START_DIR"),
                o = i.getAttributeBuffer("TIME_INFO"),
                a = this._nextEmitParticleIndex;
            this._nextEmitParticleIndex = (this._nextEmitParticleIndex + 1) % this.maxParticles;
            var s = this.particles[a],
                l = s.startPosition,
                u = s.startDirection;
            s.emitTime = this.time, l.copy(t), u.copy(e), s.active = 1;
            for (var f = this.mesh.vertexCount, c = s.emitRandom = this._random(), d = 0; d < f; d++) o[4 * f * a + 4 * d + 0] = s.lifeTime, o[4 * f * a + 4 * d + 1] = s.active, o[4 * f * a + 4 * d + 2] = c, o[4 * f * a + 4 * d + 3] = s.emitTime, n[4 * f * a + 4 * d + 0] = l.x, n[4 * f * a + 4 * d + 1] = l.y, n[4 * f * a + 4 * d + 2] = l.z, n[4 * f * a + 4 * d + 3] = 0, r[4 * f * a + 4 * d + 0] = u.x, r[4 * f * a + 4 * d + 1] = u.y, r[4 * f * a + 4 * d + 2] = u.z, r[4 * f * a + 4 * d + 3] = s.loopAfter;
            i.setAttributeDataUpdated("START_POS"), i.setAttributeDataUpdated("START_DIR"), i.setAttributeDataUpdated("TIME_INFO")
        }, o.prototype._updateBounds = function() {
            if (this.meshEntity && this.meshEntity.meshRendererComponent.worldBound) {
                var t = this.meshEntity.meshRendererComponent.worldBound;
                t.center.copy(this.entity.transformComponent.sync().worldTransform.translation);
                var e = this.boundsRadius;
                t.xExtent = t.yExtent = t.zExtent = 2 * e
            }
        };
        var z = new f.default;
        o.prototype._sortParticles = function() {
            if (this.sortMode !== o.SORT_NONE) {
                for (var t = this.particlesSorted, e = t.length; e--;) {
                    var i = t[e];
                    i.sortValue = -i.getWorldPosition(z).dot(A.default.mainCamera._direction)
                }
                for (var n = t, r = 1, e = n.length; r < e; r++) {
                    for (var a = n[r], s = r - 1; s >= 0 && !(n[s].sortValue <= a.sortValue); s--) n[s + 1] = n[s];
                    n[s + 1] = a
                }
                this._updateIndexBuffer(t)
            }
        };
        var F = new f.default,
            G = new f.default;
        o.prototype.process = function(t) {
            this._vertexDataDirty && (this._updateVertexData(), this._vertexDataDirty = !1), this.meshEntity.meshRendererComponent.hidden = this.entity.isVisiblyHidden();
            var e = this.entity,
                i = e.transformComponent.sync().worldTransform,
                n = this.particles;
            if (this.localSpace) {
                var o = this.meshEntity;
                a(o.transformComponent.transform, e.transformComponent.transform), a(o.transformComponent.sync().worldTransform, e.transformComponent.worldTransform)
            }
            if (!this.paused) {
                this._lastTime = this.time, this.time += t;
                var s = this.time;
                if (!this.localSpace) {
                    var l = this.emissionRate,
                        u = this.loop,
                        f = this.duration,
                        c = r(s / f, 1),
                        d = Math.floor(s * l.getValueAt(c, this._random())) - Math.floor(this._lastTime * l.getValueAt(c, this._random()));
                    !u && s > f && (d = 0);
                    for (var h = 0; h < d; h++) {
                        if (u) {
                            var m = this._findGoodParticle();
                            if (!m) continue;
                            this._nextEmitParticleIndex = m.index
                        } else {
                            var m = n[this._nextEmitParticleIndex];
                            if (m.active) continue
                        }
                        this._generateLocalPositionAndDirection(F, G, c), F.applyPostPoint(i.matrix), G.applyPost(i.rotation), this.emitOne(F, G)
                    }
                }
                this._updateUniforms(), this._sortParticles(), this._updateBounds()
            }
        }, o.prototype._findGoodParticle = function() {
            for (var t = this.time, e = this.particles, i = this._nextEmitParticleIndex; i < this._nextEmitParticleIndex + e.length; i++) {
                var n = e[i % e.length];
                if (t - n.emitTime > n.lifeTime) return n
            }
        }, o.prototype.attached = function(t) {
            this.entity = t, this._syncParticleDataArrays();
            var e = m.default.defaultMap([m.default.POSITION, m.default.TEXCOORD0]);
            e.TIME_INFO = m.default.createAttribute(4, "Float"), e.START_POS = m.default.createAttribute(4, "Float"), e.START_DIR = m.default.createAttribute(4, "Float");
            var i = this.maxParticles,
                n = new m.default(e, i * this.mesh.vertexCount, i * this.mesh.indexCount);
            n.vertexData.setDataUsage("DynamicDraw"), this.meshData = n;
            var r = new _.default(this.material);
            r.castShadows = r.receiveShadows = r.isPickable = r.isReflectable = !1, this.meshEntity = this.entity._world.createEntity(n, "ParticleSystemComponentMesh").set(r).addToWorld(), this.localSpace = this._localSpace, this._vertexDataDirty = !0
        }, o.prototype.detached = function() {
            this.meshEntity.clearComponent("MeshDataComponent"), this.particles.length = this.particlesSorted.length = 0, this.meshEntity.removeFromWorld(), this.entity = this.meshEntity = null
        }, o.applyOnEntity = function(t, e) {
            t instanceof o && e.setComponent(t)
        }, o.prototype.clone = function() {
            return new o(this)
        }, e.default = o
    },
    483: function(t, e, i) {
        "use strict";

        function n(t) {
            this.component = t, this.index = 0, this.lifeTime = 1, this.emitTime = 0, this.active = 1, this.startPosition = new o.default, this.startDirection = new o.default, this.startAngle = 0, this.startSize = 1, this.sortValue = 0, this.emitRandom = 0, this.loopAfter = 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(0),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r),
            a = new o.default,
            s = new o.default,
            l = new o.default,
            u = new o.default;
        n.prototype.getWorldPosition = function(t) {
            if (!this.active) return t;
            var e = this.component,
                i = e.time - this.emitTime;
            if (e.loop && (i %= this.loopAfter), a.copy(this.startDirection).scale(i), s.copy(e.localSpace ? e._localGravity : e.gravity).scale(i * i * .5), t.copy(this.startPosition).add(a).add(s), e.localVelocityOverLifetime) {
                var n = i / this.loopAfter;
                e.localVelocityOverLifetime.getVec3IntegralValueAt(n, this.emitRandom, l), l.applyPost(e._localToWorldRotation), t.add(l)
            }
            if (e.worldVelocityOverLifetime) {
                var n = i / this.loopAfter;
                e.worldVelocityOverLifetime.getVec3IntegralValueAt(n, this.emitRandom, u), u.applyPost(e._worldToLocalRotation), t.add(u)
            }
            if (e.localSpace) {
                var r = e.entity.transformComponent.sync().worldTransform;
                t.applyPost(r.rotation), t.add(r.translation)
            }
            return t
        }, e.default = n
    },
    484: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function r(t) {
            t = t || {}, a.default.call(this, t), this.curveA = void 0 !== t.curveA ? t.curveA.clone() : null, this.curveB = void 0 !== t.curveB ? t.curveB.clone() : null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = i(100),
            a = n(o),
            s = i(4),
            l = n(s);
        r.prototype = Object.create(a.default.prototype), r.prototype.constructor = r, r.prototype.toGLSL = function(t, e) {
            return "mix(" + this.curveA.toGLSL(t, e) + "," + this.curveB.toGLSL(t, e) + "," + e + ")"
        }, r.prototype.integralToGLSL = function(t, e) {
            return "mix(" + this.curveA.integralToGLSL(t, e) + "," + this.curveB.integralToGLSL(t, e) + "," + e + ")"
        }, r.prototype.getValueAt = function(t, e) {
            return l.default.lerp(e, this.curveA.getValueAt(t, e), this.curveB.getValueAt(t, e))
        }, r.prototype.getIntegralValueAt = function(t, e) {
            return l.default.lerp(e, this.curveA.getIntegralValueAt(t, e), this.curveB.getIntegralValueAt(t, e))
        }, e.default = r
    },
    485: function(t, e, i) {
        "use strict";

        function n(t) {
            t = t || {}, o.default.call(this, t), this.k = void 0 !== t.k ? t.k : 1, this.m = t.m || 0
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(100),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        n.prototype = Object.create(o.default.prototype), n.prototype.constructor = n, n.prototype.fromStartEnd = function(t, e) {
            this.m = t, this.k = e - t
        }, n.prototype.toGLSL = function(t) {
            return "(" + o.default.numberToGLSL(this.k) + "*" + t + "+" + o.default.numberToGLSL(this.m) + ")"
        }, n.prototype.integralToGLSL = function(t) {
            return "(" + o.default.numberToGLSL(this.k) + "*" + t + "*" + t + "*0.5+" + o.default.numberToGLSL(this.m) + "*" + t + ")"
        }, n.prototype.getValueAt = function(t) {
            return this.k * (t - this.timeOffset) + this.m
        }, n.prototype.getIntegralValueAt = function(t) {
            var e = t - this.timeOffset;
            return .5 * this.k * e * e + this.m * e
        }, e.default = n
    },
    486: function(t, e, i) {
        "use strict";

        function n(t) {
            t = t || {}, o.default.call(this, t), this.segments = t.segments ? t.segments.map(function(t) {
                return t.clone()
            }) : []
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(100),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        n.prototype = {
            clone: function() {
                return new n(this)
            },
            addSegment: function(t) {
                this.segments.push(t), this.sort()
            },
            removeSegment: function(t) {
                this.segments.splice(t, 1)
            },
            sort: function() {
                this.segments = this.segments.sort(function(t, e) {
                    return t.timeOffset - e.timeOffset
                })
            },
            toGLSL: function(t, e) {
                for (var i = this.segments, n = [], r = 0; r < i.length; r++) {
                    var a = i[r],
                        s = o.default.numberToGLSL(a.timeOffset),
                        l = "1.0";
                    r < i.length - 1 && (l = o.default.numberToGLSL(i[r + 1].timeOffset)), n.push("step(" + s + ",t)*step(-" + l + ",-t)*" + a.toGLSL(t, e))
                }
                return n.join("+")
            },
            integralToGLSL: function(t, e) {
                for (var i = this.segments, n = [], r = 0; r < i.length; r++) {
                    var a = i[r],
                        s = o.default.numberToGLSL(a.timeOffset),
                        l = "1.0";
                    r < i.length - 1 && (l = o.default.numberToGLSL(i[r + 1].timeOffset)), n.push(a.integralToGLSL("clamp(" + t + "," + s + "," + l + ")", e))
                }
                return n.join("+")
            },
            getValueAt: function(t, e) {
                for (var i = this.segments, n = 0; n < i.length - 1; n++) {
                    var r = i[n],
                        o = i[n + 1];
                    if (r.timeOffset <= t && o.timeOffset > t) return this.segments[n].getValueAt(t, e)
                }
                return this.segments[i.length - 1].getValueAt(t, e)
            },
            getIntegralValueAt: function(t, e) {
                for (var i = this.segments, n = 0, r = 0; r < i.length; r++) {
                    var o = i[r],
                        a = 1;
                    if (r < i.length - 1 && (a = i[r + 1].timeOffset), o.timeOffset <= t && a > t) {
                        n += this.segments[r].getIntegralValueAt(t, e);
                        break
                    }
                    n += this.segments[r].getIntegralValueAt(a, e)
                }
                return n
            }
        }, e.default = n
    },
    487: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function r(t) {
            if (t = t || {}, t = f.default.clone(t), t.type = "vec3", l.default.call(this, t), this.x = t.x ? t.x.clone() : new a.default, this.y = t.y ? t.y.clone() : new a.default, this.z = t.z ? t.z.clone() : new a.default, "float" !== this.x.type || "float" !== this.y.type || "float" !== this.z.type) throw new Error("Vector3Curve must have scalar components.")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = i(131),
            a = n(o),
            s = i(100),
            l = n(s),
            u = i(3),
            f = n(u);
        r.prototype = Object.create(l.default.prototype), r.prototype.constructor = r, r.prototype.toGLSL = function(t, e) {
            return "vec3(" + [this.x, this.y, this.z].map(function(i) {
                return i.toGLSL(t, e)
            }).join(",") + ")"
        }, r.prototype.integralToGLSL = function(t, e) {
            return "vec3(" + [this.x, this.y, this.z].map(function(i) {
                return i.integralToGLSL(t, e)
            }).join(",") + ")"
        }, r.prototype.getVec3ValueAt = function(t, e, i) {
            i.setDirect(this.x.getValueAt(t, e), this.y.getValueAt(t, e), this.z.getValueAt(t, e))
        }, r.prototype.getVec3IntegralValueAt = function(t, e, i) {
            i.setDirect(this.x.getIntegralValueAt(t, e), this.y.getIntegralValueAt(t, e), this.z.getIntegralValueAt(t, e))
        }, e.default = r
    },
    488: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function r(t) {
            if (t = t || {}, t = f.default.clone(t), t.type = "vec4", l.default.call(this, t), this.x = t.x ? t.x.clone() : new a.default, this.y = t.y ? t.y.clone() : new a.default, this.z = t.z ? t.z.clone() : new a.default, this.w = t.w ? t.w.clone() : new a.default({
                    value: 1
                }), "float" !== this.x.type || "float" !== this.y.type || "float" !== this.z.type || "float" !== this.w.type) throw new Error("Vector4Curve must have scalar components.")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = i(131),
            a = n(o),
            s = i(100),
            l = n(s),
            u = i(3),
            f = n(u);
        r.prototype = Object.create(l.default.prototype), r.prototype.constructor = r, r.prototype.toGLSL = function(t, e) {
            return "vec4(" + [this.x, this.y, this.z, this.w].map(function(i) {
                return i.toGLSL(t, e)
            }).join(",") + ")"
        }, r.prototype.integralToGLSL = function(t, e) {
            return "vec4(" + [this.x, this.y, this.z, this.w].map(function(i) {
                return i.integralToGLSL(t, e)
            }).join(",") + ")"
        }, r.prototype.getVec4ValueAt = function(t, e, i) {
            i.setDirect(this.x.getValueAt(t, e), this.y.getValueAt(t, e), this.z.getValueAt(t, e), this.w.getValueAt(t, e))
        }, r.prototype.getVec4IntegralValueAt = function(t, e, i) {
            i.setDirect(this.x.getIntegralValueAt(t, e), this.y.getIntegralValueAt(t, e), this.z.getIntegralValueAt(t, e), this.w.getIntegralValueAt(t, e))
        }, e.default = r
    },
    867: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(482),
            o = n(r),
            a = i(131),
            s = n(a),
            l = i(100),
            u = n(l),
            f = i(484),
            c = n(f),
            d = i(485),
            h = n(d),
            m = i(486),
            p = n(m),
            v = i(487),
            y = n(v),
            _ = i(488),
            g = n(_),
            T = i(868),
            x = n(T),
            S = i(483),
            O = n(S),
            R = i(869),
            E = n(R),
            L = i(870),
            C = n(L),
            A = {
                ParticleSystemComponent: o.default,
                ConstantCurve: s.default,
                Curve: u.default,
                LerpCurve: c.default,
                LinearCurve: h.default,
                PolyCurve: p.default,
                Vector3Curve: y.default,
                Vector4Curve: g.default,
                ParticleSystemComponentHandler: x.default,
                ParticleData: O.default,
                ParticleDebugRenderSystem: E.default,
                ParticleSystemSystem: C.default
            };
        if ("undefined" != typeof window)
            for (var D in A) window.sumerian[D] = A[D];
        e.default = A
    },
    868: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function r() {
            c.default.apply(this, arguments), this._cachedPresetTextures = {}, this._type = "ParticleSystemComponent"
        }

        function o(t) {
            return [{
                type: "constant",
                offset: 0,
                value: t
            }]
        }

        function a(t, e) {
            return [{
                type: "linear",
                offset: 0,
                k: t,
                m: e
            }]
        }

        function s(t, e) {
            e = void 0 !== e ? e : 1;
            for (var i = new g.default, n = 0; n < t.length; n++) {
                var r = t[n];
                switch (r.type) {
                    case "linear":
                        i.addSegment(new p.default({
                            timeOffset: r.offset,
                            k: r.k * e,
                            m: r.m * e
                        }));
                        break;
                    case "constant":
                        i.addSegment(new y.default({
                            timeOffset: r.offset,
                            value: r.value * e
                        }));
                        break;
                    case "lerp":
                        i.addSegment(new E.default({
                            timeOffset: r.offset,
                            curveA: s(r.curveA, e),
                            curveB: s(r.curveB, e)
                        }))
                }
            }
            return i
        }

        function l(t) {
            return new x.default({
                x: s(t[0]),
                y: s(t[1]),
                z: s(t[2])
            })
        }

        function u(t) {
            return new O.default({
                x: s(t[0]),
                y: s(t[1]),
                z: s(t[2]),
                w: s(t[3])
            })
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var f = i(20),
            c = n(f),
            d = i(482),
            h = n(d),
            m = i(485),
            p = n(m),
            v = i(131),
            y = n(v),
            _ = i(486),
            g = n(_),
            T = i(487),
            x = n(T),
            S = i(488),
            O = n(S),
            R = i(484),
            E = n(R),
            L = i(12),
            C = n(L),
            A = i(3),
            D = n(A),
            I = i(0),
            P = n(I),
            b = i(4),
            w = n(b),
            V = i(112),
            M = n(V);
        r.prototype = Object.create(c.default.prototype), r.prototype.constructor = r, c.default._registerClass("particleSystem", r), r.prototype._prepare = function(t) {
            return D.default.defaults(t, {
                gravity: [0, 0, 0],
                seed: -1,
                shapeType: "cone",
                sphereRadius: 1,
                sphereEmitFromShell: !1,
                randomDirection: !1,
                coneEmitFrom: "base",
                boxExtents: [1, 1, 1],
                coneRadius: 1,
                coneAngle: 10,
                coneLength: 1,
                startColor: [o(1), o(1), o(1), o(1)],
                colorOverLifetime: [o(1), o(1), o(1), o(1)],
                duration: 5,
                localSpace: !0,
                startSpeed: o(5),
                localVelocityOverLifetime: [o(0), o(0), o(0)],
                worldVelocityOverLifetime: [o(0), o(0), o(0)],
                maxParticles: 100,
                emissionRate: o(10),
                startLifetime: o(5),
                renderQueue: 3010,
                discardThreshold: 0,
                loop: !1,
                preWarm: !0,
                blending: "NoBlending",
                depthWrite: !0,
                depthTest: !0,
                textureTilesX: 1,
                textureTilesY: 1,
                textureAnimationCycles: 1,
                textureFrameOverLifetime: a(1, 0),
                startSize: o(1),
                sortMode: "none",
                billboard: !0,
                sizeOverLifetime: o(1),
                startAngle: o(0),
                rotationSpeedOverLifetime: o(0),
                texturePreset: "Custom",
                textureRef: null
            })
        }, r.prototype._create = function() {
            return new h.default
        }, r.prototype._remove = function(t) {
            t.clearComponent("ParticleSystemComponent")
        }, r.prototype.update = function(t, e, i) {
            var n = this;
            return c.default.prototype.update.call(this, t, e, i).then(function(t) {
                if (t) {
                    t.gravity.setArray(e.gravity), t.seed = e.seed, t.shapeType = e.shapeType, t.sphereRadius = e.sphereRadius, t.sphereEmitFromShell = e.sphereEmitFromShell, t.randomDirection = e.randomDirection, t.coneEmitFrom = e.coneEmitFrom, t.setBoxExtents(new P.default(e.boxExtents)), t.coneRadius = e.coneRadius, t.coneAngle = e.coneAngle * w.default.DEG_TO_RAD, t.coneLength = e.coneLength, t.startColor = u(e.startColor), t.colorOverLifetime = u(e.colorOverLifetime), t.duration = e.duration, t.localSpace = e.localSpace, t.startSpeed = s(e.startSpeed), t.localVelocityOverLifetime = l(e.localVelocityOverLifetime), t.worldVelocityOverLifetime = l(e.worldVelocityOverLifetime), t.maxParticles = e.maxParticles, t.emissionRate = s(e.emissionRate), t.startLifetime = s(e.startLifetime), t.renderQueue = e.renderQueue, t.discardThreshold = e.discardThreshold, t.loop = e.loop, t.preWarm = e.preWarm, t.blending = e.blending, t.depthWrite = e.depthWrite, t.depthTest = e.depthTest, t.textureTilesX = e.textureTilesX, t.textureTilesY = e.textureTilesY, t.textureFrameOverLifetime = s(e.textureFrameOverLifetime), t.textureAnimationCycles = e.textureAnimationCycles, t.startSize = s(e.startSize), t.sortMode = {
                        none: h.default.SORT_NONE,
                        camera_distance: h.default.SORT_CAMERA_DISTANCE
                    }[e.sortMode], t.billboard = e.billboard, t.sizeOverLifetime = s(e.sizeOverLifetime), t.startAngle = s(e.startAngle, w.default.DEG_TO_RAD), t.rotationSpeedOverLifetime = s(e.rotationSpeedOverLifetime, w.default.DEG_TO_RAD), t.autoPlay = e.autoPlay, t.paused || t.stop(), t.autoPlay && t.play();
                    var r = [],
                        o = n._cachedPresetTextures,
                        a = e.texture && e.texture.enabled && e.texture.textureRef;
                    return a && "Custom" === e.texturePreset ? r.push(n._load(a, i).then(function(e) {
                        return t.texture = e, t
                    }).then(null, function(t) {
                        throw new Error("Error loading texture: " + a + " - " + t)
                    })) : "Flare" === e.texturePreset ? (o.Flare = o.Flare || M.default.createFlareTexture(32), t.texture = o.Flare) : "Splash" === e.texturePreset ? (o.Splash = o.Splash || M.default.createSplashTexture(32), t.texture = o.Splash) : "Plankton" === e.texturePreset ? (o.Plankton = o.Plankton || M.default.createPlanktonTexture(32), t.texture = o.Plankton) : "Snowflake" === e.texturePreset ? (o.Snowflake = o.Snowflake || M.default.createSnowflakeTexture(32), t.texture = o.Snowflake) : t.texture = null, r.length ? C.default.all(r).then(function() {
                        return t
                    }) : t
                }
            })
        }, e.default = r
    },
    869: function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function r() {
            var t = this;
            l.default.call(this, "ParticleDebugRenderSystem", ["ParticleSystemComponent"]), this.priority = 3, this.renderList = [], this.camera = null, f.default.addListener("sumerian.setCurrentCamera", function(e) {
                t.camera = e.camera
            }), this.renderAll = !0, this.selection = new a.default;
            var e = new m.default(v.default.simpleColored);
            e.uniforms.color = [0, 1, 0], this.sphereRenderable = {
                materials: [e],
                transform: new d.default,
                meshData: new _.default(12, 12, 1)
            }, this.boxRenderable = {
                materials: [e],
                transform: new d.default,
                meshData: new T.default(1, 1, 1)
            }, this.coneRenderable = {
                materials: [e],
                transform: new d.default,
                meshData: new S.default(16, 1, 1, 1)
            }, this.offsetTransform = new d.default
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = i(63),
            a = n(o),
            s = i(7),
            l = n(s),
            u = i(5),
            f = n(u),
            c = i(10),
            d = n(c),
            h = i(9),
            m = n(h),
            p = i(15),
            v = n(p),
            y = i(97),
            _ = n(y),
            g = i(57),
            T = n(g),
            x = i(120),
            S = n(x);
        r.prototype = Object.create(l.default.prototype), r.prototype.constructor = r, r.prototype.process = function(t) {
            for (var e = 0; e < t.length; e++) {
                var i = t[e],
                    n = i.particleSystemComponent.meshEntity;
                n && (i.isVisiblyHidden() ? n.meshRendererComponent.hidden = !0 : n.meshRendererComponent.hidden = !this._shouldRenderDebugForEntity(i))
            }
        }, r.prototype._shouldRenderDebugForEntity = function(t) {
            return !this.passive && (this.renderAll || this.selection.contains(t))
        }, r.prototype.render = function(t) {
            if (this.camera && !this.passive) {
                t.checkResize(this.camera);
                for (var e = this._activeEntities, i = 0, n = e.length; i !== n; i++) {
                    var r = e[i];
                    if (this.renderAll || this.selection.contains(r)) {
                        var o;
                        switch (r.particleSystemComponent.shapeType) {
                            case "sphere":
                                o = this.sphereRenderable;
                                var a = r.particleSystemComponent.sphereRadius;
                                o.transform.scale.setDirect(a, a, a), this.offsetTransform.setIdentity();
                                break;
                            case "box":
                                o = this.boxRenderable, o.transform.scale.copy(r.particleSystemComponent.boxExtents), this.offsetTransform.setIdentity();
                                break;
                            case "cone":
                                var s = r.particleSystemComponent.coneRadius;
                                o = this.coneRenderable, this.offsetTransform.setIdentity(), o.meshData.radiusTop = s + Math.tan(r.particleSystemComponent.coneAngle) * r.particleSystemComponent.coneLength, o.meshData.radiusBottom = s, o.meshData.height = r.particleSystemComponent.coneLength, o.meshData.rebuild(), o.meshData.setVertexDataUpdated(), this.offsetTransform.translation.set(0, 0, .5 * r.particleSystemComponent.coneLength), this.offsetTransform.rotation.rotateX(3 * Math.PI / 2)
                        }
                        if (o) {
                            o.meshData.indexModes = ["Lines"];
                            var l = o.transform,
                                u = r.transformComponent.sync().worldTransform;
                            l.rotation.copy(this.offsetTransform.rotation), l.rotation.mul(u.rotation), this.offsetTransform.translation.applyPost(l.rotation), l.translation.copy(this.offsetTransform.translation).add(u.translation), l.update(), t.render(o, null, this.camera, null, null, !1)
                        }
                    }
                }
            }
        }, r.prototype.cleanup = function() {}, r.prototype.update = function() {
            if (!this.passive) {
                for (var t = this._activeEntities, e = t.length; e--;) {
                    var i = t[e];
                    this._shouldRenderDebugForEntity(i) ? i.particleSystemComponent.play() : i.particleSystemComponent.stop()
                }
                this.process(this._activeEntities)
            }
        }, e.default = r
    },
    870: function(t, e, i) {
        "use strict";

        function n() {
            o.default.call(this, "ParticleSystemSystem", ["ParticleSystemComponent", "TransformComponent"]), this.priority = 1
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(7),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        n.prototype = Object.create(o.default.prototype), n.prototype.constructor = n, n.prototype.process = function(t, e) {
            for (var i = 0; i < t.length; i++) t[i].particleSystemComponent.process(e)
        }, n.prototype.inserted = function() {}, n.prototype.deleted = function() {}, n.prototype.removedComponent = function() {}, n.prototype.pause = function() {
            for (var t = this._activeEntities, e = 0; e < t.length; e++) t[e].particleSystemComponent.pause()
        }, n.prototype.resume = function() {
            for (var t = this._activeEntities, e = 0; e < t.length; e++) t[e].particleSystemComponent.resume()
        }, n.prototype.play = function() {
            for (var t = this._activeEntities, e = 0; e < t.length; e++) {
                var i = t[e].particleSystemComponent;
                i.autoPlay && i.play()
            }
        }, n.prototype.stop = function() {
            this.pause();
            for (var t = this._activeEntities, e = 0; e < t.length; e++) t[e].particleSystemComponent.stop()
        }, e.default = n
    }
}, [867]);