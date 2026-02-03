import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  GetSubscriptionBillByCodeReloadEvent,
  SubscriptionBill,
  SubscriptionBillingFacade,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-subscription-billing-details',
  standalone: false,
  templateUrl: './subscription-billing-details.component.html',
})
export class SubscriptionBillingDetailsComponent implements OnInit {
  protected subscriptionBillingFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected subscriptionBill$: Observable<SubscriptionBill | undefined> =
    this.subscriptionBillingFacade.getSubscriptionBillByCode();

  ngOnInit() {
    this.eventService.dispatch({}, GetSubscriptionBillByCodeReloadEvent);
  }
}
