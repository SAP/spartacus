import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { UserNotificationPreferenceAdapter } from './user-notification-preference.adapter';
import { UserNotificationPreferenceConnector } from './user-notification-preference.connector';
import createSpy = jasmine.createSpy;

const user = 'testUser';
const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];

class MocktAdapter implements UserNotificationPreferenceAdapter {
  loadAll = createSpy('loadAll').and.callFake((userId) =>
    of(`loadAll-notification-preferences-${userId}`)
  );
  update = createSpy('update').and.callFake((userId, preferences) =>
    of(`update-notification-preferences-${userId}-${preferences[0].channel}`)
  );
}

describe('UserNotificationPreferenceConnector', () => {
  let service: UserNotificationPreferenceConnector;
  let adapter: UserNotificationPreferenceAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserNotificationPreferenceAdapter, useClass: MocktAdapter },
      ],
    });

    service = TestBed.inject(UserNotificationPreferenceConnector);
    adapter = TestBed.inject(UserNotificationPreferenceAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadAll should call adapter', () => {
    let result;
    service.loadAll(user).subscribe((res) => (result = res));
    expect(result).toEqual('loadAll-notification-preferences-testUser');
    expect(adapter.loadAll).toHaveBeenCalledWith(user);
  });

  it('update should call adapter', () => {
    let result;
    service
      .update(user, mockNotificationPreference)
      .subscribe((res) => (result = res));
    expect(result).toEqual('update-notification-preferences-testUser-EMAIL');
    expect(adapter.update).toHaveBeenCalledWith(
      user,
      mockNotificationPreference
    );
  });
});
