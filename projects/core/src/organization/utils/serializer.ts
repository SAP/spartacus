import { EntitiesModel, ListModel } from '../../model/misc.model';
import { LoaderState } from '../../state/index';
import { entityStateSelector } from '../../state/utils/entity-loader/entity-loader.selectors';
import { B2BSearchConfig } from '../model/search-config';
import { Management } from '../store/organization-state';

// TODO after update typescript to 3.7 it can be replaced by Nullish Coalescing (??) operator
function nullish(param, defaultValue) {
  return param !== null && param !== undefined ? param : defaultValue;
}

export const ALL = 'all';

export function serializeB2BSearchConfig(config: B2BSearchConfig) {
  return `pageSize=${nullish(config.pageSize, '')}&currentPage=${nullish(
    config.currentPage,
    ''
  )}&sort=${nullish(config.sort, '')}`;
}

export function denormalizeB2BSearch<T>(
  state: Management<T>,
  params?: B2BSearchConfig
): LoaderState<EntitiesModel<T>> {
  const list: any = entityStateSelector(
    state.list,
    params ? serializeB2BSearchConfig(params) : ALL
  );
  if (!list.value || !list.value.ids) {
    return list;
  }
  const res: LoaderState<EntitiesModel<T>> = Object.assign({}, list, {
    value: {
      values: list.value.ids.map(
        code => entityStateSelector(state.entities, code).value
      ),
    },
  });
  if (params) {
    res.value.pagination = list.value.pagination;
    res.value.sorts = list.value.sorts;
  }
  return res;
}

export function normalizeListPage<T>(
  list: EntitiesModel<T>,
  id: string
): { values: T[]; page: ListModel } {
  const values = list.values;
  const page: ListModel = {
    ids: values.map(data => data[id]),
  };
  if (list.pagination) {
    page.pagination = list.pagination;
  }
  if (list.sorts) {
    page.sorts = list.sorts;
  }
  return { values, page };
}
