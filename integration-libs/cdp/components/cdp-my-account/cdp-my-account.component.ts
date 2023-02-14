import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';

@Component({
  selector: 'cx-cdp-my-account',
  templateUrl: './cdp-my-account.component.html',
  styleUrls: ['./cdp-my-account.component.css']
})
export class CdpMyAccountComponent implements OnInit {

  constructor( protected routing: RoutingService) { }

  ngOnInit(): void {
  }

  goToMyAccount(order: Order): void {
    this.routing.go({
      cxRoute: 'my-account',
      params: order,
    });
  }
}
