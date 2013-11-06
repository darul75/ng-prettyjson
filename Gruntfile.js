module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/ng-prettyjson.js', 'test/**/*.js']
    },
    // KARMA TASK CONFIG
    karma: {
      unit: {
        options: {
          basePath: './',
          frameworks: ['jasmine'],
          browsers: ['Chrome'],
          autoWatch: true,
          singleRun: true,
          files: [            
            'src/bower_components/angular/angular.js',
            'src/bower_components/angular-mocks/angular-mocks.js',                                    
            'src/ng-prettyjson.js',
            'test/**/*Spec.js']
        }
      }
    },
    // UGLIFY TASK
    uglify: {
      task1: {
         options: {
            preserveComments: 'some',
            report: 'min',
            banner: '/** \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
             '* (c) 2013 Julien VALERY https://github.com/darul75/ng-prettyjson\n' +
             '* License: MIT \n**/\n'
         },         
         files: {
             'dist/ng-prettyjson.min.js': ['src/ng-prettyjson.js']
         }
       }
     },
     // MINIFY CSS
    cssmin: {
      options: {
        keepSpecialComments: false,
        banner: '/** \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
             '* (c) 2013 Julien VALERY https://github.com/darul75/ng-prettyjson\n' +
             '* License: MIT \n**/\n'
      },
      compress: {
        files: {          
          'dist/ng-prettyjson.min.css': ['src/ng-prettyjson.css']
        }
      }
  }
});

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-karma');

  // TASK REGISTER
  grunt.registerTask('default', ['jshint', 'cssmin', 'uglify:task1', 'karma']);
};
