/* eslint no-console: 0, angular/log: 0 */
import angular from 'angular';
import LogDecoratorProvider from './log-decorator.provider';

angular.module('atmira.core.log.decorator', [])
  .provider('logDecorator', LogDecoratorProvider);
