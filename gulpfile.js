// Port#
const PORT = '8000';

// Paths
// const scssPathSource = 'php/projects/x_connect/_src/*.scss';
// const scssPathDestination = 'php/projects/x_connect/_assets';
// const jsPathSource = 'php/projects/x_connect/_src/*.js';
// const jsPathDestination = 'php/projects/x_connect/_assets';

// const scssPathSource = '_src/scss/*.scss';
// const scssPathDestination = 'common/css';
// const jsPathSource = 'php/projects/x_connect/_src/js/*.js';
// const jsPathDestination = 'php/projects/x_connect/_assets/js';

// Imports
var gulp   = require('gulp'),
    exec   = require('child_process').exec,
    watch  = require('gulp-watch'),
    riot   = require('gulp-riot'),
    minify = require('gulp-minify'),
    sass   = require('gulp-sass'),
    plumber   = require('gulp-plumber'),
    livereload   = require('gulp-livereload'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin');

// Start localhost
gulp.task('startWebServer', (cb) => {
  var root = process.cwd();
  exec('c:\\xampp\\php\\php.exe -S localhost:' + PORT + ' -t ' + root, (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('==================================');
  console.log('The web server has started.');
  console.log('==================================');
  cb();
});

// Stop localhost
gulp.task('stopWebServer', (cb) => {
  exec('FOR /F "tokens=5 delims= " %P IN (\'netstat -ano ^| findstr :' + PORT + ' ^| findstr /i LISTENING\') DO TaskKill.exe /F /PID %P', (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('==================================');
  console.log('The web server has stopped.');
  console.log('==================================');
  cb();
});

// Watchers
gulp.task('watch', (cb) => {
  livereload.listen();

  /* Watching HTML | PHP| CSS | JS | JSON files for any changes */
  /*******************************************************/

  watch('./**/*.html', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(livereload());
  });

  watch('./**/*.php', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(livereload());
  });

  watch('./**/*.css', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(livereload());
  });

  watch('./**/*.js', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(livereload());
  });

  watch('./**/*.json', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(livereload());
  });

  console.log('==================================');
  console.log('Watching your HTML | PHP | CSS | JS | JSON files.');
  console.log('==================================');


  /* Minifying JS | CSS files */
  /*************************************/
  // OEBPS/common/js/
  watch('uncompressed/OEBPS/common/js/*.js', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(minify({
      ext: { min: '.js' },
      noSource: true
    }))
    .pipe(gulp.dest('compressed/OEBPS/common/js'))
    .pipe(livereload());
  });
  // OEBPS/common/css/
  watch('uncompressed/OEBPS/common/css/*.css', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(gulp.dest('compressed/OEBPS/common/css'))
    .pipe(livereload());
  });

  // OEBPS/js/
  watch('uncompressed/OEBPS/js/*.js', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(minify({
      ext: { min: '.js' },
      noSource: true
    }))
    .pipe(gulp.dest('compressed/OEBPS/js'))
    .pipe(livereload());
  });

  // OEBPS/whiteboard/js/
  watch('uncompressed/OEBPS/whiteboard/js/*.js', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(minify({
      ext: { min: '.js' },
      noSource: true
    }))
    .pipe(gulp.dest('compressed/OEBPS/whiteboard/js'))
    .pipe(livereload());
  });
  // OEBPS/whiteboard/css/
  watch('uncompressed/OEBPS/whiteboard/css/*.css', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(gulp.dest('compressed/OEBPS/whiteboard/css'))
    .pipe(livereload());
  });

  console.log('==================================');
  console.log('Minifying JS | CSS files.');
  console.log('==================================');

  /* Minifying + Watching Riot | JS | SCSS files */
  /*************************************/

  // watch('_src/tag/*.tag', (e) => {
  //   gulp.src(e.path)
  //   .pipe(riot({
  //     compact: true
  //   }))
  //   .pipe(minify({
  //     ext: {
  //       min: '.min.js'
  //     },
  //     noSource: true
  //   }))
  //   .pipe(gulp.dest('_assets/tag'));
  // });

  // watch(scssPathSource, (e) => {
  //   gulp.src(e.path)
  //   .pipe(plumber())
  //   .pipe(sass({
  //     outputStyle: 'compressed'
  //   }).on('error', sass.logError))
  //   .pipe(rename({
  //     suffix: ".min"
  //   }))
  //   .pipe(gulp.dest(scssPathDestination))
  //   .pipe(livereload());
  // });

  // watch(jsPathSource, (e) => {
  //   gulp.src(e.path)
  //   .pipe(plumber())
  //   .pipe(minify({
  //     ext: {
  //       min: '.min.js'
  //     },
  //     noSource: true
  //   }))
  //   .pipe(gulp.dest(jsPathDestination))
  //   .pipe(livereload());
  // });

  // console.log('==================================');
  // console.log('Minifying + Watching Riot | JS | SCSS files.');
  // console.log('==================================');

  cb();
});

// Say hello
// gulp.task('sayHello', function() {
//   console.log('==================================');
//   console.log("Hi, I'm always with you!");
//   console.log('==================================');
// });

// run -> gulp (for default tasks)
gulp.task('default', ['startWebServer', 'watch']);
