module.exports = function (grunt) {
	
	grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
		
		tag: {
            banner: "/*!\n" +
            " * <%= pkg.title %>\n" +
            " * <%= pkg.url %>\n" +
            " * @author <%= pkg.author %>\n" +
            " * @version <%= pkg.version %>\n" +
            " * Copyright (c) <%= pkg.copyright %>. All rights reserved.\n" +
            " */\n"
        },
		
		// clean task
		clean: {
			all: [
				"build/**/*.*"
			],
			dev: ["build/js/app.js"]
		},

		ngtemplates: {
			appModule: {
				cwd: 'src/js/app/',
				src: 'views/**/*.html',
				dest: 'build/js/app.templates.js',
				options:    {
					htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true, removeComments: true }
				}
			}
		},
		
		// code quality
		jshint: {
			all: [
				'src/js/app/**/*.js'
			],
			options: {
				notypeof: true,
				debug: true,
				eqnull: true,
				eqeqeq: false,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		
		// concat task
		concat:{
			options: {
				banner: '<%= tag.banner %>',
				separator: '\n\n/* ------------------------------------------------------------------------------------------------------------ */\n\n'
			},

			vendor: {
				src: grunt.file.readJSON("libraries.json"),
				dest: "build/js/vendor.js"
			},

			dev: {
				src: [
					'src/js/app/app.module.js',
					'src/js/app/components/**/*.module.js',
					'src/js/app/components/**/*.controller.js',
					'src/js/app/components/**/*.directive.js',
					'src/js/app/components/**/*.service.js',
					'src/js/app/components/**/*.config.js'
				],
				dest: "build/js/app.js"
			}
		},
		
		// uglify task
		uglify:{
			options: {
				banner: '<%= tag.banner %>',
				mangle: {
					except: ['jQuery', 'angular', '$', 'require', 'exports', 'kendo']
				}
			},
			production:{
				files: {
					'build/js/app.min.js': ['<%= concat.dev.dest %>']
				}
			}
		},

		compass:{
			app:{
				options:{
					config: "app.rb",
					outputStyle: "compressed"
				}
			}
		},

		// watch
		watch:{
			options:{
				livereload: 12345
			},

			css:{
				files: ["src/sass/**/*.scss"],
				tasks: ["compass:app"]
			},

			appTemplates:{
				files: ["src/js/app/views/**/*.html"],
				tasks: ["ngtemplates:appModule"]
			},

			con:{
				files: ["src/js/app/components/**/*.js", "src/js/app/app.module.js"],
				tasks: ["clean:dev","concat:dev"]
			}
		}
		
	});
	
	// load tasks
    require("jit-grunt")(grunt);
	grunt.loadNpmTasks('grunt-angular-templates');

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask(
		"dev",
		[
			"clean:dev",
			"ngtemplates:appModule",
			"jshint:all",
			"concat:dev",
			"compass:app"
		]
	);

	grunt.registerTask(
		"production",
		[
			"clean:all",
			"ngtemplates:appModule",
			"jshint:all",
			"concat:dev",
			"concat:vendor",
			"uglify:production",
			"compass:app"
		]
	);

};