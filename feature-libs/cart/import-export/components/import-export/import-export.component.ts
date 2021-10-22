import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry, RoutingService } from '@spartacus/core';
import { OrderEntriesContext } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-import-export',
  templateUrl: './import-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportComponent {
  constructor(protected routingService: RoutingService) {}

  context$: Observable<OrderEntriesContext> = this.routingService
    .getData()
    .pipe(
      tap(console.warn),
      map(({ cxContext }) => cxContext?.orderEntries)
    );

  entries$: Observable<OrderEntry[]> = this.context$.pipe(
    switchMap(
      (service: OrderEntriesContext) =>
        // @ts-ignore SPIKE TODO FIX
        (service?.getEntries() as Observable<OrderEntry[]>) ?? of([])
    )
  );

  shouldDisplayImport$: Observable<boolean> = this.context$.pipe(
    // @ts-ignore SPIKE TODO FIX
    map((context) => !!context?.setEntries)
  );

  shouldDisplayExport$: Observable<boolean> = this.entries$.pipe(
    // @ts-ignore SPIKE TODO FIX
    map((entries) => !!entries.length)
  );
}
