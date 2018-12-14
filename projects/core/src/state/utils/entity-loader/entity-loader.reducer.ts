import { entityReducer } from '../entity/entity.reducer';
import { loaderReducer } from '../loader/loader.reducer';

export function entityLoaderReducer<T>(
  loadActionType: string,
  reducer?: (state: T, action: any) => T
) {
  return entityReducer(loaderReducer(loadActionType, reducer));
}
