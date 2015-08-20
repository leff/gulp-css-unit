var through = require('through2'),
    cssUnit = require('../css-unit');
    // gutil = require('gulp-util'),
    // PluginError = gutil.PluginError;


CSSUnit = function() {

}

CSSUnit.prototype.reference = function() {
  function referenceOneFile(file, enc, callback) {
    if (file.isNull()) { return callback(null, file); }
    if (file.isStream()) { return callback(new PluginError('gulp-css-unit', 'Streaming not supported')); }

    cssUnit.reference(file);

    callback(null, file);
  }

  return through.obj(referenceOneFile);
}

CSSUnit.prototype.test = function() {
  function testOneFile(file, enc, callback) {
    if (file.isNull()) { return callback(null, file); }
    if (file.isStream()) { return callback(new PluginError('gulp-css-unit', 'Streaming not supported')); }

    cssUnit.test(file);

    callback(null, file);
  }

  return through.obj(testOneFile);
}

var inst = new CSSUnit();
module.exports = inst;
