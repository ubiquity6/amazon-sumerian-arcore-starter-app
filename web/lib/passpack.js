webpackJsonp([6], {
    130: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i() {}
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(6),
            a = r(o),
            l = n(29),
            f = r(l),
            d = n(58),
            s = r(d),
            u = n(15),
            c = r(u),
            v = n(80),
            m = r(v);
        i.billboard = {
            name: "ShaderLibExtra.billboard",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewProjectionMatrix: f.default.VIEW_PROJECTION_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                viewMatrix: f.default.VIEW_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                diffuseMap: f.default.DIFFUSE_MAP
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewProjectionMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 viewMatrix;\n\n    #ifdef INSTANCED_DRAW\n      uniform mat4 worldMatrix[INSTANCE_COUNT];\n    #else\n      uniform mat4 worldMatrix;\n    #endif\n\n    out vec2 texCoord0;\n\n    void main(void) {\n      #ifdef INSTANCED_DRAW\n        mat4 wMatrix = worldMatrix[gl_InstanceID];\n      #else\n        mat4 wMatrix = worldMatrix;\n      #endif\n\n      texCoord0 = vertexUV0;\n      gl_Position = viewProjectionMatrix * wMatrix * vec4(0.0, 0.0, 0.0, 1.0) + projectionMatrix * vec4(vertexPosition.x, vertexPosition.y, 0.0, 0.0);\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n  \n    uniform sampler2D diffuseMap;\n\n    in vec2 texCoord0;\n    \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main(void)\n    {\n      fragColor = texture(diffuseMap, texCoord0);\n    }"
        }, i.showDepth = {
            name: "ShaderLibExtra.showDepth",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION
            },
            uniforms: {
                viewProjectionMatrix: f.default.VIEW_PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                near: f.default.NEAR_PLANE,
                far: f.default.FAR_PLANE
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n  #endif\n\n    in vec3 vertexPosition;\n\n    uniform mat4 viewProjectionMatrix;\n    uniform mat4 worldMatrix;\n\n    void main(void) {\n      gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));\n    }",
            fshader: "\n\n    uniform float near;\n    uniform float far;\n    \n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    void main(void)\n    {\n      float depth = gl_FragCoord.z / gl_FragCoord.w;\n      float d = 1.0 - smoothstep( near, far, depth );\n      fragColor= vec4(d);\n    }"
        }, i.bokehShader = {
            name: "ShaderLibExtra.bokehShader",
            glslversion: 300,
            attributes: {
                position: a.default.POSITION,
                uv: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tColor: f.default.DIFFUSE_MAP,
                tDepth: f.default.DEPTH_MAP,
                focus: 1,
                aspect: 1,
                aperture: .025,
                maxblur: 1
            },
            vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 position;\n    in vec2 uv;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n    out vec2 vUv;\n\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( position, 1.0 );\n    }",
            fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define fragColor gl_FragColor\n      #define texture texture2D\n    #else\n      out vec4 fragColor;\n    #endif\n\n    in vec2 vUv;\n\n    uniform sampler2D tColor;\n    uniform sampler2D tDepth;\n    uniform float maxblur; // max blur amount\n    uniform float aperture; // aperture - bigger values for shallower depth of field\n    uniform float focus;\n    uniform float aspect;\n\n    void main() {\n      vec2 aspectcorrect = vec2( 1.0, aspect );\n      vec4 depth1 = texture( tDepth, vUv );\n      float factor = depth1.x - focus;\n      vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );\n      vec2 dofblur9 = dofblur * 0.9;\n      vec2 dofblur7 = dofblur * 0.7;\n      vec2 dofblur4 = dofblur * 0.4;\n\n      vec4 col = vec4( 0.0 );\n\n      col += texture( tColor, vUv.xy );\n      col += texture( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );\n      col += texture( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );\n\n      col += texture( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );\n\n      col += texture( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );\n\n      col += texture( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );\n      col += texture( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );\n\n      fragColor = col / 41.0;\n      fragColor.a = 1.0;\n    }"
        }, i.sepia = {
            name: "ShaderLibExtra.sepia",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                amount: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform float amount;\n    uniform sampler2D tDiffuse;\n\n    in vec2 vUv;\n\n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main() {\n      vec4 color = texture(tDiffuse, vUv );\n      vec3 c = color.rgb;\n\n      color.r = dot(c, vec3(1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount));\n      color.g = dot(c, vec3(0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount));\n      color.b = dot(c, vec3(0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount));\n\n      fragColor = vec4(min(vec3(1.0), color.rgb), color.a);\n    }"
        }, i.dotscreen = {
            name: "ShaderLibExtra.dotscreen",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                tSize: [256, 256],
                center: [.5, .5],
                angle: 1.57,
                scale: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n#ifdef WEBGL_1\n  #define in varying\n  #define texture texture2D\n#endif\n\n    uniform vec2 center;\n    uniform float angle;\n    uniform float scale;\n    uniform vec2 tSize;\n    uniform sampler2D tDiffuse;\n\n    in vec2 vUv;\n    \n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    float pattern() {\n      float s = sin( angle ), c = cos( angle );\n\n      vec2 tex = vUv * tSize - center;\n      vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;\n\n      return ( sin( point.x ) * sin( point.y ) ) * 4.0;\n    }\n\n    void main() {\n      vec4 color = texture( tDiffuse, vUv );\n      float average = ( color.r + color.g + color.b ) / 3.0;\n      fragColor = vec4( color.rgb * vec3( average * 10.0 - 5.0 + pattern() ), color.a );\n    }"
        }, i.vignette = {
            name: "ShaderLibExtra.vignette",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                offset: 1,
                darkness: 1.5
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform float offset;\n    uniform float darkness;\n\n    uniform sampler2D tDiffuse;\n\n    in vec2 vUv;\n    \n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    void main() {\n      vec4 texel = texture( tDiffuse, vUv );\n      vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );\n      fragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );\n\n      /*\n        vec4 color = texture( tDiffuse, vUv );\n        float dist = distance( vUv, vec2( 0.5 ) );\n        color.rgb *= smoothstep( 0.8, offset * 0.799, dist *( darkness + offset ) );\n        fragColor = color;\n      */\n    }"
        }, i.film = {
            name: "ShaderLibExtra.film",
            glslversion: 300,
            attributes: c.default.copy.attributes,
            uniforms: {
                tDiffuse: f.default.DIFFUSE_MAP,
                time: f.default.TIME,
                nIntensity: .5,
                sIntensity: .5,
                sCount: 1024,
                grayscale: 0,
                viewProjectionMatrix: f.default.VIEW_PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                opacity: 1,
                diffuseMap: f.default.DIFFUSE_MAP
            },
            vshader: c.default.copy.vshader,
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform float time;\n    uniform bool grayscale;\n    uniform float nIntensity;\n    uniform float sIntensity;\n    uniform float sCount;\n    uniform sampler2D tDiffuse;\n\n    in vec2 texCoord0;\n    out vec4 fragColor;\n    \n    void main() {\n      vec4 cTextureScreen = texture( tDiffuse, texCoord0 );\n      float x = texCoord0.x * texCoord0.y * time * 1000.0;\n      x = mod( x, 13.0 ) * mod( x, 123.0 );\n      float dx = mod( x, 0.01 );\n      vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\n      vec2 sc = vec2( sin( texCoord0.y * sCount ), cos( texCoord0.y * sCount ) );\n      cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\n      cResult = cTextureScreen.rgb + nIntensity * ( cResult - cTextureScreen.rgb );\n      if ( grayscale ) {\n        cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n      }\n      fragColor = vec4( cResult, cTextureScreen.a );\n    }"
        }, i.noise = {
            name: "ShaderLibExtra.noise",
            glslversion: 300,
            attributes: c.default.copy.attributes,
            uniforms: {
                tDiffuse: f.default.DIFFUSE_MAP,
                time: function() {
                    return m.default.time
                },
                nIntensity: .5,
                grayscale: 0,
                viewProjectionMatrix: f.default.VIEW_PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                opacity: 1,
                diffuseMap: f.default.DIFFUSE_MAP
            },
            vshader: c.default.copy.vshader,
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform float time;\n    uniform bool grayscale;\n    uniform float nIntensity;\n    uniform sampler2D tDiffuse;\n\n    in vec2 texCoord0;\n  \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main() {\n      vec4 cTextureScreen = texture( tDiffuse, texCoord0);\n      float x = texCoord0.x * texCoord0.y * time * 1000.0;\n\n      vec3 cResult;\n      if ( !grayscale ) {\n      float y = fract(sin(dot(vec2(mod( x + 20.0, 87.0 ), mod( x + 150.0, 23.0 )), vec2(12.9898,78.233))) * 43758.5453);\n      float z = fract(sin(dot(vec2(mod( x + 30.0, 19.0 ), mod( x + 200.0, 103.0 )), vec2(12.9898,78.233))) * 43758.5453);\n      x = fract(sin(dot(vec2(mod( x, 13.0 ), mod( x + 50.0, 123.0 )), vec2(12.9898,78.233))) * 43758.5453);\n      cResult = vec3(x, y, z);\n      } else {\n      x = fract(sin(dot(vec2(mod( x, 13.0 ), mod( x + 50.0, 123.0 )), vec2(12.9898,78.233))) * 43758.5453);\n      cResult = vec3(x);\n      }\n\n      fragColor = vec4( mix(cTextureScreen.rgb, cResult, nIntensity), cTextureScreen.a );\n    }"
        }, i.bleachbypass = {
            name: "ShaderLibExtra.bleachbypass",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                opacity: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform float opacity;\n    uniform sampler2D tDiffuse;\n\n    in vec2 vUv;\n    \n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    void main() {\n      vec4 base = texture( tDiffuse, vUv );\n\n      vec3 lumCoeff = vec3( 0.25, 0.65, 0.1 );\n      float lum = dot( lumCoeff, base.rgb );\n      vec3 blend = vec3( lum );\n\n      float L = min( 1.0, max( 0.0, 10.0 * ( lum - 0.45 ) ) );\n\n      vec3 result1 = 2.0 * base.rgb * blend;\n      vec3 result2 = 1.0 - 2.0 * ( 1.0 - blend ) * ( 1.0 - base.rgb );\n\n      vec3 newColor = mix( result1, result2, L );\n\n      float A2 = opacity * base.a;\n      vec3 mixRGB = A2 * newColor.rgb;\n      mixRGB += ( ( 1.0 - A2 ) * base.rgb );\n\n      fragColor = vec4( mixRGB, base.a );\n    }"
        }, i.horizontalTiltShift = {
            name: "ShaderLibExtra.horizontalTiltShift",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                h: 1 / 128,
                r: .5
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform sampler2D tDiffuse;\n    uniform float h;\n    uniform float r;\n\n    in vec2 vUv;\n    \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main() {\n      vec4 sum = vec4( 0.0 );\n\n      float hh = h * abs( r - vUv.y );\n      sum += texture( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;\n      sum += texture( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;\n      sum += texture( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;\n      sum += texture( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;\n      sum += texture( tDiffuse, vec2( vUv.x,            vUv.y ) ) * 0.1633;\n      sum += texture( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;\n      sum += texture( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;\n      sum += texture( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;\n      sum += texture( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;\n\n      fragColor = sum;\n\n    }"
        }, i.colorify = {
            name: "ShaderLibExtra.colorify",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                color: [1, 1, 1],
                amount: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n  #endif\n\n    uniform vec3 color;\n    uniform float amount;\n    uniform sampler2D tDiffuse;\n\n    in vec2 vUv;\n    \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main() {\n      fragColor = texture( tDiffuse, vUv );\n      vec3 luma = vec3( 0.299, 0.587, 0.114 );\n      float v = dot(fragColor.rgb, luma );\n\n      fragColor.rgb = mix(fragColor.rgb, v * color, amount);\n    }"
        }, i.hatch = {
            name: "ShaderLibExtra.hatch",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                width: 0,
                spread: 10,
                replace: !0
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n\n    uniform sampler2D tDiffuse;\n    uniform float width;\n    uniform float spread;\n    uniform bool replace;\n\n    in vec2 vUv;\n\n    \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main() {\n      fragColor = texture( tDiffuse, vUv );\n\n      float lum = length(fragColor.rgb);\n      vec3 mult = vec3(1.0, 1.0, 1.0);\n      float halfSpread = (spread*0.5);\n      if (lum < 1.00) {\n        float diff = abs(mod(gl_FragCoord.x + gl_FragCoord.y, spread) - halfSpread);\n        if (diff <= width) {\n          mult *= vec3(1.0 - (width - diff) / width);\n        }\n      }\n      if (lum < 0.75) {\n        float diff = abs(mod(gl_FragCoord.x - gl_FragCoord.y, spread) - halfSpread);\n        if (diff <= width) {\n          mult *= vec3(1.0 - (width - diff) / width);\n        }\n      }\n      if (lum < 0.50) {\n        float diff = abs(mod(gl_FragCoord.x + halfSpread + gl_FragCoord.y, spread) - halfSpread);\n        if (diff <= width) {\n          mult *= vec3(1.0 - (width - diff) / width);\n        }\n      }\n      if (lum < 0.25) {\n        float diff = abs(mod(gl_FragCoord.x + halfSpread - gl_FragCoord.y, spread) - halfSpread);\n        if (diff <= width) {\n          mult *= vec3(1.0 - (width - diff) / width);\n        }\n      }\n      if (replace) {\n        fragColor.rgb = mult;\n      } else {\n        fragColor.rgb *= mult;\n      }\n    }"
        }, i.ssaoVariant = {
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                mainProjectionMatrix: f.default.MAIN_PROJECTION_MATRIX,
                invViewProj: f.default.MAIN_PROJECTION_MATRIX_INVERSE,
                worldMatrix: f.default.WORLD_MATRIX,
                tDepth: f.default.DEPTH_MAP,
                tNormals: f.default.DIFFUSE_MAP,
                tNoise: f.default.ALBEDO_MAP,
                size: [512, 512],
                samples: f.default.SSAO_SAMPLES,
                cameraNear: f.default.MAIN_NEAR_PLANE,
                cameraFar: f.default.MAIN_FAR_PLANE,
                aoClamp: .3
            },
            vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n    \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n    \n    #ifdef WEBGL_1\n      uniform mat4 viewMatrix;\n      uniform mat4 projectionMatrix;\n      uniform mat4 worldMatrix;    \n    #else\n      uniform uniformBlockVS{\n        mat4 viewMatrix;\n        mat4 projectionMatrix;\n        mat4 worldMatrix;\n      };\n    #endif\n    \n    out vec2 viewRay;\n    out vec2 vUv;\n\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n    precision highp float;\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n    #define PI 3.14159265\n\n    uniform sampler2D tNoise;\n    uniform sampler2D tDepth;\n    uniform sampler2D tNormals;\n\n    uniform vec3 samples[32];\n\n    #ifdef WEBGL_1\n      uniform float cameraNear;\n      uniform vec2 size;\n      uniform float cameraFar;\n      uniform mat4 mainProjectionMatrix;\n      uniform mat4 invViewProj;\n    #else\n      uniform uniformBlockFS{\n        float cameraNear;\n        vec2 size;\n        float cameraFar;\n        mat4 mainProjectionMatrix;\n        mat4 invViewProj;\n      };\n    #endif\n\n\n    in vec2 vUv;\n\n    int kernelSize = 32;\n    float radius = 0.3;\n    float bias = 0.3;\n    \n    // tile noise texture over screen based on screen dimensions divided by noise size\n    vec2 noiseScale;\n\n    #ifdef WEBGL_1\n      #undef in\n    #endif\n    " + s.default.methods.unpackDepth + "\n\n    vec3 reconstructPositionWithMat2(vec2 texCoord)\n    {\n        float depth =  unpackDepth( texture( tDepth, texCoord ) );\n        vec2 ndc = (texCoord * 2.0) - 1.0;\n        vec4 pos = invViewProj * vec4(ndc,depth,1.0);\n\n        return pos.xyz /pos.w ;\n    }\n\n    void main() {\n      \n      // tile noise texture over screen based on screen dimensions divided by noise size\n      vec2 noiseScale = vec2(size.x/4.0, size.y/4.0);\n\n      vec3 fragPos = reconstructPositionWithMat2(vUv);\n      vec3 normal = texture(tNormals, vUv).rgb *2.0 - 1.0;\n      if(dot(normal,normal) < 0.05)\n      {  \n        fragColor = vec4(1.0);\n        return ;\n      }\n      vec3 randomVec = normalize(texture(tNoise,vUv * noiseScale).rgb);\n\n      vec3 tangent = normalize(randomVec - normal * dot(randomVec,normal));\n      vec3 bitangent = cross(normal,tangent);\n      \n      mat3 TBN = mat3(tangent,bitangent,normal);\n\n      float occlusion = 0.0;\n      for(int i = 0 ; i <32 ; ++i)\n      {\n        // get sample position\n        vec3 sampleVec = TBN * samples[i]; // from tangent to view-space\n        sampleVec = fragPos + sampleVec * radius; \n        \n        // project sample position (to sample texture) (to get position on screen/texture)\n        vec4 offset = vec4(sampleVec, 1.0);\n        offset = mainProjectionMatrix * offset; // from view to clip-space\n        offset.xyz /= offset.w; // perspective divide\n        offset.xyz = offset.xyz * 0.5 + 0.5; // transform to range 0.0 - 1.0\n        \n        // get sample depth\n        float sampleDepth = reconstructPositionWithMat2(offset.xy).z; // get depth value of kernel sample\n        \n        // range check & accumulate\n        float rangeCheck = smoothstep(0.0, 1.0, radius / abs(fragPos.z - sampleDepth));\n        occlusion += (sampleDepth >= sampleVec.z + bias ? 1.0 : 0.0) * rangeCheck;          \n         \n      }\n      occlusion = 1.0 - (occlusion / float(kernelSize));\n\n      fragColor = vec4(occlusion,occlusion,occlusion,1.0);\n    }\n  "
        }, i.ssao = {
            name: "ShaderLibExtra.ssao",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                tDepth: f.default.DEPTH_MAP,
                size: [512, 512],
                cameraNear: f.default.MAIN_NEAR_PLANE,
                cameraFar: f.default.MAIN_FAR_PLANE,
                fogNear: f.default.MAIN_NEAR_PLANE,
                fogFar: f.default.MAIN_FAR_PLANE,
                fogEnabled: 0,
                onlyAO: 0,
                aoClamp: .3,
                lumInfluence: 0
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n  #endif\n\n    uniform float cameraNear;\n    uniform float cameraFar;\n\n    uniform float fogNear;\n    uniform float fogFar;\n\n    uniform bool fogEnabled;  // attenuate AO with linear fog\n    uniform bool onlyAO;      // use only ambient occlusion pass?\n\n    uniform vec2 size;        // texture width, height\n    uniform float aoClamp;    // depth clamp - reduces haloing at screen edges\n\n    uniform float lumInfluence;  // how much luminance affects occlusion\n\n    uniform sampler2D tDiffuse;\n    uniform sampler2D tDepth;\n\n    in vec2 vUv;\n    \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n    #define texture texture2D\n    #undef in\n  #else\n    out vec4 fragColor;\n  #endif\n\n    // #define PI 3.14159265\n    #define DL 2.399963229728653  // PI * ( 3.0 - sqrt( 5.0 ) )\n    #define EULER 2.718281828459045\n\n    // helpers\n    float width;   // texture width\n    float height;  // texture height\n\n    float cameraFarPlusNear;\n    float cameraFarMinusNear;\n    float cameraCoef;\n\n    // user variables\n    const int samples = 16;    // ao sample count\n    const float radius = 5.50;  // ao radius\n\n    const bool useNoise = true;      // use noise instead of pattern for sample dithering\n    const float noiseAmount = 0.0002; // dithering amount\n\n    const float diffArea = 0.4;  // self-shadowing reduction\n    const float gDisplace = 0.4; // gauss bell center\n\n    const vec3 onlyAOColor = vec3( 1.0, 1.0, 1.0 );\n\n    // RGBA depth\n    float unpackDepth( const in vec4 rgba_depth ) {\n      const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n      float depth = dot( rgba_depth, bit_shift );\n      return depth;\n    }\n\n    // generating noise / pattern texture for dithering\n    vec2 rand( const vec2 coord ) {\n      vec2 noise;\n\n      if ( useNoise ) {\n        float nx = dot ( coord, vec2( 12.9898, 78.233 ) );\n        float ny = dot ( coord, vec2( 12.9898, 78.233 ) * 2.0 );\n\n        noise = clamp( fract ( 43758.5453 * sin( vec2( nx, ny ) ) ), 0.0, 1.0 );\n      } else {\n        float ff = fract( 1.0 - coord.s * ( width / 2.0 ) );\n        float gg = fract( coord.t * ( height / 2.0 ) );\n\n        noise = vec2( 0.25, 0.75 ) * vec2( ff ) + vec2( 0.75, 0.25 ) * gg;\n      }\n\n        return ( noise * 2.0  - 1.0 ) * noiseAmount;\n    }\n\n    float doFog() {\n      float zdepth = unpackDepth( texture( tDepth, vUv ) );\n      float depth = -cameraFar * cameraNear / ( zdepth * cameraFarMinusNear - cameraFar );\n\n      return smoothstep( fogNear, fogFar, depth );\n    }\n\n    float readDepth( const in vec2 coord ) {\n     return cameraCoef / ( cameraFarPlusNear - unpackDepth( texture( tDepth, coord ) ) * cameraFarMinusNear );\n    }\n\n    float compareDepths( const in float depth1, const in float depth2, inout int far ) {\n      float garea = 2.0;                         // gauss bell width\n      float diff = ( depth1 - depth2 ) * 100.0;  // depth difference (0-100)\n\n      // reduce left bell width to avoid self-shadowing\n      if ( diff < gDisplace ) {\n        garea = diffArea;\n      } else {\n        far = 1;\n      }\n\n        float dd = diff - gDisplace;\n        float gauss = pow( EULER, -2.0 * dd * dd / ( garea * garea ) );\n        return gauss;\n    }\n\n    float calcAO( float depth, float dw, float dh ) {\n      float dd = radius - depth * radius;\n      vec2 vv = vec2( dw, dh );\n\n      vec2 coord1 = vUv + dd * vv;\n      vec2 coord2 = vUv - dd * vv;\n\n      float temp1 = 0.0;\n      float temp2 = 0.0;\n\n      int far = 0;\n      temp1 = compareDepths( depth, readDepth( coord1 ), far );\n\n      // DEPTH EXTRAPOLATION\n      if ( far > 0 ) {\n        temp2 = compareDepths( readDepth( coord2 ), depth, far );\n        temp1 += ( 1.0 - temp1 ) * temp2;\n      }\n\n      return temp1;\n    } \n\n    void main() {      \n      width = size.x;   // texture width\n      height = size.y;  // texture height\n  \n      cameraFarPlusNear = cameraFar + cameraNear;\n      cameraFarMinusNear = cameraFar - cameraNear;\n      cameraCoef = 2.0 * cameraNear;\n\n      vec2 noise = rand( vUv );\n      float depth = readDepth( vUv );\n      if(depth >= 0.9999)\n      {\n        fragColor = vec4(1.0);\n        return;\n      }\n\n      float tt = clamp( depth, aoClamp, 1.0 );\n\n      float w = ( 1.0 / width )  / tt + ( noise.x * ( 1.0 - noise.x ) );\n      float h = ( 1.0 / height ) / tt + ( noise.y * ( 1.0 - noise.y ) );\n\n      float pw;\n      float ph;\n\n      float ao;\n\n      float dz = 1.0 / float( samples );\n      float z = 1.0 - dz / 2.0;\n      float l = 0.0;\n\n      for ( int i = 0; i <= samples; i ++ ) {\n        float r = sqrt( 1.0 - z );\n\n        pw = cos( l ) * r;\n        ph = sin( l ) * r;\n        ao += calcAO( depth, pw * w, ph * h );\n        z = z - dz;\n        l = l + DL;\n      }\n\n      ao /= float( samples );\n      ao = 1.0 - ao;\n\n      if ( fogEnabled ) {\n        ao = mix( ao, 1.0, doFog() );\n      }\n\n      vec3 color = texture( tDiffuse, vUv ).rgb;\n\n      vec3 lumcoeff = vec3( 0.299, 0.587, 0.114 );\n      float lum = dot( color.rgb, lumcoeff );\n      vec3 luminance = vec3( lum );\n\n      vec3 final = onlyAOColor * vec3( mix( vec3( ao ), vec3( 1.0 ), luminance * lumInfluence ) ); // ambient occlusion only\n      \n      fragColor = vec4(final,1.0);\n    }"
        }, i.postSsao = {
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                tAo: f.default.AO_MAP
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n  #endif\n    uniform sampler2D tDiffuse;\n    uniform sampler2D tAo;\n\n    in vec2 vUv;\n    \n  #ifdef WEBGL_1\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    void main() {\n      vec3 ao = texture(tAo,vUv).rgb;\n      vec3 color = texture( tDiffuse, vUv ).rgb;\n\n      fragColor = vec4(ao * color,1.0);\n    }"
        }, i.skinning = {
            name: "ShaderLibExtra.skinning",
            glslversion: 300,
            defines: {
                JOINT_COUNT: 56,
                WEIGHTS: 4
            },
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0,
                vertexWeights: a.default.WEIGHTS,
                vertexJointIDs: a.default.JOINTIDS
            },
            uniforms: {
                viewProjectionMatrix: f.default.VIEW_PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                diffuseMap: f.default.DIFFUSE_MAP,
                jointPalette: function(e) {
                    var t = e.meshData,
                        n = t.currentPose;
                    if (n) {
                        var r = n._matrixPalette,
                            i = 16 * t.paletteMap.length,
                            o = t.store;
                        o || (o = new Float32Array(i),
                            //! AT: better names pls
                            t.store = o);
                        for (var a = void 0, l = 0; l < t.paletteMap.length; l++) {
                            a = r[t.paletteMap[l]];
                            for (var f = 0; f < 4; f++)
                                for (var d = 0; d < 4; d++) o[16 * l + 4 * f + d] = a.data[4 * d + f]
                        }
                        return o
                    }
                }
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n    in vec4 vertexWeights;\n    in vec4 vertexJointIDs;\n\n    uniform mat4 viewProjectionMatrix;\n    uniform mat4 worldMatrix;\n    uniform mat4 jointPalette[JOINT_COUNT];\n\n    out vec2 texCoord0;\n\n    void main(void) {\n      mat4 mat = mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);\n\n      //for (int i = 0; i < WEIGHTS; i++) {\n      //mat += jointPalette[int(vertexJointIDs[i])] * vertexWeights[i];\n      //}\n\n      mat += jointPalette[int(vertexJointIDs.x)] * vertexWeights.x;\n      mat += jointPalette[int(vertexJointIDs.y)] * vertexWeights.y;\n      mat += jointPalette[int(vertexJointIDs.z)] * vertexWeights.z;\n      mat += jointPalette[int(vertexJointIDs.w)] * vertexWeights.w;\n      texCoord0 = vertexUV0;\n\n      gl_Position = viewProjectionMatrix * worldMatrix * mat * vec4(vertexPosition, 1.0);\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform sampler2D diffuseMap;\n\n    in vec2 texCoord0;\n\n    void main(void)\n    {\n      fragColor = texture(diffuseMap, texCoord0);\n    }"
        }, i.rgbshift = {
            name: "ShaderLibExtra.rgbshift",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                amount: .005,
                angle: 0
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform sampler2D tDiffuse;\n    uniform float amount;\n    uniform float angle;\n\n    in vec2 vUv;\n\n    void main() {\n      vec2 offset = amount * vec2( cos(angle), sin(angle));\n      vec4 cr =  texture(tDiffuse, vUv + offset);\n      vec4 cga = texture(tDiffuse, vUv);\n      vec4 cb =  texture(tDiffuse, vUv - offset);\n      fragColor = vec4(cr.r, cga.g, cb.b, cga.a);\n    }"
        }, i.brightnesscontrast = {
            name: "ShaderLibExtra.bightnesscontrast",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                brightness: 0,
                contrast: 0,
                saturation: 0
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n    #endif\n\n    uniform sampler2D tDiffuse;\n    uniform float brightness;\n    uniform float contrast;\n    uniform float saturation;\n\n    in vec2 vUv;\n\n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    void main() {\n      fragColor = texture( tDiffuse, vUv );\n      fragColor.rgb += brightness;\n\n      if (contrast > 0.0) {\n        fragColor.rgb = (fragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;\n      } else {\n        fragColor.rgb = (fragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;\n      }\n\n      vec3 gray = vec3(dot(vec3(0.2126,0.7152,0.0722), fragColor.rgb));\n      fragColor.rgb = mix(fragColor.rgb, gray, -saturation);\n    }"
        }, i.hsb = {
            name: "ShaderLibExtra.hsb",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                hue: 0,
                saturation: 0,
                brightness: 0
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform sampler2D tDiffuse;\n    uniform float hue;\n    uniform float saturation;\n    uniform float brightness;\n\n    in vec2 vUv;\n\n    " + s.default.methods.hsv + "\n\n    void main() {\n      fragColor = texture(tDiffuse, vUv);\n      vec3 fragHSV = rgb2hsv(fragColor.rgb).xyz;\n      fragHSV.x += hue * 0.5;\n      fragHSV.y *= saturation + 1.0 - max(brightness, 0.0) * 2.0;\n      fragHSV.z *= min(brightness + 1.0, 1.0);\n      fragHSV.z += max(brightness, 0.0);\n      fragHSV.xyz = clamp(fragHSV.xyz, vec3(-10.0, 0.0, 0.0), vec3(10.0, 1.0, 1.0));\n      fragColor.rgb = hsv2rgb(fragHSV);\n    }"
        }, i.luminosity = {
            name: "ShaderLibExtra.luminosity",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n    out vec4 fragColor;\n  #endif\n\n    uniform sampler2D tDiffuse;\n    in vec2 vUv;\n\n    void main() {\n      vec4 texel = texture( tDiffuse, vUv );\n      vec3 luma = vec3( 0.299, 0.587, 0.114 );\n      float v = dot( texel.xyz, luma );\n\n      fragColor = vec4( v, v, v, texel.w );\n    }"
        }, i.toon = {
            name: "ShaderLibExtra.toon",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexNormal: a.default.NORMAL
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                cameraPosition: f.default.CAMERA,
                lightPosition: f.default.LIGHT0,
                HighlightColor: [.9, .8, .7, 1],
                MidColor: [.65, .55, .45, 1],
                ShadowColor: [.4, .3, .2, 1],
                HighlightSize: .2,
                ShadowSize: .01,
                OutlineWidth: .15
            },
            vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n    in vec3 vertexNormal;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n    uniform vec3 cameraPosition;\n    uniform vec3 lightPosition;\n\n    out vec3 N;\n    out vec3 V;\n    out vec3 L;\n\n    void main() {\n      vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);\n      N = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;\n      L = lightPosition - worldPos.xyz;\n      V = cameraPosition - worldPos.xyz;\n      gl_Position = projectionMatrix * viewMatrix * worldPos;\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform vec4 HighlightColor;\n    uniform vec4 MidColor;\n    uniform vec4 ShadowColor;\n    uniform float HighlightSize;\n    uniform float ShadowSize;\n    uniform float OutlineWidth;\n\n    in vec3 N;\n    in vec3 L;\n    in vec3 V;\n\n    void main() {\n      vec3 n = normalize(N);\n      vec3 l = normalize(L);\n      vec3 v = normalize(V);\n\n      float lambert = dot(l,n);\n      vec4 color = MidColor;\n      if (lambert > 1.0 - HighlightSize) color = HighlightColor;\n      if (lambert < ShadowSize) color = ShadowColor;\n      if (dot(n,v) < OutlineWidth) color = vec4(0.0,0.0,0.0,1.0);\n\n      fragColor = color;\n    }"
        }, i.differenceOfGaussians = {
            name: "ShaderLibExtra.differenceOfGaussians",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                gaussBlurredImage1: "BLUR1",
                gaussBlurredImage2: "BLUR2",
                originalImage: "ORIGINAL",
                threshold: .01,
                edgeColor: [1, 0, 1, 1],
                backgroundColor: [0, 0, 0, 1],
                backgroundMix: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 texCoord0;\n\n    void main(void) {\n      texCoord0 = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform sampler2D gaussBlurredImage1;\n    uniform sampler2D gaussBlurredImage2;\n    uniform sampler2D originalImage;\n\n    uniform float threshold;\n    uniform float backgroundMix;\n\n    uniform vec4 edgeColor;\n    uniform vec4 backgroundColor;\n\n    in vec2 texCoord0;\n    \n    void main(void)\n    {\n      vec4 blur1 = texture(gaussBlurredImage1, texCoord0);\n      vec4 blur2 = texture(gaussBlurredImage2, texCoord0);\n      vec4 originalColor = texture(originalImage, texCoord0);\n      vec3 nonEdgeColor = mix(originalColor.rgb, backgroundColor.rgb, backgroundMix);\n      vec3 diffColor = abs(blur1.rgb - blur2.rgb);\n      float edgeValue = (diffColor.r + diffColor.g + diffColor.b) / 3.0;\n      edgeValue = smoothstep(0.0, threshold, edgeValue);\n      vec3 outputColor = mix(nonEdgeColor, edgeColor.rgb, edgeValue);\n      fragColor = vec4(outputColor, 1.0);\n    }"
        }, i.overlay = {
            name: "ShaderLibExtra.overlay",
            glslversion: 300,
            defines: {
                OVERLAY_TYPE: 0
            },
            processors: [function(e, t) {
                var n = t.material._textureMaps.OVERLAY_MAP;
                if (n) {
                    e.setDefine("OVERLAY_MAP", !0);
                    var r = e.uniforms.offsetRepeat;
                    r[0] = n.offset.x, r[1] = n.offset.y, r[2] = n.repeat.x, r[3] = n.repeat.y
                } else e.removeDefine("OVERLAY_MAP")
            }],
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                tDiffuse2: "OVERLAY_MAP",
                offsetRepeat: [0, 0, 1, 1],
                amount: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    " + s.default.blendmodes + "\n\n    #define Mixin(base, blend, type, a)  mix(base, type(base, blend), a);\n    uniform sampler2D tDiffuse;\n    uniform sampler2D tDiffuse2;\n    uniform float amount;\n    #ifdef OVERLAY_MAP\n      uniform vec4 offsetRepeat;\n    #endif\n\n    in vec2 vUv;\n\n    void main() {\n      fragColor = texture(tDiffuse, vUv);\n      #ifdef OVERLAY_MAP\n        vec2 oUv = vUv * offsetRepeat.zw + offsetRepeat.xy;\n        vec4 blendTexture = texture2D(tDiffuse2, oUv);\n        float a = amount * blendTexture.a;\n      #endif\n      #if !defined(OVERLAY_MAP)\n      #elif OVERLAY_TYPE == 0\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendNormal, a);\n      #elif OVERLAY_TYPE == 1\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendLighten, a);\n      #elif OVERLAY_TYPE == 2\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendDarken, a);\n      #elif OVERLAY_TYPE == 3\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendMultiply, a);\n      #elif OVERLAY_TYPE == 4\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendAverage, a);\n      #elif OVERLAY_TYPE == 5\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendAdd, a);\n      #elif OVERLAY_TYPE == 6\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendSubstract, a);\n      #elif OVERLAY_TYPE == 7\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendDifference, a);\n      #elif OVERLAY_TYPE == 8\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendNegation, a);\n      #elif OVERLAY_TYPE == 9\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendExclusion, a);\n      #elif OVERLAY_TYPE == 10\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendScreen, a);\n      #elif OVERLAY_TYPE == 11\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendOverlay, a);\n      #elif OVERLAY_TYPE == 12\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendSoftLight, a);\n      #elif OVERLAY_TYPE == 13\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendHardLight, a);\n      #elif OVERLAY_TYPE == 14\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendColorDodge, a);\n      #elif OVERLAY_TYPE == 15\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendColorBurn, a);\n      #elif OVERLAY_TYPE == 16\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendLinearLight, a);\n      #elif OVERLAY_TYPE == 17\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendVividLight, a);\n      #elif OVERLAY_TYPE == 18\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendPinLight, a);\n      #elif OVERLAY_TYPE == 19\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendHardMix, a);\n      #elif OVERLAY_TYPE == 20\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendReflect, a);\n      #elif OVERLAY_TYPE == 21\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendGlow, a);\n      #elif OVERLAY_TYPE == 22\n        fragColor.rgb = Mixin(fragColor.rgb, blendTexture.rgb, BlendPhoenix, a);\n      #endif\n    }"
        }, i.levels = {
            name: "ShaderLibExtra.levels",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                gamma: 1,
                minInput: 0,
                maxInput: 1,
                minOutput: 0,
                maxOutput: 1
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n  \n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    " + s.default.blendmodes + "\n\n    uniform sampler2D tDiffuse;\n    uniform float gamma;\n    uniform float minInput;\n    uniform float maxInput;\n    uniform float minOutput;\n    uniform float maxOutput;\n\n    in vec2 vUv;\n\n    void main() {\n      fragColor = texture( tDiffuse, vUv );\n      fragColor.rgb = LevelsControl(fragColor.rgb, minInput, gamma, maxInput, minOutput, maxOutput);\n    }"
        }, i.boxfilter = {
            name: "ShaderLibExtra.boxfilter",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                viewport: [128, 128]
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 vUv;\n    void main() {\n      vUv = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: " \n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform sampler2D tDiffuse;\n    uniform vec2 viewport;\n\n    in vec2 vUv;\n\n    void main() {\n      vec3 result = vec3(0.0);\n      for (int x=-1; x<=1; x++) {\n        for (int y=-1; y<=1; y++) {\n          result += texture(tDiffuse, vUv + vec2(x, y) / viewport).rgb;\n        }\n      }\n      fragColor = vec4(result / vec3(9.0), 1.0);\n    }"
        }, i.radial = {
            name: "ShaderLibExtra.radial",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                frameBufSize: f.default.RESOLUTION,
                offset: .5,
                multiplier: -.75
            },
            vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 texCoords;\n\n    void main() {\n      texCoords = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n    #define texture texture2D\n    #define fragColor gl_FragColor\n  #else\n  \tout vec4 fragColor;\n  #endif\n\n    uniform sampler2D tDiffuse;\n    uniform vec2 frameBufSize;\n    uniform float offset;\n    uniform float multiplier;\n\n    in vec2 texCoords;\n\n    void main() {\n      vec2 uv = texCoords - 0.5;\n      vec3 o = texture(tDiffuse, 0.5 + (uv.xy *= 0.992)).rgb;\n      float z = 0.0;\n      for (float i = 0.0; i < 50.0; i++) {\n        vec3 T = texture(tDiffuse, 0.5 + (uv.xy *= 0.992)).rgb;\n        z += pow(max(0.0, offset + length(T) * multiplier), 2.0) * exp(-i * 0.08);\n      } \n      fragColor = vec4(o*o + z, 1.0);\n    }"
        }, i.packDepth = {
            name: "ShaderLibExtra.packDepth",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                farPlane: f.default.FAR_PLANE
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec4 vPosition;\n\n    void main(void) {\n      vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n      gl_Position = projectionMatrix * vPosition;\n    }",
            fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n  #endif\n\n    uniform float farPlane;\n\n    \n    in vec4 vPosition;\n    \n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n    \n    #ifdef WEBGL_1\n        #undef in\n    #endif\n\n    " + s.default.methods.packDepth + "\n\n    void main(void)\n    {\n      float linearDepth = min(length(vPosition), farPlane) / farPlane;\n      fragColor = packDepth(linearDepth);\n    }"
        }, i.antialias = {
            name: "ShaderLibExtra.antialias",
            glslversion: 300,
            attributes: {
                vertexPosition: a.default.POSITION,
                vertexUV0: a.default.TEXCOORD0
            },
            uniforms: {
                viewMatrix: f.default.VIEW_MATRIX,
                projectionMatrix: f.default.PROJECTION_MATRIX,
                worldMatrix: f.default.WORLD_MATRIX,
                tDiffuse: f.default.DIFFUSE_MAP,
                frameBufSize: f.default.RESOLUTION,
                FXAA_SPAN_MAX: 8,
                FXAA_REDUCE_MUL: 1 / 8
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 texCoords;\n\n    void main() {\n      texCoords = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n    }",
            fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n\t    out vec4 fragColor;\n    #endif\n\n    uniform sampler2D tDiffuse;\n    uniform vec2 frameBufSize;\n    uniform float FXAA_SPAN_MAX;\n    uniform float FXAA_REDUCE_MUL;\n\n    in vec2 texCoords;\n\n    void main() {\n      float FXAA_REDUCE_MIN = 1.0/128.0; \n\n      vec3 rgbNW = texture(tDiffuse, texCoords + (vec2(-1.0, -1.0) / frameBufSize)).xyz;\n      vec3 rgbNE = texture(tDiffuse, texCoords + (vec2(1.0, -1.0) / frameBufSize)).xyz;\n      vec3 rgbSW = texture(tDiffuse, texCoords + (vec2(-1.0, 1.0) / frameBufSize)).xyz;\n      vec3 rgbSE = texture(tDiffuse, texCoords + (vec2(1.0, 1.0) / frameBufSize)).xyz;\n      vec3 rgbM =  texture(tDiffuse, texCoords).xyz;\n\n      vec3 luma=vec3(0.299, 0.587, 0.114);\n      float lumaNW = dot(rgbNW, luma);\n      float lumaNE = dot(rgbNE, luma);\n      float lumaSW = dot(rgbSW, luma);\n      float lumaSE = dot(rgbSE, luma);\n      float lumaM  = dot(rgbM,  luma);\n      float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n      float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n      vec2 dir;\n      dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n      dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n      float dirReduce = max(\n          (lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),\n          FXAA_REDUCE_MIN);\n      float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);\n      dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),\n            max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n            dir * rcpDirMin)) / frameBufSize;\n      vec3 rgbA = (1.0/2.0) * (\n          texture(tDiffuse, texCoords.xy + dir * (1.0/3.0 - 0.5)).xyz +\n          texture(tDiffuse, texCoords.xy + dir * (2.0/3.0 - 0.5)).xyz);\n      vec3 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (\n          texture(tDiffuse, texCoords.xy + dir * (0.0/3.0 - 0.5)).xyz +\n          texture(tDiffuse, texCoords.xy + dir * (3.0/3.0 - 0.5)).xyz);\n      float lumaB = dot(rgbB, luma);\n      if ((lumaB < lumaMin) || (lumaB > lumaMax)) {\n        fragColor.xyz=rgbA;\n      } else{\n        fragColor.xyz=rgbB;\n      }\n    }"
        }, i.VRComposite = {
            name: "ShaderLibExtra.VRComposite",
            glslversion: 300,
            attributes: {
                vertexPosition: "POSITION",
                vertexUV0: "TEXCOORD0"
            },
            uniforms: {
                viewMatrix: "VIEW_MATRIX",
                projectionMatrix: "PROJECTION_MATRIX",
                worldMatrix: "WORLD_MATRIX",
                leftTex: "LEFT_TEX",
                rightTex: "RIGHT_TEX"
            },
            vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n\t\tin vec3 vertexPosition;\n\t\tin vec2 vertexUV0;\n\n\t\tuniform mat4 viewMatrix;\n\t\tuniform mat4 projectionMatrix;\n\t\tuniform mat4 worldMatrix;\n\n\t\tout vec2 vUv;\n\t\tvoid main() {\n\t\t\tvUv = vertexUV0;\n\t\t\tgl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );\n\t\t}",
            fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n\t    out vec4 fragColor;\n    #endif\n\n\t\tuniform sampler2D leftTex;\n\t\tuniform sampler2D rightTex;\n\n    in vec2 vUv;\n    \n\t\tvoid main() {\n\t\t\tvec2 coord = vUv;\n\t\t\tvec2 offset = vec2(0.063, 0.0);\n\t\t\tvec2 halfOffset = vec2(0.25, 0.0);\n\n\t\t\tfragColor.a = 1.0;\n\t\t\tif (vUv.x > 0.5) {\n\t\t\t\tfragColor.rgb = texture(rightTex, coord + offset - halfOffset ).rgb;\n\t\t\t} else {\n\t\t\t\tfragColor.rgb = texture(leftTex, coord - offset + halfOffset ).rgb;\n\t\t\t}\n\t\t}"
        }, t.default = i
    },
    166: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e) {
            e = e || {}, this.target = void 0 !== e.target ? e.target : null;
            var t = void 0 !== e.strength ? e.strength : 1,
                n = void 0 !== e.sigma ? e.sigma : 4,
                r = 2 * Math.ceil(3 * n) + 1;
            this.downsampleAmount = void 0 !== e.downsampleAmount ? Math.max(e.downsampleAmount, 1) : 4, this.blurX = [.001953125, 0], this.blurY = [0, .001953125];
            var i = window.innerWidth || 1024,
                o = window.innerHeight || 1024;
            this.updateSize({
                x: 0,
                y: 0,
                width: i,
                height: o
            }), this.renderable = {
                meshData: f.default.quad,
                materials: []
            }, this.copyMaterial = new a.default(m.default.copyPure), this.copyMaterial.uniforms.opacity = t, this.copyMaterial.blendState.blending = "CustomBlending", this.convolutionShader = c.default.deepClone(m.default.convolution), this.convolutionShader.defines = {
                KERNEL_SIZE_FLOAT: r.toFixed(1),
                KERNEL_SIZE_INT: r.toFixed(0)
            }, this.convolutionShader.uniforms.uImageIncrement = this.blurX, this.convolutionShader.uniforms.cKernel = this.convolutionShader.buildKernel(n), this.convolutionMaterial = new a.default(this.convolutionShader), this.enabled = !0, this.clear = !1, this.needsSwap = !1
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            a = r(o),
            l = n(94),
            f = r(l),
            d = n(33),
            s = r(d),
            u = n(3),
            c = r(u),
            v = n(15),
            m = r(v),
            x = n(68),
            p = r(x);
        i.prototype = Object.create(p.default.prototype), i.prototype.constructor = i, i.prototype.destroy = function(e) {
            this.renderTargetX && this.renderTargetX.destroy(e.context), this.renderTargetY && this.renderTargetY.destroy(e.context), this.convolutionMaterial.shader.destroy(), this.copyMaterial.shader.destroy()
        }, i.prototype.invalidateHandles = function(e) {
            e.invalidateMaterial(this.convolutionMaterial), e.invalidateMaterial(this.copyMaterial), e.invalidateRenderTarget(this.renderTargetX), e.invalidateRenderTarget(this.renderTargetY), e.invalidateMeshData(this.renderable.meshData)
        }, i.prototype.updateSize = function(e, t) {
            var n = e.width / this.downsampleAmount,
                r = e.height / this.downsampleAmount;
            this.renderTargetX && t._deallocateRenderTarget(this.renderTargetX), this.renderTargetY && t._deallocateRenderTarget(this.renderTargetY), this.renderTargetX = new s.default(n, r), this.renderTargetY = new s.default(n, r)
        }, i.prototype.render = function(e, t, n) {
            this.renderable.materials[0] = this.convolutionMaterial, this.convolutionMaterial.setTexture("DIFFUSE_MAP", n), this.convolutionMaterial.uniforms.uImageIncrement = this.blurY, e.render(this.renderable, null, f.default.camera, [], this.renderTargetX, !0), this.convolutionMaterial.setTexture("DIFFUSE_MAP", this.renderTargetX), this.convolutionMaterial.uniforms.uImageIncrement = this.blurX, e.render(this.renderable, null, f.default.camera, [], this.renderTargetY, !0), this.renderable.materials[0] = this.copyMaterial, this.copyMaterial.setTexture("DIFFUSE_MAP", this.renderTargetY), null !== this.target ? e.render(this.renderable, null, f.default.camera, [], this.target, this.clear) : e.render(this.renderable, null, f.default.camera, [], n, this.clear)
        }, t.default = i
    },
    478: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e) {
            e = e || {}, this.target = void 0 !== e.target ? e.target : null;
            var t = void 0 !== e.strength ? e.strength : 0,
                n = void 0 !== e.sigma ? e.sigma : 4,
                r = 2 * Math.ceil(3 * n) + 1;
            this.downsampleAmount = void 0 !== e.downsampleAmount ? Math.max(e.downsampleAmount, 1) : 4;
            var o = window.innerWidth || 1024,
                l = window.innerHeight || 1024;
            this.updateSize({
                x: 0,
                y: 0,
                width: o,
                height: l
            }), this.renderable = {
                meshData: f.default.quad,
                materials: []
            }, this.copyMaterial = new a.default(m.default.copyPure), this.copyMaterial.uniforms.opacity = t, this.copyMaterial.blendState.blending = "AdditiveBlending", this.convolutionShader = c.default.deepClone(m.default.convolution), this.convolutionShader.defines = {
                KERNEL_SIZE_FLOAT: r.toFixed(1),
                KERNEL_SIZE_INT: r.toFixed(0)
            }, this.convolutionMaterial = new a.default(this.convolutionShader), this.convolutionMaterial.uniforms.uImageIncrement = i.blurX, this.convolutionMaterial.uniforms.cKernel = this.convolutionShader.buildKernel(n), this.bcMaterial = new a.default(p.default.brightnesscontrast), this.bcMaterial.uniforms.brightness = 0, this.bcMaterial.uniforms.contrast = 0, this.enabled = !0, this.clear = !1, this.needsSwap = !1
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            a = r(o),
            l = n(94),
            f = r(l),
            d = n(33),
            s = r(d),
            u = n(3),
            c = r(u),
            v = n(15),
            m = r(v),
            x = n(130),
            p = r(x),
            h = n(68),
            g = r(h);
        i.prototype = Object.create(g.default.prototype), i.prototype.constructor = i, i.prototype.destroy = function(e) {
            this.renderTargetX && this.renderTargetX.destroy(e.context), this.renderTargetY && this.renderTargetY.destroy(e.context), this.convolutionMaterial.shader.destroy(), this.copyMaterial.shader.destroy(), this.bcMaterial.shader.destroy()
        }, i.prototype.invalidateHandles = function(e) {
            e.invalidateMaterial(this.convolutionMaterial), e.invalidateMaterial(this.copyMaterial), e.invalidateMaterial(this.convolutionMaterial), e.invalidateMaterial(this.bcMaterial), e.invalidateRenderTarget(this.renderTargetX), e.invalidateRenderTarget(this.renderTargetY), e.invalidateMeshData(this.renderable.meshData)
        }, i.prototype.updateSize = function(e, t) {
            var n = e.width / this.downsampleAmount,
                r = e.height / this.downsampleAmount;
            this.renderTargetX && this.renderTargetX.destroy(t.context), this.renderTargetY && this.renderTargetY.destroy(t.context), this.renderTargetX = new s.default(n, r), this.renderTargetY = new s.default(n, r)
        }, i.prototype.render = function(e, t, n) {
            this.renderable.materials[0] = this.bcMaterial, this.bcMaterial.setTexture("DIFFUSE_MAP", n), e.render(this.renderable, null, f.default.camera, [], this.renderTargetY, !0), this.renderable.materials[0] = this.convolutionMaterial, this.convolutionMaterial.setTexture("DIFFUSE_MAP", this.renderTargetY), this.convolutionMaterial.uniforms.uImageIncrement = i.blurY, e.render(this.renderable, null, f.default.camera, [], this.renderTargetX, !0), this.convolutionMaterial.setTexture("DIFFUSE_MAP", this.renderTargetX), this.convolutionMaterial.uniforms.uImageIncrement = i.blurX, e.render(this.renderable, null, f.default.camera, [], this.renderTargetY, !0), this.renderable.materials[0] = this.copyMaterial, this.copyMaterial.setTexture("DIFFUSE_MAP", this.renderTargetY), null !== this.target ? e.render(this.renderable, null, f.default.camera, [], this.target, this.clear) : e.render(this.renderable, null, f.default.camera, [], n, this.clear)
        }, i.blurX = [.001953125, 0], i.blurY = [0, .001953125], t.default = i
    },
    479: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e) {
            e = e || {}, this.target = void 0 !== e.target ? e.target : null;
            var t = void 0 !== e.width ? e.width : 1024,
                n = void 0 !== e.height ? e.height : 1024,
                r = void 0 !== e.sigma ? e.sigma : .6,
                i = void 0 !== e.threshold ? e.threshold : .005;
            this.downsampleAmount = void 0 !== e.downsampleAmount ? Math.max(e.downsampleAmount, 1) : 2, r > 2.5 && (r = 2.5), this.updateSize({
                width: t,
                height: n
            }), this.renderable = {
                meshData: f.default.quad,
                materials: []
            }, this.convolutionShader1 = c.default.deepClone(m.default.convolution), this.convolutionShader2 = c.default.deepClone(m.default.convolution), this.differenceShader = c.default.deepClone(p.default.differenceOfGaussians), this.differenceShader.uniforms.threshold = i, this.differenceMaterial = new a.default(this.differenceShader), this.updateSigma(r), this.enabled = !0, this.clear = !1, this.needsSwap = !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            a = r(o),
            l = n(94),
            f = r(l),
            d = n(33),
            s = r(d),
            u = n(3),
            c = r(u),
            v = n(15),
            m = r(v),
            x = n(130),
            p = r(x),
            h = n(68),
            g = r(h);
        i.prototype = Object.create(g.default.prototype), i.prototype.constructor = i, i.prototype.destroy = function(e) {
            var t = e.context;
            this.convolutionMaterial1 && this.convolutionMaterial1.shader.destroy(), this.convolutionMaterial2 && this.convolutionMaterial2.shader.destroy(), this.differenceMaterial.shader.destroy(), this.gaussian1 && this.gaussian1.destroy(t), this.gaussian2 && this.gaussian2.destroy(t), this.renderTargetX && this.renderTargetX.destroy(t), this.target && this.target.destroy(t)
        }, i.prototype.updateThreshold = function(e) {
            this.differenceMaterial.shader.uniforms.threshold = e
        }, i.prototype.updateEdgeColor = function(e) {
            this.differenceMaterial.shader.uniforms.edgeColor = [e[0], e[1], e[2], 1]
        }, i.prototype.updateBackgroundColor = function(e) {
            this.differenceMaterial.shader.uniforms.backgroundColor = [e[0], e[1], e[2], 1]
        }, i.prototype.updateBackgroundMix = function(e) {
            this.differenceMaterial.shader.uniforms.backgroundMix = e
        }, i.prototype.updateSize = function(e) {
            var t = e.width / this.downsampleAmount,
                n = e.height / this.downsampleAmount;
            this.renderTargetX = new s.default(t, n), this.gaussian1 = new s.default(t, n), this.gaussian2 = new s.default(t, n), this.blurX = [.5 / t, 0], this.blurY = [0, .5 / n]
        }, i.prototype.updateSigma = function(e) {
            var t = this.convolutionShader1.buildKernel(e),
                n = this.convolutionShader2.buildKernel(1.6 * e),
                r = t.length;
            this.convolutionShader1.defines = {
                KERNEL_SIZE_FLOAT: r.toFixed(1),
                KERNEL_SIZE_INT: r.toFixed(0)
            }, r = n.length, this.convolutionShader2.defines = {
                KERNEL_SIZE_FLOAT: r.toFixed(1),
                KERNEL_SIZE_INT: r.toFixed(0)
            }, this.convolutionShader1.uniforms.cKernel = t, this.convolutionShader2.uniforms.cKernel = n, this.convolutionMaterial1 = new a.default(this.convolutionShader1), this.convolutionMaterial2 = new a.default(this.convolutionShader2)
        }, i.prototype.render = function(e, t, n) {
            this.renderable.materials[0] = this.convolutionMaterial1, this.convolutionMaterial1.setTexture("DIFFUSE_MAP", n), this.convolutionShader1.uniforms.uImageIncrement = this.blurX, e.render(this.renderable, null, f.default.camera, [], this.renderTargetX, !0), this.convolutionMaterial1.setTexture("DIFFUSE_MAP", this.renderTargetX), this.convolutionShader1.uniforms.uImageIncrement = this.blurY, e.render(this.renderable, null, f.default.camera, [], this.gaussian1, !0), this.renderable.materials[0] = this.convolutionMaterial2, this.convolutionMaterial2.setTexture("DIFFUSE_MAP", n), this.convolutionShader2.uniforms.uImageIncrement = this.blurX, e.render(this.renderable, null, f.default.camera, [], this.renderTargetX, !0), this.convolutionMaterial2.setTexture("DIFFUSE_MAP", this.renderTargetX), this.convolutionShader2.uniforms.uImageIncrement = this.blurY, e.render(this.renderable, null, f.default.camera, [], this.gaussian2, !0), this.renderable.materials[0] = this.differenceMaterial, this.differenceMaterial.setTexture("BLUR1", this.gaussian1), this.differenceMaterial.setTexture("BLUR2", this.gaussian2), this.differenceMaterial.setTexture("ORIGINAL", n), null !== this.target ? e.render(this.renderable, null, f.default.camera, [], this.target, this.clear) : e.render(this.renderable, null, f.default.camera, [], t, this.clear)
        }, i.prototype.invalidateHandles = function(e) {
            e.invalidateMaterial(this.convolutionMaterial1), e.invalidateMaterial(this.convolutionMaterial2), e.invalidateMaterial(this.differenceMaterial), e.invalidateMeshData(this.renderable.meshData), e.invalidateRenderTarget(this.renderTargetX), e.invalidateRenderTarget(this.gaussian1), e.invalidateRenderTarget(this.gaussian2)
        }, t.default = i
    },
    480: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i() {
            this.inPass = new m.default(h), this.outPass = new m.default(f.default.copyPure);
            var e = window.innerWidth || 1024,
                t = window.innerHeight || 1024;
            this.updateSize({
                x: 0,
                y: 0,
                width: e,
                height: t
            }), this.enabled = !0, this.clear = !1, this.needsSwap = !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(29),
            a = r(o),
            l = n(15),
            f = r(l),
            d = n(6),
            s = r(d),
            u = n(33),
            c = r(u),
            v = n(50),
            m = r(v),
            x = n(68),
            p = r(x),
            h = {
                name: "MotionBlurPass.blendShader",
                glslversion: 300,
                defines: {},
                processors: [function(e, t) {
                    t.material._textureMaps.MOTION_MAP.glTexture ? e.setDefine("MOTION_MAP", !0) : e.removeDefine("MOTION_MAP")
                }],
                attributes: {
                    vertexPosition: s.default.POSITION,
                    vertexUV0: s.default.TEXCOORD0
                },
                uniforms: {
                    viewProjectionMatrix: a.default.VIEW_PROJECTION_MATRIX,
                    worldMatrix: a.default.WORLD_MATRIX,
                    blend: .9,
                    scale: 1,
                    diffuseMap: a.default.DIFFUSE_MAP,
                    motionMap: "MOTION_MAP"
                },
                vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewProjectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 texCoord0;\n\n    void main(void) {\n      texCoord0 = vertexUV0;\n      gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n    }",
                fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n    \tout vec4 fragColor;\n    #endif\n\n    uniform sampler2D diffuseMap;\n    uniform sampler2D motionMap;\n    uniform float blend;\n    uniform float scale;\n\n    in vec2 texCoord0;\n\n    void main(void)\n    {\n      vec4 colA = texture(diffuseMap, texCoord0);\n    #ifdef MOTION_MAP\n      vec4 colB = texture(motionMap, (texCoord0 - 0.5) / scale + 0.5);\n      float wBlend = blend;// * length(colB) / sqrt(3.0);\n      fragColor = mix(colA, colB, wBlend);\n    #else\n      fragColor = colA;\n    #endif\n    }"
            };
        i.prototype = Object.create(p.default.prototype), i.prototype.constructor = i, i.prototype.destroy = function(e) {
            this.inPass.destroy(e), this.outPass.destroy(e), this.targetSwap && (this.targetSwap[0].destroy(e.context), this.targetSwap[1].destroy(e.context), this.targetSwap = void 0)
        }, i.prototype.invalidateHandles = function(e) {
            this.inPass.invalidateHandles(e), this.outPass.invalidateHandles(e), e.invalidateRenderTarget(this.targetSwap[0]), e.invalidateRenderTarget(this.targetSwap[1])
        }, i.prototype.updateSize = function(e, t) {
            var n = e.width,
                r = e.height;
            if (this.targetSwap)
                for (var i = 0; i < this.targetSwap.length; i++) t._deallocateRenderTarget(this.targetSwap[i]);
            this.targetSwap = [new c.default(n, r), new c.default(n, r)]
        }, i.prototype.render = function(e, t, n) {
            this.inPass.material.setTexture("MOTION_MAP", this.targetSwap[1]), this.inPass.render(e, this.targetSwap[0], n), this.outPass.render(e, t, this.targetSwap[0]), this.targetSwap.reverse()
        }, t.default = i
    },
    481: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e) {
            I.default.call(this), this.id = e
        }

        function o(e) {
            R.default.call(this, arguments), this.id = e
        }

        function a(e) {
            D.default.call(this, arguments), this.id = e
        }

        function l(e) {
            T.default.call(this, N.default.deepClone(C.default.vignette)), this.id = e
        }

        function f(e) {
            T.default.call(this, N.default.deepClone(C.default.sepia)), this.id = e
        }

        function d(e) {
            T.default.call(this, N.default.deepClone(C.default.film)), this.id = e
        }

        function s(e) {
            T.default.call(this, N.default.deepClone(C.default.noise)), this.id = e
        }

        function u(e) {
            T.default.call(this, N.default.deepClone(C.default.rgbshift)), this.id = e
        }

        function c(e) {
            T.default.call(this, N.default.deepClone(C.default.bleachbypass)), this.id = e
        }

        function v(e) {
            T.default.call(this, N.default.deepClone(C.default.hsb)), this.id = e
        }

        function m(e) {
            T.default.call(this, N.default.deepClone(C.default.colorify)), this.id = e
        }

        function x(e) {
            T.default.call(this, N.default.deepClone(C.default.hatch)), this.id = e
        }

        function p(e) {
            T.default.call(this, N.default.deepClone(C.default.dotscreen)), this.id = e
        }

        function h(e) {
            T.default.call(this, N.default.deepClone(C.default.brightnesscontrast)), this.id = e
        }

        function g(e) {
            U.default.call(this), this.id = e
        }

        function M(e) {
            T.default.call(this, N.default.deepClone(C.default.antialias)), this.id = e
        }

        function b(e) {
            T.default.call(this, N.default.deepClone(C.default.radial)), this.id = e
        }

        function y(e) {
            T.default.call(this, N.default.deepClone(C.default.overlay)), this.id = e
        }

        function _(e) {
            T.default.call(this, N.default.deepClone(C.default.levels)), this.id = e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var P = n(130),
            C = r(P),
            E = n(50),
            T = r(E),
            w = n(478),
            I = r(w),
            O = n(166),
            D = r(O),
            A = n(479),
            R = r(A),
            S = n(480),
            U = r(S),
            L = n(3),
            N = r(L);
        i.prototype = Object.create(I.default.prototype), i.prototype.constructor = i, i.prototype.update = function(e) {
                var t = e.options || {};
                void 0 !== t.opacity && (this.copyMaterial.uniforms.opacity = t.opacity / 100), void 0 !== t.size && (this.convolutionMaterial.uniforms.size = t.size), void 0 !== t.brightness && (this.bcMaterial.uniforms.brightness = t.brightness / 100), void 0 !== t.contrast && (this.bcMaterial.uniforms.contrast = t.contrast / 100), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, i.label = "Bloom", i.options = [{
                key: "opacity",
                name: "Opacity",
                type: "int",
                control: "slider",
                min: 0,
                max: 100,
                default: 100
            }, {
                key: "size",
                name: "Size",
                type: "float",
                control: "slider",
                min: 0,
                max: 10,
                decimals: 1,
                default: 2
            }, {
                key: "brightness",
                name: "Gain",
                type: "int",
                control: "slider",
                min: -100,
                max: 100,
                default: 0
            }, {
                key: "contrast",
                name: "Intensity",
                type: "int",
                control: "slider",
                min: -100,
                max: 100,
                default: 0
            }],
            //! AT: we use both "DiffOfGaussians" and "DoG"
            o.prototype = Object.create(R.default.prototype), o.prototype.constructor = o, o.prototype.update = function(e) {
                var t = e.options || {};
                void 0 !== e.enabled && (this.enabled = e.enabled), void 0 !== t.sigma && this.updateSigma(t.sigma), void 0 !== t.threshold && this.updateThreshold(t.threshold), void 0 !== t.edgeColor && this.updateEdgeColor(t.edgeColor), void 0 !== t.backgroundColor && this.updateBackgroundColor(t.backgroundColor), void 0 !== t.backgroundMix && this.updateBackgroundMix(t.backgroundMix)
            }, o.label = "Edge detect", o.options = [{
                key: "sigma",
                name: "Gauss Sigma",
                type: "float",
                control: "slider",
                min: .01,
                max: 1.7,
                decimals: 2,
                default: .6
            }, {
                key: "threshold",
                name: "Threshold",
                type: "float",
                control: "slider",
                min: 1e-14,
                max: .11,
                decimals: 20,
                default: .005
            }, {
                key: "backgroundMix",
                name: "Background %",
                type: "float",
                control: "slider",
                min: 0,
                max: 1,
                decimals: 2,
                default: 0
            }, {
                key: "edgeColor",
                name: "Edge Color",
                type: "vec3",
                control: "color",
                default: [0, 1, 0]
            }, {
                key: "backgroundColor",
                name: "Background Color",
                type: "vec3",
                control: "color",
                default: [0, 0, 0]
            }], a.prototype = Object.create(D.default.prototype), a.prototype.constructor = a, a.prototype.update = function(e) {
                var t = e.options || {};
                void 0 !== t.opacity && (this.copyMaterial.uniforms.opacity = t.opacity / 100), void 0 !== t.size && (this.blurX = [.001953125 * t.size, 0], this.blurY = [0, .001953125 * t.size]), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, a.label = "Blur", a.options = [{
                key: "opacity",
                name: "Amount",
                type: "int",
                control: "slider",
                min: 0,
                max: 100,
                default: 100
            }, {
                key: "size",
                name: "Size",
                type: "float",
                control: "slider",
                min: 0,
                max: 5,
                decimals: 1,
                default: 1
            }], l.prototype = Object.create(T.default.prototype), l.prototype.construcor = l, l.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.offset && (n.uniforms.offset = t.offset), void 0 !== t.darkness && (n.uniforms.darkness = t.darkness), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, l.label = "Vignette", l.options = [{
                key: "offset",
                type: "float",
                control: "slider",
                name: "Offset",
                min: 0,
                max: 10,
                decimals: 1,
                default: 1
            }, {
                key: "darkness",
                type: "float",
                control: "slider",
                name: "Darkness",
                min: 0,
                max: 2,
                decimals: 2,
                default: 1.5
            }], f.prototype = Object.create(T.default.prototype), f.prototype.constructor = f, f.prototype.update = function(e) {
                var t = e.options;
                void 0 !== t.amount && (this.material.uniforms.amount = t.amount / 100), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, f.label = "Sepia", f.options = [{
                key: "amount",
                name: "Amount",
                type: "int",
                control: "slider",
                min: 0,
                max: 100,
                default: 100
            }], d.prototype = Object.create(T.default.prototype), d.prototype.constructor = d, d.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.nIntensity && (n.uniforms.nIntensity = t.nIntensity / 100), void 0 !== t.sIntensity && (n.uniforms.sIntensity = t.sIntensity / 100), void 0 !== t.sCount && (n.uniforms.sCount = t.sCount), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, d.label = "Film Grain", d.options = [{
                key: "nIntensity",
                type: "int",
                control: "slider",
                name: "Noise",
                min: 0,
                max: 100,
                default: 50
            }, {
                key: "sIntensity",
                type: "int",
                control: "slider",
                name: "Line Intensity",
                min: 0,
                max: 100,
                default: 50
            }, {
                key: "sCount",
                type: "int",
                control: "slider",
                name: "Line Count",
                min: 1,
                max: 4096,
                default: 1024
            }], s.prototype = Object.create(T.default.prototype), s.prototype.constructor = s, s.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.nIntensity && (n.uniforms.nIntensity = t.nIntensity / 100), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, s.label = "Noise", s.options = [{
                key: "nIntensity",
                type: "int",
                control: "slider",
                name: "Noise",
                min: 0,
                max: 100,
                default: 50
            }], u.prototype = Object.create(T.default.prototype), u.prototype.constructor = u, u.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.amount && (n.uniforms.amount = t.amount), void 0 !== t.angle && (n.uniforms.angle = t.angle), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, u.label = "RgbShift", u.options = [{
                key: "amount",
                type: "float",
                control: "slider",
                name: "Amount",
                min: 0,
                max: .05,
                decimals: 3,
                default: .005
            }, {
                key: "angle",
                type: "float",
                control: "slider",
                name: "Angle",
                min: 0,
                max: 6.28,
                decimals: 1,
                default: 0
            }], c.prototype = Object.create(T.default.prototype), c.prototype.constructor = c, c.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.opacity && (n.uniforms.opacity = t.opacity), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, c.label = "Bleach", c.options = [{
                key: "opacity",
                type: "float",
                control: "slider",
                name: "Opacity",
                min: 0,
                max: 1,
                decimals: 2,
                default: 1
            }], v.prototype = Object.create(T.default.prototype), v.prototype.constructor = v, v.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.hue && (n.uniforms.hue = t.hue), void 0 !== t.saturation && (n.uniforms.saturation = t.saturation), void 0 !== t.brightness && (n.uniforms.brightness = t.brightness), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, v.label = "HSB", v.options = [{
                key: "hue",
                type: "float",
                control: "slider",
                name: "Hue",
                min: -1,
                max: 1,
                decimals: 2,
                default: 0
            }, {
                key: "saturation",
                type: "float",
                control: "slider",
                name: "Saturation",
                min: -1,
                max: 1,
                decimals: 2,
                default: 0
            }, {
                key: "brightness",
                type: "float",
                control: "slider",
                name: "Brightness",
                min: -1,
                max: 1,
                decimals: 2,
                default: 0
            }], m.prototype = Object.create(T.default.prototype), m.prototype.constructor = m, m.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.color && (n.uniforms.color = t.color), void 0 !== t.amount && (n.uniforms.amount = t.amount), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, m.label = "Tint", m.options = [{
                key: "color",
                type: "vec3",
                control: "color",
                name: "Color",
                default: [1, 1, 1]
            }, {
                key: "amount",
                type: "float",
                control: "slider",
                name: "Amount",
                min: 0,
                max: 1,
                decimals: 2,
                default: 1
            }], x.prototype = Object.create(T.default.prototype), x.prototype.constructor = x, x.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.width && (n.uniforms.width = t.width), void 0 !== t.spread && (n.uniforms.spread = t.spread), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, x.label = "Hatch", x.options = [{
                key: "width",
                type: "float",
                control: "slider",
                name: "Width",
                min: 0,
                max: 10,
                decimals: 1,
                default: 2
            }, {
                key: "spread",
                type: "int",
                control: "slider",
                name: "Spread",
                min: 1,
                max: 50,
                default: 8
            }], p.prototype = Object.create(T.default.prototype), p.prototype.constructor = p, p.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.angle && (n.uniforms.angle = t.angle), void 0 !== t.scale && (n.uniforms.scale = t.scale), void 0 !== t.sizex && (n.uniforms.tSize[0] = t.sizex), void 0 !== t.sizey && (n.uniforms.tSize[1] = t.sizey), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, p.label = "Dot", p.options = [{
                key: "angle",
                type: "float",
                control: "slider",
                name: "Angle",
                min: 0,
                max: 10,
                decimals: 2,
                default: 1.57
            }, {
                key: "scale",
                type: "float",
                control: "slider",
                name: "Scale",
                min: 0,
                max: 10,
                decimals: 2,
                default: 1
            }, {
                key: "sizex",
                type: "int",
                control: "slider",
                name: "SizeX",
                min: 0,
                max: 1024,
                default: 256
            }, {
                key: "sizey",
                type: "int",
                control: "slider",
                name: "SizeY",
                min: 0,
                max: 1024,
                default: 256
            }], h.prototype = Object.create(T.default.prototype), h.prototype.constructor = h, h.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.brightness && (n.uniforms.brightness = t.brightness), void 0 !== t.contrast && (n.uniforms.contrast = t.contrast), void 0 !== t.saturation && (n.uniforms.saturation = t.saturation), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, h.label = "Contrast", h.options = [{
                key: "brightness",
                type: "float",
                control: "slider",
                name: "Brightness",
                min: -1,
                max: 1,
                decimals: 2,
                default: 0
            }, {
                key: "contrast",
                type: "float",
                control: "slider",
                name: "Contrast",
                min: 0,
                max: 1,
                default: 0
            }, {
                key: "saturation",
                type: "float",
                control: "slider",
                name: "Saturation",
                min: -1,
                max: 1,
                decimals: 2,
                default: 0
            }], g.prototype = Object.create(U.default.prototype), g.prototype.constructor = g, g.prototype.update = function(e) {
                var t = e.options,
                    n = this.inPass.material.shader;
                void 0 !== t.blend && (n.uniforms.blend = t.blend), void 0 !== t.scale && (n.uniforms.scale = t.scale), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, g.label = "Motion Blur", g.options = [{
                key: "blend",
                type: "float",
                control: "slider",
                name: "Amount",
                min: 0,
                max: 1,
                default: .5
            }, {
                key: "scale",
                type: "float",
                name: "Scale",
                min: .2,
                default: 1,
                scale: .01
            }], M.prototype = Object.create(T.default.prototype), M.prototype.constructor = M, M.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.span && (n.uniforms.FXAA_SPAN_MAX = t.span, n.uniforms.FXAA_REDUCE_MUL = 1 / t.span), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, M.label = "Antialias", M.options = [{
                key: "span",
                type: "int",
                control: "slider",
                name: "Span",
                min: 0,
                max: 16,
                default: 8
            }], b.prototype = Object.create(T.default.prototype), b.prototype.constructor = b, b.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.offset && (n.uniforms.offset = t.offset), void 0 !== t.multiplier && (n.uniforms.multiplier = t.multiplier), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, b.label = "Radial", b.options = [{
                key: "offset",
                type: "float",
                control: "slider",
                name: "Offset",
                min: -1,
                max: 1,
                decimals: 2,
                default: -.5
            }, {
                key: "multiplier",
                type: "float",
                control: "slider",
                name: "Multiplier",
                min: -1,
                max: 1,
                decimals: 2,
                default: .75
            }], y.prototype = Object.create(T.default.prototype), y.prototype.constructor = y, y.blendmodes = ["Normal", "Lighten", "Darken", "Multiply", "Average", "Add", "Substract", "Difference", "Negation", "Exclusion", "Screen", "Overlay", "SoftLight", "HardLight", "ColorDodge", "ColorBurn", "LinearLight", "VividLight", "PinLight", "HardMix", "Reflect", "Glow", "Phoenix"], y.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                if (void 0 !== t.blendmode) {
                    var r = y.blendmodes.indexOf(t.blendmode);
                    r !== n.defines.OVERLAY_TYPE && (n.setDefine("OVERLAY_TYPE", r), n.uniforms.amount = t.amount - .01)
                }
                void 0 !== t.amount && (n.uniforms.amount = t.amount), null != t.url ? this.material.setTexture("OVERLAY_MAP", t.url) : this.material.removeTexture("OVERLAY_MAP"), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, y.label = "Overlay", y.options = [{
                key: "url",
                name: "Texture",
                type: "texture",
                default: {
                    enabled: !0
                }
            }, {
                key: "blendmode",
                name: "Blend Mode",
                type: "string",
                control: "select",
                options: y.blendmodes,
                default: "Normal"
            }, {
                key: "amount",
                name: "Amount",
                type: "float",
                control: "slider",
                min: 0,
                max: 1,
                decimals: 2,
                default: 1
            }], _.prototype = Object.create(T.default.prototype), _.prototype.constructor = _, _.prototype.update = function(e) {
                var t = e.options,
                    n = this.material.shader;
                void 0 !== t.gamma && (n.uniforms.gamma = t.gamma), void 0 !== t.gamma && (n.uniforms.gamma = t.gamma), void 0 !== t.minInput && (n.uniforms.minInput = t.minInput), void 0 !== t.maxInput && (n.uniforms.maxInput = t.maxInput), void 0 !== t.minOutput && (n.uniforms.minOutput = t.minOutput), void 0 !== t.maxOutput && (n.uniforms.maxOutput = t.maxOutput), void 0 !== e.enabled && (this.enabled = e.enabled)
            }, _.label = "Levels", _.options = [{
                key: "gamma",
                type: "float",
                control: "slider",
                name: "Gamma",
                min: 0,
                max: 5,
                decimals: 2,
                default: 1
            }, {
                key: "minInput",
                type: "float",
                control: "slider",
                name: "Min Input",
                min: 0,
                max: 1,
                decimals: 2,
                default: 0
            }, {
                key: "maxInput",
                type: "float",
                control: "slider",
                name: "Max Input",
                min: 0,
                max: 1,
                decimals: 2,
                default: 1
            }, {
                key: "minOutput",
                type: "float",
                control: "slider",
                name: "Min Output",
                min: 0,
                max: 1,
                decimals: 2,
                default: 0
            }, {
                key: "maxOutput",
                type: "float",
                control: "slider",
                name: "Max Output",
                min: 0,
                max: 1,
                decimals: 2,
                default: 1
            }], t.default = {
                Bloom: i,
                Blur: a,
                Vignette: l,
                Sepia: f,
                Grain: d,
                Noise: s,
                RgbShift: u,
                Bleach: c,
                HSB: v,
                Colorify: m,
                Hatch: x,
                Dot: p,
                Contrast: h,
                DiffOfGaussians: o,
                MotionBlur: g,
                Antialias: M,
                Radial: b,
                Overlay: y,
                Levels: _
            }
    },
    862: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(478),
            o = r(i),
            a = n(166),
            l = r(a),
            f = n(863),
            d = r(f),
            s = n(864),
            u = r(s),
            c = n(479),
            v = r(c),
            m = n(480),
            x = r(m),
            p = n(481),
            h = r(p),
            g = n(865),
            M = r(g),
            b = n(130),
            y = r(b),
            _ = n(866),
            P = r(_),
            C = {
                BloomPass: o.default,
                BlurPass: l.default,
                DepthPass: d.default,
                DofPass: u.default,
                DogPass: v.default,
                MotionBlurPass: x.default,
                PassLib: h.default,
                PosteffectsHandler: M.default,
                ShaderLibExtra: y.default,
                SsaoPass: P.default
            };
        if ("undefined" != typeof window)
            for (var E in C) window.sumerian[E] = C[E];
        t.default = C
    },
    863: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e, t) {
            this.depthPass = new p.default(e);
            var n = new a.default(P);
            this.depthPass.overrideMaterial = n, this.blurTarget = new f.default(256, 256), this.blurPass = new _.default({
                target: this.blurTarget
            });
            var r = t || C;
            this.outPass = new g.default(r), this.outPass.useReadBuffer = !1;
            var i = window.innerWidth || 1,
                o = window.innerHeight || 1;
            this.depthTarget = new f.default(i, o), this.enabled = !0, this.clear = !1, this.needsSwap = !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            a = r(o),
            l = n(33),
            f = r(l),
            d = n(6),
            s = r(d),
            u = n(29),
            c = r(u),
            v = n(58),
            m = r(v),
            x = n(129),
            p = r(x),
            h = n(50),
            g = r(h),
            M = n(68),
            b = r(M),
            y = n(166),
            _ = r(y),
            P = {
                name: "DepthPass.packDepth",
                glslversion: 300,
                attributes: {
                    vertexPosition: s.default.POSITION
                },
                uniforms: {
                    viewMatrix: c.default.VIEW_MATRIX,
                    projectionMatrix: c.default.PROJECTION_MATRIX,
                    worldMatrix: c.default.WORLD_MATRIX,
                    farPlane: c.default.FAR_PLANE
                },
                vshader: "\n  #ifdef WEBGL_1\n    #define in attribute\n    #define out varying\n  #endif\n\n    in vec3 vertexPosition;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec4 vPosition;\n\n    void main(void) {\n      vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n      gl_Position = projectionMatrix * vPosition;\n    } ",
                fshader: "\n  #ifdef WEBGL_1\n    #define in varying\n  #endif\n\n    precision mediump float;\n\n    //uniform float nearPlane;\n    uniform float farPlane;\n\n    in vec4 vPosition;\n    out vec4 fragColor;\n\n    #ifdef WEBGL_1\n      #undef in\n    #endif\n\n    " + m.default.methods.packDepth + "\n\n    void main(void)\n    {\n      //float linearDepth = min(length(vPosition), farPlane) / (farPlane - nearPlane);\n      float linearDepth = min(length(vPosition), farPlane) / farPlane;\n      fragColor = packDepth(linearDepth);\n    }"
            },
            C = {
                name: "DepthPass.unpackDepth",
                glslversion: 300,
                attributes: {
                    vertexPosition: s.default.POSITION,
                    vertexUV0: s.default.TEXCOORD0
                },
                uniforms: {
                    viewMatrix: c.default.VIEW_MATRIX,
                    projectionMatrix: c.default.PROJECTION_MATRIX,
                    worldMatrix: c.default.WORLD_MATRIX,
                    depthMap: c.default.DEPTH_MAP,
                    diffuseMap: c.default.DIFFUSE_MAP
                },
                vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 texCoord0;\n\n    void main(void) {\n      texCoord0 = vertexUV0;\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n    }",
                fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n    \tout vec4 fragColor;\n    #endif\n\n    precision mediump float;\n\n    uniform sampler2D depthMap;\n    uniform sampler2D diffuseMap;\n\n    in vec2 texCoord0;\n\n    " + m.default.methods.unpackDepth + "\n\n    void main(void)\n    {\n      vec4 depthCol = texture(depthMap, texCoord0);\n      vec4 diffuseCol = texture(diffuseMap, texCoord0);\n      float depth = unpackDepth(depthCol);\n      fragColor = diffuseCol * vec4(depth);\n    }"
            };
        i.prototype = Object.create(b.default.prototype), i.prototype.constructor = i, i.prototype.render = function(e, t, n, r) {
            this.depthPass.render(e, null, this.depthTarget, r), this.blurPass.render(e, t, n, r), this.outPass.material.setTexture(c.default.DEPTH_MAP, this.depthTarget), this.outPass.material.setTexture(c.default.DIFFUSE_MAP, n), this.outPass.material.setTexture("BLUR_MAP", this.blurTarget), this.outPass.render(e, t, n, r)
        }, t.default = i
    },
    864: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e, t) {
            this.depthPass = new p.default(e, function(e) {
                return !(e instanceof b.default)
            }), this.regularPass = new p.default(e);
            var n = new a.default(E);
            this.depthPass.overrideMaterial = n;
            var r = t || T;
            this.outPass = new g.default(r), this.outPass.useReadBuffer = !1, this.outPass.renderToScreen = !0;
            var i = window.innerWidth || 1,
                o = window.innerHeight || 1,
                l = C.default.nearestPowerOfTwo(Math.max(i, o));
            this.depthTarget = new f.default(i, o), this.regularTarget = new f.default(l / 2, l / 2), this.regularTarget2 = new f.default(i, o), this.regularTarget.generateMipmaps = !0, this.regularTarget.minFilter = "Trilinear", this.enabled = !0, this.clear = !1, this.needsSwap = !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            a = r(o),
            l = n(33),
            f = r(l),
            d = n(6),
            s = r(d),
            u = n(29),
            c = r(u),
            v = n(58),
            m = r(v),
            x = n(129),
            p = r(x),
            h = n(50),
            g = r(h),
            M = n(216),
            b = r(M),
            y = n(68),
            _ = r(y),
            P = n(4),
            C = r(P),
            E = {
                name: "DofPass.packDepth",
                glslversion: 300,
                attributes: {
                    vertexPosition: s.default.POSITION
                },
                uniforms: {
                    viewMatrix: c.default.VIEW_MATRIX,
                    projectionMatrix: c.default.PROJECTION_MATRIX,
                    worldMatrix: c.default.WORLD_MATRIX,
                    farPlane: c.default.FAR_PLANE
                },
                vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec4 vPosition;\n\n    void main(void) {\n      vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n      gl_Position = projectionMatrix * vPosition;\n    }",
                fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n    \tout vec4 fragColor;\n    #endif\n\n    precision mediump float;\n\n    //uniform float nearPlane;\n    uniform float farPlane;\n\n    #ifdef WEBGL_1\n      #undef in\n    #endif\n\n    " + m.default.methods.packDepth + "\n\n    in vec4 vPosition;\n\n    void main(void)\n    {\n      float linearDepth = min(-vPosition.z, farPlane) / farPlane;\n      fragColor = packDepth(linearDepth);\n    } "
            },
            T = {
                name: "DofPass.unpackDepth",
                glslversion: 300,
                attributes: {
                    vertexPosition: s.default.POSITION,
                    vertexUV0: s.default.TEXCOORD0
                },
                uniforms: {
                    worldMatrix: c.default.WORLD_MATRIX,
                    viewProjectionMatrix: c.default.VIEW_PROJECTION_MATRIX,
                    depthMap: c.default.DEPTH_MAP,
                    diffuseMap: c.default.DIFFUSE_MAP,
                    diffuseMip: "DIFFUSE_MIP",
                    zfar: c.default.FAR_PLANE,
                    focalDepth: 100,
                    fStop: 2,
                    CoC: .003,
                    focalLength: 75,
                    maxBlur: 16
                },
                vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n    in vec2 vertexUV0;\n\n    uniform mat4 viewProjectionMatrix;\n    uniform mat4 worldMatrix;\n\n    out vec2 texCoord0;\n\n    void main(void) {\n      texCoord0 = vertexUV0;\n      gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n    }",
                fshader: "\n    #ifdef WEBGL_1\n      #define in varying\n      #define texture texture2D\n      #define fragColor gl_FragColor\n    #else\n    \tout vec4 fragColor;\n    #endif\n\n    uniform sampler2D diffuseMap;\n    uniform sampler2D diffuseMip;\n    uniform sampler2D depthMap;\n    uniform float zfar; //camera clipping end\n    uniform float focalDepth;\n    uniform float focalLength;\n    uniform float fStop;\n    uniform float CoC;\n    uniform float maxBlur;\n    \n    in vec2 texCoord0;\n\n    #ifdef WEBGL_1\n      #undef in\n    #endif\n\n    " + m.default.methods.unpackDepth + "\n\n    void main() {\n      float depth = unpackDepth(texture(depthMap,texCoord0)) * zfar;\n      float f = focalLength; //focal length in mm\n      float d = focalDepth*1000.0; //focal plane in mm\n      float o = depth*1000.0; //depth in mm\n\n      float a = (o*f)/(o-f);\n      float b = (d*f)/(d-f);\n      float c = (d-f)/(d*fStop*CoC);\n\n      float blur = clamp(abs(a-b)*c, 0.0, maxBlur);\n      if (blur < 0.3) {\n        fragColor = texture(diffuseMip, texCoord0);\n      } else {\n        fragColor = texture(diffuseMap, texCoord0, log2(blur));\n      }\n      fragColor.a = 1.0;\n    }"
            };
        i.prototype = Object.create(_.default.prototype), i.prototype.constructor = i, i.prototype.render = function(e, t, n, r) {
            this.depthPass.render(e, null, this.depthTarget, r), this.regularPass.render(e, null, this.regularTarget, r), this.regularPass.render(e, null, this.regularTarget2, r), this.outPass.material.setTexture(c.default.DEPTH_MAP, this.depthTarget), this.outPass.material.setTexture(c.default.DIFFUSE_MAP, this.regularTarget), this.outPass.material.setTexture("DIFFUSE_MIP", this.regularTarget2), this.outPass.render(e, t, n, r)
        }, t.default = i
    },
    865: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i() {
            a.default.apply(this, arguments), this._composer = new m.default;
            var e = this.world.getSystem("RenderSystem");
            this._renderPass = new p.default(e.renderList), this._outPass = new g.default(c.default.deepClone(b.default.copy)), this._outPass.renderToScreen = !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(25),
            a = r(o),
            l = n(64),
            f = r(l),
            d = n(12),
            s = r(d),
            u = n(3),
            c = r(u),
            v = n(289),
            m = r(v),
            x = n(129),
            p = r(x),
            h = n(50),
            g = r(h),
            M = n(15),
            b = r(M),
            y = n(481),
            _ = r(y);
        i.prototype = Object.create(a.default.prototype), i.prototype.constructor = i, a.default._registerClass("posteffects", i), i.prototype._remove = function(e) {
            var t = this.world.getSystem("RenderSystem");
            f.default.remove(t.composers, this._composer), this._objects.delete(e), this.world && this._composer.destroy(this.world.sumerianRunner.renderer), this._composer = new m.default
        }, i.prototype._create = function() {
            return []
        }, i.prototype._update = function(e, t, n) {
            var r = this;
            return a.default.prototype._update.call(this, e, t, n).then(function(e) {
                if (e) {
                    var i = e.slice(),
                        o = [];
                    return c.default.forEach(t.posteffects, function(e) {
                        o.push(r._updateEffect(e, i, n))
                    }, null, "sortValue"), s.default.all(o).then(function(t) {
                        var n = void 0;
                        for (n = 0; n < t.length; n++) e[n] = t[n];
                        return e.length = n, e
                    })
                }
            }).then(function(e) {
                if (e) {
                    var t = e.some(function(e) {
                            return e.enabled
                        }),
                        n = r.world.getSystem("RenderSystem"),
                        i = r._composer;
                    if (t) {
                        i.passes = [], i.addPass(r._renderPass);
                        for (var o = 0; o < e.length; o++) {
                            var a = e[o];
                            a && a.enabled && i.addPass(e[o], r.world.sumerianRunner.renderer)
                        }
                        i.addPass(r._outPass), -1 === n.composers.indexOf(i) && n.composers.push(i)
                    } else f.default.remove(n.composers, r._composer);
                    return e
                }
            })
        }, i.prototype._updateEffect = function(e, t, n) {
            function r(e, t) {
                return o._load(t, n).then(function(t) {
                    i.options[e] = t
                })
            }
            for (var i = c.default.deepClone(e), o = this, a = void 0, l = 0; l < t.length; l++)
                if (t[l].id === i.id) {
                    a = t[l];
                    break
                }
            if (!a) {
                if (!_.default[i.type]) return null;
                a = new _.default[i.type](i.id)
            }
            for (var f = [], d = 0; d < _.default[i.type].options.length; d++) {
                var u = _.default[i.type].options[d],
                    v = u.key,
                    m = u.type;
                "texture" === m ? i.options[v] && i.options[v].textureRef && i.options[v].enabled ? f.push(r(v, i.options[v].textureRef)) : i.options[v] = null : "entity" === m && (i.options[v] && i.options[v].entityRef && i.options[v].enabled ? f.push(r(v, i.options[v].entityRef)) : i.options[v] = null)
            }
            return s.default.all(f).then(function() {
                return a.update(i), a
            })
        }, t.default = i
    },
    866: function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e, t) {
            this.depthPass = new b.default(e), this.depthPass.clearColor.setDirect(1, 1, 1, 1);
            var n = new a.default(S);
            this.depthPass.overrideMaterial = n, this.downsampleAmount = 2;
            var r = window.innerWidth || 1024,
                i = window.innerHeight || 1024;
            if (this.variant = t || !1, this.variant) {
                this.normalsPass = new b.default(e);
                var o = new a.default(U);
                this.normalsPass.overrideMaterial = o, this.ssaoKernel = new Array(96);
                for (var l = 0; l < 32; l++) {
                    var f = new D.default(2 * Math.random() - 1, 2 * Math.random() - 1, Math.random());
                    f = f.normalize(), f.scale(Math.random());
                    var d = l / 32;
                    d = R.default.lerp(.1, 1, d * d), f.scale(d), this.ssaoKernel[3 * l] = f.x, this.ssaoKernel[3 * l + 1] = f.y, this.ssaoKernel[3 * l + 2] = f.z
                }
            }
            if (this.updateSize({
                    x: 0,
                    y: 0,
                    width: r,
                    height: i
                }), this.copyPass = new _.default(ShaderLib.copy), this.ssaoCombinePass = new _.default(c.default.deepClone(T.default.postSsao)), this.aoBuffer = void 0, !0 === this.variant) {
                for (var u = new Float32Array(48), v = 0; v < 48; v++) u[v] = v % 3 != 0 ? 2 * Math.random() - 1 : 0;
                this.noiseTexture = new s.default(u, {
                    format: Capabilities.Webgl2 ? "RGB32F" : "RGB",
                    magFilter: "NearestNeighbor",
                    minFilter: "NearestNeighborNoMipMaps",
                    wrapS: "Repeat",
                    wrapR: "Repeat",
                    type: "Float",
                    generateMipmaps: !1
                }, 4, 4)
            }
            this.enabled = !0, this.clear = !1, this.needsSwap = !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9),
            a = r(o),
            l = n(33),
            f = r(l),
            d = n(45),
            s = r(d),
            u = n(3),
            c = r(u),
            v = n(6),
            m = r(v),
            x = n(29),
            p = r(x),
            h = n(58),
            g = r(h),
            M = n(129),
            b = r(M),
            y = n(50),
            _ = r(y),
            P = n(166),
            C = r(P),
            E = n(130),
            T = r(E),
            w = n(68),
            I = r(w),
            O = n(0),
            D = r(O),
            A = n(4),
            R = r(A),
            S = {
                name: "SsaoPass.packDepth",
                glslversion: 300,
                attributes: {
                    vertexPosition: m.default.POSITION
                },
                uniforms: {
                    viewMatrix: p.default.VIEW_MATRIX,
                    projectionMatrix: p.default.PROJECTION_MATRIX,
                    worldMatrix: p.default.WORLD_MATRIX
                },
                vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n\n    void main(void) {\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n    }",
                fshader: " \n    precision mediump float;\n\n    " + g.default.methods.packDepth + "\n    \n    #ifdef WEBGL_1\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    void main(void) {\n      fragColor = packDepth(gl_FragCoord.z);\n    }"
            },
            U = {
                glslversion: 300,
                attributes: {
                    vertexPosition: m.default.POSITION,
                    vertexNormal: m.default.NORMAL
                },
                uniforms: {
                    viewMatrix: p.default.VIEW_MATRIX,
                    projectionMatrix: p.default.PROJECTION_MATRIX,
                    worldMatrix: p.default.WORLD_MATRIX,
                    normalMatrix: p.default.NORMAL_MATRIX,
                    viewNormalMatrix: p.default.VIEW_NORMAL_MATRIX
                },
                vshader: "\n    #ifdef WEBGL_1\n      #define in attribute\n      #define out varying\n    #endif\n\n    in vec3 vertexPosition;\n    in vec3 vertexNormal;\n\n    uniform mat4 viewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat4 worldMatrix;\n    uniform mat3 viewNormalMatrix;\n\n    out vec3 outNormal;\n    void main(void) {\n      gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);\n      outNormal = normalize( viewNormalMatrix * vertexNormal);\n    }",
                fshader: " \n    precision mediump float;\n\n    #ifdef WEBGL_1\n      #define in varying\n      #define fragColor gl_FragColor\n    #else\n      out vec4 fragColor;\n    #endif\n\n    in vec3 outNormal;\n\n    void main(void) {\n      fragColor = vec4(normalize(outNormal * 0.5 + 0.5),1.0);\n    }"
            };
        i.prototype = Object.create(I.default.prototype), i.prototype.constructor = i, i.prototype.updateSize = function(e) {
            var t = Math.floor(e.width / this.downsampleAmount),
                n = Math.floor(e.height / this.downsampleAmount),
                r = void 0;
            !0 === this.variant ? (r = c.default.deepClone(T.default.ssaoVariant), r.uniforms.SSAO_SAMPLES = this.ssaoKernel) : r = c.default.deepClone(T.default.ssao), r.uniforms.size = [e.width, e.height], this.outPass = new _.default(r), this.outPass.material.uniforms.size = [e.width, e.height], !0 === this.variant && (this.outPass.material.uniforms.samples = this.ssaoKernel), this.outPass.useReadBuffer = !1, this.blurPass = new C.default({
                sizeX: t,
                sizeY: n,
                strength: this.variant ? .8 : .5
            }), this.depthTarget = new f.default(t, n, {
                magFilter: "Bilinear",
                minFilter: "BilinearNoMipMaps"
            }), this.normalsTexture = new f.default(t, n, {
                magFilter: "NearestNeighbor",
                minFilter: "NearestNeighborNoMipMaps",
                stencilBuffer: !1
            }), console.log("UPDATE SSAOPASS: ", t, n)
        }, i.prototype.render = function(e, t, n, r) {
            this.depthPass.render(e, null, this.depthTarget, r), !0 === this.variant && this.normalsPass.render(e, null, this.normalsTexture, r), this.aoBuffer || (this.aoBuffer = t.clone()), this.outPass.material.setTexture(p.default.DEPTH_MAP, this.depthTarget), !0 === this.variant ? (this.outPass.material.setTexture(p.default.DIFFUSE_MAP, this.normalsTexture), this.outPass.material.setTexture(p.default.ALBEDO_MAP, this.noiseTexture)) : this.outPass.material.setTexture(p.default.DIFFUSE_MAP, n);
            this.outPass.render(e, this.aoBuffer, n, r), this.blurPass.render(e, null, this.aoBuffer, r), this.ssaoCombinePass.material.setTexture(p.default.AO_MAP, this.aoBuffer), this.ssaoCombinePass.render(e, t, n, r)
        }, t.default = i
    }
}, [862]);