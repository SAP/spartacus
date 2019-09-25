import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-config-image',
  templateUrl: './config-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigImageComponent {
  constructor() {}
}
