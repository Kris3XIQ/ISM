// Initialize modules
const { src, dest, watch, series, task } = require('gulp');
const phpConnect = require('gulp-connect-php');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const GulpPostCss = require('gulp-postcss');
const browserSync = require('browser-sync');

// Sass Task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Javascript Task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync
// function browserSyncServe(cb) {
//     browsersync.init({
//         server: {
//             baseDir: '.',
//         },
//         notify: {
//             styles: {
//                 top: 'auto',
//                 bottom: '0',
//             },
//         },
//     });
//     cb();
// }

function browserSyncReLoad(cb) {
    browserSync.reload();
    cb();
}

// Server Task
function serverTask() {
    phpConnect.server({}, function (){
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });
    //  watch('*.php').on('change', function () {
    //     browserSync.reload();
    // });
    // watch(
    //     ['app/scss/**/*.scss','app/**/*.js', '*.php'],
    //     series(scssTask, jsTask, browserSyncReLoad)
    // );
    watchTask();
};

//Watch Task
function watchTask() {
    //watch('*.html', browserSyncReLoad);
    // watch('*.php', browserSyncReLoad);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js', 'app/html/**/*.php', '*.php'],
        series(scssTask, jsTask, browserSyncReLoad)
    );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, serverTask, watchTask);