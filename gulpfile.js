var gulp = require('gulp');
var sass = require('gulp-sass');

// Live-reloading với Browser Sync
var browserSync = require('browser-sync').create();

const { series } = require('gulp');

function f_sass() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
}
exports.ex_sass = series(f_sass);

function f_browserSync() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
}

const { watch } = require('gulp');

function f_js(done) {
    browserSync.reload();
    done();
}

function f_html(done) {
    browserSync.reload();
    done();
}

exports.ex_watch = function() {
    // series(f_browserSync, f_sass);
    f_browserSync();
    f_sass();
    watch(['app/**/*.scss'], series(f_sass));
    watch('app/**/*.html', series(f_html));
    watch('app/**/*.js', series(f_js));
};