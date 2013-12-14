module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  config =
    concat:
      options:
        separator: ';'
      backbone:
        src: ['public/js/App/**/*.js']
        dest: 'public/js/App.js'

    watch:
      backbone:
        files: ['<%= concat.backbone.src %>', 'public/js/main.js']
        tasks: ['concat:backbone']

  grunt.initConfig config

  grunt.registerTask 'default', [
    'concat:backbone'
    'watch'
  ]