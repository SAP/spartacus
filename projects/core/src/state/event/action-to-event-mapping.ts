import { Type } from '@angular/core';

export interface ActionToEventMapping<T> {
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
