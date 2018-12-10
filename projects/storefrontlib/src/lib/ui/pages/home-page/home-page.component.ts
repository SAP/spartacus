import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {
  cmsTicketId: string;
  subscription: Subscription;

  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    this.subscription = this.routingService
      .getRouterState()
      .subscribe(routerState => {
        this.cmsTicketId = routerState.state.queryParams['cmsTicketId'];
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
