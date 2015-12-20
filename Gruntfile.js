module.exports = function(grunt){
	// 自动加载 grunt 任务
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		//加载 package
		pkg: grunt.file.readJSON('package.json'),

		//js 压缩
		uglify: {
			options:{
				banner:'/*! <%= pkg.name %> <%= pkg.version %> <%= pkg.author %> <%= pkg.blog %> <%= pkg.description %>-<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist:{
				files: {
					'dist/<%= pkg.name %>.min.js':['src/<%= pkg.name %>.js']
				}
			}
		},

		//sass 处理
		/*sass: {
			dist: {
				files: {
					'dist/skins/default.css':'src/skins/sass/default.scss'
				}
			}
		},*/
		sass: {
			options:{
				//banner:'/*! <%= pkg.name %> <%= pkg.version %>  <%= pkg.blog %> <%= pkg.description %>-<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				expand: true,
				cwd: 'src/skins/sass/',
				src: ['*.scss'],
				dest: 'dist/skins/',
				ext: '.css'
			}
		},
		//cssmin 压缩
		cssmin: {
			dist: {
				files:{
					'dist/skins/default.min.css':'dist/skins/default.css'
				}
			}
		},

		//语法检测
		jshint: {
		    //all: ['Gruntfile.js','src/<%= pkg.name %>.js'],
		    all: ['src/<%= pkg.name %>.js'],
		    options: {
		      browser: true,
		      devel: true,
		      globals: {
                $: false,
                jQuery: false
		      }
		    }
		},

		//清理
		clean: {
		  js: ['dist/<%= pkg.name %>*js'],
		  css: ['dist/skins/*.css','dist/skins/*.map']
		},

		watch: {
			css: {
				files: [
					'src/skins/**/*.scss'
				],
				tasks: ['sass','cssmin']
			},
			js: {
				files:['src/*.js'],
				tasks: ['uglify']
			}
		}
	});
	
	grunt.registerTask('default', ['uglify','sass']);
};