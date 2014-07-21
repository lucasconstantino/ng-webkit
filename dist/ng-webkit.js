
/**
 * ------------------------------------------------------------------------
 * Node-Webkit Module Manifest
 * ------------------------------------------------------------------------
 * node-webkit is a module created to facilitate comunication between
 * AngularJS based applications and the Node-Webkit environment.
 */

angular.module('node-webkit', []);


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


/**
 * ------------------------------------------------------------------------
 * Node-Webkit Window Provider
 * ------------------------------------------------------------------------
 * A wrapper to the node-webkit's Window interface.
 */

angular.module('node-webkit').factory('nwWindow', [
  '$rootScope',
  'nwGui',
  function ($rootScope, nwGui) {

    // Make window available to root scope.
    $rootScope.nwWindow = nwGui.Window.get();

    [ // Listen to these events to update scopes.
      'loaded',
      'focus',
      'blur',
      'minimize',
      'minimize',
      'maximize',
      'unmaximize',
      'enter-fullscreen',
      'leave-fullscreen'
    ].forEach(function (eventName) {
      $rootScope.nwWindow.on(eventName, function() {
        $rootScope.$broadcast('window:' + eventName, arguments);
        $rootScope.$apply();
      });
    });

    return $rootScope.nwWindow;
  }]);


/**
 * ------------------------------------------------------------------------
 * Node-Webkit Window Directives
 * ------------------------------------------------------------------------
 * Below there are some directives to help with interaction with the window.
 */

angular.module('node-webkit')
  
  /**
   * Closes the window on element click.
   */
  .directive('nwWindowClose', ['nwWindow', function (nwWindow) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // Listen for element clicks.
        element.on('click', function () {
          nwWindow.close();
        });
      }
    };
  }])

  /**
   * Fullscreen's the window on element click.
   */
  .directive('nwWindowFullscreen', ['nwWindow', function (nwWindow) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // Listen for element clicks.
        element.on('click', function () {
          nwWindow.toggleFullscreen();
          nwWindow.focus();
        });

        // Listen for fullscreen entrance.
        nwWindow.on('enter-fullscreen', function () {
          element.addClass('is-fullscreen');
        });

        // Listen for fullscreen exit.
        nwWindow.on('leave-fullscreen', function () {
          element.removeClass('is-fullscreen');
        });
      }
    };
  }])

  /**
   * Minimizes the window on element click.
   */
  .directive('nwWindowMinimize', ['nwWindow', function (nwWindow) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // Listen for element clicks.
        element.on('click', function () {
          nwWindow.minimize();
        });
      }
    };
  }]);
