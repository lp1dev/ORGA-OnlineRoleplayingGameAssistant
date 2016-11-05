//REQUIRES
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var bower = require('gulp-bower');
var standard = require('gulp-standard');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var concatcss = require('gulp-concat-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');

//VARIABLES
var name = "app";
var http_port = 8080;
var workdir = "./src";
var build_dir = "./dist";
var global_js_dirs = [ workdir + '/js/*.js' , workdir + '/lib/*/*.js' ];
var project_js_dirs = [ workdir + '/js/*.js'];
var project_scss_dirs = [ workdir + '/sass/*.scss'];
var project_html_dirs = [ workdir + '/*.html', workdir + '/*/*.html' ];
var main_html = "index.html";

//TASKS
gulp.task('default', ['build']);
gulp.task('build', ['bower', 'standard', 'sass', 'uglify-js', 'htmlmin']);
gulp.task('run', ['http', 'watch']);
gulp.task('http', http_task);
gulp.task('uglify-js', uglifyJS_task);
gulp.task('htmlmin', htmlmin_task);
gulp.task('sass', sass_task);
gulp.task('standard', standard_task);
gulp.task('bower', bower);
gulp.task('watch', watch_task);

////

function http_task(){
    gulp.src(workdir)
	.pipe(webserver({
	    livereload: true,
	    directoryListing:{
		enable: false,
		path: workdir,
		fallback: main_html
	    },
	    open: true,
	    port: http_port
	}));
}

function standard_task(){
    gulp.src(project_js_dirs)
	.pipe(standard())
	.pipe(standard.reporter('default',{
	    breakOnError: true,
	    quiet: true
	}));
}

function sassError(error){
    console.log(error.stack);
}

function htmlmin_task(){
    gulp.src(project_html_dirs)
	.pipe(htmlmin())
	.pipe(useref())
	.pipe(gulp.dest(build_dir));
}

function sass_task(){
    gulp.src(project_scss_dirs)
	.pipe(sass({
	    outputStyle: 'expanded'
	}))
	.on('error', sassError)
	.pipe(prefix(
	    "last 1 version", "> 1%", "ie 8", "ie 7"
	))
	.pipe(concatcss(name + ".css"))
    	.pipe(minifycss())
	.pipe(gulp.dest(workdir + "/css/"))
	.pipe(gulp.dest(build_dir + "/css"));
}

function uglifyJS_task(){
    gulp.src(global_js_dirs)
	.pipe(uglify())
	.pipe(concat(name + '.js'))
	.pipe(gulp.dest(build_dir + '/js/'));
}

function watch_task(){
    gulp.watch(project_scss_dirs, ['sass']);
    gulp.watch(global_js_dirs, ['uglify-js']);
}
