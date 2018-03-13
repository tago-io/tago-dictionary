const currentLang = navigator.language || navigator.userLanguage;
const lang = (currentLang || '').slice(0, 2).toLowerCase();

import(`./commons/${lang}/index.yaml`).then((dictionary) => (
  this.dictionary = dictionary
));

function t(param, ...args) {
  let text = this.dictionary[param] || param;

  args.forEach((item, index) => {
    text = text.replace(`$${index}$`, item);
  });

  return text;
}

export { t };
