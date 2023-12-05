import { EntitiesModel, ListModel } from '../../model/index';
import { SearchConfig } from '../../product/model/search-config';
import { EntityListState } from './entity-list-state';
import { EntityLoaderState } from './entity-loader/entity-loader-state';
import { LoaderState } from './loader/loader-state';
export declare function serializeSearchConfig(config: SearchConfig, id?: string): string;
export declare function denormalizeSearch<T>(state: EntityListState<T>, params?: SearchConfig): LoaderState<EntitiesModel<T>>;
export declare function denormalizeCustomB2BSearch<T>(list: EntityLoaderState<ListModel>, entities: EntityLoaderState<T>, params?: SearchConfig, id?: string): LoaderState<EntitiesModel<T>>;
export declare function normalizeListPage<T>(list: EntitiesModel<T>, id: string): {
    values: T[];
    page: ListModel;
};
export declare function serializeParams(params: string | string[], searchConfig: SearchConfig): string;
