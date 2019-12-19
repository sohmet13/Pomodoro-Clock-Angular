import angular from 'angular';

import './style.scss';

const app = angular.module('PomApp', []);
app.controller('myCtrl', function($scope, $timeout) {
  $scope.breakValue = 5;
  $scope.sessionValue = 25;
  $scope.time = $scope.sessionValue;
  $scope.fillHeight = 0;
  $scope.head = 'Session';
  $scope.timerIsOn = false;
  let minute, hour, second, secs;

  const setTime = (varName) => {
    if ($scope.head === 'Session' && varName === 'sessionValue')
      $scope.time = $scope.sessionValue;
    else if ($scope.head === 'Break!' && varName === 'breakValue')
      $scope.time = $scope.breakValue;
  };

  const toggleTimerStyle = (header) => {
    if ($scope.head === header) {
      $scope.head = 'Session';
      $scope.time = $scope.sessionValue;
      $scope.fillClass = 'fill_green';
    } else {
      $scope.head = 'Break!';
      $scope.time = $scope.breakValue;
      $scope.fillClass = 'fill_red';
    }
  };

  const setUITime = (time) => time < 10 ? `0${time}` : time;

  $scope.decrement = (varName) => {
    if ($scope[varName] > 1) {
      $scope[varName]--;
    }
    setTime(varName);
  };

  $scope.increment = (varName) => {
    $scope[varName]++;
    setTime(varName);
  };

  //функция таймера
  let timeout;
  const parseNumberToMinutes = () => {
    //заголовок и изначальные значения
    toggleTimerStyle('Session');
    secs = 60 * $scope.time;
    $scope.fillHeight = 0;
    //вычисляем новое время сессии
    if ($scope.time > 60) {
      hour = Math.round(($scope.time - $scope.time%60)/60);
      minute = Math.round($scope.time%60) - 1;
    } else {
      minute = $scope.time - 1;
    }
    second = 60;
  };

  const timerEndActions = (isTimerEnd) => {
    if (isTimerEnd) {
      //переключаем таймеры
      toggleTimerStyle('Break!');
      parseNumberToMinutes();
      decrementSeconds();
    } else {
      const uiHour = hour ? `${hour}:` : '';
      const uiMinute = hour ? setUITime(minute) : minute;

      $scope.time = `${uiHour}${uiMinute}:${setUITime(second)}`;

      timeout = $timeout(decrementSeconds, 1000);
    }
  };
  //сам таймер
  function decrementSeconds(){
    let end = false;
    if( second > 0 ) second--;
    else {
      second = 59;
      if( minute > 0 ) minute--;
      else {
        second = 59;
        minute = 59;
        if ( hour > 0 ) hour--;
        else {
          end = true
        }
      }
    }
    $scope.fillHeight += 100/secs;
    timerEndActions(end);
  }
  //событие по клику
  $scope.toggleTimer = () => {
    if ($scope.timerIsOn){
      $timeout.cancel(timeout);
    } else {
      if (Number.parseInt($scope.time)) {
        parseNumberToMinutes();
      }
      decrementSeconds();
    }
    $scope.timerIsOn = !$scope.timerIsOn;
  }
});
