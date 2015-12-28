'use strict';

const fs = require('fs');
const path = require('path');
const findit = require('findit');
const Gherkin = require('gherkin');
const Group = require('./group');

module.exports = function (rootDir, processToc) {

  let finder = findit(rootDir),
      toc = new Group(''),
      parser = new Gherkin.Parser();

  function relative(p) {
    return path.relative(path.resolve(rootDir), path.resolve(p));
  }

  finder.on('directory', function(dir, stat, stop) {
    const rel = relative(dir);
    //console.log("directory %s = '%s'", dir, rel);
    if (rel) {
      toc.addGroup(rel);
    }
  });

  finder.on('file', function(file, stat) {
    const rel = relative(file);
    const ext = path.extname(file);
    const data = fs.readFileSync(file, {encoding:'utf8'});
    switch (ext) {
        case '.feature':
            const parsed = parser.parse(data);
            toc.addFeature(rel, parsed);
            break;
        case '.md':
            console.log('TODO: add markdown descriptions');
            break;
    }
  });

  finder.on('end', function() {
    //console.log('END');
    processToc(null, toc);
  });

  finder.on('error', processToc);
};

