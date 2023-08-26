angular.module('SpeedTestApp', [])
  .controller('SpeedTestController', function($scope, $http) {
    $scope.ping = 'N/A';
    $scope.download = 'N/A';
    $scope.upload = 'N/A';
    $scope.showResults = true; // Hide the results initially
    $scope.isTesting = false; // Flag to indicate if a test is in progress

    $scope.startSpeedTest = function() {
      $scope.ping = 'N/A';
      $scope.download = 'N/A';
      $scope.upload = 'N/A';
      if (!$scope.isTesting) {
        $scope.isTesting = true; // Start the test, show "Please wait"
        $scope.showResults = false; // Hide results during testing
        $http.get('/speedtest')
          .then(function(response) {
            console.dir(response);
            const data = response.data;
            $scope.ping = data.ping;
            $scope.download = data.download;
            $scope.upload = data.upload;
            $scope.name = data.server.name;
            $scope.ip = data.server.ip;
            $scope.country = data.server.country;
            $scope.host = data.server.host;
            $scope.location = data.server.location;
            $scope.showResults = true; // Show results after testing
          })
          .catch(function(error) {
            console.error('Error fetching speed test results:', error);
          })
          .finally(function() {
            $scope.isTesting = false; // Test finished, hide "Please wait"
          });
      }
    };
  });