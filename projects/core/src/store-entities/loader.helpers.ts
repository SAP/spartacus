import { filter } from 'rxjs/operators';

export function ofEntityLoad(entityType: string) {
  return filter(
    (action: any) =>
      action.meta &&
      action.meta.entity &&
      action.meta.entity.type === entityType &&
      action.meta.entity.load
  );
}

export function ofEntityFail(entityType: string) {
  return filter(
    (action: any) =>
      action.meta &&
      action.meta.entity &&
      action.meta.entity.type === entityType &&
      action.meta.entity.error
  );
}

export function ofEntitySuccess(entityType: string) {
  return filter(
    (action: any) =>
      action.meta &&
      action.meta.entity &&
      action.meta.entity.type === entityType &&
      !action.meta.entity.load &&
      !action.meta.entity.error
  );
}
