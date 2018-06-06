/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

gulp.task('default', function () {
  var config = {
    script: './bin/www',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules/**']
  };
  nodemon(config).on('restart', function () {
    console.log('Restarting');
  });
});
