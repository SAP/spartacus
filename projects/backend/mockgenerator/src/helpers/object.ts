/**
 * Function flats object structure into one level object.
 *
 * @param {Object} obj Object to flat.
 * @returns {Object} Flatten object.
 */
export function flatObject(obj: Object) {
  let data = {};

  for (const i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] === 'object' && obj[i].constructor === Object) {
      let flattenObject = this.flatObject(obj[i]);
      for (const x in flattenObject) {
        if (!flattenObject.hasOwnProperty(x)) continue;
        data[i + '.' + x] = flattenObject[x];
      }
    } else {
      data[i] = obj[i];
    }
  }

  return data;
}