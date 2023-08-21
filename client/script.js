angular.module('SpeedTestApp', [])
  .controller('SpeedTestController', function($scope, $http) {
    $scope.ping = 'N/A';
    $scope.download = 'N/A';
    $scope.upload = 'N/A';
    $scope.isTesting = false; // Flag to indicate if a test is in progress
    $scope.isRes = false;
    
    $scope.startSpeedTest = function() {
      $scope.ping = 'N/A';
      $scope.download = 'N/A';
      $scope.upload = 'N/A';
      if (!$scope.isTesting) {
        $scope.isTesting = true; // Start the test, show "Please wait"
        $scope.isRes = false;
        $http.get('/speedtest')
          .then(function(response) {
            const data = response.data;
            $scope.ping = data.ping;
            $scope.download = data.download;
            $scope.upload = data.upload;
          })
          .catch(function(error) {
            console.error('Error fetching speed test results:', error);
          })
          .finally(function() {
            $scope.isTesting = false; // Test finished, hide "Please wait"
            $scope.isRes = true;
          });
      }
    };
  });