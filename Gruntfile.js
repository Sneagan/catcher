module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'browserify': {
      options: {
        debug: true
      },
      dev: {
        src: ['app/main.js'],
        dest: 'public/bundle.js'
      }
    },
    'execute': {
        target: {
            src: ['index.js']
        }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('compile', ['browserify', 'execute']);

};
