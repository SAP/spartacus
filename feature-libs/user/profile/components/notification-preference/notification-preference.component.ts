import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationPreference } from '@spartacus/core';
import { NotificationPreferenceComponentService } from './notification-preference.service';

@Component({
  selector: 'cx-notification-preference',
  templateUrl: './notification-preference.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class NotificationPreferenceComponent {
  constructor(protected service: NotificationPreferenceComponentService) {}

  isUpdating$ = this.service.isUpdating$;
  preferences$ = this.service.preferences$;

  update(preference: NotificationPreference) {
    preference.enabled = !preference.enabled;
    this.service.update(preference);
  }
}
