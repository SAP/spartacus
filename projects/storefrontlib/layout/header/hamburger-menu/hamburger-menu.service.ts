/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HamburgerMenuService {
  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const router = inject(Router);

    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.toggle(true);
      });
  }

  /**
   * toggles the expand state of the hamburger menu
   */
  toggle(forceCollapse?: boolean): void {
    if (forceCollapse) {
      this.isExpanded.next(false);
    } else {
      this.isExpanded.next(!this.isExpanded.value);
    }
  }
}
