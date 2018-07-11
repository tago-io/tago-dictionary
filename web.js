function Dictionary (path) {
  this.path = path;
  this.data = {};

  /*

  this.translate = this.translate.bind(this);
  this.initialize = this.initialize.bind(this);

  this.initialize = function() {
    if (Array.isArray(this.path)) {
      this.path.forEach((item) => {
        const values = this.build(item);
        this.data = Object.assign({}, this.data, values);
      });
    } else {
      this.data = this.build(this.path);
    }
  }

    this.build = function(p) {
    let currentLang = Dictionary.lang || navigator.language || navigator.userLanguage;
    if (
      currentLang !== 'en' &&
      currentLang !== 'fr' &&
      currentLang !== 'es' &&
      currentLang !== 'pt') {
      currentLang = 'en';
    }

    const langDefault = currentLang.slice(0, 2).toLowerCase();
    const data = require(`./${p}/${langDefault}/index`);
    return data;
  }

  this.translate = function(key, ...args) {
    if (!Object.keys(this.data).length) {
      this.initialize();
    }

    let text = this.data[key] || key;
    args.forEach((item, index) => {
      text = text.replace(`$${index}$`, item);
    });

    return text;
  }
  */
}

Dictionary.setLang = function(value) {
  Dictionary.lang = value;
}

module.exports = Dictionary;
