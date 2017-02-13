var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),          // cache buster string to the file name
cssnano = require('gulp-cssnano'),  // css compression
uglify = require('gulp-uglify'),    // js compression
del = require('del'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function() {
    return del("./docs");       // Delete old dist before building a new one
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {  // Copy extra files (not that useful in this case)
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"))
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {  // Includes fresh rebuild of icons
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive: true,  // Compresses JPEG
            interlaced: true,   // Helps with GIF images
            multipass: true     // Helps with SVG
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() { // Trigger minify after delete and icons tasks are done
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {  // Includes fresh rebuild of CSS and JS
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);