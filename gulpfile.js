// gulpfile with local-proxy

var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var svgmin = require('gulp-svgmin');
var fontgen = require('gulp-fontgen');
var tinypng = require('gulp-tinypng-compress');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

//Setting Project
var pathProject = 'stopsrach';

//Browser Sync
var browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('styles', function () {
    return gulp.src('web/sass/*.scss')
        .pipe(sass({
            outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
            precision: 5,
            includePaths : ['web/sass']
        }))
        .pipe(plumber())
       // .pipe(sourcemaps.init())
        .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe(cssnano())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('web/dist/css/'))
        .pipe(notify("Done CSS!"));
});
/***********************************************
 Default Gulp
 ***********************************************/
gulp.task('default', ['serve']);
/***********************************************
 Server
 ***********************************************/
gulp.task('serve', ['styles'], function() {

    // browserSync.init({
    //     proxy: "http://vitime.akvion/"
    // });
    browserSync.init({
      proxy: 'https://dev.vitime.pro/produkty/antioxidants/',
      files: ['web/dist/css/' + '*.css'],
      middleware: require('serve-static')('./web/dist'),
      rewriteRules: [
        {
          match: new RegExp('</head>'),
          fn: function(){
            return '<script async="" src="/browser-sync/browser-sync-client.js?v=2.18.13"></script><link rel="stylesheet" type="text/css" href="http://localhost:8080/css/style.css">'
          }
        }
      ],
      port: 8080
    })

    gulp.watch("web/sass/*.scss",['styles']);
    gulp.watch("web/img/svg/*.svg",['svg']);
    gulp.watch("web/js/app.js",['script:app']);
    gulp.watch("web/js/index.js",['script:index']);
    gulp.watch("web/js/*.js").on('change', reload);
    gulp.watch("web/dist/css/*.css").on('change', reload);
    gulp.watch("views/**/*.php").on('change', reload);
});
/***********************************************
 JS Compress
 ***********************************************/
gulp.task('script:index', function() {
    return gulp.src('web/js/index.js')
       // .pipe(sourcemaps.init())
        .pipe(uglify())
       // .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/dist/js'));
});
gulp.task('script:app', function() {
    return gulp.src('web/js/app.js')
       // .pipe(sourcemaps.init())
        .pipe(uglify())
       // .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/dist/js'));
});
gulp.task('script:scrollmagic', function() {
    return gulp.src([
            'web/js/greensock/src/minified/TimelineMax.min.js',
            'web/vendor/bower/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
            'web/vendor/bower/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
            'web/js/greensock/src/minified/plugins/ScrollToPlugin.min.js'
        ])
        .pipe(uglify())
       // .pipe(concat('scrollmagic.min.js'))
        .pipe(gulp.dest('web/dist/js/scrollMagic/'));
});
/*gulp.task('script:snap', function() {
    return gulp.src('web/vendor/bower/Snap.svg/dist/snap.svg-min.js')
       // .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('snap.svg-min.js'))
       // .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/dist/js'));
});*/
gulp.task('script:fotorama', function() {
    return gulp.src('web/js/fotorama-4.6.4/fotorama.js')
       // .pipe(sourcemaps.init())
        .pipe(uglify())
       // .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/dist/js'));
});
//textillate
gulp.task('script:textillate', function() {
    return gulp.src([
        'web/js/textillate-master/assets/jquery.lettering.js',
        'web/js/textillate-master/jquery.textillate.js'
    ])
       // .pipe(sourcemaps.init())
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(concat('textillate_all.min.js'))
        .pipe(gulp.dest('web/dist/js'));
});
/***********************************************
 SVG
 ***********************************************/
gulp.task('svg', function () {
    return gulp.src('web/img/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(gulp.dest('web/img/svg-min/'));
});
/***********************************************
 Generate Fonts
 ***********************************************/
gulp.task('fonts:web', function() {
    return gulp.src('web/dist/css/fonts/MyriadPro-SemiBold/*.{ttf,otf}')
        .on('data',function(file){
            console.log({
                base:file.relative
            });
        })
        .pipe(fontgen({
            dest: "web/dist/css/fonts/MyriadPro-SemiBold/"
        }))
        .pipe(notify("Done Font!"));
});
