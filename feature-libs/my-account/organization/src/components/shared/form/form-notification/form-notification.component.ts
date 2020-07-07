import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Translatable, TranslatableParams } from '@spartacus/core';

@Component({
  selector: 'cx-form-notification',
  template: `<div class="alert alert-info">
    <span>{{ messageKey | cxTranslate: options }}</span>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNotificationComponent {
  @Input()
  messageKey: Translatable | string;

  @Input()
  options: TranslatableParams;

  constructor() {}
}
