/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Type } from '@angular/core';

export interface ActionToEventMapping<T> {
  /**
   * String type of action (or types) to be mapped to the event
   */
  action: string | string[];

  /**
   * Event class type (constructor)
   */
  event: Type<T>;

  /**
   * Function mapping the instance of the action to the event
   */
  factory?: (action: any) => T;
}
