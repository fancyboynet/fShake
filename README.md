fShake
======

An easy function to handle the "shake" event in morden browser.

## Usage

There are only three parameters totally. 

···
fShake({
    acceleration : 18, //acceleration of the device on any one axis (X, Y or Z) to judge shake or not.(18m/s^2 by default)
    onShake : function(){}, //return false can unbind the "shake listener"
    onNotSupport : function(){} //like the name means
});
···
