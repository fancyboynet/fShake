module.exports = function(grunt) {
    grunt.initConfig({
        src : 'fshake.js',
        dest : 'fshake.min.js',
		connect: {
            main: {
                options: {
                    port: 8182,
                    hostname: '*',
                    keepalive : true
                }
            }
		 },
        jshint : {
            options : {
                sub : true
            },
            main : ['<%= src %>']
        },
        uglify: {
            main: {
                files: {
                    '<%= dest %>': ['<%= src %>']
                }
            }
        },
        copy: {
            main: {
                src: '<%= src %>',
                dest: '<%= dest %>'
            }
        },
        watch: {
            main: {
                files: ['<%= src %>'],
                tasks: ['jshint', 'copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['connect']);
    grunt.registerTask('build', ['jshint', 'uglify']);
    grunt.registerTask('develop', ['watch']);
};