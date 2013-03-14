/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          waterfall: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },

    describe: {
      dirtyMark: ''
    },

    'render': {
      'snippet': {
        target: '<%= build.root %>/snippet.html',
        source: './src/snippet.template',
        scout: {
          url: {
            path: '//waterfallmobile.com/widget/{{ widgetId }}/',
            file: 'waterfall-subscription-widget.scout.js'
          },
          listIdToken: '{{ listId }}'
        }
      },
      'snippet-test': {
        target: '<%= build.testRoot %>/snippet.html',
        source: '<%= render.snippet.source %>',
        scout: {
          url: {
            path: '/',
            file: '<%= render.snippet.scout.url.file %>'
          },
          listIdToken: '<%= render.snippet.scout.listIdToken %>'
        }
      }
    },

    build: {
      root: './release',
      testRoot: './test/assets'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-git-describe');

  grunt.registerMultiTask('render', 'Render a static asset from a template.',
    function renderTask() {
      grunt.config.requires('meta.version');

      grunt.file.write(this.data.target,
        grunt.template.process(grunt.file.read(this.data.source), {
          data: grunt.util._.extend({
            version: grunt.config.get('meta.version')
          }, this.data)
        }));
    });

  grunt.registerTask('build', ['describe', 'render']);

  // Default task.
  grunt.registerTask('default', ['jshint']);
};
