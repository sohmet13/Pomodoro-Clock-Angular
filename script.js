var app = angular.module('PomApp', []);
app.controller('myCtrl', function($scope, $timeout) {
  $scope.br = 5;
  $scope.se = 25;
  $scope.time = $scope.se;
  $scope.fillHeight = '0%';
  $scope.head = 'Session';
  var minute, hour, second, secs, perc=0;
  $scope.Session = function(event) {
    if ($scope.se>1 && event.target.className==='dec')  
      $scope.se--;
    else if (event.target.className==='inc')
      $scope.se++;
    if ($scope.head === 'Session')
     $scope.time=$scope.se;
   };
  $scope.Break = function(event) {
    if ($scope.br>1 && event.target.className==='dec') 
      $scope.br--;
    else if (event.target.className==='inc')
      $scope.br++;
    if ($scope.head === 'Break!')
     $scope.time=$scope.br;
  };
  //функция таймера
  var timeout='';
  function Time() {
    if (Number($scope.time)){
      //заголовок и изначальные значения
    if ($scope.head === 'Session') {
      $scope.head = 'Session';
      $scope.time = $scope.se;
      $scope.fillColor = 'green';    
    } else {
      $scope.head = 'Break!';
      $scope.time = $scope.br;
      $scope.fillColor = 'red';
    }
      secs = 60 * $scope.time;
      perc =0;
     //вычисляем новое время сессии
      if($scope.time>60) {
       hour =Math.round(($scope.time - $scope.time%60)/60);
        minute = Math.round($scope.time%60)-1;
      } else {
        minute = $scope.time-1;
      }
      second=60;
    }
    Timer();
    }
  //сам таймер
  function Timer(){
  let end = false;
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
  //событие по клику
  let isPress = false;
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
