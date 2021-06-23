import { deepMerge } from '../../config/utils/deep-merge';
import { StateTransferType, StorageSyncType } from '../config/state-config';

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

  const shell = key.split(OBJECT_SEPARATOR).reduceRight((acc, previous) => {
    return { [previous]: acc } as unknown as T;
  }, value);
  return handleExclusions(key, excludeKeys, shell);
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

export function filterKeysByType(
  keys: { [key: string]: StorageSyncType | StateTransferType },
  type: StorageSyncType | StateTransferType
): string[] {
  if (!keys) {
    return [];
  }
  return Object.keys(keys).filter((key) => keys[key] === type);
}
