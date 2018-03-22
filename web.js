import React from 'react';

var Dictionary = function(path) {
  function initialize() {
    if (Array.isArray(path)) {
      path.forEach((item) => {
        const values = build(item);
        Dictionary.data = { ...Dictionary.data, ...values };
      });
    } else {
      Dictionary.data = build(path);
    }
  }

  function build(p) {
    const lang = Dictionary.lang;
    const currentLang = navigator.language || navigator.userLanguage;
    const langDefault = (currentLang || '').slice(0, 2).toLowerCase();

    const data = require(`./${p}/${lang || langDefault}/index.yaml`);
    return data;
  }

  this.translate = function translate(key, ...args) {
    if (!Dictionary.data[0]) {
      initialize();
    }

    let text = Dictionary.data[key] || key;
    args.forEach((item, index) => {
      text = text.replace(`$${index}$`,
      );
    });

    const isTextFormated = text.indexOf('<b>') > -1;
    if (!isTextFormated) {
      return text;
    }
    return <span dangerouslySetInnerHTML={{__html: text }} />;
  };

  this.path = path;
}

Dictionary.data = {};
Dictionary.setLang = function(lang) {
  this.lang = lang;
  this.data = {};
};

module.exports = Dictionary;
