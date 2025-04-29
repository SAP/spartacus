/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RootDomService {
  private rootReady$ = new ReplaySubject<HTMLElement>(1);

  setRootElement(el: HTMLElement): void {
    this.rootReady$.next(el);
  }

  getRootElement(): Observable<HTMLElement> {
    return this.rootReady$.asObservable();
  }
}
