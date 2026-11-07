/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { RoutingService } from '../facade/routing.service';
import { MockRoutingService } from './mock-routing.service';
import { RoutingTestingModule } from './routing-testing.module';

describe('MockRoutingService', () => {
  let service: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RoutingTestingModule] });
    service = TestBed.inject(RoutingService);
  });

  it('should be provided via RoutingTestingModule', () => {
    expect(service).toBeInstanceOf(MockRoutingService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(service.getParams())).toEqual({});
    expect(await firstValueFrom(service.isNavigating())).toBe(false);
    await expect(service.go([])).resolves.toBe(true);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'isNavigating').mockReturnValue(of(true));
    expect(await firstValueFrom(service.isNavigating())).toBe(true);
  });
});
