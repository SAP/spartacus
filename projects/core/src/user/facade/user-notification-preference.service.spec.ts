import { TestBed } from '@angular/core/testing';

import { UserNotificationPreferenceService } from './user-notification-preference.service';

describe('UserNotificationPreferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserNotificationPreferenceService = TestBed.get(
      UserNotificationPreferenceService
    );
    expect(service).toBeTruthy();
  });
});
