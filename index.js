'use strict';

const 
    fs = require('fs'),
    path = require('path'),
    findit = require('findit'),
    ncp = require('ncp'),
    Handlebars = require('handlebars'),
    Gherkin = require('gherkin');

const
    rootDir = process.argv[2] || 'features',
    outDir = process.argv[3] || 'output', 
    title = "Specification",
    assetDir = 'static'; 

const parser = new Gherkin.Parser();

const templates = {
  toc: Handlebars.compile(fs.readFileSync('templates/toc.handlebars',
                                              {encoding:'utf8'})),
  feature: Handlebars.compile(fs.readFileSync('templates/feature.handlebars',
                                              {encoding:'utf8'}))
};


class Group {
  constructor(name, path) {
    this.name = name;
    this.path = name ? (path || []).concat(name) : [];
    this.groups = {};
    this.features = {};
  }
  addGroup(p) {
    var i = p.indexOf(path.sep);
    var name = i >=0 ? p.substring(0, i) : p;
    var g;
    if (name in this.groups) {
      g = this.groups[name];
    } else {
      g = this.groups[name] = new Group(name, this.path);
    }
    return i >= 0 ? g.addGroup(p.substring(i+1)) : g;
  }
  addFeature(p, info) {
    var i = p.lastIndexOf(path.sep);
    if (i >= 0) {
      var f = p.substring(i+1);
      this.addGroup(p.substring(0, i)).addFeature(f, info);
    } else {
      this.features[p] = info;
    }
  }
  templateData(id) {
    var groups = Object.keys(this.groups);
    groups.sort();
    return {
      name: this.name,
      path: this.path.join(' / '),
      id: this.path.join('-'),
      groups: groups.map((n, i) => this.groups[n].templateData(id + '-g' + i)),
      features: Object.keys(this.features)
                    .sort()
                    .map((n, i) => {
                      var f = this.features[n];
                      f.id = id + '-f' + i;
                      return f;
                    })
    };
  } 
}

const toc = new Group('');

function convertFeature(src, dst) {
  const data = fs.readFileSync(src, {encoding:'utf8'});
  const parsed = parser.parse(data);
  Handlebars.registerHelper('asset', function(p) {
    return path.join(path.relative(src, path.resolve(rootDir)), 'static', p);
  });

  const html = templates.feature(parsed);
  fs.writeFile(dst+'.html', html);

  toc.addFeature(path.relative(rootDir, src), parsed);
}

function convert(src, dst) {
  const ext = path.extname(src);
  switch (path.extname(src)) {
      case '.feature':
          convertFeature(src, dst);
          break;
      case '.md':
          console.log('TODO: add markdown descriptions');
          break;
  }
}

const finder = findit(rootDir);

finder.on('directory', function(dir, stat, stop) {
  const rel = path.relative(path.resolve(rootDir), path.resolve(dir));
  const out = path.join(outDir, rel);
  console.log("directory %s = '%s'", dir, rel);
  try {
    fs.mkdirSync(out);
  } catch(e) { } 
  if (rel) {
    toc.addGroup(rel);
  }
});

finder.on('file', function(file, stat) {
  const rel = path.relative(path.resolve(rootDir), path.resolve(file));
  const out = path.join(outDir, rel);
  convert(file, out);
});

finder.on('end', function() {
  console.log('END');
  Handlebars.registerHelper('asset', function(p) {
    return path.join('static', p);
  });
  const tpl = toc.templateData('feature');
  tpl.title = title;
  tpl.date = new Date().toDateString();
  const html = templates.toc(tpl);
  fs.writeFile(path.join(outDir, 'single-page.html'), html);
});

ncp(assetDir, path.join(outDir, 'static'));

