import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { STATUS_CLOSE } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CustomerTicketingService } from '../customer-ticketing.service';

@Component({
  selector: 'cx-customer-ticket-reopen',
  templateUrl: './customer-ticket-reopen.component.html',
})
export class CustomerTicketReopenComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  isStatusClose$: Observable<boolean> = this.customerTicketingService
    .getTicketStatus()
    .pipe(map((status) => status === STATUS_CLOSE));

  constructor(
    protected customerTicketingService: CustomerTicketingService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CUSTOMER_TICKETING,
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
