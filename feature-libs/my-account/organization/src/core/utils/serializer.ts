import { EntitiesModel, ListModel, StateUtils } from '@spartacus/core';
import { B2BSearchConfig } from '../model/search-config';
import { Management } from '../store/organization-state';

// TODO after update typescript to 3.7 it can be replaced by Nullish Coalescing (??) operator
function nullish(param, defaultValue) {
  return param !== null && param !== undefined ? param : defaultValue;
}

export const ALL = 'all';

export function serializeB2BSearchConfig(
  config: B2BSearchConfig,
  id?: string
): string {
  return `${nullish(id, '')}?pageSize=${nullish(
    config.pageSize,
    ''
  )}&currentPage=${nullish(config.currentPage, '')}&sort=${nullish(
    config.sort,
    ''
  )}`;
}

export function denormalizeB2BSearch<T>(
  state: Management<T>,
  params?: B2BSearchConfig
): StateUtils.LoaderState<EntitiesModel<T>> {
  return denormalizeCustomB2BSearch<T>(state.list, state.entities, params);
}

export function denormalizeCustomB2BSearch<T>(
  list: StateUtils.EntityLoaderState<ListModel>,
  entities: StateUtils.EntityLoaderState<T>,
  params?: B2BSearchConfig,
  id?: string
): StateUtils.LoaderState<EntitiesModel<T>> {
  const serializedList: any = StateUtils.entityLoaderStateSelector(
    list,
    params ? serializeB2BSearchConfig(params, id) : id ?? ALL
  );
  if (!serializedList.value || !serializedList.value.ids) {
    return serializedList;
  }
  const res: StateUtils.LoaderState<EntitiesModel<T>> = Object.assign(
    {},
    serializedList,
    {
      value: {
        values: serializedList.value.ids.map(
          (code) => StateUtils.entityLoaderStateSelector(entities, code).value
        ),
      },
    }
  );
  if (params) {
    res.value.pagination = serializedList.value.pagination;
    res.value.sorts = serializedList.value.sorts;
  }
  return res;
}

export function normalizeListPage<T>(
  list: EntitiesModel<T>,
  id: string
): { values: T[]; page: ListModel } {
  const values = list?.values || [];
  const page: ListModel = {
    ids: values.map((data) => data[id]),
  };
  if (list.pagination) {
    page.pagination = list.pagination;
  }
  if (list.sorts) {
    page.sorts = list.sorts;
  }
  return { values, page };
}

export function serializeParams(
  params: string | string[],
  searchConfig: B2BSearchConfig
): string {
  return [params, serializeB2BSearchConfig(searchConfig)].toString();
}
