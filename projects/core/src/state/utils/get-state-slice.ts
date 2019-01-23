export function getStateSlice(state: any, keys: object): any {
  return Object.keys(keys).reduce((acc, key) => {
    const keyValue = keys[key];
    if (state.hasOwnProperty(key)) {
      if (typeof keyValue === 'object') {
        acc[key] = getStateSlice(state[key], keyValue);
      } else if (keyValue) {
        acc[key] = state[key];
      }
    }
    return acc;
  }, {});
}
