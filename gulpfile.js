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


const watcher = () => {
  gulp.watch(path.watch.files, copy)
}

const dev = gulp.series(reset, copy, watcher)

//Выполнение сценария по умолчанию 
gulp.task('default', dev);