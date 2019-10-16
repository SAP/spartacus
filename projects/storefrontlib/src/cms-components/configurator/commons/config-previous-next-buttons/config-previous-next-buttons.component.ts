import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent {
  constructor() {}

  @Input() attribute: Configurator.Attribute;

  onPrevious() {}
  onNext() {}

  isPreviousButtonDisabled() {
    return false;
  }

  isNextButtonDisabled() {
    return false;
  }
}
