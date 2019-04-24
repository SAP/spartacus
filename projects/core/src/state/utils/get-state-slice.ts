import { deepMerge } from '../../config/utils/deep-merge';

export function getStateSliceValue<T, E>(keys: string, state: T): E {
  return keys
    .split('.')
    .reduce(
      (previous, current) => (previous ? previous[current] : undefined),
      state
    );
}

export function createShellObject<T, E>(key: string, value: T): E {
  if (!key || !value || Object.keys(value).length === 0) {
    return {} as E;
  }

  const keySplit = key.split('.');
  const newObject = {};
  let tempNewObject = newObject;

  for (let i = 0; i < keySplit.length; i++) {
    const currentKey = keySplit[i];
    // last iteration
    if (i === keySplit.length - 1) {
      tempNewObject = tempNewObject[currentKey] = value;
    } else {
      tempNewObject = tempNewObject[currentKey] = {};
    }
  }

  return newObject as E;
}

export function getStateSlice<T, E>(keys: string[], state: T): E {
  if (keys && keys.length === 0) {
    return {} as E;
  }

  let stateSlices = {};
  for (const currentKey of keys) {
    const stateValue = getStateSliceValue(currentKey, state);
    const shell = createShellObject(currentKey, stateValue);
    stateSlices = deepMerge(stateSlices, shell);
  }

  return stateSlices as E;
}
