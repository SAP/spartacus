import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TabLink } from '../tab-link.model';

@Component({
  selector: 'cx-fake-tabs-mobile',
  templateUrl: './fake-tabs-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeTabsMobileComponent {
  @Input()
  links: Array<TabLink>;
}
