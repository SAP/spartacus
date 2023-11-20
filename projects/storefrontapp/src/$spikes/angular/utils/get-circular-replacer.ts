/* eslint-disable jsdoc/check-alignment */
/**
 * @example
    const obj = {};
    obj.a = { b: obj }; // Circular reference

    const jsonString = JSON.stringify(obj, getCircularReplacer());
    console.log(jsonString); // {"a":{"b":"[Circular]"}}
 */
export function getCircularReplacer() {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        // Replace with some custom value or remove by returning undefined
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  };
}
