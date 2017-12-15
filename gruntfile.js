module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/delimiter.min.css': ['src/delimiter.css']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    /*Plugins*/
                    'build/delimiter.min.js': 'src/delimiter.js',
                   
                }
            }
        },
        uglify: {
            min: {
                files: [{
                    src: ['build/delimiter.min.js'],
                    dest: 'build/delimiter.min.js'
                }]
            }
        }

    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build:release', ['cssmin', 'ngAnnotate', 'uglify']);

};