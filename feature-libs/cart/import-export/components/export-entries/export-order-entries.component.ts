import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry, RoutingService } from '@spartacus/core';
import {
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { ExportProductsToCsvService } from './export-products-to-csv.service';

@Component({
  selector: 'cx-export-order-entries',
  templateUrl: './export-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportOrderEntriesComponent {
  constructor(
    protected exportEntriesService: ExportProductsToCsvService,
    protected routingService: RoutingService
  ) {}

  protected context$: Observable<OrderEntriesContext | undefined> =
    this.routingService
      .getContext<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT)
      .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  entries$: Observable<OrderEntry[] | undefined> = this.context$.pipe(
    switchMap(
      (orderEntriesContext) =>
        orderEntriesContext?.getEntries?.() ?? of(undefined)
    )
  );

  exportCsv(entries: OrderEntry[]): void {
    this.exportEntriesService.downloadCsv(entries);
  }
}
