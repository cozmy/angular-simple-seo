'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concurrent: {
      server: {
        tasks: ['karma', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    jshint: {
      js: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'src/*.js',
          '!src/*.spec.js'
        ]
      },
      jsTest: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [
          'src/*.spec.js'
        ]
      }
    },

    karma: {
      continuous: {
        configFile: 'test/karma.conf.js'
      }
    },

    watch: {
      js: {
        files: [
          'src/*.js',
          '!src/*.spec.js'
        ],
        tasks: ['jshint:js']
      },
      jsTest: {
        files: [
          'src/*.spec.js'
        ],
        tasks: ['jshint:jsTest']
      }
    }
  });

  grunt.registerTask('start', function () {
    grunt.task.run([
      'jshint',
      'concurrent'
    ]);
  });

  grunt.registerTask('serve', function () {
    grunt.task.run([
      'jshint',
      'concurrent'
    ]);
  });
};
