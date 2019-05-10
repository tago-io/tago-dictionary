var staticImports = null;

function loadStaticImports() {
  staticImports = {
    "./admin/screens/account/edit/en": require("./admin/screens/account/edit/en"),
    "./admin/screens/account/edit/pt": require("./admin/screens/account/edit/pt"),
    "./admin/screens/account/edit/fr": require("./admin/screens/account/edit/fr"),
    "./admin/screens/account/edit/es": require("./admin/screens/account/edit/es"),

    "./admin/screens/dashboard/edit/en": require("./admin/screens/dashboard/edit/en"),
    "./admin/screens/dashboard/edit/pt": require("./admin/screens/dashboard/edit/pt"),
    "./admin/screens/dashboard/edit/fr": require("./admin/screens/dashboard/edit/fr"),
    "./admin/screens/dashboard/edit/es": require("./admin/screens/dashboard/edit/es"),

    "./admin/screens/dashboard/info/en": require("./admin/screens/dashboard/info/en"),
    "./admin/screens/dashboard/info/pt": require("./admin/screens/dashboard/info/pt"),
    "./admin/screens/dashboard/info/fr": require("./admin/screens/dashboard/info/fr"),
    "./admin/screens/dashboard/info/es": require("./admin/screens/dashboard/info/es"),

    "./admin/screens/dashboard/list/en": require("./admin/screens/dashboard/list/en"),
    "./admin/screens/dashboard/list/pt": require("./admin/screens/dashboard/list/pt"),
    "./admin/screens/dashboard/list/fr": require("./admin/screens/dashboard/list/fr"),
    "./admin/screens/dashboard/list/es": require("./admin/screens/dashboard/list/es"),

    "./admin/screens/explore/info/en": require("./admin/screens/explore/info/en"),
    "./admin/screens/explore/info/pt": require("./admin/screens/explore/info/pt"),
    "./admin/screens/explore/info/fr": require("./admin/screens/explore/info/fr"),
    "./admin/screens/explore/info/es": require("./admin/screens/explore/info/es"),

    "./admin/screens/signup/en": require("./admin/screens/signup/en"),
    "./admin/screens/signup/pt": require("./admin/screens/signup/pt"),
    "./admin/screens/signup/fr": require("./admin/screens/signup/fr"),
    "./admin/screens/signup/es": require("./admin/screens/signup/es"),

    "./admin/pages/admin/en": require("./admin/pages/admin/en"),
    "./admin/pages/admin/pt": require("./admin/pages/admin/pt"),
    "./admin/pages/admin/fr": require("./admin/pages/admin/fr"),
    "./admin/pages/admin/es": require("./admin/pages/admin/es"),

    "./admin/pages/authentication/en": require("./admin/pages/authentication/en"),
    "./admin/pages/authentication/pt": require("./admin/pages/authentication/pt"),
    "./admin/pages/authentication/fr": require("./admin/pages/authentication/fr"),
    "./admin/pages/authentication/es": require("./admin/pages/authentication/es"),

    "./admin/pages/confirm/en": require("./admin/pages/confirm/en"),
    "./admin/pages/confirm/pt": require("./admin/pages/confirm/pt"),
    "./admin/pages/confirm/fr": require("./admin/pages/confirm/fr"),
    "./admin/pages/confirm/es": require("./admin/pages/confirm/es"),

    "./admin/pages/public/en": require("./admin/pages/public/en"),
    "./admin/pages/public/pt": require("./admin/pages/public/pt"),
    "./admin/pages/public/fr": require("./admin/pages/public/fr"),
    "./admin/pages/public/es": require("./admin/pages/public/es"),

    "./commons/en": require("./commons/en"),
    "./commons/pt": require("./commons/pt"),
    "./commons/fr": require("./commons/fr"),
    "./commons/es": require("./commons/es"),
  }
}

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
    const pathImport = './' + p + '/' + langDefault + '/index';
    if (Dictionary.useStaticImport) {
      if (staticImports === null) {
        loadStaticImports();
      }
      return staticImports['./' + p + '/' + langDefault];
    } else {
      const data = require(pathImport + '.js');
      return data;
    }
    return {};
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
Dictionary.useStaticImport = false;

if (!module) {
  module = {};
}

module.exports = Dictionary;
