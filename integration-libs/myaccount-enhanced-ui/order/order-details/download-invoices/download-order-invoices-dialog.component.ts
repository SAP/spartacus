import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Order, OrderOutlets } from '@spartacus/order/root';
import { InvoicesListComponent } from '@spartacus/pdf-invoices/components';
import { PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import { ICON_TYPE, FocusConfig } from '@spartacus/storefront';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription, Observable, of } from 'rxjs';

@Component({
  selector: 'cx-reorder-dialog',
  templateUrl: './download-order-invoices-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadOrderInvoicesDialogComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  protected subscription = new Subscription();
  @ViewChild(InvoicesListComponent, { static: false })
  public invoiceComponent: InvoicesListComponent;
  readonly OrderOutlets = OrderOutlets;
  invoiceCount: number | undefined = undefined;
  loaded$: Observable<boolean> = of(false);
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };
  order: Order;
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected invoicesFacade: PDFInvoicesFacade,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data: Order) => {
        this.order = data;
        this.loadInvoices(data);
      })
    );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if (this.invoiceComponent.pagination !== undefined) {
      this.invoiceCount = this.invoiceComponent.pagination.totalResults;
    }
  }
  loadInvoices(_order: Order): void {
    this.loaded$ = of(true);
  }

  close(reason?: any, _message?: string): void {
    this.loaded$ = of(false);
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
