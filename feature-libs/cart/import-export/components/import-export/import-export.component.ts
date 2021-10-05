import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  cmsComponentData$ = this.cmsComponent.data$;

  constructor(
    protected cmsComponent: CmsComponentData<CmsImportExportComponent>,
    protected routingService: RoutingService
  ) {}

  get route$(): Observable<string> {
    return this.routingService
      .getRouterState()
      .pipe(map((route) => route.state?.semanticRoute as string));
  }

  getCartType(
    routesCartMapping: { [route: string]: CartTypes },
    semanticRoute: string
  ): CartTypes {
    return routesCartMapping[semanticRoute];
  }

  shouldDisplayButton(displayPages: string[], semanticRoute: string): boolean {
    return displayPages.includes(semanticRoute);
  }
}
