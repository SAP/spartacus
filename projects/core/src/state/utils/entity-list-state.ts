import { ListModel } from '../../model/misc.model';
import { EntityLoaderState } from './entity-loader/entity-loader-state';

export interface EntityListState<Type> {
  list: EntityLoaderState<ListModel>;
  entities: EntityLoaderState<Type>;
}
