var through = require('through2'),
    CSSUnit = require('css-unit');
    // gutil = require('gulp-util'),
    // PluginError = gutil.PluginError;


GulpCSSUnit = function(opts) {
  this.options = opts;
  this.css_unit = new CSSUnit(opts);
}

GulpCSSUnit.prototype.reference = function() {
  var cssUnitInst = this.css_unit;

  function referenceOneFile(file, enc, callback) {
    if (file.isNull()) { return callback(null, file); }
    if (file.isStream()) { return callback(new PluginError('gulp-css-unit', 'Streaming not supported')); }

    cssUnitInst.reference(file).then(function() {
      callback(null, file);
    });
  }
  return through.obj(referenceOneFile);
}

GulpCSSUnit.prototype.test = function() {
  var cssUnitInst = this.css_unit;

  function testOneFile(file, enc, callback) {
    if (file.isNull()) { return callback(null, file); }
    if (file.isStream()) { return callback(new PluginError('gulp-css-unit', 'Streaming not supported')); }

    cssUnitInst.test(file)
    .then(
      function successHandler() {
        callback(null, file);
      },
      function errorHandler(reason) {
        console.error('FAILED: ' + file.relative + '\n' + reason);
        callback(null, file);
      }
    );
  }
  return through.obj(testOneFile);
}

module.exports = GulpCSSUnit;
