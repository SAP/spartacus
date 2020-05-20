import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
// import { RoutingService } from '@spartacus/core';
import { TabLink } from '../tab-link.model';

@Component({
  selector: 'cx-fake-tabs-mobile',
  templateUrl: './fake-tabs-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeTabsMobileComponent {
  // constructor(protected routingService: RoutingService) {}

  @Input()
  links: Array<TabLink>;

  @Input()
  code: string;
}
