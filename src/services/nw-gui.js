
/**
 * ------------------------------------------------------------------------
 * Node-Webkit GUI Provider
 * ------------------------------------------------------------------------
 * A wrapper to the GUI interface.
 */

var gui = require('nw.gui');

angular.module('node-webkit').factory('nwGui', function () {
    return gui;
  });
