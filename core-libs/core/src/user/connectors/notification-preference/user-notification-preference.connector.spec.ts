import { of } from 'rxjs';
import { vi } from 'vitest';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { UserNotificationPreferenceConnector } from './user-notification-preference.connector';

const user = 'testUser';
const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];

describe('UserNotificationPreferenceConnector', () => {
  let service: UserNotificationPreferenceConnector;
  let adapter: {
    loadAll: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      loadAll: vi.fn().mockImplementation((userId) =>
        of(`loadAll-notification-preferences-${userId}`)
      ),
      update: vi.fn().mockImplementation((userId, preferences) =>
        of(`update-notification-preferences-${userId}-${preferences[0].channel}`)
      ),
    };
    service = new UserNotificationPreferenceConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadAll should call adapter', () => {
    let result: any;
    service.loadAll(user).subscribe((res) => (result = res));
    expect(result).toEqual('loadAll-notification-preferences-testUser');
    expect(adapter.loadAll).toHaveBeenCalledWith(user);
  });

  it('update should call adapter', () => {
    let result: any;
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
