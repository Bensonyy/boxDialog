/**
 * @author   yongbingzhang@Ctrip
 * boxDialog 通用弹窗组件
*/

var gulp = require('gulp'),
    os = require('os'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    mincssmin = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    gulpWebpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');


// 路径缓存
var _src = './src',
    _bulid = './dist';

var srcPath = {
  src: _src,
  app: _src+'/app',
  appinc: _src+'/appinc',
  skins: _src+'/skins',
  sass: _src+'/skins-sass/sass',
  images: _src+'/images',
  js: _src+'/js',
  module: _src+'/js/component',
  lib: _src+'/js/lib'
};

var bulidPath = {
    bulid: _bulid,
    app: _bulid+'/app',
    skins: _bulid+'/skins',
    css: _bulid+'/css',
    images: _bulid+'/images',
    js: _bulid+'/js'
};

var host = {
    path: srcPath.src,
    port: 1000,
    html: 'index.html',
    url: 'http://localhost:1000/app'
};

//mac chrome: "Google chrome",
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

/********sass处理*********/
var sass = require('gulp-sass');
gulp.task('sass', function () {
  return gulp.src(srcPath.sass +'/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(srcPath.skins));
});

var compass = require('gulp-compass');
gulp.task('compass', function(done) {
  gulp.src(srcPath.sass +'/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: srcPath.css,
      sass: srcPath.sass
    }))
    .on('end', done)
    .pipe(connect.reload());
    //.pipe(gulp.dest(bulidPath.css));
});

//将图片拷贝到目标目录
gulp.task('copy:images', function () {
    gulp.src([srcPath.images+'/**/*'])
        .pipe(gulp.dest(bulidPath.images));
});

//压缩合并css
gulp.task('cssmin',['compass'],function () {
    gulp.src(srcPath.css+'/*.css')
        .pipe(mincssmin())
        .pipe(gulp.dest(bulidPath.css));
});

//压缩js
gulp.task('jsmin',function () {
/*
  gulp.src(srcPath.js+'/*.js')
      .pipe(gulp.dest(bulidPath.js));
*/
  gulp.src(srcPath.js+'/*.js')
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(bulidPath.js));
});


//压缩js
gulp.task('jsmin2',function () {
    gulp.src(srcPath.js+'/demojs/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(bulidPath.js));
});

//用于在html文件
gulp.task('html', function (done) {
    gulp.src(srcPath.app)
        .on('end', done)
        .pipe(connect.reload());
});

//将html拷贝到目标目录
gulp.task('copy:html', function () {
    gulp.src([srcPath.app+'/*.html'])
        .pipe(gulp.dest(bulidPath.app));
});

gulp.task('copy:skins', function () {
    gulp.src([srcPath.skins+'/*.css',srcPath.skins+'/icons/'])
        .pipe(gulp.dest(bulidPath.skins));

    gulp.src([srcPath.skins+'/icons/**'])
        .pipe(gulp.dest(bulidPath.skins+'/icons'));
});


//webpack 处理
gulp.task('webpack',function(done){
  return gulp.src(srcPath.module+'/**/*')
             .pipe(gulpWebpack(webpackConfig))
             .pipe(gulp.dest(srcPath.js))
             .pipe(connect.reload());
});


gulp.task('clean', function () {
    gulp.src([
      bulidPath.bulid,
      //srcPath.js+'/skins/*.css',srcPath.js+'/skins/*.map',
      srcPath.js+'/*.js',srcPath.js+'/*.map',
      '!'+srcPath.js+'/jquery.min.js',
      '!'+srcPath.js+'/jquery.min.js'
      ]).pipe(clean());
});

gulp.task('watch', function (done) {
    gulp.watch(srcPath.sass +'/**/*.scss',['sass']);
    gulp.watch(srcPath.app+'/*.html',['html']);
    gulp.watch(srcPath.module+'/**/*',['webpack']);
    //gulp.watch(srcPath.js+'/**/*');
});

//启动静态服务器
gulp.task('connect', function () {
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});
gulp.task('open', function () {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: host.url
        }));
});


//开发
//gulp.task('dev', ['connect','sass','webpack','open'],function(){
gulp.task('dev', ['connect','sass','webpack'],function(){
  gulp.start(['watch']);
  //gulp.start(['open']);
});

//发布
gulp.task('copy:bulid', ['copy:skins','copy:html','jsmin']);

gulp.task('default',['dev'],function(){
  gulp.start(['copy:bulid']);
});
