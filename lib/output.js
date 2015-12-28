'use strict';

const 
    fs = require('fs'),
    path = require('path'),
    ncp = require('ncp'),
    Handlebars = require('handlebars');


module.exports.writeSingleFile = function (dst, toc, tplFile, cb) {
  fs.readFile(tplFile, {encoding:'utf8'}, (err, data) => {
    let tpl = Handlebars.compile(data);
    Handlebars.registerHelper('asset', function(p) {
      return path.join('static', p);
    });
    let html = tpl(toc);
    Handlebars.unregisterHelper('asset');
    fs.writeFile(dst, html, cb);
  });
};

module.exports.writeTheme = function (dstDir, themeDir, cb) {
  try {
    fs.mkdirSync(dstDir);
  } catch(e) { } 
  ncp(themeDir, dstDir);
  cb(null);
};
