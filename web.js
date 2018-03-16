var Dictionary = function(paths) {
  var dictionary = {};
  this.initialize = function(paths) {
    if (Array.isArray(paths)) {
      paths.forEach((item) => {
        var values = this.build(item);
        Object.keys(values).forEach((key) => {
          dictionary[key] = values[key];
        })
      });
    } else {
      dictionary = this.build(paths, Dictionary.lang);
    }
  };

  this.build = function(type) {
    const currentLang = navigator.language || navigator.userLanguage;
    const langDefault = (currentLang || '').slice(0, 2).toLowerCase();
    const data = require(`./${type}/${Dictionary.lang || langDefault}/index.yaml`);
    return data;
  };

  this.translate = function(key, ...args) {
    let text = dictionary[key] || key;
    args.forEach((item, index) => {
      text = text.replace(`$${index}$`, item);
    });

    return text;
  };

  this.initialize(paths);
}

Dictionary.setLang = function(lang) {
  this.lang = lang;
};

module.exports = Dictionary;
