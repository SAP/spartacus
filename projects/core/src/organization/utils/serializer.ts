import { B2BSearchConfig } from '../model/search-config';

import { entityStateSelector } from '../../state/utils/entity-loader/entity-loader.selectors';
import { Management } from '../index';
import { EntitiesModel } from '../../model/misc.model';
import { LoaderState } from '../../state/index';

// TODO after update typescript to 3.7 it can be replaced by Nullish Coalescing (??) operator
function nullish(param, defaultValue) {
  return param !== null && param !== undefined ? param : defaultValue;
}

export function serializeB2BSearchConfig(config: B2BSearchConfig) {
  return `pageSize=${nullish(config.pageSize, '')}&currentPage=${nullish(
    config.currentPage,
    ''
  )}&sort=${nullish(config.sort, '')}`;
}

export function denormalizeB2BSearch(
  state: Management,
  LISTS: string,
  ENTITIES: string,
  params: B2BSearchConfig
) {
  const list: any = entityStateSelector(
    state[LISTS],
    serializeB2BSearchConfig(params)
  );
  if (!list.value || !list.value.ids) {
    return list;
  }
  const res: LoaderState<EntitiesModel<any>> = Object.assign({}, list, {
    value: {
      values: list.value.ids.map(
        code => entityStateSelector(state[ENTITIES], code).value
      ),
      pagination: list.value.pagination,
      sorts: list.value.sorts,
    },
  });
  return res;
}
