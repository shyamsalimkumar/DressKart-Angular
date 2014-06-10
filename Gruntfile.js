module.exports = function ( grunt ) {
  'use strict';

  grunt.initConfig( {

    watch: {
      scripts: {
        files: [ 'Gruntfile.js', 'js/app/*.js', 'css/*.css', 'index.html' ],
        options: {
          livereload: 9090,
        }
      }
    }

  } );

  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  grunt.registerTask( 'default', [] );
};