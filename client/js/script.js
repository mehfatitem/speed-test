angular.module('SpeedTestApp', [])
  .controller('SpeedTestController', function($scope, $http) {

    const toggleDarkness = () => angular.element(document.body).toggleClass('make_darkness');

    $scope.resetData = () => {
      $scope.ping = 'N/A';
      $scope.download = 'N/A';
      $scope.upload = 'N/A';
      $scope.country = '';
      $scope.name = '';
      $scope.location = '';
      $scope.host = '';
      $scope.ip = '';
      $scope.clientIp = '';
      $scope.showResults = false;
      $scope.isTesting = false;
    };

    $scope.startSpeedTest = () => {
      if (!$scope.isTesting) {
        toggleDarkness();
        $scope.resetData();
        $scope.isTesting = true;
        $http.get('/speedtest')
          .then(response => {
            const data = response.data;
            Object.assign($scope, {
              ping: data.ping,
              download: data.download,
              upload: data.upload,
              name: data.server.name,
              ip: data.server.ip,
              country: data.server.country,
              host: data.server.host,
              location: data.server.location,
              clientIp: data.clientIp,
              showResults: true,
            });
          })
          .catch(error => {
            console.error('Error fetching speed test results:', error);
          })
          .finally(() => {
            $scope.isTesting = false;
            toggleDarkness();
          });
      }
    };
  });