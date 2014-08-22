'use strict';

/**
 * @ngdoc directive
 * @name angular-uploadcare.directive:UploadCare
 * @description Provides a directive for the Uploadcare widget.
 * # UploadCare
 */
angular.module('ng-uploadcare', [])
  .directive('uploadcareWidget', function () {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<input type="hidden" role="ng-uploadcare-uploader" />',
      scope: {
        onWidgetReady: '&',
        onUploadComplete: '&',
        onChange: '&',
      },
      controller: ['$scope', '$log', function($scope, $log) {
        if(!uploadcare) {
          $log.error('Uploadcare script has not been loaded!.');
          return;
        }
        $scope.widget = uploadcare.Widget('[role=ng-uploadcare-uploader]');
        $scope.onWidgetReady({widget: $scope.widget});
        $scope.widget.onUploadComplete(function(info) {
          $scope.onUploadComplete({info: info});
        });
        $scope.widget.onChange(function(file) {
          $scope.onChange({file: file});
        })
      }]
    };
  });
