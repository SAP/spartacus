import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TabLink } from '../tab-link.model';

@Component({
  selector: 'cx-fake-tabs-desktop',
  templateUrl: './fake-tabs-desktop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeTabsDesktopComponent {
  @Input()
  links: Array<TabLink>;
}
