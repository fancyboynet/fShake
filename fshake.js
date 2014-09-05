(function(w){
    if(w.fShake){
        return;
    }
    var shake = function(opt){
        var acceleration = opt.acceleration || 18;
        var onShake = opt.onShake || function(){};
        var onNotSupport = opt.onNotSupport || function(){};
        var unbind = function(){
            window.removeEventListener('devicemotion', handleEvent, false);
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
            if(Math.abs(x) > acceleration || Math.abs(y) > acceleration || Math.abs(z) > acceleration){
                if(onShake() === false){
                    unbind();
                }
            }
        };
        if (window.DeviceOrientationEvent) {
            window.addEventListener('devicemotion', handleEvent, false);
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