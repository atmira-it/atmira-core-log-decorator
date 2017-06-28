/* eslint no-console: 0, angular/log: 0 */
import angular from 'angular';

angular
	.module('atmira.core.log.decorator', [])
  .config(function() {
    const logArray = [];
    const consoleOld = {
      log: console.log,
      debug: console.debug,
      warn: console.warn,
      error: console.error
    };
    console.log   = decoratedLog(consoleOld.log);
    console.debug = decoratedLog(consoleOld.debug);
    console.warn  = decoratedLog(consoleOld.warn);
    console.error = decoratedLog(consoleOld.error);

    const decoratedLog = consoleOld => {
      (logArray.length > 20) ? logArray.shift() : angular.noop();
      consoleOld.apply(console, arguments);
    };
  });
