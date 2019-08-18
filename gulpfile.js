const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-rm');
const uglify = require('gulp-terser');
const minify = require('gulp-clean-css');
const rsync = require('gulp-rsync');

const distDir = '../ahmeda'

/////////////// Development Subtasks ///////////////
gulp.task('serve',()=>{
  browserSync.init({ server: './src' });
  gulp.watch('./src/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('./src/**/*.{html,js}').on('change', browserSync.reload);
});

gulp.task('sass',()=>{
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream())
});

/////////////// Build Subtasks ///////////////
gulp.task('clean', () => {
  return gulp.src(`${distDir}/**/*`)
    .pipe(clean());
});

gulp.task('copy', () => {
  return gulp.src('./src/{**/*.{html,php},assets/**/*,img/**/*}')
    .pipe(gulp.dest(`${distDir}/`))
});

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(`${distDir}/js/`))
});

gulp.task('buildSass', () => {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/css'))
});

gulp.task('css', gulp.series('buildSass',()=>{
  return gulp.src('./src/css/**/*.css')
    .pipe(minify())
    .pipe(gulp.dest(`${distDir}/css/`))
}));

/////////////// Main Tasks ///////////////
gulp.task('default', gulp.series('sass', 'serve'));

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('copy', 'js', 'css')
));

gulp.task('serveBuild', gulp.series('build',()=>{
  browserSync.init({
    server: `${distDir}`,
    port: 3030
  });
}));

// gulp.task('deploy', gulp.series('build', () => {
//   const fs = require('fs');
//   const webhost = JSON.parse(fs.readFileSync('./webhost-config.json'));
//   const webhostDir = '~/public_html/ahmeda/';
//   const updateOnly = process.argv.indexOf('--all') === -1;
//   return gulp.src(`${distDir}/`)
//     .pipe(rsync({
//       hostname: webhost.address,
//       username: webhost.username,
//       destination: webhostDir,
//       port: webhost.port,
//       clean: true,
//       compress: true,
//       recursive: true,
//       root: 'dist',
//       silent: false,
//       update: updateOnly
//     }))
// }));