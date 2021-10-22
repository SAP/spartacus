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

  // SPIKE TODO AS ANY:
  protected pageContext$: Observable<any> = this.routingService
    .getData()
    .pipe(map(({ cxContext }) => cxContext));

  context$: Observable<
    OrderEntriesContext | undefined
  > = this.pageContext$.pipe(
    map((pageContext) => pageContext?.orderEntriesContext),
    tap((orderEntriesContext) => console.log({ orderEntriesContext })) // SPIKE TODO REMOVE
  );

  entries$: Observable<OrderEntry[]> = this.context$.pipe(
    switchMap((orderEntriesContext) =>
      typeof orderEntriesContext?.getEntries === 'function'
        ? (orderEntriesContext?.getEntries() as Observable<OrderEntry[]>)
        : of([])
    )
  );

  shouldDisplayImport$: Observable<boolean> = this.context$.pipe(
    map((orderEntriesContext) => !!orderEntriesContext?.addEntries)
  );

  shouldDisplayExport$: Observable<boolean> = this.entries$.pipe(
    map((entries) => !!entries?.length)
  );
}
