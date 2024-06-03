/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export class ObjectComparisonUtils {
  static shallowEqualObjects(objA: object, objB: object): boolean {
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
      if (objA[key as keyof Object] !== objB[key as keyof Object]) {
        return false;
      }
    }
    return true;
  }

  static deepEqualObjects(objA: object, objB: object): boolean {
    if (objA === objB) {
      return true; // if both objA and objB are null or undefined and exactly the same
    } else if (!(objA instanceof Object) || !(objB instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (objA.constructor !== objB.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      return this.compareObjectProperties(objA, objB);
    }
  }

  protected static compareObjectProperties(objA: object, objB: object) {
    for (const key in objA) {
      if (!objA.hasOwnProperty(key)) {
        continue; // other properties were tested using objA.constructor === y.constructor
      }
      if (!objB.hasOwnProperty(key)) {
        return false; // allows to compare objA[ key ] and objB[ key ] when set to undefined
      }
      if (objA[key as keyof Object] === objB[key as keyof Object]) {
        continue; // if they have the same strict value or identity then they are equal
      }
      if (typeof objA[key as keyof Object] !== 'object') {
        return false; // Numbers, Strings, Functions, Booleans must be strictly equal
      }
      if (
        !this.deepEqualObjects(
          objA[key as keyof Object],
          objB[key as keyof Object]
        )
      ) {
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

  static countOfDeepEqualObjects(obj: any, arr: Array<any>): number {
    return arr.reduce((acc, curr) => {
      if (this.deepEqualObjects(obj, curr)) {
        acc++;
      }
      return acc;
    }, 0);
  }

  static indexOfFirstOccurrence(obj: any, arr: Array<any>): number | undefined {
    for (let index = 0; index < arr.length; index++) {
      if (this.deepEqualObjects(arr[index], obj)) {
        return index;
      }
    }
  }
}

// CHECK SONAR
