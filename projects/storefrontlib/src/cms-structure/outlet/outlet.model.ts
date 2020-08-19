export enum OutletPosition {
  REPLACE = 'replace',
  BEFORE = 'before',
  AFTER = 'after',
}

export const AVOID_STACKED_OUTLETS = false;
export const USE_STACKED_OUTLETS = true;

/**
 * Token for injecting outlet related context to the component rendered in the outlet
 */
export abstract class OutletContextData<T = any> {
  name: string;
  position: OutletPosition;
  context: T;
}
