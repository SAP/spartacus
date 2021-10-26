import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ContextService,
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-import-export',
  templateUrl: './import-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportComponent {
  constructor(protected contextService: ContextService) {}

  protected context$: Observable<
    OrderEntriesContext | undefined
  > = this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  shouldDisplayImport$: Observable<boolean> = this.context$.pipe(
    map((orderEntriesContext) => !!orderEntriesContext?.addEntries)
  );

  shouldDisplayExport$: Observable<boolean> = this.context$.pipe(
    switchMap(
      (orderEntriesContext) => orderEntriesContext?.getEntries?.() ?? of([])
    ),
    map((entries) => !!entries?.length)
  );
}
