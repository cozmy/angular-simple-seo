module.exports = function (config) {
  'use strict';

  config.set({
    autoWatch: true,
    basePath: '../',
    browsers: [
      'PhantomJS'
    ],
    colors: true,
    exclude: [],
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',

      'src/*.js',
      'src/*.spec.js'
    ],
    frameworks: [ 'jasmine' ],
    logLevel: config.LOG_INFO,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    port: 8080,
    singleRun: false
  });
};
