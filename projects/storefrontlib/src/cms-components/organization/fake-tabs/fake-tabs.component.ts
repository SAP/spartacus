// import { RoutingService } from '@spartacus/core';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TabLink } from './tab-link.model';

@Component({
  selector: 'cx-fake-tabs',
  templateUrl: './fake-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeTabsComponent {
  // constructor(protected routingService: RoutingService) {}

  @Input()
  links: Array<TabLink>;

  @Input()
  code: string;
}
