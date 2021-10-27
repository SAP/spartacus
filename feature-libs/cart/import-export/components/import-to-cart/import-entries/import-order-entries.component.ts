import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  ContextService,
  LaunchDialogService,
  LAUNCH_CALLER,
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-import-order-entries',
  templateUrl: './import-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportOrderEntriesComponent {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected contextService: ContextService
  ) {}

  orderEntriesContext$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  openDialog(orderEntriesContext: OrderEntriesContext): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      { orderEntriesContext }
    );
  }
}
