/* eslint no-console: 0, angular/log: 0, angular/document-service: 0 */
'use strict';

export default class LogDecoratorProvider {
  constructor() {
    this._logArray = [];
    const consoleOld = {
      log: console.log,
      debug: console.debug,
      warn: console.warn,
      error: console.error
    };
    console.log   = (...args) => { this.addLog(args); consoleOld.log(...args);};
    console.debug = (...args) => { this.addLog(args); consoleOld.debug(...args);};
    console.warn  = (...args) => { this.addLog(args); consoleOld.warn(...args);};
    console.error = (...args) => { this.addLog(args); consoleOld.error(...args);};
  }
  get logArray() {
    return this._logArray;
  }
  addLog(msg) {
    (this._logArray.length > 20) ? this._logArray.shift() : '';
    this._logArray.push(msg);
  }
  $get($log) {
    'ngInject';
    return {
      logToClipboard: (beautify) => {
        const textArea = document.createElement('textarea');
        // textArea.style.top = 0;
        // textArea.style.left = 0;
        // textArea.style.width = '2em';
        // textArea.style.height = '2em';
        // textArea.style.padding = 0;
        // textArea.style.border = 'none';
        // textArea.style.outline = 'none';
        // textArea.style.boxShadow = 'none';
        // textArea.style.background = 'transparent';
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
