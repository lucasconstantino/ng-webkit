
/**
 * ------------------------------------------------------------------------
 * Node-Webkit Window Provider
 * ------------------------------------------------------------------------
 * A wrapper to the node-webkit's Window interface.
 */

angular.module('node-webkit').factory('nwWindow', [
    '$rootScope',
    'nwGui'
  ].concat(function ($rootScope, nwGui) {

    // Make window available to root scope.
    $rootScope.nwWindow = nwGui.Window.get();

    [ // Listen to these events to update scopes.
      'loaded'
    , 'focus'
    , 'blur'
    , 'minimize'
    , 'minimize'
    , 'maximize'
    , 'unmaximize'
    , 'enter-fullscreen'
    , 'leave-fullscreen'
    ].forEach(function (eventName) {
      $rootScope.nwWindow.on(eventName, function() {
        $rootScope.$broadcast('window:' + eventName, arguments);
        $rootScope.$apply();
      });
    });

    return $rootScope.nwWindow;
  }));
