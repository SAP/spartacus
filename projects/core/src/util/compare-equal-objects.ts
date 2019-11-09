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
    return true; // if both objA and objB are null or undefined and exactly the same
  } else if (!(objA instanceof Object) || !(objB instanceof Object)) {
    return false; // if they are not strictly equal, they both need to be Objects
  } else if (objA.constructor !== objB.constructor) {
    // they must have the exact same prototype chain, the closest we can do is
    // test their constructor.
    return false;
  } else {
    for (const key in objA) {
      if (!objA.hasOwnProperty(key)) {
        continue; // other properties were tested using objA.constructor === y.constructor
      }
      if (!objB.hasOwnProperty(key)) {
        return false; // allows to compare objA[ key ] and objB[ key ] when set to undefined
      }
      if (objA[key] === objB[key]) {
        continue; // if they have the same strict value or identity then they are equal
      }
      if (typeof objA[key] !== 'object') {
        return false; // Numbers, Strings, Functions, Booleans must be strictly equal
      }
      if (!deepEqualObjects(objA[key], objB[key])) {
        return false;
      }
    }
    for (const key in objB) {
      if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}

export function countOfDeepEqualObjects(obj: any, arr: Array<any>): number {
  return arr.reduce((acc, curr) => {
    if (deepEqualObjects(obj, curr)) {
      acc++;
    }
    return acc;
  }, 0);
}

export function indexOfFirstOccurrence(
  obj: any,
  arr: Array<any>
): number | undefined {
  for (let index = 0; index < arr.length; index++) {
    if (deepEqualObjects(arr[index], obj)) {
      return index;
    }
  }
}
