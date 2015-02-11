module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
         //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    jshint: {
      files: ['src/ng-prettyjson.js', 'src/ng-prettyjson-tmpl.js', 'test/**/*.js']
    },
    // KARMA TASK CONFIG
    karma: {
        options: {
            basePath: './',
            frameworks: ['jasmine'],
            files: [
                'lib/angular/angular.js',
                'lib/angular-mocks/angular-mocks.js',
                'src/ng-prettyjson.js',
                'src/ng-prettyjson-tmpl.js',
                'test/**/*Spec.js'
            ],
            autoWatch: true,
            singleRun: true
        },
        unit: {
            options: {
                browsers: ['Firefox']                
            }
        },
        continuous: {
            options: {
                browsers: ['PhantomJS']                
            }
        }
    },
    // UGLIFY TASK
    uglify: {
      task1: {
         options: {
            preserveComments: 'all',
            report: 'min',
            banner: '/** \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
             '* (c) 2013 Julien VALERY https://github.com/darul75/ng-prettyjson\n' +
             '* License: MIT \n**/\n'
         },         
         files: {
             'dist/ng-prettyjson.min.js': ['src/ng-prettyjson.js', 'src/ng-prettyjson-tmpl.js']
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
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-karma');

  // TASK REGISTER
    grunt.registerTask('test', ['jshint', 'bower', 'karma:unit']);
    grunt.registerTask('test-continuous', ['jshint', 'bower', 'karma:unit']);
    grunt.registerTask('build', ['cssmin', 'uglify']);
    grunt.registerTask('default', ['build', 'test']);
};
