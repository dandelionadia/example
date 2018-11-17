const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const nunj = require('gulp-nunjucks')
const gwatch = require('gulp-watch')
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
        .src('./src/pages/*.nunj')
        .pipe(nunj.compile())
        .pipe(rename((file) => file.extname = '.html'))
        .pipe(gulp.dest('./build'))
})

gulp.task('pages', function () {
    return gulp
        .src('./src/pages/**/*.html')
        .pipe(gulp.dest('./build'));
});

/* Build the project */
gulp.task('build', ['clean'], function () {
    return runSequence(['js', 'scss', 'pages', 'nunj', 'assets']);
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: ['./build/']
        },
        files: ['./build/**/*'],
        open: true
    });
});

gulp.task('reload', function (done) {
    browserSync.reload()
    done();
});

const watch = (pattern, tasks) => gwatch(pattern, () => runSequence(...tasks))

/* Default task */
gulp.task('default', ['build', 'serve'], function () {
    watch('./src/styles/**/*.scss', ['scss']);
    watch('./src/js/**/*.js', ['js']);
    watch('./src/assets/**/*', ['assets']);
    watch('./src/pages/**/*.html', ['pages']);
    watch('./src/pages/*.nunj', ['nunj']);
});
