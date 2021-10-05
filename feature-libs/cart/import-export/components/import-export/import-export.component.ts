import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsImportExportComponent,
  AbstractImportExportService,
  ImportExportActiveCartService,
  ImportExportNewSavedCartService,
  ImportExportQuickOrderService,
  ImportExportSavedCartService,
} from '@spartacus/cart/import-export/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';

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

  protected routesCartMapping = {
    cart: this.activeCartService,
    savedCarts: this.newSavedCartService,
    savedCartsDetails: this.savedCartService,
    quickOrder: this.quickOrderService,
  };

  constructor(
    protected cmsComponent: CmsComponentData<CmsImportExportComponent>,
    protected routingService: RoutingService,
    protected activeCartService: ImportExportActiveCartService,
    protected newSavedCartService: ImportExportNewSavedCartService,
    protected savedCartService: ImportExportSavedCartService,
    protected quickOrderService: ImportExportQuickOrderService
  ) {}

  shouldDisplayImport$: Observable<boolean> = combineLatest([
    this.route$,
    this.cmsComponent.data$,
  ]).pipe(
    map(([route, data]) => data.importButtonDisplayRoutes.includes(route))
  );

  shouldDisplayExport$: Observable<boolean> = combineLatest([
    this.route$,
    this.cmsComponent.data$,
  ]).pipe(
    map(([route, data]) => data.exportButtonDisplayRoutes.includes(route))
  );

  service$: Observable<AbstractImportExportService | undefined> =
    this.route$.pipe(map((route) => this.routesCartMapping[route]));
}
