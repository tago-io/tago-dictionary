class Dictionary {
  constructor(path) {
    this.path = path;
    this.data = {};

    this.translate = this.translate.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  static setLang(value) {
    let language = value;
    if (value !== 'en' && value !== 'fr' && value !== 'es' && value !== 'pt') {
      language = 'en';
    }

    Dictionary.lang = language;
  }

  initialize() {
    if (Array.isArray(this.path)) {
      this.path.forEach((item) => {
        const values = this.build(item);
        this.data = Object.assign({}, this.data, values);
      });
    } else {
      this.data = this.build(this.path);
    }
  }

  build(p) {
    const currentLang = navigator.language || navigator.userLanguage;
    const langDefault = (currentLang || '').slice(0, 2).toLowerCase();
    const data = require(`./${p}/${Dictionary.lang || langDefault}/index.js`);
    return data;
  }

  translate(key, ...args) {
    if (!Object.keys(this.data).length) {
      this.initialize();
    }

    let text = this.data[key] || key;
    args.forEach((item, index) => {
      text = text.replace(`$${index}$`, item);
    });

    return text;
  }
}

module.exports = Dictionary;
