/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { BREAKPOINT } from '../../config/layout-config';
import { BreakpointService } from '../breakpoint.service';
import { BreakpointTestingModule } from './breakpoint-testing.module';
import { MockBreakpointService } from './mock-breakpoint.service';

describe('MockBreakpointService', () => {
  let service: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BreakpointTestingModule] });
    service = TestBed.inject(BreakpointService);
  });

  it('should be provided via BreakpointTestingModule', () => {
    expect(service).toBeInstanceOf(MockBreakpointService);
  });

  it('should default to a desktop breakpoint', async () => {
    expect(await firstValueFrom(service.breakpoint$)).toBe(BREAKPOINT.lg);
    expect(await firstValueFrom(service.isUp(BREAKPOINT.md))).toBe(true);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(service, 'isDown').mockReturnValue(of(true));
    expect(await firstValueFrom(service.isDown(BREAKPOINT.md))).toBe(true);
  });
});
