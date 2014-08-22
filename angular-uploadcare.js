'use strict';

/**
 * @ngdoc directive
 * @name angular-uploadcare.directive:UploadCare
 * @description Provides a directive for the Uploadcare widget.
 * # UploadCare
 */
angular.module('ng-uploadcare', [])
  .directive('uploadcare-widget', function () {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<input type="hidden" role="ng-uploadcare-uploader" />',
      scope: {
        onUploadComplete: '&',
        onWidgetReady: '&',
      },
      controller: ['$scope', function($scope) {
        $scope.widget = uploadcare.Widget('[role=ng-uploadcare-uploader]');
        $scope.onWidgetReady({widget: $scope.widget});
        $scope.widget.onUploadComplete(function(info) {
          $scope.onUploadComplete({info: info});
        });
      }]
    };
  });
