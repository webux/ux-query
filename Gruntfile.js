module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            '* <%= pkg.name %> v.<%= pkg.version %>\n' +
            '* (c) ' + new Date().getFullYear() + ', WebUX\n' +
            '* License: MIT.\n' +
            '*/\n',
        jshint: {
            // define the files to lint
            files: ['src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                }
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'some',
                    beautify: true,
                    banner: '<%= banner %>',
                    wrap: '<%= pkg.packageName %>'
                },
                files: {
                    'build/<%= pkg.filename %>.js': [
                        'src/core.js',
                        'src/init/*.js',
                        'src/measure/*.js',
                        'src/modify/*.js',
                        'src/mutate/*.js',
                        'src/query/*.js',
                        'src/select/*.js',
                        'src/event/*.js',
                        'src/subscribe/*.js'
                    ]
                }
            },
            build_min: {
                options: {
                    report: 'gzip',
                    wrap: '<%= pkg.packageName %>',
                    banner: '<%= banner %>'
                },
                files: {
                    'build/<%= pkg.filename %>.min.js': ['build/<%= pkg.filename %>.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
//    grunt.registerTask('default', ['jshint', 'uglify', 'compress']);
    grunt.registerTask('default', ['jshint', 'uglify']);

};