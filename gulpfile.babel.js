import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
// import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
// import replace from "gulp-replace";
import named from 'vinyl-named';


const PRODUCTION = yargs.argv.prod;
const paths = {
  src: {
    style: 'src/scss',
    js: 'src/js',
    img: 'src/img',
  },
  dest: {
    style: 'dist/css',
    js: 'dist/js',
    img: 'dist/img',
  }
};

export const styles = () => {
  return src([
    paths.src.style + '/app.scss',
  ])
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
    .pipe(gulpif(PRODUCTION, cleanCss({ compatibility: 'ie8' })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.dest.style))
    .pipe(server.stream());
};


export const images = () => {
  return src(paths.src.img + '/**/*.{jpg,jpeg,png,svg,gif,ico}')
    // .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest(paths.dest.img));
};

export const scripts = () => {
  return src([
    paths.src.js + '/app.js'
  ])
    .pipe(named())
    .pipe(webpack({
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: []
              }
            }
          }
        ]
      },
      mode: PRODUCTION ? 'production' : 'development',
      devtool: !PRODUCTION ? 'inline-source-map' : false,
      output: {
        filename: '[name].js'
      },
    }))
    .pipe(dest(paths.dest.js));
};

export const copy = () => {
  return src([
    'src/**/*',
    '!src/{img,js,scss}',
    '!src/{img,js,scss}/**/*'])
    .pipe(dest('dist'));
}

export const watchForChange = () => {
  watch(paths.src.style + '/**/*.scss', styles);
  watch(paths.src.img + '/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
  watch(paths.src.js + '/**/*.js', series(scripts, reload));
  watch([
    'src/**/*',
    '!src/{img,js,scss}',
    '!src/{img,js,scss}/**/*'
  ], series(copy, reload));
  watch('index.html', reload);
};

export const clean = () => del(['dist']);

const server = browserSync.create();
export const serve = done => {
  server.init({
    proxy: "http://localhost/harmonica"
  });
  done();
};

export const reload = done => {
  server.reload();
  done();
};

// eventuellement ajouter pluginStyles
export const dev = series(clean, parallel(styles, images, copy, scripts), serve, watchForChange);
export const build = series(clean, parallel(styles, images, copy, scripts));
export default dev;