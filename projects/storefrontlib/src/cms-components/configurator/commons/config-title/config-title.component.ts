import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-config-title',
  templateUrl: './config-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTitleComponent {
  constructor() {}
}
