import gulp from 'gulp';
import { path } from './gulp/config/path.js';


//Передаём значение в глобальную переменную
global.app = {
  path: path,
  gulp: gulp
}

//Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';


const watcher = () => {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html)
}

const mainTasks = gulp.parallel(copy, html)

const dev = gulp.series(reset, mainTasks, watcher)

//Выполнение сценария по умолчанию 
gulp.task('default', dev);