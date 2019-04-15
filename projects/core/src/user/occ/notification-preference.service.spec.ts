import { TestBed } from '@angular/core/testing';

import { NotificationPreferenceService } from './notification-preference.service';

describe('NotificationPreferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationPreferenceService = TestBed.get(NotificationPreferenceService);
    expect(service).toBeTruthy();
  });
});
