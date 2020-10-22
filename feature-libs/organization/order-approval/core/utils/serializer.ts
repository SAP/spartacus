import {
  EntitiesModel,
  ListModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';

const ALL = 'all';

// #9423
export interface Management<Type> {
  list: StateUtils.EntityLoaderState<ListModel>;
  entities: StateUtils.EntityLoaderState<Type>;
}

export function serializeSearchConfig(
  config: SearchConfig,
  id?: string
): string {
  return `${id ?? ''}?pageSize=${config.pageSize ?? ''}&currentPage=${
    config.currentPage ?? ''
  }&sort=${config.sort ?? ''}`;
}

export function denormalizeSearch<T>(
  state: Management<T>,
  params?: SearchConfig
): StateUtils.LoaderState<EntitiesModel<T>> {
  return denormalizeCustomB2BSearch<T>(state.list, state.entities, params);
}

export function denormalizeCustomB2BSearch<T>(
  list: StateUtils.EntityLoaderState<ListModel>,
  entities: StateUtils.EntityLoaderState<T>,
  params?: SearchConfig,
  id?: string
): StateUtils.LoaderState<EntitiesModel<T>> {
  const serializedList: any = StateUtils.entityLoaderStateSelector(
    list,
    params ? serializeSearchConfig(params, id) : id ?? ALL
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
  searchConfig: SearchConfig
): string {
  return [params, serializeSearchConfig(searchConfig)].toString();
}
