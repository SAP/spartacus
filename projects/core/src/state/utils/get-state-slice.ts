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

export function getStateSlice<T, E>(keys: string, state: T): E {
  const value = getStateSliceValue(keys, state);
  return createShellObject(keys, value);
}
