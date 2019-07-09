import { deepMerge } from '../../config/utils/deep-merge';

const OBJECT_SEPARATOR = '.';

export function getStateSliceValue(keys: string, state: any): any {
  return keys
    .split(OBJECT_SEPARATOR)
    .reduce(
      (previous, current) => (previous ? previous[current] : undefined),
      state
    );
}

export function createShellObject(
  key: string,
  excludeKeys: string[],
  value: any
): any {
  if (!key || !value || Object.keys(value).length === 0) {
    return {};
  }

  const shell = key.split(OBJECT_SEPARATOR).reduceRight((acc, previous) => {
    return { [previous]: acc };
  }, value);
  return handleExclusions(key, excludeKeys, shell);
}

export function getStateSlice(
  keys: string[],
  excludeKeys: string[],
  state: any
): any {
  if (keys && keys.length === 0) {
    return {};
  }

  let stateSlices = {};
  for (const currentKey of keys) {
    const stateValue = getStateSliceValue(currentKey, state);
    const shell = createShellObject(currentKey, excludeKeys, stateValue);
    stateSlices = deepMerge(stateSlices, shell);
  }

  return stateSlices;
}

export function handleExclusions(
  key: string,
  excludeKeys: string[],
  value: any
): any {
  const exclusionKeys = getExclusionKeys(key, excludeKeys);
  if (exclusionKeys.length === 0) {
    return value;
  }

  const finalValue = deepMerge({}, value);
  for (const currentExclusionKey of exclusionKeys) {
    const exclusionChunksSplit = currentExclusionKey.split(OBJECT_SEPARATOR);

    let nestedTemp = finalValue;
    for (let i = 0; i < exclusionChunksSplit.length; i++) {
      const currentChunk = exclusionChunksSplit[i];

      // last iteration
      if (i === exclusionChunksSplit.length - 1) {
        if (nestedTemp && nestedTemp[currentChunk]) {
          delete nestedTemp[currentChunk];
        }
      } else {
        nestedTemp = nestedTemp[currentChunk];
      }
    }
  }

  return finalValue;
}

export function getExclusionKeys(key: string, excludeKeys: string[]): string[] {
  if (!key || !excludeKeys) {
    return [];
  }

  const exclusionKeys: string[] = [];
  for (const exclusionKey of excludeKeys) {
    if (exclusionKey.includes(key)) {
      exclusionKeys.push(exclusionKey);
    }
  }

  return exclusionKeys;
}
