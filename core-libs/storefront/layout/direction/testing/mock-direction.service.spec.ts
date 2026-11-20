/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { DirectionMode } from '../config/direction.model';
import { DirectionService } from '../direction.service';
import { DirectionTestingModule } from './direction-testing.module';
import { MockDirectionService } from './mock-direction.service';

describe('MockDirectionService', () => {
  let service: DirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [DirectionTestingModule] });
    service = TestBed.inject(DirectionService);
  });

  it('should be provided via DirectionTestingModule', () => {
    expect(service).toBeInstanceOf(MockDirectionService);
  });

  it('should default to LTR', () => {
    expect(service.getDirection()).toBe(DirectionMode.LTR);
  });

  it('should allow overriding getDirection with vi.spyOn', () => {
    vi.spyOn(service, 'getDirection').mockReturnValue(DirectionMode.RTL);
    expect(service.getDirection()).toBe(DirectionMode.RTL);
  });
});
