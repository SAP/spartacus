import { InjectionToken, Type } from '@angular/core';

export interface ActionToEvent<T> {
  /**
   * Action type string
   */
  action: string;

  /**
   * Event class type (constructor)
   */
  event: Type<T> | null;

  /**
   * Function mapping the instance of
   */
  factory?: (action: any) => T;
}

export const ACTION_TO_EVENT = new InjectionToken<ActionToEvent<any>>(
  'ACTION_TO_EVENT'
);
