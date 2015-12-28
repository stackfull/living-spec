'use strict';

const path = require('path');

module.exports = class Group {
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
};


