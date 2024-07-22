const sass = require('sass');

module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    // use readJSON to import data from package.json
    pkg: grunt.file.readJSON('package.json'),

    // concatenate files
    concat: {
        js: {
            src: ['js/*.js'],
            dest: 'static/script.js'
        }
        // css: {
        //     src: ['css/*.css'],
        //     dest: 'static/style.css'
        // }
    },

    // compiles sass to css
    sass: {
        options: {
            implementation: sass,
            style: 'compressed',
            sourceMap: true
        },
        static: {
            files: [{
                src: 'scss/style.scss',
                dest: 'static/style.css'
            }]
        }
    },

    // minify js files
    uglify: {
        jsmin: { // target name
            files: [
                {
                    src: 'js/*.js',
                    dest: 'static/script.js'
                }
            ]
        }
    },

    // minify css files
    cssmin: {
        css: { // target name
            files: [
                {
                    src: 'static/style.css',
                    dest: 'static/style.css'
                }
            ]
        }
    },

    // watches for file changes and automatically updates tasks
    watch: {
        files: ['scss/*.scss', 'js/*.js'],
        tasks: ['concat', 'sass', 'uglify']
    }
});

    // Load plugins - tells Grunt what to do
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Register tasks - sets aliases to run task
    grunt.registerTask('concat-js', ['concat:js']);
    grunt.registerTask('concat-css', ['concat:css']);
    grunt.registerTask('compressSASS', ['sass']);
    grunt.registerTask('compressJS', 'uglify');

    // set default to run all tasks
    grunt.registerTask('default', ['concat', 'sass', 'cssmin', 'uglify']);

};

/* Grunt Implementation Instructions
    1. First confirm that a package.json exists in the project that you want to implement grunt in. If no package.json exists either create one manually or use the "npm init" command.

    2. Install packages using the following commands
        - npm i -g grunt-cli *** ONLY NEED TO INSTALL ONCE GLOBALLY - REQUIRED ***
        - npm i --save-dev grunt
        - npm i --save-dev grunt-contrib-concat
        - npm i --save-dev grunt-contrib-cssmin
        - npm i --save-dev grunt-contrib-uglify
        - npm i --save-dev grunt-contrib-watch
        - npm i --save-dev node-sass
        - npm i --save-dev grunt-sass

    3. Create Gruntfile.js in the root of your project's directory
    4. Create a directory called "static" for your css & js minified files
    5. Copy above code into your Gruntfile.js file, make sure to change the file routes as needed for your specific project.
    6. Compile code by using "grunt" command, you should see the js & css files being created or updated in the static directory 
    7. During development, you can use "grunt watch" command to automatically update changes made to specified files

    Notes:
        - Make sure the index.html is looking at the css & js that live in the static folder now if needed
        - You can customize tasks to run specific files only by creating an alias and referencing the specific target name
            EX: grunt.registerTask('<alias-name>', ['<plugin-name>:<target-name>'])

            - To run specific tasks only, use "grunt <alias-name>" command 

*/