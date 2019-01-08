function Dictionary(path, langs) {
  if (!langs) {
    langs = ['en', 'fr', 'pt', 'es'];
  }

  var data = {};
  var self = this;

  this.initialize = function () {
    if (Array.isArray(path)) {
      for (var i = 0; i < path.length; i++) {
        const values = self.build(path[i]);
        data = Object.assign({}, data, values);
      }
    } else {
      data = self.build(path);
    }
  }

  this.build = function (p) {
    var currentLang = Dictionary.lang || navigator.language || navigator.userLanguage;
    currentLang = String(currentLang).slice(0, 2);

    if (!langs.includes(currentLang)) {
      currentLang = 'en'
    }

    const langDefault = currentLang.slice(0, 2).toLowerCase();
    const data = require('./' + p + '/' + langDefault + '/index');
    return data;
  }

  this.getData = function() {
    return data;
  }

  this.translate = function (key, args) {
    if (!Object.keys(data).length) {
      self.initialize();
    }

    var text = data[key] || key;
    for (var i = 0; i < (args || []).length; i++) {
      var kv = '$' + i;
      text = text.replace(kv, args[i]);
    }

    return text;
  }
}

Dictionary.setLang = function (value) {
  Dictionary.lang = value;
};

if (!module) {
  module = {};
}

module.exports = Dictionary;
