import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';
// import bootstrap from 'bootstrap'


export const plugins = { replace, plumber, notify, browsersync, newer, ifPlugin};