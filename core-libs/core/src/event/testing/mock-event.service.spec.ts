/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { EventService } from '../event.service';
import { EventTestingModule } from './event-testing.module';
import { MockEventService } from './mock-event.service';

class TestEvent {
  value?: string;
}

describe('MockEventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EventTestingModule] });
    service = TestBed.inject(EventService);
  });

  it('should be provided via EventTestingModule', () => {
    expect(service).toBeInstanceOf(MockEventService);
  });

  it('should allow spying on dispatch', () => {
    const spy = vi.spyOn(service, 'dispatch');
    const event = new TestEvent();
    service.dispatch(event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should allow overriding get with vi.spyOn', async () => {
    const event = new TestEvent();
    vi.spyOn(service, 'get').mockReturnValue(of(event));
    expect(await firstValueFrom(service.get(TestEvent))).toBe(event);
  });
});
