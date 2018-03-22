import React from 'react';

class Dictionary {
  constructor(path) {
    this.path = path;
    this.data = {};

    this.translate = this.translate.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  static setLang = (lang) => {
    Dictionary.lang = lang;
  };

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
    const currentLang = navigator.language || navigator.userLanguage;
    const langDefault = (currentLang || '').slice(0, 2).toLowerCase();
    const data = require(`./${p}/${Dictionary.lang || langDefault}/index.yaml`);
    return data;
  }

  translate(key, ...args) {
    if (!Object.keys(this.data).length) {
      this.initialize();
    }

    let text = this.data[key] || key;
    args.forEach((item, index) => {
      text = text.replace(`$${index}$`,
      );
    });

    const isTextFormated = text.indexOf('<b>') > -1;
    if (!isTextFormated) {
      return text;
    }
    return <span dangerouslySetInnerHTML={{__html: text }} />;
  }
}

module.exports = Dictionary;
