module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'some',
                    beautify: true,
                    banner: '/*\n' +
                        '* <%= pkg.name %> v.<%= pkg.version %>\n' +
                        '* (c) ' + new Date().getFullYear() + ', WebUX\n' +
                        '* License: MIT.\n' +
                        '*/\n'
                },
                files: {
                    'build/<%= pkg.filename %>.js': ['src/*.js']
                }
            },
            build_min: {
                options: {
                    report: 'gzip',
                    wrap: true,
                    banner: '/*\n' +
                        '* <%= pkg.name %> v.<%= pkg.version %>\n' +
                        '* (c) ' + new Date().getFullYear() + ', WebUX\n' +
                        '* License: MIT.\n' +
                        '*/\n'
                },
                files: {
                    'build/<%= pkg.filename %>.min.js': ['src/*.js']
                }
            },
            build_ng_min: {
                options: {
                    report: 'gzip',
                    wrap: true,
                    banner: '/*\n' +
                        '* <%= pkg.name %> v.<%= pkg.version %>\n' +
                        '* (c) ' + new Date().getFullYear() + ', WebUX\n' +
                        '* License: MIT.\n' +
                        '*/\n'
                },
                files: {
                    'build/angular-<%= pkg.filename %>.min.js': ['src/*.js', 'src/frameworks/angular.js']
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                src: ['build/<%= pkg.filename %>.js'],
                dest: ''
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'compress']);

};