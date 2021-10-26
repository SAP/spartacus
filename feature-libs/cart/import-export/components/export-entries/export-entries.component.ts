import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import {
  ContextService,
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ExportProductsToCsvService } from './export-products-to-csv.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent {
  constructor(
    protected exportEntriesService: ExportProductsToCsvService,
    protected contextService: ContextService
  ) {}

  protected orderEntriesContext$: Observable<
    OrderEntriesContext | undefined
  > = this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  entries$: Observable<
    OrderEntry[] | undefined
  > = this.orderEntriesContext$.pipe(
    switchMap(
      (orderEntriesContext) =>
        orderEntriesContext?.getEntries?.() ?? of(undefined)
    )
  );

  exportCsv(entries: OrderEntry[]): void {
    this.exportEntriesService.downloadCsv(entries);
  }
}
