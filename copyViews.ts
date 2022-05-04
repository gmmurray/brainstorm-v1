import fs from 'fs-extra';

fs.copy('./src/views', './build/views', function (err: object) {
  if (err) return console.error(err);
});
