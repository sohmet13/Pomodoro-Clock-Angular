import angular from 'angular';

import './style.scss';

const app = angular.module('PomApp', []);
app.controller('myCtrl', function($scope, $timeout) {
  $scope.sessionName = 'session';
  $scope.breakName = 'break';

  $scope.active = $scope.sessionName;

  $scope.periodsParams = {
    [$scope.sessionName]: {
      head: 'Session',
      minutes: 25,
      fillClass: 'fill_green'
    },
    [$scope.breakName]: {
      head: 'Break!',
      minutes: 5,
      fillClass: 'fill_red'
    }
  };

  $scope.time = $scope.periodsParams[$scope.active].minutes;
  $scope.fillHeight = 0;
  $scope.timerIsOn = false;
  let minute, hour, second, secs, timeout;

  const updateTime = (periodName) => {
    if ($scope.active === periodName) {
      $scope.time = $scope.periodsParams[$scope.active].minutes;
    }
  };

  $scope.decrement = (periodName) => {
    if ($scope.periodsParams[periodName].minutes > 1) {
      $scope.periodsParams[periodName].minutes--;
    }
    updateTime(periodName);
  };

  $scope.increment = (periodName) => {
    $scope.periodsParams[periodName].minutes++;
    updateTime(periodName);
  };

  const setUITime = (time) => `${time < 10 ? '0' : ''}${time}`;

  // парсим числа во время
  const parseNumberToMinutes = () => {
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

  // определяем действия в конце каждой секунды
  const timerEndActions = (isTimerEnd) => {
    if (isTimerEnd) {
      // меняем заголовок и время
      $scope.active = $scope.active === $scope.sessionName ? $scope.breakName : $scope.sessionName;
      $scope.time = $scope.periodsParams[$scope.active].minutes;
      //переключаем таймеры
      parseNumberToMinutes();
      decrementSeconds();
    } else {
      const uiHour = hour ? `${hour}:` : '';
      const uiMinute = hour ? setUITime(minute) : minute;

      $scope.time = `${uiHour}${uiMinute}:${setUITime(second)}`;

      timeout = $timeout(decrementSeconds, 1000);
    }
  };
  // отнимаем время по одной секунде
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
      if (typeof $scope.time === 'number') {
        parseNumberToMinutes();
      }
      decrementSeconds();
    }
    $scope.timerIsOn = !$scope.timerIsOn;
  }
});
