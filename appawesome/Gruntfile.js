module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    env : {
        options : {
            // Shared Options Hash 
            //globalOption : 'foo'
        },
        dev: {
            NODE_ENV : 'DEVELOPMENT'
        },
        prod : {
            NODE_ENV : 'PRODUCTION'
        }
    },
    clean : {
      distDirCompletely: [ "dist/*"],
      tempFiles: [ "dist/temp", "dist/temp/**/*"]
    },
    preprocess : {
        dev : {
            src : 'index.html',
            dest : 'dist/index.html'
        },
        prod : {
            src : 'index.html',
            dest : 'dist/index.html'
        }
    },
    concat: {
      allSrcInOneFile: {
          src: ['js/app.module.js', 'js/**/*.js'],
          dest: 'dist/temp/temp.app.js'
      }
    },
    uglify: {
      mergedJS: {
        files: {
          'dist/app.min.js': ['dist/temp/temp.app.js']
        }
      }
    },
    copy: {
      assetsAndPartials: {
        //cwd: 'path/to/files',  // set working folder / root to copy
        src: ['partials/**/*.html',
              'assets/**/*', '!assets/scss', '!assets/scss/**/*', 
              '!assets/samples', '!assets/samples/**/*'],           // copy all files and subfolders
        dest: 'dist/'    // destination folder
        //expand: true           // required when using cwd
      },
      wholeDistToCordovaProj: {
        expand: true,
        cwd: 'dist',
        src: '**/*',
        dest: '../appawesome-cordova/www/'
      }
    },
    exec: {
      createAPKCmd: {
        cwd: '../appawesome-cordova',
        cmd: 'cordova build'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['env:prod', 'clean:distDirCompletely', 'preprocess:prod', 
    'concat:allSrcInOneFile', 'uglify:mergedJS', 'copy:assetsAndPartials', 'clean:tempFiles', 
    'copy:wholeDistToCordovaProj', 'exec:createAPKCmd']);
};