import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService
  ) {}

  context$: Observable<OrderEntriesContext | undefined> = this.routingService
    .getContext<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT)
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  openDialog(context: OrderEntriesContext): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      { context }
    );
  }
}
