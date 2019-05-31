export function shallowEqualObjects(objA: object, objB: object): boolean {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const aKeysLen = aKeys.length;
  const bKeysLen = bKeys.length;

  if (aKeysLen !== bKeysLen) {
    return false;
  }
  for (let i = 0; i < aKeysLen; i++) {
    const key = aKeys[i];
    if (objA[key] !== objB[key]) {
      return false;
    }
  }
  return true;
}

export function deepEqualObjects(objA: object, objB: object): boolean {
  if (objA === objB) {
    return true; // if both objA and y are null or undefined and eobjAactly the same
  } else if (!(objA instanceof Object) || !(objB instanceof Object)) {
    return false; // if they are not strictly equal, they both need to be Objects
  } else if (objA.constructor !== objB.constructor) {
    // they must have the eobjAact same prototype chain, the closest we can do is
    // test their constructor.
    return false;
  } else {
    for (const p in objA) {
      if (!objA.hasOwnProperty(p)) {
        continue; // other properties were tested using objA.constructor === y.constructor
      }
      if (!objB.hasOwnProperty(p)) {
        return false; // allows to compare objA[ p ] and y[ p ] when set to undefined
      }
      if (objA[p] === objB[p]) {
        continue; // if they have the same strict value or identity then they are equal
      }
      if (typeof objA[p] !== 'object') {
        return false; // Numbers, Strings, Functions, Booleans must be strictly equal
      }
      if (!deepEqualObjects(objA[p], objB[p])) {
        return false;
      }
    }
    for (const p in objB) {
      if (objB.hasOwnProperty(p) && !objA.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  }
}
