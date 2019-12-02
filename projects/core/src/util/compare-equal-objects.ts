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

/*!
 * Find the differences between two objects and push to a new object
 * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
 */
export function diff<T, D>(objA: T, objB: D): Partial<T | D> {
  // Make sure an object to compare is provided
  if (!objB || Object.prototype.toString.call(objB) !== '[object Object]') {
    return objA;
  }
  const diffs = {};
  let key;
  /**
   * Check if two arrays are equal
   */
  function arraysMatch(arr1, arr2) {
    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;
  }

  /**
   * Compare two items and push non-matches to object
   */
  function compare(item1, item2, _key) {
    // Get the object type
    const type1 = Object.prototype.toString.call(item1);
    const type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
      diffs[_key] = null;
      return;
    }

    // If items are different types
    if (type1 !== type2) {
      diffs[_key] = item2;
      return;
    }

    // If an object, compare recursively
    if (type1 === '[object Object]') {
      const objDiff = diff(item1, item2);
      if (Object.keys(objDiff).length > 1) {
        diffs[_key] = objDiff;
      }
      return;
    }

    // If an array, compare
    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[_key] = item2;
      }
      return;
    }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[_key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[_key] = item2;
      }
    }
  }

  //
  // Compare our objects
  //

  // Loop through the first object
  for (key in objA) {
    if (objA.hasOwnProperty(key)) {
      compare(objA[key], objB[key], key);
    }
  }

  // Loop through the second object and find missing items
  for (key in objB) {
    if (objB.hasOwnProperty(key)) {
      if (!objA[key] && objA[key] !== objB[key]) {
        diffs[key] = objB[key];
      }
    }
  }

  // Return the object of differences
  return diffs;
}
