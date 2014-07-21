
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
