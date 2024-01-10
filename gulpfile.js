/** Основной модуль Gulp */
import gulp from 'gulp';

/** Импорт путей */
import { path } from './gulp/config/path.js';

/** Импорт общих плагинов */
import { plugins } from './gulp/config/plugins.js';


/** Передаём значение в глобальную переменную*/
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins
}

//Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import {scss } from './gulp/tasks/scss.js';


const watcher = () => {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.scss, scss)
}

const mainTasks = gulp.parallel(copy, html, scss)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

//Выполнение сценария по умолчанию 
gulp.task('default', dev);