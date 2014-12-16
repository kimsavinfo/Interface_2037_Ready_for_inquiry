grunt.initConfig({
  mochacov: {
    coverage: {
      options: {
        coveralls: true
      }
    },
    test: {
      options: {
        reporter: 'spec'
      }
    },
    options: {
      files: 'tests/*.js'
    }
  }
});

grunt.registerTask('travis', ['mochacov:coverage']);
grunt.registerTask('test', ['mochacov:test']);