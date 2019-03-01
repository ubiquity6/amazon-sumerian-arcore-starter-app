/* Adds functions to the window that a native iOS applicatiom may call to supply ARKit-related data
 *  to the AR system in the sumerian engine.
 */
window.ARKitBridge = (function() {
    'use strict';

    var _arSystem;

    var ARKitBridge = {
        setArSystem: function(arSystem) {
            this._arSystem = arSystem;
        },

        viewProjectionMatrixUpdate: function(viewMatrixData, projectionMatrixData) {
            if (!this._arSystem) {
                return;
            }

            this._arSystem._arViewMatrix = this._matrixFromJSON(viewMatrixData);
            this._arSystem._arProjectionMatrix = this._matrixFromJSON(projectionMatrixData);
            this._arSystem.enabled = true;
        },

        lightingEstimateUpdate: function(ambientIntensity, ambientColorTemperature) {
            if (!_arSystem) {
                return;
            }

            this._arSystem._ambientIntensity = ambientIntensity;
            this._arSystem._ambientColorTemperature = ambientColorTemperature;
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
            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.arkit_hit_test) {
                window.webkit.messageHandlers.arkit_hit_test.postMessage({
                    'screenX': screenX.toString(),
                    'screenY': screenY.toString(),
                    'requestId': requestId.toString()
                });
            }
        },

        hitTestResponse: function(requestId, hitTestResult) {
            if (!this._arSystem) {
                return;
            }

            this._arSystem._hitTestResponse(requestId, hitTestResult && this._matrixFromJSON(hitTestResult));
        },

        registerAnchor: function(requestId, transform) {
            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.arkit_register_anchor) {
                window.webkit.messageHandlers.arkit_register_anchor.postMessage({
                    'transform': this._matrixToJSON(transform),
                    'requestId': requestId.toString()
                });
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
        },

        _matrixToJSON: function(matrix) {
            return JSON.stringify(Array.from(matrix.data));
        }
    };

    return ARKitBridge;
})();