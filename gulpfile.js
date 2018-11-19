const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const nunj = require('gulp-nunjucks-render')
const gwatch = require('gulp-watch')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync').create();

gulp.task('clean', function () {
    return del('./build/**/*');
});

/* Compile SCSS to CSS */
gulp.task('scss', function () {
    return gulp.src('./src/styles/main.scss')
        /* Функція sass() компілює SCSS в CSS */
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./build/js'));
});

gulp.task('assets', function () {
    return gulp
        .src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets'));
});

gulp.task('nunj', function () {
    return gulp
        .src('./src/templates/pages/**/*.nunj')
        .pipe(plumber({ onError: console.log }))
        .pipe(nunj({
            path: ['src/templates']
        }))
        .pipe(rename((file) => file.extname = '.html'))
        .pipe(gulp.dest('./build'))
})

/* Build the project */
gulp.task('build', ['clean'], function () {
    return runSequence(['js', 'scss', 'nunj', 'assets']);
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: ['./build/']
        },
        files: ['./build/**/*'],
        open: false
    });
});

gulp.task('reload', function (done) {
    browserSync.reload()
    done()
});

const watch = (pattern, tasks) => gwatch(pattern, () => runSequence(...tasks))

/* Default task */
gulp.task('default', ['build', 'serve'], function () {
    watch('./src/styles/**/*.scss', ['scss']);
    watch('./src/js/**/*.js', ['js']);
    watch('./src/assets/**/*', ['assets']);
    watch('./src/templates/**/*.nunj', ['nunj']);
});
