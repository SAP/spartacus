import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { OrderEntry, RoutingService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import {
  ActiveCartImportExportContext,
  CmsImportExportComponent,
  ImportContext,
  ExportContext,
  NewSavedCartImportContext,
  QuickOrderImportExportContext,
  SavedCartImportExportContext,
} from '@spartacus/cart/import-export/core';

function isExportContext(
  service: ImportContext | ExportContext
): service is ExportContext {
  return (service as ExportContext)?.getEntries !== undefined;
}

@Component({
  selector: 'cx-import-export',
  templateUrl: './import-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportComponent {
  protected get route$(): Observable<string> {
    return this.routingService
      .getRouterState()
      .pipe(map((route) => route.state?.semanticRoute as string));
  }

  protected routesCartMapping = new Map<string, ImportContext | ExportContext>([
    ['cart', this.activeCartService],
    ['savedCarts', this.newSavedCartService],
    ['savedCartsDetails', this.savedCartService],
    ['quickOrder', this.quickOrderService],
    ['checkoutReviewOrder', this.activeCartService],
  ]);

  constructor(
    protected cmsComponent: CmsComponentData<CmsImportExportComponent>,
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartImportExportContext,
    protected newSavedCartService: NewSavedCartImportContext,
    protected savedCartService: SavedCartImportExportContext,
    protected quickOrderService: QuickOrderImportExportContext
  ) {}

  context$: Observable<ImportContext | ExportContext> = this.route$.pipe(
    map(
      (route) =>
        this.routesCartMapping.get(route) as ImportContext | ExportContext
    ),
    filter((service) => service !== undefined)
  );

  entries$: Observable<OrderEntry[]> = this.context$.pipe(
    filter((service): service is ExportContext => isExportContext(service)),
    switchMap(
      (service: ExportContext) =>
        service.getEntries() as Observable<OrderEntry[]>
    )
  );

  shouldDisplayImport$: Observable<boolean> = combineLatest([
    this.route$,
    this.cmsComponent.data$,
  ]).pipe(
    map(([route, data]) => data.importButtonDisplayRoutes.includes(route))
  );

  shouldDisplayExport$: Observable<boolean> = combineLatest([
    this.route$,
    this.cmsComponent.data$,
    this.entries$,
  ]).pipe(
    map(
      ([route, data, entries]) =>
        data.exportButtonDisplayRoutes.includes(route) &&
        (entries as OrderEntry[])?.length > 0
    )
  );
}
