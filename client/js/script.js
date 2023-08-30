angular.module('SpeedTestApp', [])
  .controller('SpeedTestController', function($scope, $http) {

    $scope.addDarkness = function() {
      angular.element(document.body).addClass('make_darkness');
    };

    $scope.removeDarkness = function() {
      angular.element(document.body).removeClass('make_darkness');
    };

    $scope.ping = 'N/A';
    $scope.download = 'N/A';
    $scope.upload = 'N/A';
    $scope.country = '';
    $scope.name = '';
    $scope.location = '';
    $scope.host = '';
    $scope.ip = '';
    $scope.clientIp = ''; // Initialize clientIp
    $scope.showResults = true;
    $scope.isTesting = false;

    $scope.startSpeedTest = function() {
      $scope.ping = 'N/A';
      $scope.download = 'N/A';
      $scope.upload = 'N/A';
      $scope.country = '';
      $scope.name = '';
      $scope.location = '';
      $scope.host = '';
      $scope.ip = '';
      $scope.clientIp = ''; // Reset clientIp
      $scope.addDarkness();
      if (!$scope.isTesting) {
        $scope.isTesting = true;
        $scope.showResults = false;
        $http.get('/speedtest')
          .then(function(response) {
            const data = response.data;
            $scope.ping = data.ping;
            $scope.download = data.download;
            $scope.upload = data.upload;
            $scope.name = data.server.name;
            $scope.ip = data.server.ip;
            $scope.country = data.server.country;
            $scope.host = data.server.host;
            $scope.location = data.server.location;
            $scope.clientIp = data.clientIp; // Set clientIp
            $scope.showResults = true;
          })
          .catch(function(error) {
            console.error('Error fetching speed test results:', error);
          })
          .finally(function() {
            $scope.isTesting = false;
            $scope.removeDarkness();
          });
      }
    };
  });
