/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { PageContext } from '../models/page-context.model';
import { RoutingService } from '../facade/routing.service';
import { RouterState } from '../store/routing-state';

/**
 * Mock of {@link RoutingService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockRoutingService implements Partial<RoutingService> {
  getParams(): Observable<{ [key: string]: string }> {
    return of({});
  }

  getRouterState(): Observable<RouterState> {
    return of({} as RouterState);
  }

  getPageContext(): Observable<PageContext> {
    return EMPTY;
  }

  getNextPageContext(): Observable<PageContext | undefined> {
    return of(undefined);
  }

  isNavigating(): Observable<boolean> {
    return of(false);
  }

  go(): Promise<boolean> {
    return Promise.resolve(true);
  }

  goByUrl(): Promise<boolean> {
    return Promise.resolve(true);
  }

  getUrl(): string {
    return '';
  }

  getFullUrl(): string {
    return '';
  }

  back(): void {}

  forward(): void {}

  changeNextPageContext(): void {}
}
