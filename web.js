import React from 'react';

class Dictionary {
  constructor(path) {
    this.path = path;
    this.data = {};

    this.translate = this.translate.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  static setLang (value) {
    Dictionary.lang = value;
  }

  initialize() {
    if (Array.isArray(this.path)) {
      this.path.forEach((item) => {
        const values = this.build(item);
        this.data = { ...this.data, ...values };
      });
    } else {
      this.data = this.build(this.path);
    }
  }

  build(p) {
    let currentLang = Dictionary.lang || navigator.language || navigator.userLanguage;
    if (
      currentLang !== 'en' &&
      currentLang !== 'fr' &&
      currentLang !== 'es' &&
      currentLang !== 'pt') {
      currentLang = 'en';
    }

    const langDefault = currentLang.slice(0, 2).toLowerCase();
    const data = require(`./${p}/${langDefault}/index.yaml`);
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

    const isTextFormated = text.indexOf('<b>') > -1;
    if (!isTextFormated) {
      return text;
    }
    return <span dangerouslySetInnerHTML={{__html: text }} />;
  }
}

module.exports = Dictionary;
