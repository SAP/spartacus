import { filter } from 'rxjs/operators';
import { EntityLoadAction } from '../entity-loader/entity-loader.action';

export function ofLoaderLoad(entityType: string) {
  return filter(
    (action: EntityLoadAction) =>
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === entityType &&
      action.meta.loader.load
  );
}

export function ofLoaderFail(entityType: string) {
  return filter(
    (action: EntityLoadAction) =>
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === entityType &&
      action.meta.loader.error
  );
}

export function ofLoaderSuccess(entityType: string) {
  return filter(
    (action: EntityLoadAction) =>
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === entityType &&
      !action.meta.loader.load &&
      !action.meta.loader.error
  );
}
