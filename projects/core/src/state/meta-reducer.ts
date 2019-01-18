import { InjectionToken } from '@angular/core';

export const META_REDUCER = new InjectionToken('metaReducer');

export function metaReducersFactory(metaReducers: any[]) {
  return (metaReducers || []).filter(Boolean);
}
