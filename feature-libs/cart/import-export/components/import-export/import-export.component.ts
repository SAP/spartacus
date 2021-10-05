import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import {
  CartTypes,
  CmsImportExportComponent,
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

  constructor(
    protected cmsComponent: CmsComponentData<CmsImportExportComponent>,
    protected routingService: RoutingService
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

  cartType$: Observable<CartTypes | undefined> = combineLatest([
    this.route$,
    this.cmsComponent.data$,
  ]).pipe(map(([route, data]) => data.routesCartMapping[route]));
}
