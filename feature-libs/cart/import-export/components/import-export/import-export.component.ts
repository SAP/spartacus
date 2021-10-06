import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderEntry, RoutingService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import {
  CmsImportExportComponent,
  ImportExportContext,
  ActiveCartImportExportContext,
  NewSavedCartImportExportContext,
  QuickOrderImportExportContext,
  SavedCartImportExportContext,
} from '@spartacus/cart/import-export/core';

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

  protected routesCartMapping = new Map<string, ImportExportContext>([
    ['cart', this.activeCartService],
    ['savedCarts', this.newSavedCartService],
    ['savedCartsDetails', this.savedCartService],
    ['quickOrder', this.quickOrderService],
  ]);

  constructor(
    protected cmsComponent: CmsComponentData<CmsImportExportComponent>,
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartImportExportContext,
    protected newSavedCartService: NewSavedCartImportExportContext,
    protected savedCartService: SavedCartImportExportContext,
    protected quickOrderService: QuickOrderImportExportContext
  ) {}

  service$: Observable<ImportExportContext | undefined> = this.route$.pipe(
    map((route) => this.routesCartMapping.get(route))
  );

  entries$: Observable<OrderEntry[]> = this.service$.pipe(
    switchMap((service) => service.getEntries() as Observable<OrderEntry[]>)
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
        data.exportButtonDisplayRoutes.includes(route) && entries.length > 0
    )
  );
}
