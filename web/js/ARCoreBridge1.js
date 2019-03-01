/* Adds functions to the window that a native Android applicatiom may call to supply ARCore-related data
 *  to the AR system in the sumerian engine.
 */
window.ARCoreBridge = (function() {

    let CustomARSystem = class extends sumerian.System {        

        constructor(arSystem) {
            super("CustomARSystem", []);
            console.log("ARCoreBridge CustomARSystem created");
            this.ar = arSystem;
        }
        
        onPreRender() {
            
            if (window.Android && window.Android.getMatrices) {

                return;


                var matricesJSON = window.Android.getMatrices();

//                console.log(`ARCoreBridge.onPreRender: ${matricesJSON}`);

                if (matricesJSON!="") {
                    var matrices = JSON.parse(matricesJSON);

                    this.ar._arViewMatrix = new sumerian.Matrix4(matrices.vm);
                    this.ar._arProjectionMatrix = new sumerian.Matrix4(matrices.pm);
                    this.ar.enabled = true;                
                }
            }

            
        }
    };

    'use strict';

    var _arSystem;    

    var ARCoreBridge = {
        setArSystem: function(arSystem, world) {
            console.log(`ARCoreBridge setArSystem`);
            this._arSystem = arSystem;            
            this._arSystem.enabled = true;
            world.add(new CustomARSystem(arSystem));
        },

        

        viewProjectionMatrixUpdate: function(viewMatrixData, projectionMatrixData) {
            if (!this._arSystem) {
                return;
            }

            //console.log(`ARCoreBridge.viewProjectionMatrixUpdate`);

            this._arSystem._arViewMatrix = this._matrixFromJSON(viewMatrixData);
            this._arSystem._arProjectionMatrix = this._matrixFromJSON(projectionMatrixData);
            this._arSystem.enabled = true;
        },

        lightingEstimateUpdate: function(ambientIntensity) {
            if (!_arSystem) {
                return;
            }

            // ArSystem expects lighting estimation information in lumens and temperature in Kelvin.
            // ARCore provides only an intensity value (from 0.0 to 1.0). To convert, the intensity
            // is scaled such that 1000 lumens is 0.5 in intensity. Pure white (6500K) is used for temperature.
            this._arSystem._ambientIntensity = ambientIntensity * 2000;
            this._arSystem._ambientColorTemperature = 6500;
        },

        anchorTransformUpdate: function(anchorTransforms) {
            if (!this._arSystem) {
                return;
            }

            const parsedJSON = JSON.parse(anchorTransforms);

            for (let key of Object.keys(parsedJSON)) {
                let transform = new sumerian.Matrix4(parsedJSON[key]);
                this._arSystem._setAnchorTransform(key, transform);
            }
        },

        requestHitTest: function(requestId, screenX, screenY) {
            //The 'Android' object is added to the window by the Android application hosting the webview.
            if (window.Android && window.Android.requestHitTest) {
                window.Android.requestHitTest(requestId, screenX, screenY);
            }
        },

        hitTestResponse: function(requestId, hitTestResult) {
            if (!this._arSystem) {
                return;
            }

            this._arSystem._hitTestResponse(requestId, hitTestResult && this._matrixFromJSON(hitTestResult));
        },

        registerAnchor: function(requestId, transform) {
            if (window.Android && window.Android.registerAnchor) {
                window.Android.registerAnchor(requestId, transform.data);
            }
        },

        registerAnchorResponse: function(requestId, anchorId) {
            if (!this._arSystem) {
                return;
            }

            this._arSystem._registerAnchorResponse(requestId, anchorId);
        },

        _matrixFromJSON: function(jsonString) {
            const parsedJSON = JSON.parse(jsonString);
            return new sumerian.Matrix4(parsedJSON);
        }
    };

    return ARCoreBridge;
})();

