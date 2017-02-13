// Gulp-modernizr lets us create a custom modernizr. This one only checks the browser for SVG support. 

var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js']) // Modernizr picks up classes it should add to the page from these files
        .pipe(modernizr({
            "options": [
                "setClasses"
            ]
        }))
        .pipe(gulp.dest('./app/temp/scripts'));
});