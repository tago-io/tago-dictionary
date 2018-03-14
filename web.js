function build(type, lang) {
  const currentLang = navigator.language || navigator.userLanguage;
  const langDefault = (currentLang || '').slice(0, 2).toLowerCase();
  const data = require(`./${type}/${lang || langDefault}/index.yaml`);
  return data;
}

function Dictionary(type, lang) {
  let dictionary = {};
  if (Array.isArray(type)) {
    type.forEach((item) => {
      dictionary = { ...dictionary, ...build(item, lang) };
    });
  } else {
    dictionary = build(type, lang);
  }

  return (key, ...args) => {
    let text = dictionary[key] || key;
    args.forEach((item, index) => {
      text = text.replace(`$${index}$`, item);
    });

    return text;
  };
}

export default Dictionary;
