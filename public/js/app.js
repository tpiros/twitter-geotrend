angular.module('twitter-geotrend',['geolocation'])
  .controller('MainCtrl', function ($scope, $http, geolocation) {
    $scope.city = "Determining location...";
    $scope.woeid = 0;
    $scope.error = 0;
    $scope.detected = false;
    geolocation.getLocation().then(function(data) {
      $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22'+data.coords.latitude+'%2C'+data.coords.longitude+'%22%20and%20gflags%3D%22R%22&format=json').success(function(data) {
            $scope.city = data.query.results.Result.city
            $scope.detected = true;
        }).error(function(error) {
          $scope.error = 1;
          $scope.errorMsg(error);
        });

      $scope.getTrends = function() {
        if ($scope.woeid === 0) {
          $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text=%22'+$scope.city+'%22&format=json')
            .success(function(data) {
                if (Object.prototype.toString.call(data.query.results.Result) === '[object Array]') {
                  $scope.detected = false;
                  $scope.multicity = true;
                  $scope.cities = data.query.results.Result;
                } else {
                  $scope.woeid = data.query.results.Result.woeid;
                  $scope.detected = true;
                  woeid = $scope.woeid;
                  $http.get('/api/trends/' + woeid)
                      .success(function(data, status, headers, config) {
                        if (data.status) {
                            $scope.trends = data.trends[0].trends;
                        } else {
                          $scope.errorMsg = "Can't find trends around " + $scope.city + ". Try another search.";
                          $scope.error = 1;
                        }
                      });
                  }
                });
        }
      }

      $scope.select = function(city) {
        $scope.woeid = 0;
        $scope.city = city;
        $scope.multicity = 0;
        $scope.detected = true;
      }

      $scope.reset = function() {
        $scope.woeid = 0;
        $scope.city = ""
        $scope.multicity = 0;
        $scope.detected = true;
        $scope.error = 0;
      }

    });
});