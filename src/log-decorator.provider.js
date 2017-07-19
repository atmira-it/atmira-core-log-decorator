/* eslint no-console: 0, angular/log: 0, angular/document-service: 0 */
'use strict';

export default class LogDecoratorProvider {
  constructor() {
    this._logArray = [];
    this.active = false;
  }
  activate() {
    const consoleOld = {
      log: console.log,
      debug: console.debug,
      warn: console.warn,
      error: console.error
    };
    this.active = true;
    console.log   = (...args) => { this._addLog(args); consoleOld.log(...args);};
    console.debug = (...args) => { this._addLog(args); consoleOld.debug(...args);};
    console.warn  = (...args) => { this._addLog(args); consoleOld.warn(...args);};
    console.error = (...args) => { this._addLog(args); consoleOld.error(...args);};
  }
  // get logArray() {
  //   return this._logArray;
  // }
  _addLog(msg) {
    (this._logArray.length > 20) ? this._logArray.shift() : '';
    this._logArray.push(msg);
  }
  $get($log) {
    'ngInject';
    return {
      logToClipboard: (beautify) => {
        if (!this.active){
          return;
        }
        const textArea = document.createElement('textarea');
        textArea.value = '';
        angular.forEach(this.logArray, (log) => {
          angular.forEach(log, (line) => {
            if (angular.isString(line)){
              textArea.value += line + '\n';
            } else if (angular.isObject(line)) {
              (beautify) ?
                textArea.value += angular.toJson(line) + '\n' :
                textArea.value += angular.toJson(line, null, 4) + '\n';
            }
          });
          textArea.value += '\n';
        });
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          $log.error(err);
        }
        document.body.removeChild(textArea);
      }
    };
  }
}
