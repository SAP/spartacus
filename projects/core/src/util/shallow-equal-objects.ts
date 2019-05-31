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
