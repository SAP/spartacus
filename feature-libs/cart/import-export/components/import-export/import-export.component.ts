import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry, RoutingService } from '@spartacus/core';
import {
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-import-export',
  templateUrl: './import-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportComponent {
  constructor(protected routingService: RoutingService) {}

  context$: Observable<OrderEntriesContext | undefined> = this.routingService
    .getContext<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT)
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  entries$: Observable<OrderEntry[]> = this.context$.pipe(
    switchMap(
      (orderEntriesContext) => orderEntriesContext?.getEntries?.() ?? of([])
    )
  );

  shouldDisplayImport$: Observable<boolean> = this.context$.pipe(
    map((orderEntriesContext) => !!orderEntriesContext?.addEntries)
  );

  shouldDisplayExport$: Observable<boolean> = this.entries$.pipe(
    map((entries) => !!entries?.length)
  );
}
