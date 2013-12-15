module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  config =
    concat:
      options:
        separator: ';'
      backbone:
        src: [
          # order matters, or things don't exist when looked for
          'public/js/App/models/*.js'
          'public/js/App/collections/*.js'
          'public/js/App/views/*.js'
        ]
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