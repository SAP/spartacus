import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { STATUS } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CustomerTicketingDetailsService } from '../customer-ticketing-details.service';

@Component({
  selector: 'cx-customer-ticketing-close',
  templateUrl: './customer-ticketing-close.component.html',
})
export class CustomerTicketingCloseComponent implements OnDestroy {
  protected subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  enableCloseButton$: Observable<boolean | undefined> = combineLatest([
    this.customerTicketingDetailsService.getTicketStatus(),
    this.customerTicketingDetailsService.getAvailableTransitionStatus(),
  ]).pipe(
    map(
      ([ticketStatus, availableStatus]) =>
        (ticketStatus === STATUS.OPEN || ticketStatus === STATUS.INPROCESS) &&
        availableStatus?.some(
          (status) => status.id.toUpperCase() === STATUS.CLOSE
        )
    )
  );

  constructor(
    protected customerTicketingDetailsService: CustomerTicketingDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CUSTOMER_TICKETING_CLOSE,
      this.element,
      this.vcr
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
