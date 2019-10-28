import { deepMerge } from '../../config/utils/deep-merge';

/**
 * Merge occ fields parameters
 *
 * @param fields Fields definition as string or object
 */
export function mergeFields(fields: (string | object)[]): string {
  const parsed = fields.map(f => (typeof f === 'string' ? parseFields(f) : f));

  const merged = optimizeFields(deepMerge({}, ...parsed));

  return stringifyFields(merged);
}

/**
 * Optimize fields definition by removing not needed groups
 *
 * @param def
 */
export function optimizeFields(def: any = {}) {
  const keys = Object.keys(def);
  if (keys.includes('FULL')) {
    delete def['DEFAULT'];
    delete def['BASIC'];
  } else if (keys.includes('DEFAULT')) {
    delete def['BASIC'];
  }
  keys.forEach(key => {
    def[key] = optimizeFields(def[key]);
  });
  return def;
}

/**
 * Parse sting field definition to an AST object
 *
 * @param fields
 * @param s
 */
export function parseFields(fields, s = 0): [any, number] | any {
  const res = {};

  let i = s;
  while (i < fields.length) {
    if (fields[i] === ',') {
      res[fields.substr(s, i - s)] = {};
      s = i + 1;
    } else if (fields[i] === '(') {
      const subFields = parseFields(fields, i + 1);
      if (Array.isArray(subFields)) {
        res[fields.substr(s, i - s)] = subFields[0];
        s = subFields[1] + 1;
        i = s + 1;
      } else {
        return res;
      }
    } else if (fields[i] === ')') {
      if (i > s) {
        res[fields.substr(s, i - s)] = {};
      }
      return [res, i + 1];
    }
    i++;
  }

  if (s < fields.length) {
    res[fields.substr(s, i - s)] = {};
  }

  return res;
}

/**
 * Convert AST object fields definition to string representation
 *
 * @param parsed
 */
export function stringifyFields(parsed: object): string {
  return Object.keys(parsed)
    .map(key => {
      const subFields = stringifyFields(parsed[key]);
      return subFields ? `${key}(${subFields})` : key;
    })
    .join(',');
}

/**
 * Extract part of the object described by fields definition
 *
 * @param data
 * @param fields
 */
export function extractFields(data, fields: string | object) {
  const parsed = typeof fields === 'string' ? parseFields(fields) : fields;
  console.log('EXTRACT', data, fields, getObjectPart(data, parsed));
  return getObjectPart(data, parsed);
}

/**
 *
 * @param object
 * @param parts
 */
function getObjectPart(object, parts) {
  const keys = Object.keys(parts);

  if (
    keys.length === 0 ||
    keys.find(el => el === 'BASIC' || el === 'DEFAULT' || el === 'FULL')
  ) {
    return object;
  }

  const result = {};

  keys.forEach(key => {
    result[key] = getObjectPart(object[key], parts[key]);
  });

  return result;
}
