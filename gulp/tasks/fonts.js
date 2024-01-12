import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: 'FONTS',
      message: "Error: <%= error.message %>"
    }))
  )
  .pipe(fonter({
    formats: ['ttf']
  }))
  .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}


export const ttfToWoff = () => {
  //Ищем файлы шрифтов .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: 'FONTS',
      message: "Error: <%= error.message %>"
    }))
  )
  .pipe(fonter({
    formats: ['woff']
  }))
  //Выгружаем в папку с результатом
  .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  //Ищем файлы шрифтов .ttf
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
  //Конвертируем в .woff2
  .pipe(ttf2woff2())
  //Выгружаем в папку с результатом
  //.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff`))
  .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if(fontsFiles) {
      if(!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for(let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0]
          if(newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
            if(fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
              newFileOnly = fontFileName
            }
          }
        }else {
          console.log("Файл стилей уже сущемтввует")
        }
      }
    })

    return app.gulp.src(`${app.path.srcFolder}`)
    function cb() {}
  }