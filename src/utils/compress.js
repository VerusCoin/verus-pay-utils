module.exports = {
  compress: function (s) {
    if (!s) return s;
    let dict = new Map();

    let cur;
    let out = [];
    let data = (s + "").split("");
    let phrase = data[0];
    let code = 256;

    for (let i = 1; i < data.length; i++) {
      cur = data[i];

      if (dict.has(phrase + cur)) {
        phrase += cur;
      } else {
        out.push(phrase.length > 1 ? dict.get(phrase) : phrase.codePointAt(0));
        dict.set(phrase + cur, code);
        code++;

        if (code === 0xd800) {
          code = 0xe000;
        }

        phrase = cur;
      }
    }

    out.push(phrase.length > 1 ? dict.get(phrase) : phrase.codePointAt(0));

    for (let i = 0; i < out.length; i++) {
      out[i] = String.fromCodePoint(out[i]);
    }

    return out.join("");
  },

  decompress: function (s) {
    let dict = new Map();

    let data = Array.from(s + "");
    let cur = data[0];
    let oldPhrase = cur;
    let out = [cur];
    let code = 256;
    let phrase;

    for (let i = 1; i < data.length; i++) {
      let currCode = data[i].codePointAt(0);

      if (currCode < 256) {
        phrase = data[i];
      } else {
        phrase = dict.has(currCode) ? dict.get(currCode) : oldPhrase + cur;
      }

      out.push(phrase);
      let cp = phrase.codePointAt(0);
      cur = String.fromCodePoint(cp);
      dict.set(code, oldPhrase + cur);
      code++;

      if (code === 0xd800) {
        code = 0xe000;
      }

      oldPhrase = phrase;
    }

    return out.join("");
  }
};