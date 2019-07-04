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
      // TODO:#3527 - check does it need to be deleted. This can also be moved in `xxx()`
      const finalValue = handleExclusions(key, excludeKeys, value);
      tempNewObject = tempNewObject[currentKey] = finalValue;
    } else {
      tempNewObject = tempNewObject[currentKey] = {};
    }
  }

  return newObject as E;
}

export function handleExclusions<T>(
  key: string,
  excludeKeys: string[],
  value: T
): T {
  const { exclude, exclusionKey } = shouldExclude(key, excludeKeys);
  if (!exclude) {
    return value;
  }

  const exclusionChunksSplit = exclusionKey
    .substring(key.length + 1, exclusionKey.length)
    .split(OBJECT_SEPARATOR);

  const finalValue = deepMerge({}, value);
  let nestedTemp = finalValue;
  for (let i = 0; i < exclusionChunksSplit.length; i++) {
    const currentChunk = exclusionChunksSplit[i];

    // last iteration
    if (i === exclusionChunksSplit.length - 1) {
      delete nestedTemp[currentChunk];
    } else {
      nestedTemp = nestedTemp[currentChunk];
      if (!nestedTemp || Object.keys(nestedTemp).length === 0) {
        return value;
      }
    }
  }

  return finalValue;
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
  exclusionKey: string;
} {
  if (!key || !excludeKeys) {
    return { exclude: false, exclusionKey: '' };
  }

  for (const exclusionKey of excludeKeys) {
    if (exclusionKey.includes(key)) {
      return { exclude: true, exclusionKey: exclusionKey };
    }
  }

  return { exclude: false, exclusionKey: '' };
}
