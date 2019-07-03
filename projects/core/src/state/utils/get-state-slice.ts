import { deepMerge } from '../../config/utils/deep-merge';

const OBJECT_SEPARATOR = '.';

export function getStateSliceValue<T, E>(keys: string, state: T): E {
  return keys
    .split(OBJECT_SEPARATOR)
    .reduce(
      (previous, current) => (previous ? previous[current] : undefined),
      state
    );
}

export function createShellObject<T, E>(
  key: string,
  excludeKeys: string[],
  value: T
): E {
  if (!key || !value || Object.keys(value).length === 0) {
    return {} as E;
  }

  const keySplit = key.split(OBJECT_SEPARATOR);
  const newObject = {};
  let tempNewObject = newObject;

  for (let i = 0; i < keySplit.length; i++) {
    const currentKey = keySplit[i];
    // last iteration
    if (i === keySplit.length - 1) {
      const excludeResult = shouldExclude(key, excludeKeys);
      let finalValue = value;
      if (excludeResult.exclude) {
        finalValue = {
          ...value,
        };
        delete finalValue[excludeResult.excludeProperty];
      }
      tempNewObject = tempNewObject[currentKey] = finalValue;
    } else {
      tempNewObject = tempNewObject[currentKey] = {};
    }
  }

  return newObject as E;
}

export function getStateSlice<T, E>(
  keys: string[],
  excludeKeys: string[],
  state: T
): E {
  if (keys && keys.length === 0) {
    return {} as E;
  }

  let stateSlices = {};
  for (const currentKey of keys) {
    const stateValue = getStateSliceValue(currentKey, state);
    const shell = createShellObject(currentKey, excludeKeys, stateValue);
    stateSlices = deepMerge(stateSlices, shell);
  }

  return stateSlices as E;
}

export function shouldExclude(
  key: string,
  excludeKeys: string[]
): {
  exclude: boolean;
  excludeProperty: string;
} {
  if (!key || !excludeKeys) {
    return { exclude: false, excludeProperty: '' };
  }

  for (const exclusionKey of excludeKeys) {
    const { firstPart, lastPart } = splitExclusionKey(exclusionKey);
    if (key === firstPart) {
      return { exclude: true, excludeProperty: lastPart };
    }
  }

  return { exclude: false, excludeProperty: '' };
}

export function splitExclusionKey(
  exclusionKey: string
): { firstPart: string; lastPart: string } {
  if (!exclusionKey) {
    return {
      firstPart: '',
      lastPart: '',
    };
  }

  const lastDotIndex = exclusionKey.lastIndexOf(OBJECT_SEPARATOR);
  if (lastDotIndex === -1) {
    return {
      firstPart: '',
      lastPart: '',
    };
  }

  const firstPart = exclusionKey.substring(0, lastDotIndex);
  const lastPart = exclusionKey.substring(
    lastDotIndex + 1,
    exclusionKey.length
  );
  return {
    firstPart,
    lastPart,
  };
}
