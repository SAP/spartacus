import { EntitiesModel, ListModel } from '../../model/index';
import { SearchConfig } from '../../product/model/search-config';
import { EntityListState } from './entity-list-state';
import { EntityLoaderState } from './entity-loader/entity-loader-state';
import { entityLoaderStateSelector } from './entity-loader/entity-loader.selectors';
import { LoaderState } from './loader/loader-state';

const ALL = 'all';

export function serializeSearchConfig(
  config: SearchConfig,
  id?: string
): string {
  return `${id ?? ''}?pageSize=${config.pageSize ?? ''}&currentPage=${
    config.currentPage ?? ''
  }&sort=${config.sort ?? ''}`;
}

export function denormalizeSearch<T>(
  state: EntityListState<T>,
  params?: SearchConfig
): LoaderState<EntitiesModel<T>> {
  return denormalizeCustomB2BSearch<T>(state.list, state.entities, params);
}

export function denormalizeCustomB2BSearch<T>(
  list: EntityLoaderState<ListModel>,
  entities: EntityLoaderState<T>,
  params?: SearchConfig,
  id?: string
): LoaderState<EntitiesModel<T>> {
  const serializedList: any = entityLoaderStateSelector(
    list,
    params ? serializeSearchConfig(params, id) : id ?? ALL
  );
  if (!serializedList.value || !serializedList.value.ids) {
    return serializedList;
  }
  const res: LoaderState<EntitiesModel<T>> = Object.assign({}, serializedList, {
    value: {
      values: serializedList.value.ids.map(
        (code) => entityLoaderStateSelector(entities, code).value
      ),
    },
  });
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
