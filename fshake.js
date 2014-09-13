(function(w){
    if(w.fShake){
        return;
    }
    var shake = function(opt){
        var acceleration = opt.acceleration || 18;
        var onShake = opt.onShake || function(){};
        var onNotSupport = opt.onNotSupport || function(){};
        var debug = opt.debug || false;
        var debugInfo;
        var unbind = function(){
            window.removeEventListener('devicemotion', handleEvent, false);
        };
        var createDebugInfo = function(){
            debugInfo = document.createElement('div');
            debugInfo.style.cssText = 'position:fixed;top:0;left:0;width:240px;padding:10px;background:rgba(0,0,0,.6);color:white;word-wrap:break-word;word-break:break-all;';
            updateDebugInfo();
            document.body.appendChild(debugInfo);
        };
        var getDebugInfo = function(x, y, z){
            return [
                'acceleration',
                '<br/>',
                'x轴:', x, '<br/>',
                'y轴:', y, '<br/>',
                'z轴:', z, '<br/>'
            ].join('');
        };
        var updateDebugInfo = function(x, y, z){
            debugInfo.innerHTML = getDebugInfo(x, y, z);
        };
        var gravity = 9.81;
        var handleEvent = function(event){
            var ag = event.acceleration;
            var agi = event.accelerationIncludingGravity;
            var x, y, z;

            if(ag.x !== null){
                x = ag.x;
                y = ag.y;
                z = ag.z;
            }
            else{
                x = agi.x;
                y = agi.y;
                z = agi.z - gravity;
            }
            x = Math.abs(x);
            y = Math.abs(y);
            z = Math.abs(z);
            if(debug){
                updateDebugInfo(x, y, z);
            }
            if(x > acceleration || y > acceleration || z > acceleration){
                if(onShake() === false){
                    unbind();
                }
            }
        };
        if (window.DeviceOrientationEvent) {
            window.addEventListener('devicemotion', handleEvent, false);
            if(debug){
                createDebugInfo();
            }
        }
        else{
            onNotSupport();
        }
    };
    if ( typeof define === "function") { //AMD|CMD
        define(function(require, exports, module) {
            module.exports = shake;
        });
        return;
    }
    w.fShake = shake; //normal
})(this);