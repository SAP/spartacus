import { B2BSearchConfig } from '../model/search-config';

// TODO after update typescript to 3.7 it can be replaced by Nullish Coalescing (??) operator
function nullish(param, defaultValue) {
  return param !== null && param !== undefined ? param : defaultValue;
}

export function serializeBudgetSearchConfig(config: B2BSearchConfig) {
  return `pageSize=${nullish(config.pageSize, '')}&currentPage=${nullish(
    config.currentPage,
    ''
  )}&sort=${nullish(config.sort, '')}`;
}
