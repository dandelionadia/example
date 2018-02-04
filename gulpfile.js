const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nunjucks = require('gulp-nunjucks');

/* Compile SCSS to CSS */
gulp.task('scss', function () {
    return gulp.src('./src/styles/main.scss')
        /**
         * Функція sass() компілює SCSS в CSS.
         */
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('tpl', function () {
    return gulp.src('./src/templates/*.njk')
        .pipe(nunjucks.compile())
        .pipe(rename(file => file.extname = '.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', function () {
    return del('./build/**/*');
});

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets'));
});

/* Build the project */
gulp.task('build', ['clean'], function () {
    return runSequence(['assets', 'scss', 'tpl']);
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: ['./', './build']
        },
        open: false
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    return done();
});

/* Default task */
gulp.task('default', ['build', 'serve'], function () {
    gulp.watch('./src/styles/**/*.scss', ['scss']);
    gulp.watch('./src/templates/**/*.njk', ['tpl', 'reload']);
});
