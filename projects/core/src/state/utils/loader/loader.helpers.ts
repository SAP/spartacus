import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { EntityLoadAction } from '../entity-loader/entity-loader.action';
import { MonoTypeOperatorFunction } from 'rxjs';

export function ofLoaderLoad(
  entityType: string
): MonoTypeOperatorFunction<EntityLoadAction> {
  return filter(
    (action: EntityLoadAction) =>
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === entityType &&
      action.meta.loader.load
  );
}

export function ofLoaderFail(
  entityType: string
): MonoTypeOperatorFunction<EntityLoadAction> {
  return filter(
    (action: EntityLoadAction) =>
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === entityType &&
      action.meta.loader.error
  );
}

export function ofLoaderSuccess(
  entityType: string
): MonoTypeOperatorFunction<EntityLoadAction> {
  return filter(
    (action: EntityLoadAction) =>
      action.meta &&
      action.meta.loader &&
      action.meta.loader.type === entityType &&
      !action.meta.loader.load &&
      !action.meta.loader.error
  );
}
