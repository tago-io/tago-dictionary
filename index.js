const currentLang = navigator.language || navigator.userLanguage;
const lang = (currentLang || '').slice(0, 2).toLowerCase();

let dictionary = {};
import(`./commons/${lang}/index.yaml`).then((data) => {
  dictionary = data;
});

function t(param, ...args) {
  let text = dictionary[param] || param;

  args.forEach((item, index) => {
    text = text.replace(`$${index}$`, item);
  });

  return text;
}

export { t };
