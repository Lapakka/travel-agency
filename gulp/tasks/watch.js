var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,  // hides browserSync note box
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['styles'], function() {  // styles as a dependency task
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});