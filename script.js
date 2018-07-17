var app = angular.module('PomApp', []);
app.controller('myCtrl', function($scope, $timeout) {
  $scope.br = 5;
  $scope.se = 25;
  $scope.time = $scope.se;
  $scope.fillHeight = '0%';
  var minute, hour, second, secs, perc=0;
  $scope.Session = function() {
   if ($scope.se>1)  
     $scope.se--;
    if ($scope.head === 'Session'){
     $scope.time=$scope.se;
    } 
   };
  $scope.Session1 = function() { 
     $scope.se++;
     if ($scope.head === 'Session'){
     $scope.time=$scope.se;
      } 
    };
  $scope.Break = function() {
   if ($scope.br>1) 
     $scope.br--;
    if ($scope.head === 'Break!'){
     $scope.time=$scope.br;
    } 
  };
   $scope.Break1 = function() {
     $scope.br++;
    if ($scope.head === 'Break!'){
     $scope.time=$scope.br;
    }
   };
  $scope.head = 'Session';
  //функция таймера
  var timeout='';
  function Time() {
    if (Number($scope.time)){
      //заголовок и изначальные значения
    if ($scope.head === 'Session') {
      $scope.head = 'Session';
      $scope.time = $scope.se;
      $scope.fillColor = 'green';
      secs = 60 * $scope.time;
      perc =0;
    } else {
      $scope.head = 'Break!';
      $scope.time = $scope.br;
      $scope.fillColor = 'red';
      secs = 60 * $scope.time;
      perc =0;
    }
     //вычисляем новое время сессии
      if($scope.time>60) {
       hour =Math.round(($scope.time - $scope.time%60)/60);
        minute = Math.round($scope.time%60)-1;
      } else {
        minute = $scope.time-1;
      }
      second=60;
    }
   //сам таймер
  function Timer(){
  var end = false;
      if( second > 0 ) second--;
      else{second = 59;
          if( minute > 0 ) minute--;
          else{second = 59;
               minute=59;
              if( hour > 0 ) hour--;
              else {end = true};
          }
      }
    perc +=100/secs;
    $scope.fillHeight = perc + '%';
    if(end){
      //переключаем таймеры
      if ($scope.head === 'Session') {
      $scope.head = 'Break!';
      $scope.time = $scope.br;
      $scope.fillColor = 'red';
      } else {
      $scope.head = 'Session';
      $scope.time = $scope.se;
      $scope.fillColor = 'green';
      }
      perc =0;
      Time();
    }else{
      if (hour) {
        if (minute.toString().length<2) {
          minute = '0'+minute;
        }
        if (second<10){
          second='0'+second;
        }
      $scope.time=hour+':'+minute+':'+second;
      } else { 
        if (second<10){
          second='0'+second;
        }
        $scope.time=minute+':'+second;
      }
      timeout = $timeout(Timer, 1000);
     }
      }
    Timer();
    }
  //событие по клику
  var isPress = false;
  $scope.TimerBS = function(){
    if (!isPress){
      Time(); 
    } else {
      $timeout.cancel(timeout);
    }
    isPress = !isPress;
    $scope.isPress= isPress; 
  }
});
