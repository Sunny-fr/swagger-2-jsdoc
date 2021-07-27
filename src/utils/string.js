/**
 *  Turns a string into slug style string
 * @param {string} str
 * @param {string} [separator="-"]
 * @return {string} slug
 */
function slugify (str = '',separator = "-") {
  return str
    .normalize('NFD')                   // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
}

/**
 * capitalize a sentence string
 * @param {string} str
 * @param {string} [separator=" "]
 * @return {string} sentence string
 */
function capitalize(str="", separator = " ") {
  return str.split(separator).map(s => {
    return `${s[0].toUpperCase()}${s.slice(1)}`
  }).join(separator)
}

module.exports = {
  slugify,
  capitalize
}