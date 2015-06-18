(function (argument) {
'use strict';

function SensortagHumidity() {
  SensortagSensorBase.apply(this, arguments);
};
window.SensortagHumidity = SensortagHumidity;

SensortagHumidity.prototype = {
  __proto__: SensortagSensorBase.prototype,

  temperature: 0/0,  // ˚C
  relativeHumidity: 0/0,  // %

  dataChanged: function(newValue) {
    var view = new DataView(newValue);
    var rawTemperature = view.getUint16(0, true);
    var rawHumidity = view.getUint16(2, true);

    this.set('temperature', -46.85 + 175.72/65536 * rawTemperature);
    rawHumidity &= ~0x3;  // Clear status bits.
    this.set('relativeHumidity', -6.0 + 125.0/65536 * rawHumidity);
  },
};

})();
